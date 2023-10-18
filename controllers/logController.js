const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

// Fonction pour la connexion de l'utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche de l'utilisateur par e-mail
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrects' });
    }

    // Génération du JWT
    const token = jwt.sign({ userId: user._id }, 'clé_secrète', { expiresIn: '1h' });

    // Réponse avec le token
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la connexion' });
  }
};
