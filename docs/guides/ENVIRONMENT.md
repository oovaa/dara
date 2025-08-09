# Environment Variables

This document describes all environment variables used in the Dara application for configuration and customization.

## 📋 Overview

Dara uses environment variables for configuration to ensure security and flexibility across different deployment environments. All sensitive information like API keys should be stored in environment variables rather than hardcoded in the application.

## 🔧 Configuration File

Create a `.env` file in the root directory of your project:

```env
# Copy this template and fill in your values
# .env file (do not commit this file to version control)

# ===========================================
# SERVER CONFIGURATION
# ===========================================
NODE_ENV=development
PORT=3000
HOST=localhost

# ===========================================
# AI SERVICE CONFIGURATION
# ===========================================
API_KEY=your_cohere_api_key_here
COHERE_MODEL=command-r-plus
COHERE_TEMPERATURE=0.3
COHERE_MAX_RETRIES=2

# ===========================================
# FRONTEND CONFIGURATION
# ===========================================
FRONT_DOMAIN=http://localhost:3000

# ===========================================
# FILE UPLOAD CONFIGURATION
# ===========================================
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
DOWNLOAD_DIR=./downloads
ALLOWED_FILE_TYPES=pdf,docx,pptx,txt

# ===========================================
# RATE LIMITING CONFIGURATION
# ===========================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ===========================================
# SECURITY CONFIGURATION
# ===========================================
CORS_ORIGIN=*
HELMET_ENABLED=true

# ===========================================
# LOGGING CONFIGURATION
# ===========================================
LOG_LEVEL=info
LOG_FORMAT=combined

# ===========================================
# CACHE CONFIGURATION (Optional)
# ===========================================
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600

# ===========================================
# DATABASE CONFIGURATION (Future Use)
# ===========================================
DATABASE_URL=mongodb://localhost:27017/dara
```

## 📊 Variable Reference

### Server Configuration

#### `NODE_ENV`
- **Type**: String
- **Default**: `development`
- **Values**: `development`, `production`, `test`
- **Description**: Determines the application environment
- **Example**: `NODE_ENV=production`

#### `PORT`
- **Type**: Number
- **Default**: `3000`
- **Range**: 1-65535
- **Description**: Port number for the HTTP server
- **Example**: `PORT=8080`

#### `HOST`
- **Type**: String
- **Default**: `localhost`
- **Description**: Host address to bind the server
- **Example**: `HOST=0.0.0.0`

### AI Service Configuration

#### `API_KEY` (Required)
- **Type**: String
- **Default**: None
- **Description**: Cohere AI API key for language model access
- **Example**: `API_KEY=co-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Security**: ⚠️ **Never commit this to version control**

#### `COHERE_MODEL`
- **Type**: String
- **Default**: `command-r-plus`
- **Values**: `command-r-plus`, `command-r`, `command`
- **Description**: Cohere AI model to use for text processing
- **Example**: `COHERE_MODEL=command-r-plus`

#### `COHERE_TEMPERATURE`
- **Type**: Number
- **Default**: `0.3`
- **Range**: 0.0-1.0
- **Description**: Controls randomness in AI responses (lower = more focused)
- **Example**: `COHERE_TEMPERATURE=0.5`

#### `COHERE_MAX_RETRIES`
- **Type**: Number
- **Default**: `2`
- **Range**: 0-10
- **Description**: Maximum retry attempts for failed AI API calls
- **Example**: `COHERE_MAX_RETRIES=3`

### Frontend Configuration

#### `FRONT_DOMAIN`
- **Type**: String (URL)
- **Default**: `http://localhost:3000`
- **Description**: Frontend domain for CORS configuration
- **Example**: `FRONT_DOMAIN=https://dara.yourdomain.com`

### File Upload Configuration

#### `MAX_FILE_SIZE`
- **Type**: Number (bytes)
- **Default**: `10485760` (10 MB)
- **Description**: Maximum allowed file upload size
- **Example**: `MAX_FILE_SIZE=20971520` (20 MB)

