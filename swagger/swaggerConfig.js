const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'STARTER API-REST',
            version: '1.0.0',
            description: 'Documentation de mon API REST',
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                },
            },
        },
    },
    apis: ['routes/*.js'], // Remplacez ceci par le chemin de vos fichiers de route
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
