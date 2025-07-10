const express = require('express');
const {statusController} = require('../Controllers/statusController');
const router = express.Router();

router.get("/", statusController)
module.exports = router;