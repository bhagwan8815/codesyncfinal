const Job = require("../models/Job");

module.exports.statusController = async(req, res)=>{
    const jobId = req.query.id;
    console.log("job id is :", jobId)
    if (!jobId) {
        return res.status(400).json({ success: false, error: "Missing job ID" });
    }

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, error: "Invalid Job ID" });
        }
        return res.status(200).json({ success: true, job });
    } catch (err) {
        return res.status(500).json({ success: false, error: JSON.stringify(err) });
    }
};