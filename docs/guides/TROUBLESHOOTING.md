# Troubleshooting Guide

This guide helps you diagnose and resolve common issues with the Dara application.

## 🆘 Quick Diagnostics

### Health Check Commands
```bash
# Check if server is running
curl -f http://localhost:3000/ || echo "Server not responding"

# Check API endpoints
curl -X POST http://localhost:3000/api/sum -F 'file=@test.txt'

# Check process status
pm2 status
ps aux | grep node

# Check port usage
lsof -i :3000
netstat -tulpn | grep :3000

# Check logs
pm2 logs dara --lines 20
tail -f /var/log/nginx/error.log
```

## 🚨 Common Issues and Solutions

### 1. Server Won't Start

#### Issue: "Port already in use"
```bash
Error: listen EADDRINUSE :::3000
```

**Diagnosis**:
```bash
lsof -i :3000
ps aux | grep node
```

**Solutions**:
```bash
# Option 1: Kill the process
lsof -ti:3000 | xargs kill -9

# Option 2: Change port
export PORT=3001
# or edit .env file

# Option 3: Find and stop conflicting service
sudo systemctl stop nginx  # if nginx is using the port
```

#### Issue: "Permission denied" on port binding
```bash
Error: listen EACCES :::80
```

**Solutions**:
```bash
# Option 1: Use port > 1024
export PORT=3000

# Option 2: Run with sudo (not recommended)
sudo npm start

# Option 3: Use setcap (Linux)
sudo setcap cap_net_bind_service=+ep /usr/bin/node
```

#### Issue: "Module not found"
```bash
Error: Cannot find module 'express'
```

**Solutions**:
```bash
# Install dependencies
npm install

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Check Node.js version
node --version  # Should be v20+
```

### 2. API Key Issues

#### Issue: "API key not provided"
```bash
Error: API key not provided or invalid
```

**Diagnosis**:
```bash
# Check environment variables
echo $API_KEY
env | grep API_KEY

# Check .env file
cat .env | grep API_KEY
```

**Solutions**:
```bash
# Set API key in .env file
echo "API_KEY=your_cohere_api_key_here" >> .env

# Set temporarily
export API_KEY=your_cohere_api_key_here

# Restart application
pm2 restart dara
```

#### Issue: "Invalid API key"
```bash
Error: API key is invalid or expired
```

**Solutions**:
1. **Verify key format**: Cohere keys start with `co-`
2. **Check key status**: Log into Cohere dashboard
3. **Generate new key**: Create new API key if expired
4. **Update environment**: Update `.env` with new key

### 3. File Upload Issues

#### Issue: "No file uploaded"
```bash
Error: No file was uploaded
```

**Diagnosis**:
```bash
# Test with curl
curl -X POST http://localhost:3000/api/sum \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test.txt"

# Check file exists
ls -la test.txt
```

**Solutions**:
1. **Check file parameter**: Ensure field name is `file`
2. **Verify content-type**: Use `multipart/form-data`
3. **Test with different file**: Try with a simple text file
4. **Check file permissions**: Ensure file is readable

#### Issue: "Unsupported file type"
```bash
Error: Unsupported file type: .xlsx
```

**Solutions**:
```bash
# Check supported formats
echo "Supported: .pdf, .docx, .pptx, .txt"

# Convert file format
# Excel to CSV: Use Excel "Save As" feature
# Or update ALLOWED_FILE_TYPES in .env
```

#### Issue: "File too large"
```bash
Error: File size exceeds maximum allowed limit
```

**Solutions**:
```bash
# Check current limit
echo $MAX_FILE_SIZE

# Increase limit in .env (bytes)
echo "MAX_FILE_SIZE=20971520" >> .env  # 20MB

# Check actual file size
ls -lh your-file.pdf

# Restart server
pm2 restart dara
```

### 4. AI Processing Errors

#### Issue: "Processing timeout"
```bash
Error: Request timeout during AI processing
```

**Solutions**:
1. **Try smaller file**: Reduce document size
2. **Check API quotas**: Verify Cohere API limits
3. **Retry request**: Temporary API issues
4. **Increase timeout**: Modify server timeout settings

#### Issue: "AI service unavailable"
```bash
Error: Failed to connect to Cohere AI service
```

**Diagnosis**:
```bash
# Test API connectivity
curl -H "Authorization: Bearer $API_KEY" \
  https://api.cohere.ai/v1/models

# Check network connectivity
ping api.cohere.ai
```

**Solutions**:
1. **Check internet connection**
2. **Verify API key**: Test with Cohere dashboard
3. **Check firewall**: Ensure outbound HTTPS allowed
4. **Retry later**: API may be temporarily down

### 5. Memory and Performance Issues

#### Issue: "Out of memory"
```bash
Error: JavaScript heap out of memory
```

**Diagnosis**:
```bash
# Check memory usage
free -m
ps aux --sort=-%mem | head

# Check Node.js memory
node -e "console.log(process.memoryUsage())"
```

**Solutions**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Restart with PM2
pm2 restart dara

# Process smaller files
# Add file size limits
# Implement memory cleanup
```

#### Issue: "High CPU usage"
```bash
# Server becomes unresponsive under load
```

**Diagnosis**:
```bash
# Check CPU usage
top
htop
pm2 monit
```

**Solutions**:
1. **Scale with PM2**: `pm2 start ecosystem.config.cjs -i max`
2. **Implement queuing**: Process files sequentially
3. **Add rate limiting**: Reduce concurrent requests
4. **Optimize processing**: Cache results when possible

### 6. Network and Connectivity Issues

#### Issue: "Connection refused"
```bash
curl: (7) Failed to connect to localhost port 3000: Connection refused
```

**Diagnosis**:
```bash
# Check if server is running
pm2 status
systemctl status dara  # if using systemd

