# Development Setup Guide

This guide will help you set up a local development environment for the Dara project.

## 🛠️ Prerequisites

### Required Software
- **Node.js** (v20.0.0 or higher)
- **npm** (v10.0.0 or higher) or **yarn**
- **Git** (latest version)
- **Code Editor** (VS Code recommended)

### Optional Tools
- **Docker** (for containerized development)
- **Postman** or **Insomnia** (for API testing)
- **MongoDB Compass** (if using MongoDB in future)

## 📥 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/oovaa/dara.git
cd dara
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# AI Service Configuration
API_KEY=your_cohere_api_key_here
COHERE_MODEL=command-r-plus

# Frontend Configuration
FRONT_DOMAIN=http://localhost:3000

# File Upload Configuration  
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

### 4. Create Required Directories
```bash
mkdir -p uploads downloads logs
```

## 🚀 Running the Application

### Development Mode
Start the server with hot reload:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Production Mode
```bash
npm start
```

## 🧪 Testing the Setup

### 1. Health Check
Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Dara home page.

### 2. API Test
Test the summary endpoint with curl:
```bash
curl -X POST \
  http://localhost:3000/api/sum \
  -F 'file=@path/to/test/document.pdf'
```

### 3. File Upload Test
Create a simple test file:
```bash
echo "This is a test document for Dara." > test.txt
```

Upload and test:
```bash
curl -X POST \
  http://localhost:3000/api/sum \
  -F 'file=@test.txt'
```

## 🏗️ Development Workflow

### Project Structure
```
dara/
├── index.js                 # Application entry point
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── Dockerfile             # Docker configuration
├── ecosystem.config.cjs   # PM2 configuration
├── tsconfig.json          # TypeScript configuration
│
├── server/                # Backend application
│   ├── controllers/       # Request handlers
│   ├── middlewares/       # Express middlewares
│   ├── routes/           # API route definitions
│   └── utils/            # Server utilities
│
├── utils/                # Shared utilities
│   ├── model.js          # AI model configuration
│   ├── parser.js         # Document parsers
│   └── ...
│
├── tools/                # Processing scripts
├── views/                # Handlebars templates
├── uploads/              # File upload directory
├── downloads/            # File download directory
└── docs/                 # Documentation
```

### Adding New Features

#### 1. Creating New Routes
1. Create route file in `server/routes/`:
```javascript
// server/routes/newFeatureRoute.js
import express from 'express';
import { newFeatureController } from '../controllers/newFeatureController.js';

const router = express.Router();
router.post('/', newFeatureController);

export default router;
```

2. Add controller in `server/controllers/`:
```javascript
// server/controllers/newFeatureController.js
import asyncHandler from 'express-async-handler';

const newFeatureController = asyncHandler(async (req, res) => {
  // Implementation here
  res.json({ success: true, data: result });
});

export { newFeatureController };
```

3. Register route in `server/routes/index.js`:
```javascript
import newFeatureRoute from './newFeatureRoute.js';
app.use('/newfeature', newFeatureRoute);
```

#### 2. Adding Middleware
Create middleware in `server/middlewares/`:
```javascript
// server/middlewares/customMiddleware.js
const customMiddleware = (req, res, next) => {
  // Middleware logic
  next();
};

export default customMiddleware;
```

#### 3. Adding Utilities
Create utilities in `utils/`:
```javascript
// utils/customUtil.js
export const customFunction = (input) => {
  // Utility logic
  return output;
};
```

## 🔧 Development Tools

### Code Formatting
Format code with Prettier:
```bash
npm run lint
```

### File Watching
The development server uses `nodemon` for automatic restarts:
```bash
npm run dev
```

### Environment Management
Use different `.env` files for different environments:
- `.env.development`
- `.env.production`
- `.env.test`

### Debugging

#### Console Debugging
Add debug logs:
```javascript
console.log('Debug info:', debugInfo);
```

#### VS Code Debugging
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Dara",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/index.js",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal"
    }
  ]
}
```

## 🐳 Docker Development

### Build Docker Image
```bash
docker build -t dara:dev .
```

### Run with Docker
```bash
docker run -p 3000:3000 \
  -e API_KEY=your_api_key \
  -e FRONT_DOMAIN=http://localhost:3000 \
  dara:dev
```

### Docker Compose (Future Enhancement)
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - API_KEY=${API_KEY}
    volumes:
      - ./uploads:/app/uploads
```

## 📊 Monitoring and Logging

### Application Logs
Logs are output to console in development. For production, consider:
- **Winston** for structured logging
- **Morgan** for HTTP request logging (already included)

### Performance Monitoring
Monitor application performance:
```javascript
// Add to controllers for timing
const startTime = Date.now();
// ... processing ...
const endTime = Date.now();
console.log(`Processing time: ${endTime - startTime}ms`);
```

## 🧪 Testing

### Manual Testing
Use these test files for development:
- `test.txt` - Simple text file
- `sample.pdf` - PDF document
- `document.docx` - Word document
- `presentation.pptx` - PowerPoint file

### API Testing Scripts
Create test scripts in `test/` directory:
```javascript
// test/api-test.js
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

const testSummaryAPI = async () => {
  const form = new FormData();
  form.append('file', fs.createReadStream('test.txt'));
  
  const response = await fetch('http://localhost:3000/api/sum', {
    method: 'POST',
    body: form
  });
  
  const result = await response.json();
  console.log('Summary API Test:', result);
};

testSummaryAPI();
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
Error: listen EADDRINUSE :::3000
```
**Solution**: Change port in `.env` or kill process:
```bash
lsof -ti:3000 | xargs kill -9
```

#### 2. API Key Issues
```bash
Error: API key not provided
```
**Solution**: Check `.env` file has correct `API_KEY` value.

#### 3. File Upload Issues
```bash
Error: Unsupported file type
```
**Solution**: Ensure file is PDF, DOCX, PPTX, or TXT format.

#### 4. Dependencies Issues
```bash
Error: Cannot find module
```
**Solution**: Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Debugging Tips
1. **Check logs**: Console output shows detailed error information
2. **Verify environment**: Ensure all environment variables are set
3. **Test with simple files**: Start with small text files
4. **Check file permissions**: Ensure uploads directory is writable
5. **Validate API responses**: Use browser dev tools or Postman

## 📚 Development Resources

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [LangChain Documentation](https://langchain.readthedocs.io/)
- [Cohere API Documentation](https://docs.cohere.ai/)

### Tools
- [Postman Collections](postman/) - API testing collections
- [VS Code Extensions](docs/vscode-extensions.md) - Recommended extensions
- [Git Hooks](docs/git-hooks.md) - Pre-commit hooks setup