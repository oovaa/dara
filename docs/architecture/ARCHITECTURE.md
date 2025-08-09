# System Architecture

Dara is a modern document processing platform built with a modular, scalable architecture that leverages AI for intelligent document analysis.

## 🏗️ High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Services   │
│   (Web UI)      │◄──►│   (Express.js)  │◄──►│   (Cohere AI)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                               │
                               ▼
                       ┌─────────────────┐
                       │   File System   │
                       │   (Uploads)     │
                       └─────────────────┘
```

## 📱 Application Layers

### 1. Presentation Layer
- **Express.js Server**: Main application server
- **Handlebars Templates**: Server-side rendering
- **Static Assets**: CSS, JavaScript, images

### 2. API Layer
- **RESTful Routes**: Clean, organized endpoint structure
- **Middleware Stack**: Security, validation, error handling
- **Rate Limiting**: Protection against abuse

### 3. Business Logic Layer
- **Controllers**: Handle HTTP requests and responses
- **Services**: Core business logic for document processing
- **Utilities**: Shared functionality and helpers

### 4. Data Processing Layer
- **File Parsers**: Support for multiple document formats
- **LangChain Integration**: Document loading and processing
- **AI Model Interface**: Cohere AI integration for text analysis

### 5. Storage Layer
- **File Upload System**: Secure file handling
- **Temporary Storage**: Processing workspace

## 🔧 Component Architecture

### Server Components
```
server/
├── controllers/           # Request handlers
│   ├── generateSummaryController.js
│   ├── generateQsController.js
│   └── answerQsController.js
├── middlewares/          # Request processing
│   ├── globalErrorHandler.js
│   ├── multerMiddleWare.js
│   └── validatorMidlleWare.js
├── routes/              # API endpoints
│   ├── generateSummaryRoute.js
│   ├── generateQsRoute.js
│   ├── answerQsRoute.js
│   └── index.js
└── utils/               # Server utilities
    └── ApiError.js
```

### Core Utilities
```
utils/
├── model.js             # AI model configuration
├── parser.js            # Document parsing logic
├── downloadVideo.js     # Video processing
└── getFilePath.js       # File path utilities
```

### Processing Tools
```
tools/
├── generateQs.js        # Question generation using Cohere
├── summarize.js         # Text summarization using Cohere
├── agent.js            # Conversational AI agent using Cohere
└── audioToText.js      # Audio transcription (disabled - previously used OpenAI)
```

## 🔄 Data Flow

### Document Processing Flow
1. **File Upload**: User uploads document via web interface
2. **Validation**: File type and size validation
3. **Storage**: Temporary storage in uploads directory
4. **Parsing**: Extract text content using appropriate parser
5. **AI Processing**: Send to Cohere AI for analysis
6. **Response**: Return processed results to user

### Request Lifecycle
```
Client Request
    ↓
Rate Limiting
    ↓
CORS & Security Headers
    ↓
Route Matching
    ↓
Middleware Processing
    ↓
Controller Logic
    ↓
Business Logic/AI Processing
    ↓
Response Generation
    ↓
Error Handling
    ↓
Client Response
```

## 🛡️ Security Architecture

### Security Layers
1. **Helmet.js**: Security headers
2. **CORS**: Cross-origin resource sharing
3. **Rate Limiting**: Request throttling
4. **Input Validation**: Request validation
5. **Error Handling**: Secure error responses

### File Security
- File type validation
- Size limits
- Temporary storage
- Automatic cleanup

## 🔌 External Integrations

### AI Services
- **Cohere AI**: Primary language model for all AI operations
  - Document summarization
  - Question generation  
  - Conversational AI agent
  - Free tier available for development/testing
- **LangChain**: Document processing framework and AI orchestration
- **Redis** (optional): Chat memory persistence for conversational agent

### File Processing
- **PDF**: `PDFLoader` for PDF documents
- **DOCX**: `DocxLoader` for Word documents  
- **PPTX**: `PPTXLoader` for PowerPoint presentations
- **TXT**: `TextLoader` for plain text files

## 📊 Performance Considerations

### Optimization Strategies
- **Compression**: Response compression middleware
- **Error Handling**: Efficient error processing
- **Memory Management**: Proper cleanup of temporary files
- **Caching**: Strategic caching of processed results

### Scalability
- Stateless server design
- Modular architecture
- Configurable rate limiting
- Environment-based configuration

## 🔧 Configuration Management

### Environment Variables
- API keys and secrets
- Server configuration
- CORS settings
- Rate limiting parameters

### Deployment Flexibility
- Docker support
- Environment-specific configurations
- Process management with PM2