# Check port binding
netstat -tulpn | grep 3000
ss -tulpn | grep 3000
```

**Solutions**:
```bash
# Start server
pm2 start ecosystem.config.cjs

# Check firewall
sudo ufw status
sudo iptables -L

# Bind to all interfaces
export HOST=0.0.0.0
```

#### Issue: "Proxy errors" (with Nginx)
```bash
502 Bad Gateway
504 Gateway Timeout
```

**Diagnosis**:
```bash
# Check Nginx configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Test backend directly
curl http://localhost:3000/
```

**Solutions**:
```bash
# Fix Nginx config
sudo nano /etc/nginx/sites-available/dara

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Check upstream server
curl http://localhost:3000/
```

## 🔍 Advanced Debugging

### Enable Debug Logging
```bash
# Set debug log level
export LOG_LEVEL=debug

# Enable Node.js debug
export DEBUG=*

# Restart with verbose logging
pm2 restart dara
```

### Memory Profiling
```javascript
// Add to your application for memory debugging
const memoryUsage = process.memoryUsage();
console.log('Memory usage:', {
  rss: Math.round(memoryUsage.rss / 1024 / 1024) + ' MB',
  heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + ' MB',
  heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + ' MB'
});
```

### Performance Profiling
```bash
# Profile with Node.js built-in profiler
node --prof index.js

# Generate readable report
node --prof-process isolate-*-v8.log > processed.txt
```

### Network Debugging
```bash
# Test API with verbose output
curl -v -X POST http://localhost:3000/api/sum \
  -F 'file=@test.txt'

# Monitor network traffic
sudo tcpdump -i any port 3000

# Check DNS resolution
nslookup api.cohere.ai
dig api.cohere.ai
```

## 📊 Monitoring and Alerts

### PM2 Monitoring
```bash
# Real-time monitoring
pm2 monit

# Setup email alerts
pm2 install pm2-auto-pull
pm2 set pm2-auto-pull:password your_password
```

### Log Analysis
```bash
# Search for errors
grep -i error /var/log/dara.log
pm2 logs dara | grep ERROR

# Count error types
grep -i "api key" /var/log/dara.log | wc -l
grep -i "timeout" /var/log/dara.log | wc -l
```

### Health Monitoring Script
```bash
#!/bin/bash
# health-check.sh

URL="http://localhost:3000"
TIMEOUT=10

if curl -sf --max-time $TIMEOUT "$URL" > /dev/null; then
    echo "$(date): Service is healthy"
    exit 0
else
    echo "$(date): Service is down - restarting"
    pm2 restart dara
    
    # Send alert (email, Slack, etc.)
    # curl -X POST -H 'Content-type: application/json' \
    #   --data '{"text":"Dara service was down and restarted"}' \
    #   YOUR_SLACK_WEBHOOK_URL
    
    exit 1
fi
```

## 🛠️ Preventive Measures

### Regular Maintenance
```bash
# Weekly maintenance script
#!/bin/bash
# maintenance.sh

echo "Starting weekly maintenance..."

# Update system packages
sudo apt update && sudo apt upgrade -y

# Clear old logs
pm2 flush dara

# Clean up uploads (older than 7 days)
find /path/to/uploads -type f -mtime +7 -delete

# Restart application
pm2 restart dara

# Backup configuration
cp .env .env.backup.$(date +%Y%m%d)

echo "Maintenance completed"
```

### Monitoring Checklist
- [ ] Server response time < 2 seconds
- [ ] Memory usage < 80%
- [ ] CPU usage < 70%
- [ ] Disk space > 20% free
- [ ] Error rate < 1%
- [ ] API key not expired
- [ ] SSL certificate valid
- [ ] Backups running successfully

## 📞 Getting Help

### Documentation Resources
- [API Documentation](../api/API.md)
- [Development Guide](DEVELOPMENT.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Environment Variables](ENVIRONMENT.md)

### Community Support
- **GitHub Issues**: [Report bugs and feature requests](https://github.com/oovaa/dara/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/oovaa/dara/discussions)

### Professional Support
- **Email**: [Contact the development team](mailto:support@example.com)
- **Documentation**: This comprehensive documentation
- **Code Review**: Submit pull requests for improvements

## ❓ Frequently Asked Questions

### Q: How do I change the AI model?
**A**: Update the `COHERE_MODEL` environment variable and restart the application.

### Q: Can I process multiple files simultaneously?
**A**: Currently, files are processed one at a time. Concurrent processing is planned for future releases.

### Q: What's the maximum file size?
**A**: Default is 10MB, configurable via `MAX_FILE_SIZE` environment variable.

### Q: How do I add support for new file types?
**A**: Add new loaders in `utils/parser.js` and update the `ALLOWED_FILE_TYPES` configuration.

### Q: Is there a rate limit?
**A**: Yes, 100 requests per 15 minutes per IP by default. Configurable via environment variables.

### Q: How do I backup uploaded files?
**A**: Implement regular backups of the uploads directory using cron jobs or cloud storage solutions.

### Q: Can I use a different AI provider?
**A**: Currently only Cohere is supported. Adding other providers would require code modifications.

### Q: How do I scale for high traffic?
**A**: Use PM2 clustering, load balancers, and consider container orchestration platforms like Kubernetes.