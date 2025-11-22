#!/bin/bash

# Socialgram Deployment Script
# This script helps you deploy to various platforms

set -e

echo "🚀 Socialgram Deployment Assistant"
echo "===================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo ""
    echo "Create .env file from .env.example:"
    echo "  cp .env.example .env"
    echo ""
    echo "Then fill in your credentials:"
    echo "  - MONGODB_URI"
    echo "  - SESSION_SECRET"
    echo "  - CLOUDINARY credentials"
    exit 1
fi

echo "✅ Environment file found"
echo ""

# Menu
echo "Choose deployment platform:"
echo ""
echo "1) Railway.app (Recommended - Easiest)"
echo "2) Render.com"
echo "3) Docker (Local or Custom VPS)"
echo "4) Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚂 Railway.app Deployment"
        echo "========================="
        echo ""
        echo "1. Install Railway CLI:"
        echo "   npm install -g @railway/cli"
        echo ""
        echo "2. Login to Railway:"
        echo "   railway login"
        echo ""
        echo "3. Link to project:"
        echo "   railway init"
        echo ""
        echo "4. Add MongoDB plugin:"
        echo "   railway add"
        echo ""
        echo "5. Set environment variables:"
        echo "   railway variables:set KEY=VALUE"
        echo ""
        echo "6. Deploy:"
        echo "   railway deploy"
        echo ""
        read -p "Have you completed these steps? (y/n): " completed
        if [ "$completed" = "y" ]; then
            echo "✅ Deployment to Railway.app complete!"
            echo "View your app: railway open"
        fi
        ;;
    2)
        echo ""
        echo "🎨 Render.com Deployment"
        echo "========================"
        echo ""
        echo "1. Go to render.com and sign up with GitHub"
        echo ""
        echo "2. Create new Web Service"
        echo ""
        echo "3. Connect your GitHub repository"
        echo ""
        echo "4. Settings:"
        echo "   Name: socialgram"
        echo "   Build Command: npm run build"
        echo "   Start Command: npm start"
        echo ""
        echo "5. Create MongoDB database in Render"
        echo ""
        echo "6. Add environment variables (from your .env file)"
        echo ""
        echo "7. Click Deploy"
        echo ""
        echo "✅ Render.com will deploy automatically!"
        ;;
    3)
        echo ""
        echo "🐳 Docker Deployment"
        echo "==================="
        echo ""
        echo "1. Build Docker image:"
        echo "   docker build -t socialgram ."
        echo ""
        echo "2. Run with Docker Compose (local MongoDB):"
        echo "   docker-compose up"
        echo ""
        echo "3. For production, push to container registry:"
        echo "   docker tag socialgram:latest your-registry/socialgram:latest"
        echo "   docker push your-registry/socialgram:latest"
        echo ""
        echo "4. Deploy to your cloud provider (AWS, GCP, Azure, etc.)"
        echo ""
        echo "For detailed instructions, see DEPLOYMENT.md"
        ;;
    4)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "📖 For detailed deployment instructions, see DEPLOYMENT.md"
echo ""
