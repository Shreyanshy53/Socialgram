# Socialgram - Instagram-like Social Media Platform

A full-stack social media platform built with React, Express.js, MongoDB, and real-time features. Share your moments, connect with friends, and discover amazing content from people around the world.

**Live Demo:** Deployed on Replit with Replit Auth, MongoDB, and Cloudinary integration.

## Features

### 🔐 Authentication
- Secure authentication using email/password with bcryptjs hashing
- Protected routes and authentication middleware
- Session-based authentication with express-session
- User profile synchronization on login

### 👤 User Features
- User profiles with bio, profile photo, and stats
- Follow and unfollow users to build your network
- Edit profile information and photo with real-time updates
- View other user profiles with follower/following counts
- Beautiful profile grid displaying all user posts

### 📝 Posts & Content
- Create posts with images and captions
- Edit and delete your own posts
- Like and unlike posts with instant feedback
- Comment on posts with nested comment threads
- View likes and comments count
- Image upload via Cloudinary CDN with automatic optimization
- Beautiful Instagram-style grid layout

### 🏠 Feed & Explore
- Homepage feed showing posts from users you follow
- Explore page with all posts from the community
- Full-text search functionality for users and posts
- Trending content discovery
- Beautiful responsive grid layout

### 💬 Real-time Chat
- One-to-one messaging with WebSocket support
- Real-time message delivery and status indicators
- Complete chat history persistence in MongoDB
- Online/offline status tracking
- Unread message counts
- Audio and video call buttons

### 🔔 Notifications
- Real-time notifications for likes, comments, and follows
- Notification badge with unread count
- Mark notifications as read
- Stored in MongoDB with proper indexing

## Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **Wouter** - Lightweight routing (3KB)
- **TanStack Query (React Query)** - Server state management and caching
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **TypeScript** - Type-safe development
- **Vite** - Modern build tooling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **WebSocket (ws)** - Real-time bidirectional communication
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage and transformation
- **bcryptjs** - Password hashing
- **TypeScript** - Type-safe backend development

### Infrastructure
- **Replit** - Cloud development and deployment platform
- **MongoDB Atlas** - Cloud MongoDB database hosting
- **Cloudinary** - Image CDN and transformation

## Setup Instructions

