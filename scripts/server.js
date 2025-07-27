const express = require("express");
const multer = require("multer");
const yauzl = require("yauzl");
const fs = require("fs");
const path = require("path");
const { validate } = require("./api");
const cors = require("cors");
const connectDB = require("./db");
const Template = require("./models/template");
const StoreTemplate = require("./models/storeTemplate");

connectDB();

const app = express();
app.use(express.json());
app.use(cors("*"));

const port = 6000;

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

app.post("/upload", upload.single("zipfile"), async (req, res) => {
  const { templateName } = req.body;

  if (!templateName) {
    return res.status(400).json({
      success: false,
      errors: [{ message: "Template name is required" }],
      warnings: [],
    });
  }

  try {
    const existingTemplate = await Template.findOne({ templateName });
    if (existingTemplate) {
      return res.status(400).json({
        success: false,
        errors: [{ message: "Template with this name already exists" }],
        warnings: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: [{ message: "Error checking for existing template" }],
      warnings: [],
    });
  }

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
        const { exec } = require("child_process");
        exec(
          `cd ${extractPath} && npm install && npm run build -- --base-href /${templateName}/`,
          (err, stdout, stderr) => {
            if (err) {
              console.error("Error building project:", stderr);
              fs.rm(extractPath, { recursive: true, force: true }, (err) => {
                if (err) {
                  console.error("Error deleting extracted folder:", err);
                }
              });
              return res.status(500).json({
                success: false,
                errors: [{ message: "Failed to build project" }],
                warnings: [],
              });
            }

            const sourcePath = path.join(extractPath, "dist", "lasio-template");
            const destinationPath = path.join(
              "/home",
              "ubuntu",
              "lasio-template",
              "dist",
              templateName
            );

            fs.rename(sourcePath, destinationPath, (err) => {
              if (err) {
                console.error("Error moving directory:", err);
                return res.status(500).json({
                  success: false,
                  errors: [{ message: "Failed to move project directory" }],
                  warnings: [],
                });
              }

              const nginxConfig = `
location /${templateName}/ {
  alias ${destinationPath}/;
  index index.html;
  try_files $uri $uri/ /${templateName}/index.html;
}
`;
              fs.appendFile("templates.conf", nginxConfig, (err) => {
                if (err) {
                  console.error("Error writing nginx config:", err);
                  return res.status(500).json({
                    success: false,
                    errors: [{ message: "Failed to write nginx config" }],
                    warnings: [],
                  });
                }

                const newTemplate = new Template({
                  templateName,
                  urlPath: `/${templateName}/`,
                });

                newTemplate
                  .save()
                  .then(() => {
                    res.json({
                      success: true,
                      message:
                        "File uploaded, validated, built, and nginx configured successfully",
                    });
                  })
                  .catch((err) => {
                    console.error("Error saving template to db:", err);
                    fs.rm(
                      extractPath,
                      { recursive: true, force: true },
                      (err) => {
                        if (err) {
                          console.error(
                            "Error deleting extracted folder:",
                            err
                          );
                        }
                      }
                    );
                    res.status(500).json({
                      success: false,
                      errors: [{ message: "Failed to save template to db" }],
                      warnings: [],
                    });
                  });
              });
            });
          }
        );
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

app.get("/templates", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json({ success: true, data: templates });
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{ message: "Failed to fetch templates" }],
      warnings: [],
    });
  }
});

app.post("/api/store-template", async (req, res) => {
  const { productStoreId, templateUrl } = req.body;

  if (!productStoreId || !templateUrl) {
    return res.status(400).json({
      success: false,
      errors: [{ message: "productStoreId and templateUrl are required" }],
      warnings: [],
    });
  }

  try {
    const newStoreTemplate = new StoreTemplate({
      productStoreId,
      templateUrl,
    });

    await newStoreTemplate.save();

    res.json({
      success: true,
      message: "Store template map saved successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        errors: [{ message: "productStoreId must be unique" }],
        warnings: [],
      });
    }
    res.status(500).json({
      success: false,
      errors: [{ message: "Failed to save store template map" }],
      warnings: [],
    });
  }
});

app.get("/api/store-template/:productStoreId", async (req, res) => {
  try {
    const { productStoreId } = req.params;
    const storeTemplate = await StoreTemplate.findOne({ productStoreId });

    if (!storeTemplate) {
      return res.status(404).json({
        success: false,
        errors: [{ message: "Template not found for this productStoreId" }],
        warnings: [],
      });
    }

    res.json({
      success: true,
      data: { templateUrl: storeTemplate.templateUrl },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: [{ message: "Failed to fetch template" }],
      warnings: [],
    });
  }
});

app.listen(port, () => {
  console.log(`Validation server listening at http://localhost:${port}`);
});
