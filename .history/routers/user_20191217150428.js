const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.get('/test', (req, res) => {
    res.send("swdfgthj")
})

module.exports = router