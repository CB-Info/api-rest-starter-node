const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Récupérer la liste des utilisateurs
router.get('/users', userController.getUsers);

// Créer un nouvel utilisateur
router.post('/users', userController.createUser);

// Mettre à jour un utilisateur par ID
router.put('/users/:id', userController.updateUser);

// Supprimer un utilisateur par ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
