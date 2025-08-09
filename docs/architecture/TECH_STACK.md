# Technology Stack

Dara is built using modern, reliable technologies that ensure scalability, maintainability, and performance.

## 🎯 Core Technologies

### Backend Framework
- **Node.js** (v20+) - JavaScript runtime environment
- **Express.js** (v4.21+) - Fast, unopinionated web framework
- **ES6 Modules** - Modern JavaScript module system

### AI & Machine Learning
- **LangChain** (v0.2+) - Framework for developing AI applications  
- **Cohere AI** - Advanced language model API (free tier available)
- **@langchain/cohere** - Cohere integration for LangChain
- **@langchain/community** - Community document loaders
- **ChatCohere** - Conversational AI agent powered by Cohere
- **Redis** (optional) - Chat memory persistence

### Document Processing
- **pdf-parse** - PDF text extraction
- **officeparser** - Office document parsing
- **PPTXLoader** - PowerPoint presentation processing
- **DocxLoader** - Word document processing
- **TextLoader** - Plain text file handling

### Security & Middleware
- **Helmet.js** - Security headers and protection
- **CORS** - Cross-Origin Resource Sharing
- **express-rate-limit** - Rate limiting middleware
- **express-validator** - Input validation
- **compression** - Response compression

### File Handling
- **Multer** - File upload middleware
- **UUID** - Unique identifier generation
- **temp-write** - Temporary file writing
- **path** - File path utilities

### Development Tools
- **Nodemon** - Development server auto-restart
- **Morgan** - HTTP request logger
- **Prettier** - Code formatting
- **TypeScript** (peer dependency) - Type checking support

### Template Engine
- **Express Handlebars** - Server-side template rendering

### Environment & Configuration
- **dotenv** - Environment variable management
- **PM2** (ecosystem.config.cjs) - Process management

## 📦 Package Dependencies

### Production Dependencies
```json
{
  "@langchain/cohere": "^0.2.2",
  "@langchain/community": "^0.2.33", 
  "@langchain/core": "^0.2.36",
  "cohere-ai": "^7.16.0",
  "compression": "^1.8.0",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "express-async-handler": "^1.2.0",
  "express-handlebars": "^8.0.1",
  "express-rate-limit": "^7.5.0",
  "express-validator": "^7.2.1",
  "helmet": "^7.2.0",
  "langchain": "^0.2.20",
  "morgan": "^1.10.0",
  "multer": "^1.4.5-lts.1",
  "officeparser": "^4.2.0",
  "pdf-parse": "^1.1.1",
  "uuid": "^10.0.0"
}
```

### Development Dependencies
```json
{
  "@types/bun": "latest",
  "nodemon": "^3.1.9"
}
```

### Peer Dependencies
```json
{
  "typescript": "^5.5.4"
}
```

## 🏗️ Architecture Patterns

### Design Patterns Used
- **MVC Architecture** - Model-View-Controller separation
- **Middleware Pattern** - Request/response processing pipeline
- **Factory Pattern** - Document loader creation
- **Strategy Pattern** - Different parsing strategies for file types
- **Error Handling Pattern** - Centralized error management

### Project Structure Pattern
```
dara/
├── server/                 # Backend application
│   ├── controllers/       # Request handlers
│   ├── middlewares/       # Request processing
│   ├── routes/           # API endpoints
│   └── utils/            # Server utilities
├── utils/                # Shared utilities
├── tools/                # Processing scripts
├── views/                # Template files
├── uploads/              # File storage
├── downloads/            # Download storage
└── docs/                # Documentation
```

## 🔧 Development Stack

### Runtime Environment
- **Node.js v20+** - Latest LTS version recommended
- **npm v10+** - Package manager

### Code Quality
- **ES6+ JavaScript** - Modern JavaScript features
- **ESM Modules** - ES6 module system
- **Prettier** - Code formatting standards
- **Express.js conventions** - RESTful API design

### Error Handling
- **express-async-handler** - Async error handling
- **Custom ApiError class** - Structured error responses
- **Global error middleware** - Centralized error processing

## 🌐 Browser Support

### Frontend Compatibility
- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **JavaScript**: ES6+ features required
- **CSS**: Modern CSS3 features

## 🔄 Integration Points

### External APIs
- **Cohere AI API** - Language model services
- **File System** - Local file operations
- **HTTP Clients** - RESTful API communication

### Data Formats
- **JSON** - Primary data exchange format
- **Multipart/form-data** - File upload format
- **Plain text** - Text extraction output

## 📊 Performance Characteristics

### Strengths
- **Asynchronous Processing** - Non-blocking I/O operations
- **Streaming** - Efficient large file handling
- **Compression** - Reduced bandwidth usage
- **Caching** - Improved response times

### Scalability Considerations
- **Stateless Design** - Horizontal scaling friendly
- **Process Management** - PM2 clustering support
- **Resource Efficiency** - Optimized memory usage
- **Rate Limiting** - Protection against overload

## 🐳 Deployment Technologies

### Containerization
- **Docker** - Container platform
- **Dockerfile** - Container build instructions

### Process Management
- **PM2** - Production process manager
- **ecosystem.config.cjs** - PM2 configuration

### Environment Management
- **.env files** - Environment-specific configuration
- **Environment variables** - Runtime configuration