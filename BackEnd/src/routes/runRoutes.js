const express = require('express');
const {runCode} = require('../Controllers/runCode');
const router = express.Router();

router.post("/", runCode)
module.exports = router;