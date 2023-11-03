const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     description: Authentifie un utilisateur en vérifiant l'e-mail et le mot de passe, puis renvoie un jeton d'accès.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse e-mail de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Connexion réussie - Renvoie un jeton d'accès.
 *       401:
 *         description: Échec de la connexion - Identifiants incorrects.
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la connexion.
 */

router.post('/login', logController.login);

module.exports = router;
