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
        : "any";

      methods.push({
        name: methodName,
        parameters: parameters,
        returnType: returnType,
      });
    }
  }
  return methods;
}

/**
 * Main validation function.
 * @param {string} projectDir Path to the Angular project.
 * @param {string} schemaPath Path to the template-schema.json file.
 */
function validateProject(projectDir, schemaPath) {
  console.log(`Starting validation for project: ${projectDir}`);
  console.log(`Using schema: ${schemaPath}`);

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  } catch (error) {
    console.error(
      `Error reading or parsing schema file ${schemaPath}: ${error.message}`
    );
    process.exit(1);
  }

  const componentFiles = findComponentFiles(projectDir);
  if (componentFiles.length === 0) {
    console.log("No component files found to validate.");
    if (Object.keys(schema).length > 0) {
      console.warn(
        "Warning: Schema is not empty, but no component files were found in the project directory."
      );
    }
    return;
  }

  console.log(`Found ${componentFiles.length} component files.`);
  let allErrors = [];

  for (const filePath of componentFiles) {
    const absoluteProjectDir = path.resolve(projectDir);
    const relativeFilePath = path
      .relative(absoluteProjectDir, filePath)
      .replace(/\\/g, "/");

    console.log(`\nProcessing: ${filePath} (schema key: ${relativeFilePath})`);
    const sourceFile = parseTypeScriptFile(filePath);
    if (!sourceFile) {
      allErrors.push({
        file: relativeFilePath,
        message: "Failed to parse file.",
      });
      continue;
    }

    const componentSchemaData = schema[relativeFilePath];
    if (!componentSchemaData) {
      console.warn(
        `  Warning: No schema definition found for component: ${relativeFilePath}. Skipping validation for this file.`
      );
      continue;
    }

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isClassDeclaration(node) && node.name) {
        const className = node.name.getText(sourceFile);

        const decorators = ts.canHaveDecorators(node)
          ? ts.getDecorators(node)
          : undefined;
        const isComponent = (decorators || []).some(
          (decorator) =>
            ts.isCallExpression(decorator.expression) &&
            decorator.expression.expression.getText(sourceFile) === "Component"
        );

        if (isComponent) {
          console.log(`  Component Class: ${className}`);
          const actualSelector = getComponentSelector(node, sourceFile);
          const { inputs: actualInputs, outputs: actualOutputs } =
            extractInputsAndOutputs(node, sourceFile);
          const actualMethods = extractMethods(node, sourceFile);

          // Defensive check, this was the point of the previous failed update
          if (!componentSchemaData) {
            allErrors.push({
              file: relativeFilePath,
              message: `Internal Error: Schema data unexpectedly missing for ${relativeFilePath} during component processing. This should have been caught by the check before ts.forEachChild.`,
            });
            return; // from forEachChild's callback for this specific node
          }

          // --- Selector Validation ---
          if (actualSelector !== componentSchemaData.selector) {
            allErrors.push({
              file: relativeFilePath,
              message: `Selector mismatch. Expected: '${componentSchemaData.selector}', Found: '${actualSelector}'`,
            });
          } else {
            console.log(`    Selector: '${actualSelector}' (Matches schema)`);
          }

          // --- Input Validation ---
          console.log("    Validating Inputs...");
          (componentSchemaData.inputs || []).forEach((schemaInput) => {
            const actualInput = actualInputs.find(
              (i) => i.name === schemaInput.name
            );
            if (!actualInput) {
              allErrors.push({
                file: relativeFilePath,
                message: `Input '${schemaInput.name}' is missing. Expected type: '${schemaInput.type}'.`,
              });
            } else if (actualInput.type !== schemaInput.type) {
              allErrors.push({
                file: relativeFilePath,
                message: `Input '${schemaInput.name}' type mismatch. Expected: '${schemaInput.type}', Found: '${actualInput.type}'.`,
              });
            } else {
              console.log(
                `      - Input '${schemaInput.name}: ${schemaInput.type}' (Matches schema)`
              );
            }
          });
          actualInputs.forEach((actualInput) => {
            if (
              !(componentSchemaData.inputs || []).find(
                (si) => si.name === actualInput.name
              )
            ) {
              console.warn(
                `      - Warning: Found new Input '${actualInput.name}: ${actualInput.type}' not defined in schema for ${relativeFilePath}.`
              );
            }
          });

          // --- Output Validation ---
          console.log("    Validating Outputs...");
          (componentSchemaData.outputs || []).forEach((schemaOutput) => {
            const actualOutput = actualOutputs.find(
              (o) => o.name === schemaOutput.name
            );
            if (!actualOutput) {
              allErrors.push({
                file: relativeFilePath,
                message: `Output '${schemaOutput.name}' is missing. Expected type: '${schemaOutput.type}'.`,
              });
            } else if (actualOutput.type !== schemaOutput.type) {
              const normalizeEvType = (typeStr) =>
                typeStr
                  .replace(/EventEmitter<any>/g, "EventEmitter")
                  .replace(/\s/g, "");
              const schemaOutputTypeNorm = normalizeEvType(schemaOutput.type);
              const actualOutputTypeNorm = normalizeEvType(actualOutput.type);

              if (schemaOutputTypeNorm !== actualOutputTypeNorm) {
                allErrors.push({
                  file: relativeFilePath,
                  message: `Output '${schemaOutput.name}' type mismatch. Expected: '${schemaOutput.type}', Found: '${actualOutput.type}'.`,
                });
              } else {
                console.log(
                  `      - Output '${schemaOutput.name}: ${schemaOutput.type}' (Matches schema, normalized)`
                );
              }
            } else {
              console.log(
                `      - Output '${schemaOutput.name}: ${schemaOutput.type}' (Matches schema)`
              );
            }
          });
          actualOutputs.forEach((actualOutput) => {
            if (
              !(componentSchemaData.outputs || []).find(
                (so) => so.name === actualOutput.name
              )
            ) {
              console.warn(
                `      - Warning: Found new Output '${actualOutput.name}: ${actualOutput.type}' not defined in schema for ${relativeFilePath}.`
              );
            }
          });

          // --- Method Validation ---
          console.log("    Validating Methods...");
          (componentSchemaData.methods || []).forEach((schemaMethod) => {
            const actualMethod = actualMethods.find(
              (m) => m.name === schemaMethod.name
            );
            if (!actualMethod) {
              allErrors.push({
                file: relativeFilePath,
                message: `Method '${schemaMethod.name}' is missing.`,
              });
              return;
            }

            // Validate return type
            if (actualMethod.returnType !== schemaMethod.returnType) {
              allErrors.push({
                file: relativeFilePath,
                message: `Method '${schemaMethod.name}' return type mismatch. Expected: '${schemaMethod.returnType}', Found: '${actualMethod.returnType}'.`,
              });
            }

            // Validate parameter counts
            if (
              actualMethod.parameters.length !==
              schemaMethod.parameters.length
            ) {
              allErrors.push({
                file: relativeFilePath,
                message: `Method '${schemaMethod.name}' parameter count mismatch. Expected: ${schemaMethod.parameters.length}, Found: ${actualMethod.parameters.length}.`,
              });
              return; // Skip further param checks if counts differ
            }

            // Validate individual parameters
            schemaMethod.parameters.forEach((schemaParam, index) => {
              const actualParam = actualMethod.parameters[index];
              if (
                actualParam.name !== schemaParam.name ||
                actualParam.type !== schemaParam.type
              ) {
                allErrors.push({
                  file: relativeFilePath,
                  message: `Method '${schemaMethod.name}' parameter mismatch at index ${index}. Expected: '${schemaParam.name}: ${schemaParam.type}', Found: '${actualParam.name}: ${actualParam.type}'.`,
                });
              }
            });
            console.log(
              `      - Method '${schemaMethod.name}' (Matches schema)`
            );
          });

          actualMethods.forEach((actualMethod) => {
            if (
              !(componentSchemaData.methods || []).find(
                (sm) => sm.name === actualMethod.name
              )
            ) {
              console.warn(
                `      - Warning: Found new Method '${actualMethod.name}' not defined in schema for ${relativeFilePath}.`
              );
            }
          });
        }
      }
    });
  }

  if (allErrors.length > 0) {
    console.error(`\nValidation Failed: Found ${allErrors.length} error(s).`);
    allErrors.forEach((err) => {
      console.error(`ERROR: [${err.file}] ${err.message}`);
    });
    process.exit(1);
  } else {
    console.log(
      "\nValidation Successful: All checked components align with the schema."
    );
  }
}

if (require.main === module) {
  if (process.argv.length < 4) {
    console.log(
      "Usage: node scripts/validate-template.js <project_directory> <schema_path>"
    );
    console.log(
      "Example: node scripts/validate-template.js ./my-angular-project ./scripts/template-schema.json"
    );
    process.exit(1);
  }
  const projectDirArg = process.argv[2];
  const schemaPathArg = process.argv[3];

  const projectDir = path.resolve(projectDirArg);
  const schemaPath = path.resolve(schemaPathArg);

  if (!fs.existsSync(projectDir) || !fs.statSync(projectDir).isDirectory()) {
    console.error(
      `Error: Project directory does not exist or is not a directory: ${projectDir}`
    );
    process.exit(1);
  }
  if (!fs.existsSync(schemaPath) || fs.statSync(schemaPath).isDirectory()) {
    console.error(
      `Error: Schema file does not exist or is a directory: ${schemaPath}`
    );
    process.exit(1);
  }

  validateProject(projectDir, schemaPath);
}

module.exports = {
  findComponentFiles,
  parseTypeScriptFile,
  getComponentSelector,
  extractInputsAndOutputs,
  extractMethods,
  validateProject,
};
