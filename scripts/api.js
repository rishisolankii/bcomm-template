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
      // Instead of logging, we should return an error or an empty array and let the caller decide.
      // For now, returning an empty array to match original behavior of not throwing.
      return [];
    }
    return glob.sync(pattern, {
      cwd: absoluteProjectDir,
      absolute: true,
      nodir: true,
    });
  } catch (error) {
    // Similarly, avoid logging directly.
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

      let propertyType = "any";

      if (ts.isPropertyDeclaration(member) && member.type) {
        propertyType = member.type.getText(sourceFile).trim();
      } else if (
        ts.isSetAccessorDeclaration(member) &&
        member.parameters.length > 0 &&
        member.parameters[0].type
      ) {
        propertyType = member.parameters[0].type.getText(sourceFile).trim();
      } else if (ts.isPropertyDeclaration(member) && member.initializer && ts.isNewExpression(member.initializer)) {
        const initializer = member.initializer;
        if (initializer.expression.getText(sourceFile) === 'EventEmitter' && initializer.typeArguments) {
          propertyType = `EventEmitter<${initializer.typeArguments[0].getText(sourceFile)}>`;
        }
      }

      for (const decorator of decorators) {
        if (ts.isCallExpression(decorator.expression)) {
          const decoratorName =
            decorator.expression.expression.getText(sourceFile);
          if (decoratorName === "Input") {
            inputs.push({ name: propertyName, type: propertyType });
          } else if (decoratorName === "Output") {
            if (propertyType === 'any' && ts.isPropertyDeclaration(member) && member.initializer && ts.isNewExpression(member.initializer)) {
                const initializer = member.initializer;
                if (initializer.expression.getText(sourceFile) === 'EventEmitter' && initializer.typeArguments) {
                    propertyType = `EventEmitter<${initializer.typeArguments[0].getText(sourceFile)}>`;
                } else if (initializer.expression.getText(sourceFile) === 'EventEmitter') {
                    propertyType = 'EventEmitter<any>';
                }
            }
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
 * Main validation function for the API.
 * @param {string} projectDir Path to the Angular project.
 * @param {string} schemaPath Path to the template-schema.json file.
 * @returns {{errors: {file: string, message: string}[], warnings: {file: string, message: string}[], success: boolean}}
 */
function validate(projectDir, schemaPath) {
  let schema;
  try {
    const absoluteProjectDir = path.resolve(projectDir);
    if (!fs.existsSync(absoluteProjectDir) || !fs.statSync(absoluteProjectDir).isDirectory()) {
      return {
        errors: [{ file: projectDir, message: "Project directory does not exist or is not a directory." }],
        warnings: [],
        success: false,
      };
    }
    const absoluteSchemaPath = path.resolve(schemaPath);
     if (!fs.existsSync(absoluteSchemaPath) || fs.statSync(absoluteSchemaPath).isDirectory()) {
      return {
        errors: [{ file: schemaPath, message: "Schema file does not exist or is a directory." }],
        warnings: [],
        success: false,
      };
    }
    schema = JSON.parse(fs.readFileSync(absoluteSchemaPath, "utf8"));
  } catch (error) {
    return {
      errors: [{ file: schemaPath, message: `Error reading or parsing schema file: ${error.message}` }],
      warnings: [],
      success: false,
    };
  }

  const componentFiles = findComponentFiles(projectDir);
  const allErrors = [];
  const allWarnings = [];

  if (componentFiles.length === 0) {
    if (Object.keys(schema).length > 0) {
      allWarnings.push({
        file: projectDir,
        message: "Schema is not empty, but no component files were found in the project directory.",
      });
    }
    return { errors: allErrors, warnings: allWarnings, success: true };
  }

  for (const filePath of componentFiles) {
    const absoluteProjectDir = path.resolve(projectDir);
    const relativeFilePath = path.relative(absoluteProjectDir, filePath).replace(/\\/g, "/");

    const sourceFile = parseTypeScriptFile(filePath);
    if (!sourceFile) {
      allErrors.push({ file: relativeFilePath, message: "Failed to parse file." });
      continue;
    }

    const componentSchemaData = schema[relativeFilePath];
    if (!componentSchemaData) {
      allWarnings.push({ file: relativeFilePath, message: "No schema definition found for component." });
      continue;
    }

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isClassDeclaration(node) && node.name) {
        const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
        const isComponent = (decorators || []).some(
          (decorator) =>
            ts.isCallExpression(decorator.expression) &&
            decorator.expression.expression.getText(sourceFile) === "Component"
        );

        if (isComponent) {
          const actualSelector = getComponentSelector(node, sourceFile);
          const { inputs: actualInputs, outputs: actualOutputs } = extractInputsAndOutputs(node, sourceFile);
          const actualMethods = extractMethods(node, sourceFile);

          if (actualSelector !== componentSchemaData.selector) {
            allErrors.push({
              file: relativeFilePath,
              message: `Selector mismatch. Expected: '${componentSchemaData.selector}', Found: '${actualSelector}'`,
            });
          }

          (componentSchemaData.inputs || []).forEach((schemaInput) => {
            const actualInput = actualInputs.find((i) => i.name === schemaInput.name);
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
            }
          });
          actualInputs.forEach((actualInput) => {
            if (!(componentSchemaData.inputs || []).find((si) => si.name === actualInput.name)) {
              allWarnings.push({
                file: relativeFilePath,
                message: `Found new Input '${actualInput.name}: ${actualInput.type}' not defined in schema.`,
              });
            }
          });

          (componentSchemaData.outputs || []).forEach((schemaOutput) => {
            const actualOutput = actualOutputs.find((o) => o.name === schemaOutput.name);
            if (!actualOutput) {
              allErrors.push({
                file: relativeFilePath,
                message: `Output '${schemaOutput.name}' is missing. Expected type: '${schemaOutput.type}'.`,
              });
            } else if (actualOutput.type !== schemaOutput.type) {
              const normalizeEvType = (typeStr) => typeStr.replace(/EventEmitter<any>/g, "EventEmitter").replace(/\s/g, "");
              const schemaOutputTypeNorm = normalizeEvType(schemaOutput.type);
              const actualOutputTypeNorm = normalizeEvType(actualOutput.type);
              if (schemaOutputTypeNorm !== actualOutputTypeNorm) {
                allErrors.push({
                  file: relativeFilePath,
                  message: `Output '${schemaOutput.name}' type mismatch. Expected: '${schemaOutput.type}', Found: '${actualOutput.type}'.`,
                });
              }
            }
          });
          actualOutputs.forEach((actualOutput) => {
            if (!(componentSchemaData.outputs || []).find((so) => so.name === actualOutput.name)) {
              allWarnings.push({
                file: relativeFilePath,
                message: `Found new Output '${actualOutput.name}: ${actualOutput.type}' not defined in schema.`,
              });
            }
          });

          (componentSchemaData.methods || []).forEach((schemaMethod) => {
            const actualMethod = actualMethods.find((m) => m.name === schemaMethod.name);
            if (!actualMethod) {
              allErrors.push({
                file: relativeFilePath,
                message: `Method '${schemaMethod.name}' is missing.`,
              });
              return;
            }
            if (actualMethod.returnType !== schemaMethod.returnType) {
              allErrors.push({
                file: relativeFilePath,
                message: `Method '${schemaMethod.name}' return type mismatch. Expected: '${schemaMethod.returnType}', Found: '${actualMethod.returnType}'.`,
              });
            }
            if (actualMethod.parameters.length !== schemaMethod.parameters.length) {
              allErrors.push({
                file: relativeFilePath,
                message: `Method '${schemaMethod.name}' parameter count mismatch. Expected: ${schemaMethod.parameters.length}, Found: ${actualMethod.parameters.length}.`,
              });
              return;
            }
            schemaMethod.parameters.forEach((schemaParam, index) => {
              const actualParam = actualMethod.parameters[index];
              if (actualParam.name !== schemaParam.name || actualParam.type !== schemaParam.type) {
                allErrors.push({
                  file: relativeFilePath,
                  message: `Method '${schemaMethod.name}' parameter mismatch at index ${index}. Expected: '${schemaParam.name}: ${schemaParam.type}', Found: '${actualParam.name}: ${actualParam.type}'.`,
                });
              }
            });
          });

          actualMethods.forEach((actualMethod) => {
            if (!(componentSchemaData.methods || []).find((sm) => sm.name === actualMethod.name)) {
              allWarnings.push({
                file: relativeFilePath,
                message: `Found new Method '${actualMethod.name}' not defined in schema.`,
              });
            }
          });
        }
      }
    });
  }

  return { errors: allErrors, warnings: allWarnings, success: allErrors.length === 0 };
}

module.exports = { validate };
