const fs = require('fs');
const path = require('path');
const { v4: uuid } = require("uuid");

// 👇 STEP 1: Log where __dirname is pointing
console.log("📁 generateFile.js __dirname:", __dirname);

// 👇 STEP 2: Move 2 folders up to project root (adjust if needed)
const dirCodes = path.join(__dirname, "..", "..", "codes");
console.log("📂 Target codes directory:", dirCodes);

// 👇 STEP 3: Create codes folder if not exists
if (!fs.existsSync(dirCodes)) {
    console.log("📁 'codes' folder does not exist. Creating...");
    fs.mkdirSync(dirCodes, { recursive: true });
} else {
    console.log("✅ 'codes' folder exists");
}

const generateFile = async (format, content) => {
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, filename);

    console.log("📄 Final file path to be written:", filepath);
    console.log("📦 File content:\n", content);

    try {
        await fs.promises.writeFile(filepath, content);
        console.log("✅ File written successfully at:", filepath);
        return filepath;
    } catch (err) {
        console.error("❌ Error writing file:", err.message);
        throw err;
    }
};

module.exports = { generateFile };






// const fs = require('fs');
// const path =require('path');
// const{v4:uuid} = require("uuid");

// const dirCodes = path.join(__dirname, "codes");
// if(!fs.existsSync(dirCodes)){
//     fs.mkdirSync(dirCodes,{recursive:true});
// }


// const generateFile= async(format, content)=>{

//     //create  a uuid for each file
//     const jobId = uuid();
//     const filename = `${jobId}.${format}`
//     //create a file path
//     const filepath = path.join(dirCodes, filename);
//     //write a content in this file
//     await fs.writeFileSync(filepath, content);
//     return filepath;

    
// };

// module.exports ={
//     generateFile

// };

