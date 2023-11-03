const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Importez la configuration Swagger

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;