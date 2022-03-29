const express = require("express")
const router = express.Router();
const fs = require('fs');
const libraryRoutes = require('./library.js')

router.use(libraryRoutes)
module.exports = router;