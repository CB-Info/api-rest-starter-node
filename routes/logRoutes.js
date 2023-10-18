const express = require('express');
const router = express.Router();
const userController = require('../controllers/logController');

// Route de connexion
router.post('/login', userController.login);

module.exports = router;
