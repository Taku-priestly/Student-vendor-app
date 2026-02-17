const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Communication Service API',
      version: '1.0.0',
      description: 'API for managing calls and communication',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api`,
        description: 'Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        CallRequest: {
          type: 'object',
          required: ['receiverId', 'receiverType'],
          properties: {
            receiverId: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            receiverType: {
              type: 'string',
              enum: ['student', 'tutor', 'admin'],
              example: 'tutor'
            },
            receiverName: {
              type: 'string',
              example: 'John Doe'
            },
            callType: {
              type: 'string',
              enum: ['audio', 'video'],
              default: 'audio'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Calls',
        description: 'Call management endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin: 20px 0; }
    `,
    customSiteTitle: 'Communication Service API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    }
  }));
  
  console.log('✅ Swagger documentation available at /api-docs');
};

module.exports = { setupSwagger };