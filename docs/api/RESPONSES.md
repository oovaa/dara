# API Response Formats

This document provides detailed schemas and examples for all API responses in the Dara platform.

## 📋 Response Structure

All API responses follow a consistent structure to ensure predictable client integration.

### Standard Response Envelope

```json
{
  "success": boolean,
  "data": object | null,
  "error": object | null,
  "meta": object | null
}
```

## ✅ Success Responses

### Summary Generation Response

**Endpoint**: `POST /api/sum`

```json
{
  "success": true,
  "data": {
    "summary": "string",
    "filename": "string", 
    "fileSize": "number",
    "processedAt": "ISO8601 datetime",
    "metadata": {
      "wordCount": "number",
      "pageCount": "number",
      "processingTime": "number (seconds)"
    }
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "uuid"
  }
}
```

**Example**:
```json
{
  "success": true,
  "data": {
    "summary": "This comprehensive report examines the current state of artificial intelligence implementation in enterprise environments. The document highlights key trends including increased adoption of machine learning algorithms, integration challenges, and the significant ROI improvements seen across various industry sectors. The report concludes with recommendations for organizations looking to implement AI solutions effectively.",
    "filename": "ai-enterprise-report.pdf",
    "fileSize": 2048576,
    "processedAt": "2024-01-15T14:30:25.123Z",
    "metadata": {
      "wordCount": 1523,
      "pageCount": 12,
      "processingTime": 4.7
    }
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

### Question Generation Response

**Endpoint**: `POST /api/qs`

```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "number",
        "question": "string",
        "type": "string",
        "difficulty": "string",
        "category": "string",
        "expectedAnswerLength": "string"
      }
    ],
    "filename": "string",
    "fileSize": "number",
    "questionCount": "number",
    "processedAt": "ISO8601 datetime",
    "metadata": {
      "contentAnalysis": "object",
      "processingTime": "number"
    }
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "uuid"
  }
}
```

**Example**:
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": 1,
        "question": "What are the primary benefits of implementing AI in enterprise environments according to the document?",
        "type": "factual",
        "difficulty": "easy",
        "category": "implementation",
        "expectedAnswerLength": "short"
      },
      {
        "id": 2,
        "question": "How do the integration challenges mentioned in the report compare across different industry sectors?",
        "type": "analytical",
        "difficulty": "medium",
        "category": "analysis",
        "expectedAnswerLength": "medium"
      },
      {
        "id": 3,
        "question": "Based on the ROI data presented, what strategic recommendations would you make for a company considering AI implementation?",
        "type": "evaluative",
        "difficulty": "hard",
        "category": "strategy",
        "expectedAnswerLength": "long"
      }
    ],
    "filename": "ai-enterprise-report.pdf",
    "fileSize": 2048576,
    "questionCount": 3,
    "processedAt": "2024-01-15T14:35:12.456Z",
    "metadata": {
      "contentAnalysis": {
        "topicDiversity": 0.78,
        "complexityScore": 0.65,
        "keyTerms": ["artificial intelligence", "enterprise", "implementation", "ROI"]
      },
      "processingTime": 6.2
    }
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "550e8400-e29b-41d4-a716-446655440001"
  }
}
```

### Answer Generation Response

**Endpoint**: `POST /api/answer`

```json
{
  "success": true,
  "data": {
    "question": "string",
    "answer": "string",
    "confidence": "number (0-1)",
    "sources": ["array of strings"],
    "filename": "string",
    "processedAt": "ISO8601 datetime",
    "metadata": {
      "answerLength": "number",
      "processingTime": "number",
      "relevanceScore": "number"
    }
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "uuid"
  }
}
```

**Example**:
```json
{
  "success": true,
  "data": {
    "question": "What is the main focus of this enterprise AI report?",
    "answer": "The main focus of this enterprise AI report is examining the current state of artificial intelligence implementation in business environments. It specifically addresses adoption trends, integration challenges, ROI improvements across industries, and provides strategic recommendations for organizations planning AI implementations.",
    "confidence": 0.94,
    "sources": [
      "Page 1: Executive Summary",
      "Page 3: Current State Analysis", 
      "Page 8: Industry Trends"
    ],
    "filename": "ai-enterprise-report.pdf",
    "processedAt": "2024-01-15T14:38:45.789Z",
    "metadata": {
      "answerLength": 267,
      "processingTime": 3.1,
      "relevanceScore": 0.91
    }
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "550e8400-e29b-41d4-a716-446655440002"
  }
}
```

