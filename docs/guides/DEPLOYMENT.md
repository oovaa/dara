# Deployment Guide

This guide covers various deployment options for the Dara application, from local development to production environments.

## 🎯 Deployment Overview

Dara can be deployed in several environments:
- **Local Development** - For development and testing
- **Docker Containers** - Containerized deployment
- **Cloud Platforms** - AWS, Google Cloud, Azure
- **VPS/Dedicated Servers** - Traditional server deployment

## 📋 Pre-deployment Checklist

### Environment Requirements
- [ ] Node.js v20+ installed
- [ ] npm v10+ available
- [ ] Sufficient disk space (minimum 1GB)
- [ ] Network access for AI API calls
- [ ] Valid Cohere AI API key
- [ ] SSL certificate (for production)

### Application Configuration
- [ ] Environment variables configured
- [ ] File upload directories created
- [ ] Error logging configured
- [ ] Security headers enabled
- [ ] Rate limiting configured

## 🐳 Docker Deployment

### Basic Docker Deployment

#### 1. Build the Image
```bash
docker build -t dara:latest .
```

#### 2. Run Container
```bash
docker run -d \
  --name dara-app \
  -p 3000:3000 \
  -e API_KEY=your_cohere_api_key \
  -e FRONT_DOMAIN=https://yourdomain.com \
  -e NODE_ENV=production \
  -v dara-uploads:/app/uploads \
  dara:latest
```

#### 3. Verify Deployment
```bash
curl http://localhost:3000/
```

### Docker Compose Deployment

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  dara:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - API_KEY=${API_KEY}
      - FRONT_DOMAIN=${FRONT_DOMAIN}
      - MAX_FILE_SIZE=10485760
      - RATE_LIMIT_WINDOW_MS=900000
      - RATE_LIMIT_MAX_REQUESTS=100
    volumes:
      - dara-uploads:/app/uploads
      - dara-downloads:/app/downloads
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - dara
    restart: unless-stopped

volumes:
  dara-uploads:
  dara-downloads:
```

Create `.env` file:
```env
API_KEY=your_cohere_api_key_here
FRONT_DOMAIN=https://yourdomain.com
```

Deploy with Docker Compose:
```bash
docker-compose up -d
```

## ☁️ Cloud Platform Deployment

### AWS Deployment

#### Option 1: AWS EC2

1. **Launch EC2 Instance**
```bash
# Ubuntu 22.04 LTS
# t3.medium or larger recommended
# Configure security group: HTTP (80), HTTPS (443), SSH (22)
```

2. **Setup Instance**
```bash
# Connect to instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Docker (optional)
sudo apt-get install docker.io docker-compose -y
sudo usermod -aG docker ubuntu
```

3. **Deploy Application**
```bash
# Clone repository
git clone https://github.com/oovaa/dara.git
cd dara

# Install dependencies
npm install --production

# Configure environment
sudo nano /etc/environment
# Add: API_KEY=your_key_here

