const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer la liste des utilisateurs
 *     description: Récupère la liste complète des utilisateurs.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: If-None-Match
 *         required: false
 *         schema:
 *           type: string
 *         description: ETag pour le cache.
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/users', authenticateUser, userController.getUsers);

/**
* @swagger
* /api/users:
*   post:
*     summary: Créer un nouvel utilisateur
*     description: Crée un nouvel utilisateur.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 description: Le nom de l'utilisateur.
*               email:
*                 type: string
*                 description: L'adresse e-mail de l'utilisateur.
*               password:
*                 type: string
*                 description: Le mot de passe de l'utilisateur.
*             required:
*               - name
*               - email
*               - password
*     responses:
*       201:
*         description: Utilisateur créé avec succès.
*       400:
*         description: Mauvaise demande - Certains champs requis sont manquants.
*       500:
*         description: Erreur serveur - Une erreur s'est produite lors de la création de l'utilisateur.
*/
router.post('/users', userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur par ID
 *     description: Met à jour un utilisateur existant en fonction de son ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nouveau nom de l'utilisateur.
 *               email:
 *                 type: string
 *                 description: La nouvelle adresse e-mail de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Le nouveau mot de passe de l'utilisateur.
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Mauvaise demande - L'ID de l'utilisateur est invalide ou le mot de passe ne répond pas aux critères de complexité.
 *       404:
 *         description: Utilisateur introuvable - L'ID de l'utilisateur n'existe pas dans la base de données.
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la mise à jour de l'utilisateur.
 */
router.put('/users/:id', authenticateUser, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par ID
 *     description: Supprime un utilisateur existant en fonction de son ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à supprimer.
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       400:
 *         description: Mauvaise demande - L'ID de l'utilisateur est invalide.
 *       404:
 *         description: Utilisateur introuvable - L'ID de l'utilisateur n'existe pas dans la base de données.
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la suppression de l'utilisateur.
 */
router.delete('/users/:id', authenticateUser, userController.deleteUser);

module.exports = router;

