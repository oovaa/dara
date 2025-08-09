# API Reference

Dara provides a RESTful API for document processing, summary generation, and question creation. All endpoints are prefixed with `/api`.

## 🚀 Base URL

```
http://localhost:3000/api
```

For production environments, replace `localhost:3000` with your deployed server URL.

## 🔐 Authentication

Currently, Dara does not require authentication for API access. However, it implements rate limiting to prevent abuse.

### Rate Limiting
- **Window**: 15 minutes
- **Limit**: 100 requests per IP
- **Headers**: Rate limit information included in response headers

## 📄 Supported File Types

Dara supports the following document formats:
- **PDF** (`.pdf`) - Portable Document Format
- **DOCX** (`.docx`) - Microsoft Word documents
- **PPTX** (`.pptx`) - Microsoft PowerPoint presentations  
- **TXT** (`.txt`) - Plain text files

## 📡 API Endpoints

### 1. Generate Summary

Generate an AI-powered summary from uploaded documents.

#### Endpoint
```http
POST /api/sum
```

#### Request
**Content-Type**: `multipart/form-data`

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | Document file to summarize |

**Example Request**:
```bash
curl -X POST \
  http://localhost:3000/api/sum \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/path/to/document.pdf'
```

#### Response
**Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "summary": "This document discusses the implementation of artificial intelligence in modern business processes...",
    "filename": "document.pdf",
    "fileSize": 2048576,
    "processedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (400 Bad Request)**:
```json
{
  "success": false,
  "error": {
    "message": "No file uploaded",
    "code": "FILE_REQUIRED"
  }
}
```

**Error Response (415 Unsupported Media Type)**:
```json
{
  "success": false,
  "error": {
    "message": "Unsupported file type: .xlsx",
    "code": "UNSUPPORTED_FILE_TYPE"
  }
}
```

### 2. Generate Questions

Generate questions based on the content of uploaded documents.

#### Endpoint
```http
POST /api/qs
```

#### Request
**Content-Type**: `multipart/form-data`

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | Document file to generate questions from |

**Example Request**:
```bash
curl -X POST \
  http://localhost:3000/api/qs \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/path/to/presentation.pptx'
```

#### Response
**Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": 1,
        "question": "What are the main benefits of implementing AI in business processes?",
        "type": "open-ended",
        "difficulty": "medium"
      },
      {
        "id": 2,
        "question": "Which industry sectors are mentioned as early adopters of AI technology?",
        "type": "factual",
        "difficulty": "easy"
      },
      {
        "id": 3,
        "question": "How might AI implementation affect employment in traditional industries?",
        "type": "analytical",
        "difficulty": "hard"
      }
    ],
    "filename": "presentation.pptx",
    "fileSize": 1024000,
    "questionCount": 3,
    "processedAt": "2024-01-15T10:35:00Z"
  }
}
```

### 3. Conversational Chat

Engage in conversational AI with persistent session memory using Cohere AI.

#### Endpoint
```http
POST /api/chat
```

#### Request
**Content-Type**: `application/json`

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | String | Yes | User's question or message |
| `session` | String | Yes | Unique session identifier for conversation continuity |

**Example Request**:
```bash
curl -X POST \
  http://localhost:3000/api/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "question": "What is artificial intelligence?",
    "session": "user-session-123"
  }'
```

#### Response
**Success Response (200 OK)**:
```json
{
  "answer": "Artificial intelligence (AI) is a field of computer science that aims to create systems capable of performing tasks that typically require human intelligence..."
}
```

**Error Response (400 Bad Request)**:
```json
{
  "success": false,
  "error": {
    "message": "Bad Request",
    "code": 400
  }
}
```

**Note**: This endpoint requires Redis to be configured for session memory persistence. If Redis is not available, sessions will not persist between requests.

## 🚨 Error Handling

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| `200` | Success |
| `400` | Bad Request - Invalid input or missing required fields |
| `413` | Payload Too Large - File size exceeds limit |
| `415` | Unsupported Media Type - Invalid file format |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error - Server processing error |

### Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "details": "Additional error details (optional)"
  }
}
```

### Common Error Codes

| Error Code | Description |
|------------|-------------|
| `FILE_REQUIRED` | No file was uploaded |
| `UNSUPPORTED_FILE_TYPE` | File format not supported |
| `FILE_TOO_LARGE` | File exceeds size limit |
| `PROCESSING_ERROR` | Error during AI processing |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `INVALID_INPUT` | Invalid request parameters |

## 📋 Request Limits

### File Size Limits
- **Maximum file size**: 10 MB
- **Recommended size**: Under 5 MB for optimal performance

### Rate Limits
- **Requests per IP**: 100 requests per 15-minute window
- **Concurrent requests**: 10 per IP

### Content Limits
- **Text extraction**: Up to 50,000 characters per document
- **Question generation**: Up to 10 questions per request
- **Summary length**: Typically 150-500 words

## 💡 Best Practices

### File Upload
1. **Validate file type** before uploading
2. **Check file size** to avoid upload errors
3. **Use descriptive filenames** for better organization
4. **Handle upload progress** for large files

### Error Handling
1. **Check HTTP status codes** for all responses
2. **Parse error messages** for user feedback
3. **Implement retry logic** for transient errors
4. **Log errors** for debugging

### Performance
1. **Compress files** when possible
2. **Cache results** to reduce API calls
3. **Process files asynchronously** for better UX
4. **Monitor rate limits** to avoid blocking

## 🔧 Testing

### cURL Examples

**Test file upload**:
```bash
curl -X POST \
  http://localhost:3000/api/sum \
  -F 'file=@test.pdf' \
  -v
```

**Test with invalid file**:
```bash
curl -X POST \
  http://localhost:3000/api/sum \
  -F 'file=@test.jpg' \
  -v
```

**Test rate limiting**:
```bash
for i in {1..101}; do
  curl -X POST http://localhost:3000/api/sum \
    -F 'file=@test.pdf' \
    --silent --output /dev/null \
    --write-out "%{http_code}\n"
done
```

### Response Headers

Monitor these headers for API health:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1642248600
Content-Type: application/json
Content-Length: 256
```