## ❌ Error Responses

### Error Response Schema

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string", 
    "details": "string | object",
    "timestamp": "ISO8601 datetime"
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "uuid"
  }
}
```

### File Upload Errors

**Missing File (400)**:
```json
{
  "success": false,
  "error": {
    "code": "FILE_REQUIRED",
    "message": "No file was uploaded. Please provide a file in the 'file' field.",
    "details": "The request must include a file upload in multipart/form-data format.",
    "timestamp": "2024-01-15T14:40:00.000Z"
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "550e8400-e29b-41d4-a716-446655440003"
  }
}
```

**Unsupported File Type (415)**:
```json
{
  "success": false,
  "error": {
    "code": "UNSUPPORTED_FILE_TYPE",
    "message": "File type '.xlsx' is not supported.",
    "details": {
      "uploadedType": ".xlsx",
      "supportedTypes": [".pdf", ".docx", ".pptx", ".txt"],
      "suggestion": "Please convert your file to one of the supported formats."
    },
    "timestamp": "2024-01-15T14:41:30.000Z"
  },
  "meta": {
    "apiVersion": "1.0", 
    "requestId": "550e8400-e29b-41d4-a716-446655440004"
  }
}
```

**File Too Large (413)**:
```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size exceeds the maximum allowed limit.",
    "details": {
      "fileSize": 15728640,
      "maxSize": 10485760,
      "maxSizeHuman": "10 MB",
      "suggestion": "Please reduce file size or split into smaller files."
    },
    "timestamp": "2024-01-15T14:42:15.000Z"
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "550e8400-e29b-41d4-a716-446655440005"
  }
}
```

### Processing Errors

**AI Processing Error (500)**:
```json
{
  "success": false,
  "error": {
    "code": "PROCESSING_ERROR",
    "message": "An error occurred while processing the document.",
    "details": "The AI service encountered an issue while analyzing the document content. This may be due to unsupported content format or service availability.",
    "timestamp": "2024-01-15T14:43:00.000Z"
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "550e8400-e29b-41d4-a716-446655440006"
  }
}
```

**Rate Limit Exceeded (429)**:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED", 
    "message": "Too many requests. Please try again later.",
    "details": {
      "limit": 100,
      "windowMinutes": 15,
      "retryAfter": 300,
      "suggestion": "Please wait 5 minutes before making another request."
    },
    "timestamp": "2024-01-15T14:44:00.000Z"
  },
  "meta": {
    "apiVersion": "1.0",
    "requestId": "550e8400-e29b-41d4-a716-446655440007"
  }
}
```

## 📊 Response Metadata

### Question Types
- **factual**: Questions about specific information in the document
- **analytical**: Questions requiring analysis or comparison
- **evaluative**: Questions asking for judgment or recommendations
- **creative**: Questions encouraging creative thinking

### Difficulty Levels
- **easy**: Basic comprehension questions
- **medium**: Questions requiring some analysis
- **hard**: Complex questions requiring deep understanding

### Answer Length Classifications
- **short**: 1-50 words
- **medium**: 51-150 words  
- **long**: 151+ words

### Confidence Scores
- **0.0 - 0.3**: Low confidence
- **0.4 - 0.6**: Medium confidence
- **0.7 - 0.8**: High confidence
- **0.9 - 1.0**: Very high confidence

## 🔍 Response Headers

### Standard Headers
```
Content-Type: application/json; charset=utf-8
X-API-Version: 1.0
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000
X-Response-Time: 1234ms
```

### Rate Limiting Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248600
X-RateLimit-Window: 900
```

### CORS Headers
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## 🧪 Testing Response Validation

### JSON Schema Validation

You can validate API responses using JSON Schema. Here's an example schema for the summary response:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["success"],
  "properties": {
    "success": {"type": "boolean"},
    "data": {
      "type": "object",
      "required": ["summary", "filename", "fileSize", "processedAt"],
      "properties": {
        "summary": {"type": "string", "minLength": 1},
        "filename": {"type": "string"},
        "fileSize": {"type": "number", "minimum": 0},
        "processedAt": {"type": "string", "format": "date-time"}
      }
    },
    "error": {"type": ["object", "null"]},
    "meta": {"type": ["object", "null"]}
  }
}
```