const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");
const runRoutes = require("./routes/runRoutes")
const statusRoutes = require('./routes/statusRoutes')
const Job = require("./models/Job");
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(" Successfully Connected to MongoDB"))
.catch((error) => {
    console.error(" MongoDB Connection Error:", error.message);
    process.exit(1);
});

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});



app.use("/ai", aiRoutes);
app.use("/run", runRoutes)
app.use('/status', statusRoutes)

module.exports = app;

// app.get("/status", async (req, res) => {
//     const jobId = req.query.id;
//     if (!jobId) {
//         return res.status(400).json({ success: false, error: "Missing job ID" });
//     }

//     try {
//         const job = await Job.findById(jobId);
//         if (!job) {
//             return res.status(404).json({ success: false, error: "Invalid Job ID" });
//         }
//         return res.status(200).json({ success: true, job });
//     } catch (err) {
//         return res.status(500).json({ success: false, error: JSON.stringify(err) });
//     }
// });

// app.post("/run", async (req, res) => {
//     const { language, code } = req.body;

//     if (!code) {
//         return res.status(400).json({ success: false, error: "Empty code body!" });
//     }

//     let job;
//     try {
//         const filepath = await generateFile(language, code);
//         job = await new Job({ language, filepath }).save();
//         res.status(201).json({ success: true, jobId: job._id });

//         job.startedAt = new Date();

//         let output;
//         switch (language) {
//             case "cpp": output = await executeCpp(filepath); break;
//             case "py": output = await executePy(filepath); break;
//             case "java": output = await executeJava(filepath); break;
//             default: output = await executeJs(filepath);
//         }

//         job.completedAt = new Date();
//         job.status = "success";
//         job.output = output;
//         await job.save();
//     } catch (err) {
//         if (job) {
//             job.completedAt = new Date();
//             job.status = "error";
//             job.output = JSON.stringify(err);
//             await job.save();
//         }
//     }
// });






// const express = require("express");
// const mongoose = require("mongoose");
// const aiRoutes = require("./routes/ai.routes");
// const cors = require("cors");
// const { generateFile } = require("./services/generateFile");
// const { executeCpp } = require("./services/executeCpp");
// const { executePy } = require("./services/executePy");
// const { executeJava } = require("./services/executeJava");
// const { executeJs } = require("./services/executeJs");


// const Job = require("./models/Job");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/codesyncdatabase", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log(" Successfully Connected to the Database"))
//   .catch((error) => {
//     console.log("Issue in DB Connection");
//     console.error(error.message);
//     //iska matlab kya h ? -->ans -if koi error aati he to program exit ho jayega with 1 ,
//     process.exit(1);
//   });

// const app = express();
// app.use(express.urlencoded({ extended: true })); //for send post data in the form of json
// app.use(express.json());
// app.use(express.json()); //if we not use this it gives error like this ReferenceError: exp is not defined
// app.use(cors());

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

// //check route
// app.get("/", (req, res) => {
//   res.send("Hello world:");
// });

// app.get("/status", async(req, res) =>{
//     const jobId = req.query.id;
//     console.log("status requested : " + jobId);

//     if(jobId == undefined){
//         return res.status(400).json({
//             success:false, error: "missing id query "
//         })
//     };
//    // console.log(jobId);
//    try{
//   const job = await Job.findById(jobId);

//   if(job===undefined){
//     return res.status(404).json({success:false, error: "invalid job id"});
//   }
//   return res.status(200).json({job});
//    }catch(err){
//    return res.status(400).json({success:false, error: JSON.stringify(err)});
//    }
// })

// app.post("/run", async (req, res) => {
//   //    const language = req.body.language;
//   //    const code = req.body.code;

//   const { language, code } = req.body; //if you dont get any language the default value is cpp
//   console.log("language is :" + language, code.length);
//   if (code === undefined) {
//     return res.status(400).json({
//       suceess: false,
//       error: "Empty code body!",
//     });
//   }
// let job;
//   try {
//     //we need to generate a c++ file with content from the requesst
//     const filepath = await generateFile(language, code);

//     job = await new Job({ language, filepath }).save();
//     const jobId = job["_id"];
//     console.log(job);
//     res.status(201).json({ success: true, jobId });

