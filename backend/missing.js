const fs = require('fs');
const path = require('path');

const filesToCreate = {
  // Config files
  'src/config/database.js': `module.exports = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/communication-service',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
};`,
  
  'src/config/swagger.js': `const swaggerJsdoc = require('swagger-jsdoc');
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
        url: \`http://localhost:\${process.env.PORT || 3000}/api\`,
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
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log('✅ Swagger documentation available at /api-docs');
};

module.exports = { setupSwagger };`,
  
  // Routes file
  'src/routes/callRoutes.js': `const express = require('express');
const router = express.Router();
const CallController = require('../controllers/CallController');
const { authenticate } = require('../middleware/auth');

router.post('/initiate', authenticate, CallController.initiateCall);
router.patch('/:callId/status', authenticate, CallController.updateCallStatus);
router.get('/history', authenticate, CallController.getCallHistory);

module.exports = router;`,
  
  // Middleware files
  'src/middleware/auth.js': `// Mock authentication for testing
const authenticate = (req, res, next) => {
  req.user = {
    userId: 'test-user-id-123',
    userType: 'tutor',
    userName: 'Test User'
  };
  next();
};

module.exports = { authenticate };`,
  
  'src/middleware/errorHandler.js': `const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);
  
  // Default error response
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;`,
  
  // Models file
  'src/models/CallLog.js': `const mongoose = require('mongoose');

const callLogSchema = new mongoose.Schema({
  callerId: {
    type: String,
    required: true
  },
  callerType: {
    type: String,
    required: true,
    enum: ['student', 'tutor', 'admin']
  },
  receiverId: {
    type: String,
    required: true
  },
  receiverType: {
    type: String,
    required: true,
    enum: ['student', 'tutor', 'admin']
  },
  callType: {
    type: String,
    enum: ['audio', 'video'],
    default: 'audio'
  },
  status: {
    type: String,
    enum: ['initiated', 'accepted', 'ongoing', 'completed', 'missed', 'rejected'],
    default: 'initiated'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const CallLog = mongoose.model('CallLog', callLogSchema);

module.exports = CallLog;`
};

// Create files
Object.entries(filesToCreate).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  const dir = path.dirname(fullPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create file if it doesn't exist
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Created: ${filePath}`);
  } else {
    console.log(`⚠️ Already exists: ${filePath}`);
  }
});

console.log('\n🎉 All required files have been created!');
console.log('Now run: node server.js');