### Prerequisites
- **Node.js 20+** - Download from [nodejs.org](https://nodejs.org/)
- **npm** - Comes with Node.js
- **MongoDB Account** - Free tier at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** - Free tier at [cloudinary.com](https://cloudinary.com/)
- **Git** - For cloning the repository

### Quick Start on Replit

1. Fork this repository on Replit
2. Environment variables are auto-configured:
   - `MONGODB_URI` - Your MongoDB connection string
   - `SESSION_SECRET` - Auto-generated session secret
   - `CLOUDINARY_*` - Already configured
3. Click "Run" to start the development server
4. Click "Publish" to get a public URL

---

## Local Development Setup (Step-by-Step)

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd socialgram

# Install all dependencies
npm install
```

### Step 2: Set up MongoDB

**Option A: MongoDB Atlas (Cloud - Recommended)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project
4. Create a new cluster (free tier available)
5. Click "Connect" and choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database password
8. Your URI will look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/socialgram`

**Option B: MongoDB Local (Desktop)**

1. Download MongoDB from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install MongoDB Community Edition
3. Start MongoDB:
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Windows - MongoDB runs as a service
   # Linux
   sudo systemctl start mongod
   ```
4. Your local URI: `mongodb://localhost:27017/socialgram`

### Step 3: Set up Cloudinary for Image Uploads

1. Go to [cloudinary.com](https://cloudinary.com/)
2. Sign up for a free account
3. Go to Dashboard to find:
   - **Cloud Name** - Displayed at the top
   - **API Key** - Shown in API Keys section
   - **API Secret** - Shown in API Keys section (keep this secret!)

### Step 4: Create `.env` File

Create a `.env` file in the root directory with:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/socialgram

# Session Secret (create a random string)
SESSION_SECRET=your-super-secret-random-key-at-least-32-characters-long

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Replit Auth (only needed if using Replit Auth)
ISSUER_URL=https://replit.com/oidc
REPL_ID=your-repl-id
```

**Example with real values:**
```env
MONGODB_URI=mongodb+srv://shreyanshy:MySecurePassword123@cluster0.abc123.mongodb.net/socialgram
SESSION_SECRET=aVeryLongRandomString1234567890abcdefghijklmnopqrstuvwxyz
CLOUDINARY_CLOUD_NAME=dv4k2p9z5
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdef_g1h2i3j4k5l6m7n8o9p0
```

### Step 5: Run the Development Server

```bash
# Start the development server
npm run dev
```

**Expected output:**
```
Connecting to MongoDB...
MongoDB connected successfully
4:41:47 AM [express] serving on port 5000
```

The app will be available at: **http://localhost:5000**

### Step 6: Create Your Account

1. Open http://localhost:5000 in your browser
2. Click "Sign Up"
3. Enter your email and password
4. Complete your profile
5. Start sharing posts!

---

## Production Build & Deployment

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Deploy to Replit (Easiest)

1. Fork this repo on Replit
2. Click "Run" 
3. Click "Publish" to get a public URL
4. Share your public Replit URL with friends!

### Deploy to Railway

```bash
# 1. Create Railway project and connect GitHub
# 2. Add MongoDB Atlas database
# 3. Set environment variables in Railway dashboard
# 4. Deploy with git push
```

### Deploy to Render

```bash
# 1. Connect GitHub repository to Render
# 2. Add MongoDB connection string
# 3. Configure environment variables
# 4. Deploy automatically on push
```

---

## Troubleshooting

### Problem: MongoDB Connection Failed
```
Error: ENOTFOUND cluster0.xxxxx.mongodb.net
```
**Solution:**
- Check your `MONGODB_URI` is correct
- Ensure MongoDB Atlas IP is whitelowed (allow 0.0.0.0/0 for development)
- Test connection with MongoDB Compass (download from mongodb.com)

### Problem: Cloudinary Upload Not Working
```
Error: Upload failed - Invalid API key
```
**Solution:**
- Verify `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are correct
- Check you copied them from the right Cloudinary dashboard
- Restart server after changing env vars

### Problem: "Cannot find module" or TypeScript errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript
npm run check
```

### Problem: Port 5000 Already in Use
```bash
# Find and kill process using port 5000
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use a different port in server/index-dev.ts
```

### Problem: Hot Module Reloading Not Working
- Restart dev server: Press `Ctrl+C` and run `npm run dev` again
- Clear browser cache: `Ctrl+Shift+Delete`
- Hard refresh: `Ctrl+Shift+R`

---

## Project Structure

```
socialgram/
├── client/                     # React frontend (Vite)
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── ui/           # Shadcn UI components
│   │   │   ├── Navbar.tsx    # Navigation bar
│   │   │   ├── PostCard.tsx  # Post display component
│   │   │   └── CreatePostModal.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   │   ├── queryClient.ts
│   │   │   └── api.ts
│   │   ├── pages/            # Page components
│   │   │   ├── Landing.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Explore.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Messages.tsx
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Vite entry point
│   │   └── index.css         # Global styles
│   └── index.html            # HTML template
│
├── server/                     # Express backend
│   ├── db.ts                 # MongoDB schemas & models
│   ├── storage.ts            # Data access layer (CRUD)
│   ├── routes.ts             # API endpoints
│   ├── auth.ts               # Authentication logic
│   ├── app.ts                # Express app setup
│   ├── index-dev.ts          # Development entry point
│   └── index-prod.ts         # Production entry point
│
├── shared/                     # Shared code
│   └── schema.ts             # Zod schemas & TypeScript types
│
├── .env                       # Environment variables (CREATE THIS)
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

---

## API Endpoints Reference

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user (requires auth)
- `GET /api/logout` - Logout user

### Posts
- `POST /api/posts` - Create new post
- `GET /api/posts` - Get all posts
- `GET /api/feed` - Get feed posts (users you follow)
- `GET /api/explore` - Get explore posts (with optional search)
- `DELETE /api/posts/:postId` - Delete post

### Interactions
- `POST /api/posts/:postId/comments` - Comment on post
- `POST /api/posts/:postId/like` - Like a post
- `DELETE /api/posts/:postId/like` - Unlike a post

### Social
- `POST /api/users/:userId/follow` - Follow user
- `DELETE /api/users/:userId/follow` - Unfollow user
- `GET /api/profile/:userId` - Get user profile
- `PATCH /api/profile` - Update your profile

### Messaging
- `POST /api/messages` - Send message
- `GET /api/messages/:userId` - Get messages with user
- `GET /api/conversations` - Get all conversations

### Notifications
- `GET /api/notifications` - Get your notifications
- `PATCH /api/notifications/:id/read` - Mark as read

### Media
- `POST /api/upload` - Upload image to Cloudinary

---

## Database Schema (MongoDB Collections)

### Users
```javascript
{
  id: String,              // UUID
  email: String,           // Unique email
  password: String,        // Hashed password
  firstName: String,       
  lastName: String,        
  username: String,        // Unique username
  profileImageUrl: String, // Cloudinary URL
  bio: String,            
  createdAt: Date,        
  updatedAt: Date         
}
```

### Posts
```javascript
{
  id: String,             // UUID
  userId: String,         // Author ID
  imageUrl: String,       // Cloudinary URL
  caption: String,        
  createdAt: Date,
  updatedAt: Date
}
```

### Comments, Likes, Follows, Messages, Notifications
See README lines 293-345 for full schema details.

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:5000

# Production
npm run build            # Build for production
npm start               # Start production server
npm run check           # Check TypeScript types

# Database
npm run db:push         # Sync database schema (if using Drizzle)
```

---

## Features Roadmap

Future enhancements:
- Stories with 24-hour expiration
- Hashtag system with trending tags
- Direct message groups
- Advanced notification settings
- Post bookmarking and collections
- User recommendations algorithm
- Live streaming support
- Video post support
- Reels / Short videos
- Voice notes in chat
- Location-based posts

---

## Contributing

Contributions are welcome! This is an open-source project built for learning.

---

## License

MIT License - feel free to use this project for learning!

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Open an issue on the repository
3. Check MongoDB Atlas logs
4. Check Cloudinary console

---

**Built with ❤️ using modern web technologies**

Made for developers who want to learn full-stack development with a practical, real-world project.

Happy coding! 🚀