#### `UPLOAD_DIR`
- **Type**: String (path)
- **Default**: `./uploads`
- **Description**: Directory for storing uploaded files
- **Example**: `UPLOAD_DIR=/var/uploads`

#### `DOWNLOAD_DIR`
- **Type**: String (path)
- **Default**: `./downloads`
- **Description**: Directory for storing generated files
- **Example**: `DOWNLOAD_DIR=/var/downloads`

#### `ALLOWED_FILE_TYPES`
- **Type**: String (comma-separated)
- **Default**: `pdf,docx,pptx,txt`
- **Description**: Allowed file extensions for upload
- **Example**: `ALLOWED_FILE_TYPES=pdf,doc,docx,ppt,pptx,txt`

### Rate Limiting Configuration

#### `RATE_LIMIT_WINDOW_MS`
- **Type**: Number (milliseconds)
- **Default**: `900000` (15 minutes)
- **Description**: Time window for rate limiting
- **Example**: `RATE_LIMIT_WINDOW_MS=600000` (10 minutes)

#### `RATE_LIMIT_MAX_REQUESTS`
- **Type**: Number
- **Default**: `100`
- **Description**: Maximum requests per IP per time window
- **Example**: `RATE_LIMIT_MAX_REQUESTS=50`

### Security Configuration

#### `CORS_ORIGIN`
- **Type**: String
- **Default**: `*`
- **Description**: Allowed origins for CORS (use specific domains in production)
- **Example**: `CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com`

#### `HELMET_ENABLED`
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable security headers via Helmet.js
- **Example**: `HELMET_ENABLED=false`

### Logging Configuration

#### `LOG_LEVEL`
- **Type**: String
- **Default**: `info`
- **Values**: `debug`, `info`, `warn`, `error`
- **Description**: Minimum log level to output
- **Example**: `LOG_LEVEL=debug`

#### `LOG_FORMAT`
- **Type**: String
- **Default**: `combined`
- **Values**: `combined`, `common`, `dev`, `short`, `tiny`
- **Description**: Morgan logging format
- **Example**: `LOG_FORMAT=dev`

### Cache Configuration (Optional)

#### `REDIS_URL`
- **Type**: String (URL)
- **Default**: None (agent memory disabled if not provided)
- **Description**: Redis connection URL for conversational agent memory persistence
- **Example**: `REDIS_URL=redis://localhost:6379`
- **Note**: Required for chat memory features in the conversational agent

#### `CACHE_TTL`
- **Type**: Number (seconds)
- **Default**: `3600` (1 hour)
- **Description**: Time-to-live for cached responses and chat sessions
- **Example**: `CACHE_TTL=7200` (2 hours)

## 🌍 Environment-Specific Configurations

### Development Environment
```env
NODE_ENV=development
PORT=3000
API_KEY=your_dev_api_key
FRONT_DOMAIN=http://localhost:3000
LOG_LEVEL=debug
LOG_FORMAT=dev
CORS_ORIGIN=*
MAX_FILE_SIZE=10485760
```

### Production Environment
```env
NODE_ENV=production
PORT=3000
API_KEY=your_prod_api_key
FRONT_DOMAIN=https://yourdomain.com
LOG_LEVEL=info
LOG_FORMAT=combined
CORS_ORIGIN=https://yourdomain.com
MAX_FILE_SIZE=10485760
HELMET_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=50
```

### Testing Environment
```env
NODE_ENV=test
PORT=3001
API_KEY=test_api_key
FRONT_DOMAIN=http://localhost:3001
LOG_LEVEL=warn
UPLOAD_DIR=./test-uploads
DOWNLOAD_DIR=./test-downloads
RATE_LIMIT_MAX_REQUESTS=1000
```

## 🔒 Security Best Practices

### Environment Variable Security

1. **Never commit `.env` files**:
```bash
# Add to .gitignore
.env
.env.local
.env.*.local
```

