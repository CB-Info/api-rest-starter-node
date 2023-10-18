const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Récupérer la liste des utilisateurs
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé dans la base de données.' });
        }

        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des utilisateurs.' });
    }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        const { name, email, password /* autres champs */ } = req.body;

        // Vérifiez si les champs requis sont fournis
        if (!name || !email || !password) {
            const missingFields = [];
            if (!name) missingFields.push('name');
            if (!email) missingFields.push('email');
            if (!password) missingFields.push('password');

            return res.status(400).json({ error: `Champs manquants : ${missingFields.join(', ')}` });
        }

        // Vérifiez la complexité du mot de passe
        if (!isStrongPassword(password)) {
            return res.status(400).json({ error: `Le mot de passe ne répond pas aux critères de complexité. Le mot de passe doit contenir au moins : 8 caractères, une majuscule, un chiffre et un symbole.`});
        }
        
        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
        }

        // Créez un nouvel utilisateur
        const newUser = new User({ name, email, password /* autres champs */ });
        await newUser.save();
        
        return res.status(201).json(newUser); // Renvoie le nouvel utilisateur créé
    } catch (error) {
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur.' });
    }
};

// Mettre à jour un utilisateur par ID
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête
        const updates = req.body; // Les modifications à apporter

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'ID d\'utilisateur invalide.' });
        }

        // Si le mot de passe est inclus dans les mises à jour, vérifiez et hachez-le
        if (updates.password) {
            try {
                if (!isStrongPassword(updates.password)) {
                    return res.status(400).json({ error: `Le mot de passe ne répond pas aux critères de complexité. Le mot de passe doit contenir au moins : 8 caractères, une majuscule, un chiffre et un symbole.`});
                }
                const saltRounds = 10;
                updates.password = await bcrypt.hash(updates.password, saltRounds);
            } catch (error) {
                return res.status(400).json({ error: error.message });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'Utilisateur introuvable.' });
        }

        return res.json(updatedUser);
    } catch (error) {
        console.log(error); // Afficher l'erreur dans la console
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.' });
    }
};

// Supprimer un utilisateur par ID
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'ID d\'utilisateur invalide.' });
        }

        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Utilisateur introuvable.' });
        }

        return res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        console.log(error); // Afficher l'erreur dans la console
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de l\'utilisateur.' });
    }
};

// Fonction pour valider la complexité du mot de passe
function isStrongPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    return passwordRegex.test(password);
}