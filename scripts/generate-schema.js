const fs = require("fs");
const path = require("path");
const glob = require("glob");
const ts = require("typescript");

/**
 * Finds all component.ts files in the project directory.
 * @param {string} projectDir The root directory of the Angular project.
 * @returns {string[]} A list of absolute paths to component files.
 */
function findComponentFiles(projectDir) {
  const pattern = "**/*.component.ts"; // glob pattern relative to cwd
  try {
    const absoluteProjectDir = path.resolve(projectDir);
    if (
      !fs.existsSync(absoluteProjectDir) ||
      !fs.statSync(absoluteProjectDir).isDirectory()
    ) {
      console.error(
        `Error: Project directory does not exist or is not a directory: ${absoluteProjectDir}`
      );
      return [];
    }
    return glob.sync(pattern, {
      cwd: absoluteProjectDir,
      absolute: true,
      nodir: true,
    });
  } catch (error) {
    console.error(
      `Error finding component files in ${projectDir}: ${error.message}`
    );
    return [];
  }
}

/**
 * Parses a TypeScript file and returns its AST SourceFile node.
 * @param {string} filePath Absolute path to the TypeScript file.
 * @returns {ts.SourceFile | null} The AST SourceFile node or null if parsing fails.
 */
function parseTypeScriptFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return ts.createSourceFile(
      path.basename(filePath),
      fileContent,
      ts.ScriptTarget.Latest,
      true // setParentNodes
    );
  } catch (error) {
    console.error(
      `Error reading or parsing file ${filePath}: ${error.message}`
    );
    return null;
  }
}

/**
 * Extracts the component selector from its decorator metadata.
 * Assumes selector is a string literal.
 * @param {ts.ClassDeclaration} classNode The AST node for the component class.
 * @param {ts.SourceFile} sourceFile The source file for context if needed by getText.
 * @returns {string | null} The selector string or null if not found/parsable.
 */
function getComponentSelector(classNode, sourceFile) {
  const decorators = ts.canHaveDecorators(classNode)
    ? ts.getDecorators(classNode)
    : undefined;
  if (!decorators || decorators.length === 0) {
    return null;
  }

  for (const decorator of decorators) {
    if (ts.isCallExpression(decorator.expression)) {
      const decoratorName = decorator.expression.expression.getText(sourceFile);
      if (
        decoratorName === "Component" &&
        decorator.expression.arguments.length > 0
      ) {
        const metadata = decorator.expression.arguments[0];
        if (ts.isObjectLiteralExpression(metadata)) {
          for (const prop of metadata.properties) {
            if (
              ts.isPropertyAssignment(prop) &&
              prop.name.getText(sourceFile) === "selector"
            ) {
              if (ts.isStringLiteral(prop.initializer)) {
                return prop.initializer.text;
              }
            }
          }
        }
      }
    }
  }
  return null;
}

/**
 * Extracts Input and Output properties from a component's class node.
 * @param {ts.ClassDeclaration} classNode The AST node for the component class.
 * @param {ts.SourceFile} sourceFile The source file for context.
 * @returns {{inputs: {name: string, type: string}[], outputs: {name: string, type: string}[]}}
 */
function extractInputsAndOutputs(classNode, sourceFile) {
  const inputs = [];
  const outputs = [];

  if (!classNode.members) {
    return { inputs, outputs };
  }

  for (const member of classNode.members) {
    // Check for PropertyDeclaration (most common) or SetAccessorDeclaration (for @Input() set myInput())
    if (
      ts.isPropertyDeclaration(member) ||
      ts.isSetAccessorDeclaration(member)
    ) {
      const decorators = ts.canHaveDecorators(member)
        ? ts.getDecorators(member)
        : undefined;
      if (!decorators || decorators.length === 0) {
        continue;
      }

      const propertyNameNode = member.name;
      if (!propertyNameNode) continue;
      const propertyName = propertyNameNode.getText(sourceFile);

      let propertyType = "any"; // Default type

      if (ts.isPropertyDeclaration(member) && member.type) {
        propertyType = member.type.getText(sourceFile).trim();
      } else if (
        ts.isSetAccessorDeclaration(member) &&
        member.parameters.length > 0 &&
        member.parameters[0].type
      ) {
        propertyType = member.parameters[0].type.getText(sourceFile).trim();
      }

      for (const decorator of decorators) {
        if (ts.isCallExpression(decorator.expression)) {
          const decoratorName =
            decorator.expression.expression.getText(sourceFile);
          if (decoratorName === "Input") {
            inputs.push({ name: propertyName, type: propertyType });
          } else if (decoratorName === "Output") {
            outputs.push({ name: propertyName, type: propertyType });
          }
        }
      }
    }
  }
  return { inputs, outputs };
}

/**
 * Extracts method signatures from a component's class node.
 * @param {ts.ClassDeclaration} classNode The AST node for the component class.
 * @param {ts.SourceFile} sourceFile The source file for context.
 * @returns {{name: string, parameters: {name: string, type: string}[], returnType: string}[]}
 */