2. **Use different keys for different environments**:
- Development: Limited access test keys
- Production: Full access production keys
- Testing: Mock or test-specific keys

3. **Rotate API keys regularly**:
- Set up key rotation schedule
- Monitor key usage
- Revoke unused keys

4. **Validate environment variables**:
```javascript
// Example validation
const requiredEnvVars = ['API_KEY', 'NODE_ENV'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

### Production Security

1. **Use specific CORS origins**:
```env
# Instead of
CORS_ORIGIN=*

# Use specific domains
CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com
```

2. **Enable all security features**:
```env
HELMET_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=50
LOG_LEVEL=warn
```

3. **Secure file storage**:
```env
UPLOAD_DIR=/secure/uploads
DOWNLOAD_DIR=/secure/downloads
MAX_FILE_SIZE=5242880  # 5MB for production
```

## 🐳 Docker Environment Variables

### Dockerfile Environment
```dockerfile
# Set default environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV UPLOAD_DIR=/app/uploads
ENV DOWNLOAD_DIR=/app/downloads
```

### Docker Compose Environment
```yaml
services:
  dara:
    environment:
      - NODE_ENV=production
      - API_KEY=${API_KEY}
      - FRONT_DOMAIN=${FRONT_DOMAIN}
      - MAX_FILE_SIZE=10485760
    env_file:
      - .env.production
```

### Docker Run Environment
```bash
docker run -d \
  -e NODE_ENV=production \
  -e API_KEY=your_api_key \
  -e FRONT_DOMAIN=https://yourdomain.com \
  -e MAX_FILE_SIZE=10485760 \
  dara:latest
```

## ☁️ Cloud Platform Configuration

### AWS Environment Variables
```bash
# AWS Systems Manager Parameter Store
aws ssm put-parameter \
  --name "/dara/api-key" \
  --value "your_api_key" \
  --type "SecureString"

# ECS Task Definition
{
  "environment": [
    {"name": "NODE_ENV", "value": "production"},
    {"name": "PORT", "value": "3000"}
  ],
  "secrets": [
    {
      "name": "API_KEY",
      "valueFrom": "arn:aws:ssm:region:account:parameter/dara/api-key"
    }
  ]
}
```

### Google Cloud Environment Variables
```bash
# Cloud Run
gcloud run deploy dara \
  --set-env-vars NODE_ENV=production,PORT=3000 \
  --set-secrets API_KEY=projects/project/secrets/dara-api-key:latest
```

### Azure Environment Variables
```bash
# Azure Container Instances
az container create \
  --environment-variables NODE_ENV=production PORT=3000 \
  --secure-environment-variables API_KEY=your_api_key
```

## 🧪 Testing Environment Variables

### Test Script
```javascript
// test/env-test.js
import dotenv from 'dotenv';
dotenv.config();

const requiredVars = [
  'NODE_ENV',
  'API_KEY',
  'FRONT_DOMAIN'
];

const optionalVars = [
  'PORT',
  'MAX_FILE_SIZE',
  'RATE_LIMIT_MAX_REQUESTS'
];

console.log('Testing environment variables...');

requiredVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required variable: ${envVar}`);
    process.exit(1);
  } else {
    console.log(`✅ ${envVar}: ${process.env[envVar].substring(0, 10)}...`);
  }
});

optionalVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar}: ${process.env[envVar]}`);
  } else {
    console.log(`⚠️  ${envVar}: Using default value`);
  }
});

console.log('Environment variables test completed!');
```

## 📚 Additional Resources

### Environment Management Tools
- **dotenv**: Load environment variables from .env file
- **cross-env**: Set environment variables across platforms
- **env-var**: Validate and type environment variables

### Security Tools
- **git-secrets**: Prevent committing secrets
- **truffleHog**: Search for secrets in repositories
- **vault**: Secure secret management

### Monitoring
- **PM2**: Process monitoring with environment management
- **New Relic**: Application performance monitoring
- **DataDog**: Infrastructure and application monitoring