#!/usr/bin/env node
const path = require("path");
const { validate } = require("./api"); // Import the API

function main() {
  if (process.argv.length < 4) {
    console.error(
      "Usage: node scripts/validate-template.js <project_directory> <schema_path>"
    );
    console.error(
      "Example: node scripts/validate-template.js ./my-angular-project ./scripts/template-schema.json"
    );
    process.exit(1);
  }

  const projectDir = process.argv[2];
  const schemaPath = process.argv[3];

  // The validation logic is now encapsulated in the `validate` function.
  const { errors, warnings, success } = validate(projectDir, schemaPath);

  // Handle Warnings
  if (warnings.length > 0) {
    console.warn("Validation finished with warnings:");
    warnings.forEach((warn) => {
      console.warn(`- [${warn.file}] ${warn.message}`);
    });
  }

  // Handle Errors
  if (!success) {
    console.error(`\nValidation Failed: Found ${errors.length} error(s).`);
    errors.forEach((err) => {
      console.error(`- [${err.file}] ${err.message}`);
    });
    process.exit(1); // Exit with a failure code
  }

  // Handle Success
  console.log("\nValidation Successful: All checked components align with the schema.");
  process.exit(0); // Exit with a success code
}

// Execute the main function if the script is run directly
if (require.main === module) {
  main();
}