//     //console.log("filepath is as follow :"+ filepath);
//     //we need to run the file and send the response
//     let output;
//     job["startedAt"] = new Date();
//     if (language === "cpp") {
//       output = await executeCpp(filepath);
//       console.log("output is " + output);
//     } else if (language === "py") {
//       output = await executePy(filepath);
//       console.log("output is " + output);
//     } else if (language === "java") {
//       output = await executeJava(filepath);
//     } else {
//       output = await executeJs(filepath);
//     }

//     job["completedAt"] = new Date();
//     job["status"] = "success";
//     job["output"] = output;
//     await job.save();
//     console.log("job  is as follow :" + job);
//     //    return res.json({filepath, output});
//   } catch (err) {
//  job["completedAt"] = new Date();
//  job["status"] = "error";
//  job["output"] = JSON.stringify(err);
//  await job.save();
//  console.log(job);
//   }
// });

// app.use("/ai", aiRoutes);
// module.exports = app;













// const express = require("express");
// const mongoose = require("mongoose");
// const aiRoutes = require("./routes/ai.routes");
// const cors = require("cors");
// const { generateFile } = require("./services/generateFile");
// const { executeCpp } = require("./services/executeCpp");
// const { executePy } = require("./services/executePy");
// const Job = require("./models/Job");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/codesyncdatabase", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log(" Successfully Connected to the Database"))
//   .catch((error) => {
//     console.log("Issue in DB Connection");
//     console.error(error.message);
//     //iska matlab kya h ? -->ans -if koi error aati he to program exit ho jayega with 1 ,
//     process.exit(1);
//   });

// const app = express();
// app.use(express.urlencoded({ extended: true })); //for send post data in the form of json
// app.use(express.json());
// app.use(express.json()); //if we not use this it gives error like this ReferenceError: exp is not defined
// app.use(cors());

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

// //check route
// app.get("/", (req, res) => {
//   res.send("Hello world:");
// });

// app.get("/status", async(req, res) =>{
//     const jobId = req.query.id;
//     console.log("status requested : " + jobId);

//     if(jobId == undefined){
//         return res.status(400).json({
//             success:false, error: "missing id query "
//         })
//     };
//    // console.log(jobId);
//    try{
//   const job = await Job.findById(jobId);

//   if(job===undefined){
//     return res.status(404).json({success:false, error: "invalid job id"});
//   }
//   return res.status(200).json({job});
//    }catch(err){
//    return res.status(400).json({success:false, error: JSON.stringify(err)});
//    }
// })

// app.post("/run", async (req, res) => {
//   //    const language = req.body.language;
//   //    const code = req.body.code;

//   const { language, code } = req.body; //if you dont get any language the default value is cpp
//   console.log("language is :" + language, code.length);
//   if (code === undefined) {
//     return res.status(400).json({
//       suceess: false,
//       error: "Empty code body!",
//     });
//   }
// let job;
//   try {
//     //we need to generate a c++ file with content from the requesst
//     const filepath = await generateFile(language, code);

//     job = await new Job({ language, filepath }).save();
//     const jobId = job["_id"];
//     console.log(job);
//     res.status(201).json({ success: true, jobId });

//     //console.log("filepath is as follow :"+ filepath);
//     //we need to run the file and send the response
//     let output;
//     job["startedAt"] = new Date();
//     if (language === "cpp") {
//       output = await executeCpp(filepath);
//       console.log("output is " + output);
//     } else if (language === "py") {
//       output = await executePy(filepath);
//       console.log("output is " + output);
//     } else if (language === "java") {
//       output = await executeJava(filepath);
//     } else {
//       output = await executeJs(filepath);
//     }

//     job["completedAt"] = new Date();
//     job["status"] = "success";
//     job["output"] = output;
//     await job.save();
//     console.log("job  is as follow :" + job);
//     //    return res.json({filepath, output});
//   } catch (err) {
//  job["completedAt"] = new Date();
//  job["status"] = "error";
//  job["output"] = JSON.stringify(err);
//  await job.save();
//  console.log(job);
//   }
// });

// app.use("/ai", aiRoutes);
// module.exports = app;