function extractMethods(classNode, sourceFile) {
  const methods = [];

  if (!classNode.members) {
    return methods;
  }

  for (const member of classNode.members) {
    if (ts.isMethodDeclaration(member)) {
      // Skip constructors for this purpose
      if (member.name && member.name.getText(sourceFile) === "constructor") {
        continue;
      }

      const methodName = member.name
        ? member.name.getText(sourceFile)
        : "[AnonymousMethod]";

      const parameters = member.parameters.map((param) => {
        const paramName = param.name.getText(sourceFile);
        const paramType = param.type
          ? param.type.getText(sourceFile).trim()
          : "any";
        return { name: paramName, type: paramType };
      });

      const returnType = member.type
        ? member.type.getText(sourceFile).trim()
        : "any"; // Default to 'any' if not specified

      methods.push({
        name: methodName,
        parameters: parameters,
        returnType: returnType,
      });
    }
  }
  return methods;
}

// Main schema generation logic will go here.

/**
 * Generates a schema object for all components in the project directory.
 * @param {string} projectDir The root directory of the Angular project.
 * @returns {object} The generated schema object.
 */
function generateSchema(projectDir) {
  const projectSchema = {};
  const componentFiles = findComponentFiles(projectDir);

  if (componentFiles.length === 0) {
    // Log to stderr as this is an informational message not part of the schema output
    console.error(
      "Warning: No component files found in the project directory."
    );
    return projectSchema;
  }

  // Log progress to stderr
  console.error(
    `Found ${componentFiles.length} component files. Processing...`
  );

  for (const filePath of componentFiles) {
    const absoluteProjectDir = path.resolve(projectDir);
    const relativeFilePath = path
      .relative(absoluteProjectDir, filePath)
      .replace(/\\/g, "/");

    console.error(`Processing: ${relativeFilePath}`); // Log to stderr
    const sourceFile = parseTypeScriptFile(filePath);
    if (!sourceFile) {
      console.error(`  Skipping ${relativeFilePath} due to parsing error.`);
      continue;
    }

    let componentDataFoundInFile = false;
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isClassDeclaration(node) && node.name) {
        const decorators = ts.canHaveDecorators(node)
          ? ts.getDecorators(node)
          : undefined;
        const isComponent = (decorators || []).some(
          (decorator) =>
            ts.isCallExpression(decorator.expression) &&
            decorator.expression.expression.getText(sourceFile) === "Component"
        );

        if (isComponent) {
          componentDataFoundInFile = true;
          const componentName = node.name.getText(sourceFile);
          const actualSelector = getComponentSelector(node, sourceFile) || ""; // Default to empty string
          const { inputs: actualInputs, outputs: actualOutputs } =
            extractInputsAndOutputs(node, sourceFile);
          const actualMethods = extractMethods(node, sourceFile); // Call extractMethods

          projectSchema[relativeFilePath] = {
            selector: actualSelector,
            inputs: actualInputs,
            outputs: actualOutputs,
            methods: actualMethods, // Add methods to the schema object
          };
          console.error(
            `  Extracted schema for ${componentName} in ${relativeFilePath} (including methods)`
          );
        }
      }
    });
    if (!componentDataFoundInFile) {
      console.error(
        `  Warning: No Angular component class found or processed in ${relativeFilePath}.`
      );
    }
  }
  console.error(
    "Schema generation processing complete. Final JSON will be printed to stdout."
  ); // Log to stderr
  return projectSchema;
}

// CLI argument parsing will go here.
if (require.main === module) {
  if (process.argv.length < 3) {
    console.error("Usage: node scripts/generate-schema.js <project_directory>");
    console.error(
      "Example: node scripts/generate-schema.js ./my-angular-project > generated-schema.json"
    );
    process.exit(1);
  }

  const projectDirArg = process.argv[2];
  const projectDir = path.resolve(projectDirArg);

  if (!fs.existsSync(projectDir) || !fs.statSync(projectDir).isDirectory()) {
    console.error(
      `Error: Project directory does not exist or is not a directory: ${projectDir}`
    );
    process.exit(1);
  }

  const generatedSchema = generateSchema(projectDir);

  // Print the generated schema JSON to stdout
  // This allows redirection to a file, e.g., > scripts/template-schema.json
  console.log(JSON.stringify(generatedSchema, null, 2));
  fs.writeFileSync(
    path.join(__dirname, "template-schema.json"),
    JSON.stringify(generatedSchema, null, 2)
  );
}

// Export functions if you intend to require this module elsewhere (optional for this script)
module.exports = {
  generateSchema,
  findComponentFiles, // Exporting helpers too, might be useful
  parseTypeScriptFile,
  getComponentSelector,
  extractInputsAndOutputs,
  extractMethods, // Added new function
};
// console.log("Helper functions transferred to scripts/generate-schema.js.");
