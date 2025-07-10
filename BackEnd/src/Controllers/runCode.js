const { generateFile } = require('./generateFile'); 
const { executeCpp } = require('./executeCpp')
const { executePy }= require('./executePy')
const { executeJava }= require('./executeJava')
const { executeJs }  = require('./executeJs')
const Job = require('../models/Job')

module.exports.runCode = async(req, res)=>{
    const { language, code } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }
    console.log("the language is :", language);
    console.log("the code is :", code);
    let job;
    try {
        const filepath = await generateFile(language, code);
        console.log("the filepath is ", filepath)
        job = await new Job({ language, filepath }).save();
        console.log("the job is ", job)
        res.status(201).json({ success: true, jobId: job._id });

        job.startedAt = new Date();
        

        let output;
        switch (language) {
            case "cpp": output = await executeCpp(filepath); break;
            case "py": output = await executePy(filepath); break;
            case "java": output = await executeJava(filepath); break;
            default: output = await executeJs(filepath);
        }

        job.completedAt = new Date();
        job.status = "success";
        job.output = output;
        await job.save();
    } catch (err) {
        console.log("error in /run controller ", err)
        if (job) {
            job.completedAt = new Date();
            job.status = "error";
            job.output = JSON.stringify(err);
            await job.save();
        }
    }
};