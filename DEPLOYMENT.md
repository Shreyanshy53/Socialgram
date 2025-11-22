# Deployment Guide - Socialgram

This guide covers deployment options for the Socialgram social media platform.

## 📋 Pre-Deployment Checklist

Before deploying to any platform, ensure you have:

- ✅ MongoDB Atlas account (free tier available)
- ✅ Cloudinary account for image storage
- ✅ Environment variables configured correctly
- ✅ Production database connection tested
- ✅ `npm run build` succeeds without errors

## 🚀 Quick Deployment Options

### Option 1: Railway.app (Recommended - Easiest)

Railway is the simplest way to deploy Node.js apps with MongoDB.

**Steps:**

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your Socialgram repository
   - Railway auto-detects Node.js

3. **Add MongoDB Plugin**
   - In Railway dashboard, click "Add Services"
   - Select "MongoDB"
   - Railway creates a MongoDB instance automatically

4. **Configure Environment Variables**
   - Go to Project Settings → Variables
   - Add these variables:
     ```
     MONGODB_URI=<from MongoDB plugin>
     SESSION_SECRET=<generate strong random string>
     CLOUDINARY_CLOUD_NAME=<your value>
     CLOUDINARY_API_KEY=<your value>
     CLOUDINARY_API_SECRET=<your value>
     NODE_ENV=production
     ```

5. **Deploy**
   - Railway auto-deploys when you push to main branch
   - Your app URL appears in the dashboard

**Cost:** ~$5/month (includes MongoDB + Node.js)

---

### Option 2: Render.com

**Steps:**

1. **Create Render Account** → Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Settings:
     - Name: socialgram
     - Environment: Node
     - Build Command: `npm run build`
     - Start Command: `npm start`

3. **Add MongoDB Database**
   - Click "New +" → "MongoDB"
   - Create instance

4. **Set Environment Variables**
   - In Web Service → Environment
   - Add all variables from `.env.example`

5. **Deploy**
   - Click Deploy
   - Render builds and deploys automatically

**Cost:** Free tier available (with limitations)

---

### Option 3: Docker + Any Cloud Provider

#### Step 1: Build Docker Image

```bash
# Build locally
docker build -t socialgram .

# Run locally
docker-compose up
```

#### Step 2: Deploy Container

**Heroku (if still available):**
```bash
docker login --username=_ --password=$(heroku auth:token) registry.heroku.com
docker tag socialgram registry.heroku.com/your-app-name/web
docker push registry.heroku.com/your-app-name/web
heroku container:release web -a your-app-name
```

**AWS ECS, Google Cloud Run, Azure Container Instances:**
- Push Docker image to container registry (ECR, GCR, ACR)
- Deploy from registry
- Set environment variables in deployment config

---

### Option 4: Traditional VPS (DigitalOcean, Linode, AWS EC2)

**Steps:**

1. **SSH into your server**
   ```bash
   ssh root@your_server_ip
   ```

2. **Install dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install Git
   sudo apt install -y git
   
   # Install PM2 (process manager)
   sudo npm install -g pm2
   ```

3. **Clone repository**
   ```bash
   cd /home/ubuntu
   git clone https://github.com/your-username/socialgram.git
   cd socialgram
   npm install
   ```

4. **Set environment variables**
   ```bash
   nano .env
   # Paste environment variables and save
   ```

5. **Build app**
   ```bash
   npm run build
   ```

6. **Start with PM2**
   ```bash
   pm2 start "npm start" --name socialgram
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx reverse proxy**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/socialgram
   ```

   Add:
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;

     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/socialgram /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🔐 Environment Variables for Production

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/socialgram

# Session & Security
SESSION_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
NODE_ENV=production

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional - Replit Auth
ISSUER_URL=https://replit.com/oidc
REPL_ID=your-repl-id
```

---

## 📊 Recommended Production Setup

### Tier 1: Hobby/Small Projects
- **Hosting:** Railway.app free tier
- **Database:** MongoDB Atlas free tier
- **Cost:** ~$5/month
- **Scalability:** Low (good for <100 daily users)

### Tier 2: Growing Projects
- **Hosting:** Railway.app ($10/month plan)
- **Database:** MongoDB Atlas M0 cluster
- **CDN:** Cloudinary free tier
- **Cost:** ~$15-20/month
- **Scalability:** Medium (good for <1000 daily users)

### Tier 3: Production Ready
- **Hosting:** AWS ECS or Kubernetes
- **Database:** MongoDB Atlas M10 cluster
- **CDN:** Cloudinary paid plan
- **Cache:** Redis for sessions
- **Storage:** S3 for backups
- **Cost:** $100+/month
- **Scalability:** High (supports thousands of users)

---

## 🐳 Docker Deployment

### Using Docker Compose (Development)

```bash
docker-compose up
```

This starts:
- Node.js server (localhost:5000)
- MongoDB (localhost:27017)

### Production Docker Build

```bash
# Build image
docker build -t socialgram:latest .

# Push to registry
docker tag socialgram:latest your-registry/socialgram:latest
docker push your-registry/socialgram:latest

# Deploy
# (Instructions vary by platform - see cloud provider docs)
```

---

## 🔍 Monitoring & Logging

### View Logs on Railway
```bash
railway logs
```

### View Logs on Render
- Dashboard → Logs tab

### Local PM2 Logs
```bash
pm2 logs socialgram
pm2 monit
```

### Production Monitoring
- **Better Stack:** Free uptime monitoring
- **Sentry:** Free error tracking
- **LogRocket:** Free session replay

---

## ✅ Post-Deployment Testing

```bash
# Test API endpoints
curl https://your-domain.com/api/auth/user

# Test uploads
# - Create post with image
# - Verify image loads from Cloudinary

# Test real-time messaging
# - Open app in two browsers
# - Send messages
# - Verify instant delivery

# Test performance
# - Use Lighthouse in DevTools
# - Check Network tab for load times
```

---

## 🆘 Troubleshooting

### "MongoDB connection failed"
- Verify `MONGODB_URI` is correct
- Check IP allowlist in MongoDB Atlas
- Ensure database exists

### "Cloudinary upload fails"
- Verify credentials are correct
- Check cloud name, API key, API secret
- Ensure account has upload permissions

### "WebSocket connection fails"
- Ensure WebSocket upgrade is enabled
- Check Nginx/proxy WebSocket config
- Verify firewall allows WebSocket connections

### "Port 5000 already in use"
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

---

## 📚 Additional Resources

- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.mongodb.com/atlas)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

## 🎯 Next Steps

1. Choose deployment platform
2. Set up database and file storage
3. Configure environment variables
4. Build and test locally
5. Deploy and verify
6. Setup monitoring and backups
7. Monitor performance and errors

Happy deploying! 🚀
