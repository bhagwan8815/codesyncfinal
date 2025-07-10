const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");
console.log("The output path is:", outputPath);

// Create the outputs directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const sanitizeClassName = (jobId) => {
  return "Java_" + jobId.replace(/[^a-zA-Z0-9]/g, "_");
};

const executeJava = (filepath) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filepath, ".java");
    const className = sanitizeClassName(jobId);

    // Read original code
    let code = fs.readFileSync(filepath, "utf-8");

    // Replace CLASS_NAME placeholder with actual className
    code = code.replace(/public\s+class\s+Example/, `public class ${className}`);

    // Rename the file to match the class name
    const newFileName = `${className}.java`;
    const newFilePath = path.join(path.dirname(filepath), newFileName);

    // Write updated code to new file
    fs.writeFileSync(newFilePath, code);

    // Compile and run
    const compileCommand = `javac "${newFilePath}" -d "${outputPath}"`;
    const runCommand = `java -cp "${outputPath}" ${className}`;

    exec(compileCommand, (compileError, _, compileStderr) => {
      if (compileError) {
        return reject({ error: compileStderr || compileError.message });
      }

      exec(runCommand, (runError, stdout, runStderr) => {
        if (runError) {
          return reject({ error: runStderr || runError.message });
        }

        resolve(stdout);
      });
    });
  });
};

module.exports = { executeJava };










// const { exec } = require("child_process");
// const fs = require("fs");
// const path = require("path");

// const outputPath = path.join(__dirname, "outputs");
// console.log("The output path is:", outputPath);

// // Create the outputs directory if it doesn't exist
// if (!fs.existsSync(outputPath)) {
//   fs.mkdirSync(outputPath, { recursive: true });
// }

// // Function to make class name valid in Java (no dashes, only letters/numbers/underscores)
// const sanitizeClassName = (jobId) => {
//   return "Java_" + jobId.replace(/[^a-zA-Z0-9]/g, "_");
// };

// const executeJava = (filepath) => {
//   return new Promise((resolve, reject) => {
//     const jobId = path.basename(filepath, ".java");
//     const className = sanitizeClassName(jobId);

//     // Step 1: Read Java code from file
//     let code = fs.readFileSync(filepath, "utf-8");

//     // Step 2: Replace `public class CLASS_NAME` with actual className
//     code = code.replace(/public\s+class\s+CLASS_NAME/, `public class ${className}`);

//     // Step 3: Overwrite the file with correct class name
//     fs.writeFileSync(filepath, code);

//     // Compile and run Java code
//     const compileCommand = `javac "${filepath}" -d "${outputPath}"`;
//     const runCommand = `java -cp "${outputPath}" ${className}`;

//     // Step 4: Compile
//     exec(compileCommand, (compileError, _, compileStderr) => {
//       if (compileError) {
//         return reject({ error: compileStderr || compileError.message });
//       }

//       // Step 5: Run
//       exec(runCommand, (runError, stdout, runStderr) => {
//         if (runError) {
//           return reject({ error: runStderr || runError.message });
//         }

//         resolve(stdout);
//       });
//     });
//   });
// };

// module.exports = { executeJava };










