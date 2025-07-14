const express = require("express");
const { validate } = require("./api");

const app = express();
app.use(express.json());

const port = 3000;

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
