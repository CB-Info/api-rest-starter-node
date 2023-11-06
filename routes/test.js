const express = require('express');
const router = express.Router();
//const authController = require('../controllers/test')

router.get("/", (req, res) => {
    return res.send({
        status: "Healthy",
    });
})

module.exports = router;
