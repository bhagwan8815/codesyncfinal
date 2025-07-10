const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Output directory
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJs = (filepath) => {
  return new Promise((resolve, reject) => {
    // Run the JavaScript file using Node.js
    const command = `node "${filepath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject({ error: error.message, stderr });
      }

      if (stderr) {
        return reject({ stderr });
      }

      resolve(stdout);
    });
  });
};

module.exports = { executeJs };