# Setup PM2
sudo npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 startup
pm2 save
```

#### Option 2: AWS ECS (Elastic Container Service)

1. **Create Task Definition**
```json
{
  "family": "dara-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "dara",
      "image": "your-account.dkr.ecr.region.amazonaws.com/dara:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "API_KEY",
          "value": "your-api-key"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/dara-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

2. **Create ECS Service**
```bash
aws ecs create-service \
  --cluster dara-cluster \
  --service-name dara-service \
  --task-definition dara-app \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
```

### Google Cloud Platform

#### Cloud Run Deployment

1. **Build and Push Image**
```bash
# Build image
docker build -t gcr.io/your-project/dara .

# Push to Container Registry
docker push gcr.io/your-project/dara
```

2. **Deploy to Cloud Run**
```bash
gcloud run deploy dara \
  --image gcr.io/your-project/dara \
  --platform managed \
  --region us-central1 \
  --set-env-vars API_KEY=your-key,NODE_ENV=production \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1
```

### Microsoft Azure

#### Azure Container Instances

```bash
az container create \
  --resource-group dara-rg \
  --name dara-app \
  --image your-registry/dara:latest \
  --ports 3000 \
  --environment-variables \
    NODE_ENV=production \
    API_KEY=your-key \
  --memory 1 \
  --cpu 1
```

## 🖥️ Traditional Server Deployment

### Ubuntu/Debian Server

1. **System Preparation**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install PM2
sudo npm install -g pm2
```

2. **Application Setup**
```bash
# Create application user
sudo useradd -m -s /bin/bash dara
sudo usermod -aG sudo dara

# Switch to application user
sudo su - dara

# Clone and setup application
git clone https://github.com/oovaa/dara.git
cd dara
npm install --production

# Create environment file
cat > .env << EOF
NODE_ENV=production
PORT=3000
API_KEY=your_cohere_api_key
FRONT_DOMAIN=https://yourdomain.com
MAX_FILE_SIZE=10485760
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF

# Set proper permissions
chmod 600 .env
mkdir -p uploads downloads logs
chmod 755 uploads downloads logs
```

3. **PM2 Configuration**
```bash
# Start application with PM2
pm2 start ecosystem.config.cjs

# Setup startup script
pm2 startup
pm2 save

# Monitor application
pm2 status
pm2 logs dara
```

4. **Nginx Configuration**
```nginx
# /etc/nginx/sites-available/dara
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    ssl_dhparam /etc/nginx/dhparam.pem;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    location /uploads/ {
        deny all;
        return 404;
    }
}
```

5. **Enable Nginx Site**
```bash
sudo ln -s /etc/nginx/sites-available/dara /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Security Configuration

### SSL/TLS Setup

#### Using Let's Encrypt (Free)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### Using Custom Certificate
```bash
# Generate self-signed certificate (development only)
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/dara-selfsigned.key \
  -out /etc/ssl/certs/dara-selfsigned.crt
```

### Firewall Configuration
```bash
# Ubuntu UFW
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# Check status
sudo ufw status
```

### Security Headers
Already configured in the application:
- Helmet.js for security headers
- CORS protection
- Rate limiting
- Input validation

## 📊 Monitoring and Maintenance

### Health Checks
```bash
# Application health
curl -f http://localhost:3000/ || exit 1

# PM2 status
pm2 status

# System resources
htop
df -h
free -m
```

### Log Management
```bash
# PM2 logs
pm2 logs dara --lines 100

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u nginx -f
```

### Backup Strategy
```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/dara/backups"
APP_DIR="/home/dara/dara"

mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/dara_app_$DATE.tar.gz \
  --exclude=node_modules \
  --exclude=uploads \
  --exclude=downloads \
  $APP_DIR

# Backup uploads (if needed)
tar -czf $BACKUP_DIR/dara_uploads_$DATE.tar.gz $APP_DIR/uploads

# Keep only last 7 days of backups
find $BACKUP_DIR -name "dara_*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x backup.sh

# Add to crontab for daily backups
crontab -e
# Add: 0 2 * * * /home/dara/backup.sh
```

### Updates and Maintenance
```bash
# Update application
cd /home/dara/dara
git pull origin main
npm install --production
pm2 restart dara

# Update system packages
sudo apt update && sudo apt upgrade -y
sudo reboot  # if kernel updates
```

## 🚨 Troubleshooting

### Common Deployment Issues

#### Port Already in Use
```bash
# Find process using port 3000
sudo lsof -i :3000
sudo kill -9 <PID>
```

#### Permission Issues
```bash
# Fix file permissions
sudo chown -R dara:dara /home/dara/dara
chmod 755 uploads downloads
```

#### Memory Issues
```bash
# Check memory usage
free -m
pm2 monit

# Restart if needed
pm2 restart dara
```

#### SSL Certificate Issues
```bash
# Test SSL
openssl s_client -connect yourdomain.com:443

# Renew Let's Encrypt
sudo certbot renew --dry-run
```

### Deployment Verification Checklist

- [ ] Application starts without errors
- [ ] Health endpoint responds (GET /)
- [ ] API endpoints work (POST /api/sum)
- [ ] File uploads function correctly
- [ ] SSL certificate is valid
- [ ] Rate limiting is active
- [ ] Logs are being written
- [ ] PM2 monitoring is active
- [ ] Nginx proxy is working
- [ ] Backups are configured
- [ ] Security headers are present