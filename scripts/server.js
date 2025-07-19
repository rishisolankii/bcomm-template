const express = require("express");
const multer = require("multer");
const yauzl = require("yauzl");
const fs = require("fs");
const path = require("path");
const { validate } = require("./api");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors("*"));

const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/";
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 },
});

app.post("/upload", upload.single("zipfile"), (req, res) => {
  console.log("HIT");

  if (!req.file) {
    return res.status(400).json({
      success: false,
      errors: [{ message: "No file uploaded" }],
      warnings: [],
    });
  }

  const extractPath = req.body.extractPath || "extracted";

  yauzl.open(req.file.path, { lazyEntries: true }, (err, zipfile) => {
    if (err) {
      return res.status(500).json({
        success: false,
        errors: [{ message: "Failed to open zip file" }],
        warnings: [],
      });
    }

    zipfile.readEntry();
    zipfile.on("entry", (entry) => {
      const entryPath = path.join(extractPath, entry.fileName);
      if (/\/$/.test(entry.fileName)) {
        fs.mkdirSync(entryPath, { recursive: true });
        zipfile.readEntry();
      } else {
        fs.mkdirSync(path.dirname(entryPath), { recursive: true });
        zipfile.openReadStream(entry, (err, readStream) => {
          if (err) {
            return res.status(500).json({
              success: false,
              errors: [{ message: "Failed to read zip entry" }],
              warnings: [],
            });
          }
          const writeStream = fs.createWriteStream(entryPath);
          readStream.pipe(writeStream);
          writeStream.on("close", () => {
            zipfile.readEntry();
          });
        });
      }
    });

    zipfile.on("end", () => {
      fs.unlinkSync(req.file.path);

      const schemaPath = "template-schema.json";
      const result = validate(extractPath, schemaPath);

      if (result.success) {
        res.json({
          success: true,
          message: "File uploaded and validated successfully",
        });
      } else {
        fs.rm(extractPath, { recursive: true, force: true }, (err) => {
          if (err) {
            console.error("Error deleting extracted folder:", err);
          }
        });
        res.status(400).json(result);
      }
    });
  });
});

app.post("/validate", (req, res) => {
  const { projectDir, schemaPath } = req.body;

  if (!projectDir || !schemaPath) {
    return res.status(400).json({
      success: false,
      errors: [{ message: "projectDir and schemaPath are required" }],
      warnings: [],
    });
  }

  const result = validate(projectDir, schemaPath);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Validation server listening at http://localhost:${port}`);
});
