const { refreshToken } = require('firebase-admin/app');
const jwt = require('jsonwebtoken');

// Middleware d'authentification
const authenticateUser = (req, res, next) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Accès non autorisé' });
  }

  try {
    const token = authorizationHeader.split('Bearer ')[1]; // Extraction du token
    const decoded = jwt.verify(token, 'clé_secrète');
    req.user = decoded; // Ajouter les informations de l'utilisateur à la demande
    next();
  } catch (error) {
    console.log(authorizationHeader);
    res.status(401).json({ error: 'Token invalide' });
  }
};


module.exports = authenticateUser;
