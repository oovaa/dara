# Dara

<div align="center">

![Dara Logo](https://img.shields.io/badge/Dara-AI%20Document%20Processor-blue?style=for-the-badge)

[![License](https://img.shields.io/badge/license-GPL%20v3.0-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-v20+-brightgreen.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-v4.21+-orange.svg)](https://expressjs.com/)
[![LangChain](https://img.shields.io/badge/langchain-v0.2+-purple.svg)](https://langchain.readthedocs.io/)
[![Cohere](https://img.shields.io/badge/cohere-AI%20Powered-blueviolet.svg)](https://cohere.ai/)

**An intelligent document processing platform powered by AI**

[📖 Documentation](docs/) • [🚀 Quick Start](#quick-start) • [🔧 API Reference](docs/api/API.md) • [🤝 Contributing](CONTRIBUTING.md)

</div>

---

## 🎯 Overview

Dara is a modern, AI-powered document processing platform developed as part of the ALX Software Engineering program. It leverages cutting-edge technologies like LangChain and Cohere AI to provide intelligent document analysis, summarization, question generation, and conversational AI capabilities - all using free and open-source alternatives.

### 🌟 Key Highlights

- **🤖 AI-Powered**: Advanced language models using entirely free alternatives (Cohere AI)
- **📄 Multi-Format Support**: Process PDF, DOCX, PPTX, and TXT files seamlessly
- **🔄 RESTful API**: Clean, well-documented API endpoints
- **🛡️ Enterprise-Ready**: Built-in security, rate limiting, and error handling
- **🚀 Scalable Architecture**: Modular design for easy deployment and scaling
- **📊 Production-Ready**: Comprehensive monitoring, logging, and deployment options
- **💰 Cost-Effective**: Uses free AI services with no usage-based billing

## ✨ Features

### 📝 Document Processing
- **Multi-Format Parser**: Native support for `.pdf`, `.docx`, `.pptx`, and `.txt` files
- **Intelligent Text Extraction**: Advanced parsing with context preservation
- **Content Validation**: Robust file type and size validation

### 🧠 AI-Powered Analysis  
- **Smart Summarization**: Generate concise, contextual summaries using Cohere AI
- **Question Generation**: Create relevant questions from document content
- **Conversational AI**: Interactive chat interface for document Q&A powered by Cohere
- **Answer Generation**: Provide AI-powered answers based on document context
- **Confidence Scoring**: Quality metrics for AI-generated content
- **Memory Management**: In-memory conversation history (no external database required)

### 🔒 Security & Performance
- **Rate Limiting**: Intelligent request throttling (100 req/15min)
- **Security Headers**: Comprehensive protection with Helmet.js
- **CORS Protection**: Configurable cross-origin resource sharing
- **Input Validation**: Robust validation for all endpoints
- **Error Handling**: Graceful error responses and logging

## 🚀 Quick Start

### Prerequisites
- **Node.js** v20.0.0 or higher
- **npm** v10.0.0 or higher  
- **Cohere AI API Key** ([Get one here](https://cohere.ai/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/oovaa/dara.git
   cd dara
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   # Create environment file
   cp .env.example .env
   
   # Edit with your configuration
   nano .env
   ```

   **Required environment variables**:
   ```env
   # AI Service Configuration
   API_KEY=your_cohere_api_key_here
   
   # Server Configuration
   PORT=3000
   FRONT_DOMAIN=http://localhost:3000
   
   # File Upload Configuration
   MAX_FILE_SIZE=10485760  # 10MB
   ```

4. **Start the application**:
   ```bash
   # Development mode (with hot reload)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Verify installation**:
   ```bash
   curl http://localhost:3000/
   ```

   You should see the Dara welcome page! 🎉

## 🔧 Usage

### Web Interface
Navigate to `http://localhost:3000` to access the intuitive web interface for document upload and processing.

### API Endpoints

#### 📄 Document Summarization
Generate intelligent summaries from uploaded documents.

```bash
curl -X POST http://localhost:3000/api/sum \
  -F 'file=@document.pdf'
```

**Response**:
```json
{
  "success": true,
  "data": {
    "summary": "This document discusses...",
    "filename": "document.pdf",
    "processingTime": 3.2
  }
}
```

#### ❓ Question Generation
Create relevant questions based on document content.

```bash
curl -X POST http://localhost:3000/api/qs \
  -F 'file=@presentation.pptx'
```

**Response**:
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": 1,
        "question": "What are the main topics covered?",
        "type": "factual",
        "difficulty": "easy"
      }
    ],
    "questionCount": 5
  }
}
```

#### 💬 Conversational Chat
Engage with Dara's AI assistant for interactive conversations.

```bash
curl -X POST http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "question": "What is artificial intelligence?",
    "session": "user-session-123"
  }'
```

**Response**:
```json
{
  "answer": "Artificial intelligence (AI) is a field of computer science that aims to create systems capable of performing tasks that typically require human intelligence..."
}
```

### Supported File Formats

| Format | Extension | Description |
|--------|-----------|-------------|
| **PDF** | `.pdf` | Portable Document Format |
| **Word** | `.docx` | Microsoft Word documents |
| **PowerPoint** | `.pptx` | Microsoft PowerPoint presentations |
| **Text** | `.txt` | Plain text files |

### Rate Limits
- **100 requests** per 15-minute window per IP address
- **10MB** maximum file size
- **50,000 characters** maximum document length

## 🏗️ Architecture

Dara follows a modern, scalable architecture built on proven technologies:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Services   │
│   (Handlebars)  │◄──►│   (Express.js)  │◄──►│   (Cohere AI)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                               │
                               ▼
                       ┌─────────────────┐
                       │   File System   │
                       │   (Processing)  │
                       └─────────────────┘
```

### 🔧 Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js, Express.js, ES6 Modules |
| **AI/ML** | LangChain, Cohere AI, Document Loaders |
| **Security** | Helmet.js, CORS, Rate Limiting, Input Validation |
| **File Processing** | Multer, PDF-Parse, Office Parser |
| **Development** | Nodemon, Prettier, PM2 |
| **Deployment** | Docker, PM2, Nginx |

### 📁 Project Structure

```
dara/
├── 📂 server/              # Backend application
│   ├── 🎮 controllers/     # Request handlers
│   ├── 🔧 middlewares/     # Express middlewares  
│   ├── 🛣️  routes/         # API route definitions
│   └── 🔨 utils/           # Server utilities
├── 🛠️  utils/              # Shared utilities
│   ├── 🤖 model.js         # AI model configuration
│   └── 📄 parser.js        # Document parsers
├── 🔧 tools/               # Processing scripts
├── 🖼️  views/              # Handlebars templates
├── 📤 uploads/             # File upload directory
├── 📥 downloads/           # Processed files
└── 📚 docs/                # Comprehensive documentation
```

### 🔄 Data Flow

1. **File Upload** → User uploads document via API/Web
2. **Validation** → File type, size, and content validation
3. **Parsing** → Extract text using appropriate document loader
4. **AI Processing** → Send to Cohere AI for analysis
5. **Response** → Return structured results to client

For detailed architecture information, see [Architecture Documentation](docs/architecture/ARCHITECTURE.md).

## 🚀 Deployment

### Quick Deployment Options

#### 🐳 Docker (Recommended)
```bash
# Build and run with Docker
docker build -t dara .
docker run -p 3000:3000 -e API_KEY=your_key dara
```

#### ☁️ Cloud Platforms
- **AWS**: ECS, EC2, Lambda
- **Google Cloud**: Cloud Run, Compute Engine
- **Azure**: Container Instances, App Service
- **Heroku**: One-click deployment

#### 🖥️ Traditional Servers
```bash
# Production deployment with PM2
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup
```

For comprehensive deployment instructions, see [Deployment Guide](docs/guides/DEPLOYMENT.md).

## 📖 Documentation

### 📚 Complete Documentation
- [📋 API Reference](docs/api/API.md) - Complete REST API documentation
- [🏗️ Architecture Guide](docs/architecture/ARCHITECTURE.md) - System design and components
- [🔧 Development Setup](docs/guides/DEVELOPMENT.md) - Local development environment
- [🚀 Deployment Guide](docs/guides/DEPLOYMENT.md) - Production deployment
- [⚙️ Environment Variables](docs/guides/ENVIRONMENT.md) - Configuration reference
- [🛠️ Troubleshooting](docs/guides/TROUBLESHOOTING.md) - Common issues and solutions

### 🔗 Quick Links
- [Technology Stack](docs/architecture/TECH_STACK.md)
- [API Response Formats](docs/api/RESPONSES.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🔧 Development

### Prerequisites
- Node.js v20+
- npm v10+
- Cohere AI API key

### Development Commands
```bash
# Start development server
npm run dev

# Format code
npm run lint

# Production mode
npm start
```

### Adding New Features
1. Create route in `server/routes/`
2. Add controller in `server/controllers/`
3. Implement business logic
4. Update documentation
5. Test thoroughly

See [Development Guide](docs/guides/DEVELOPMENT.md) for detailed instructions.

## 🛠️ Troubleshooting

### Common Issues
- **Port in use**: Change `PORT` in `.env`
- **API key errors**: Verify `API_KEY` in environment
- **File upload issues**: Check file format and size
- **Memory errors**: Reduce file size or increase Node.js memory

For comprehensive troubleshooting, see [Troubleshooting Guide](docs/guides/TROUBLESHOOTING.md).

## 🔐 Security

Dara implements multiple security layers:
- **Rate Limiting**: 100 requests per 15 minutes
- **Input Validation**: Comprehensive request validation
- **Security Headers**: Helmet.js protection
- **CORS Protection**: Configurable origin restrictions
- **File Validation**: Type and size checking

## 🤝 Contributing

We welcome contributions from the community! Dara is an open-source project that benefits from diverse perspectives and expertise.

### 🚀 Ways to Contribute
- **🐛 Bug Reports**: Report issues and bugs
- **💡 Feature Requests**: Suggest new functionality  
- **📖 Documentation**: Improve or expand documentation
- **🔧 Code Contributions**: Submit pull requests
- **🧪 Testing**: Help test new features and fixes
- **🎨 Design**: Improve UI/UX and visual design

### 📋 Contribution Process
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### 📝 Guidelines
- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Include tests for new features
- Update documentation as needed
- Be respectful and constructive in discussions

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

This project is licensed under the **GNU General Public License v3.0**.

### 📜 License Summary
- ✅ **Commercial use** - Use for commercial purposes
- ✅ **Modification** - Modify the software
- ✅ **Distribution** - Distribute the software
- ✅ **Patent use** - Grant of patent rights
- ✅ **Private use** - Use for private purposes
- ❗ **Liability** - No liability protection
- ❗ **Warranty** - No warranty provided
- 📋 **License and copyright notice** - Must include
- 📋 **State changes** - Must document changes
- 📋 **Disclose source** - Must provide source code

See the [LICENSE](LICENSE) file for full details.

---

<div align="center">

## 🌟 Star the Project

If you find Dara useful, please consider giving it a star! ⭐

[![GitHub stars](https://img.shields.io/github/stars/oovaa/dara?style=social)](https://github.com/oovaa/dara/stargazers)

**Made with ❤️ by the ALX Software Engineering Community**

[🏠 Homepage](https://github.com/oovaa/dara) • [📖 Documentation](docs/) • [🐛 Issues](https://github.com/oovaa/dara/issues) • [💬 Discussions](https://github.com/oovaa/dara/discussions)

</div>

