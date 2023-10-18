const morgan = require("morgan");
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    authMiddleware = require('./middlewares/auth'),
    //authRoutes = require('./routes/auth'),
    authenticateUser = require('./middlewares/authMiddleware'),
    testRoutes = require('./routes/test'),
    userRoutes = require('./routes/userRoutes'),
    logRoutes = require('./routes/logRoutes')
    connectionMongoDB = require('./mongoDB/connection'),
    app = express();

connectionMongoDB()

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

//app.use('/api/auth', authMiddleware, authRoutes);
app.use('/', testRoutes);
app.use('/', logRoutes);
app.use('/api', authenticateUser, userRoutes);

// Gestionnaire d'erreur pour les routes non trouvées
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

module.exports = app;