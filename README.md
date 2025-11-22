# Socialgram - Instagram-like Social Media Platform

A full-stack social media platform built with React, Express.js, MongoDB, and real-time features. Share your moments, connect with friends, and discover amazing content from people around the world.

**Live Demo:** Deployed on Replit with Replit Auth, MongoDB, and Cloudinary integration.

## Features

### 🔐 Authentication
- Secure authentication using Replit Auth (OpenID Connect)
- Login with Google, GitHub, X (Twitter), Apple, or email/password
- Protected routes and authentication middleware
- Automatic user profile synchronization on login

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
- Instant notifications for new messages

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
- **Replit Auth** - Authentication provider (OpenID Connect)
- **WebSocket (ws)** - Real-time bidirectional communication
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage and transformation
- **TypeScript** - Type-safe backend development

### Infrastructure
- **Replit** - Cloud development and deployment platform
- **MongoDB Atlas** - Cloud MongoDB database hosting
- **Cloudinary** - Image CDN and transformation

## Setup Instructions

### Prerequisites
- Node.js 20+ installed
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account for image uploads
- Replit account for deployment (optional but recommended)

### Quick Start on Replit

1. Fork this repository on Replit
2. Environment variables are auto-configured:
   - `MONGODB_URI` - Your MongoDB connection string
   - `SESSION_SECRET` - Auto-generated session secret
   - `CLOUDINARY_*` - Already configured
   - `REPLIT_AUTH` - Auto-configured for Replit Auth

3. Click "Run" to start the development server

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables** - Create a `.env` file in the root:
   ```env
   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/socialgram
   
   # Session
   SESSION_SECRET=your-random-secret-key-here
   
   # Replit Auth
   ISSUER_URL=https://replit.com/oidc
   REPL_ID=your-repl-id
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Frontend (Vite env vars must be prefixed with VITE_)
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

### Production Build

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

   The built app will run on the configured port (default 5000)

## Project Structure

```
socialgram/
├── client/                     # React frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Shadcn UI components
│   │   │   ├── Navbar.tsx    # Navigation bar
│   │   │   ├── PostCard.tsx  # Post display component
│   │   │   ├── CreatePostModal.tsx
│   │   │   └── EditProfileModal.tsx
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
├── server/                     # Express backend
│   ├── db.ts                 # MongoDB connection and models
│   ├── storage.ts            # Data access layer (CRUD)
│   ├── routes.ts             # API endpoints
│   ├── replitAuth.ts         # Replit Auth setup
│   ├── app.ts                # Express app setup
│   ├── index-dev.ts          # Development entry point
│   └── index-prod.ts         # Production entry point
├── shared/                     # Shared types and schemas
│   └── schema.ts             # Zod schemas and TypeScript types
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind CSS config
├── vite.config.ts            # Vite config
└── README.md                 # This file
```

## API Endpoints

### Authentication
- `GET /api/login` - Initiate OAuth login flow
- `GET /api/callback` - OAuth callback endpoint
- `GET /api/logout` - Logout user
- `GET /api/auth/user` - Get current authenticated user

### Posts
- `POST /api/posts` - Create a new post
- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts?userId=<id>` - Get posts by specific user
- `GET /api/feed` - Get posts from followed users
- `GET /api/explore?q=<query>` - Search posts and users
- `PATCH /api/posts/:postId` - Update post (caption)
- `DELETE /api/posts/:postId` - Delete a post

### Comments & Interactions
- `POST /api/posts/:postId/comments` - Add comment to post
- `GET /api/posts/:postId/comments` - Get post comments
- `DELETE /api/posts/:postId/comments/:commentId` - Delete comment
- `POST /api/posts/:postId/like` - Like a post
- `DELETE /api/posts/:postId/like` - Unlike a post

### Social Features
- `POST /api/users/:userId/follow` - Follow a user
- `DELETE /api/users/:userId/follow` - Unfollow a user
- `GET /api/profile/:userId` - Get user profile with stats
- `PATCH /api/profile` - Update own profile

### Messaging
- `POST /api/messages` - Send a message
- `GET /api/messages/:userId` - Get messages with a user
- `GET /api/conversations` - Get all conversations
- `PATCH /api/messages/:userId/read` - Mark messages as read

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark notification as read
- `PATCH /api/notifications/read-all` - Mark all as read

### Media
- `POST /api/upload` - Upload image to Cloudinary

## Deployment

### Deploy to Replit (Recommended)

1. Fork this repository
2. Click "Run" to deploy
3. Environment variables are auto-configured
4. Click "Publish" to get a public URL

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

## Database Schema (MongoDB Collections)

### Users Collection
```javascript
{
  id: String,              // Unique user ID
  email: String,           // User email
  firstName: String,       // First name
  lastName: String,        // Last name
  username: String,        // Unique username
  profileImageUrl: String, // Profile photo URL
  bio: String,            // User bio
  createdAt: Date,        // Account creation time
  updatedAt: Date         // Last updated
}
```

### Posts Collection
```javascript
{
  id: String,             // Unique post ID
  userId: String,         // Author ID
  imageUrl: String,       // Image URL from Cloudinary
  caption: String,        // Post caption
  createdAt: Date,
  updatedAt: Date
}
```

### Comments Collection
```javascript
{
  id: String,            // Comment ID
  postId: String,        // Parent post ID
  userId: String,        // Commenter ID
  content: String,       // Comment text
  createdAt: Date
}
```

### Likes Collection
```javascript
{
  id: String,           // Like ID
  postId: String,       // Post being liked
  userId: String,       // User who liked
  createdAt: Date
}
```

### Follows Collection
```javascript
{
  id: String,           // Relationship ID
  followerId: String,   // User following
  followingId: String,  // User being followed
  createdAt: Date
}
```

### Messages Collection
```javascript
{
  id: String,          // Message ID
  senderId: String,    // Sender ID
  receiverId: String,  // Receiver ID
  content: String,     // Message text
  read: Boolean,       // Read status
  createdAt: Date
}
```

### Notifications Collection
```javascript
{
  id: String,         // Notification ID
  userId: String,     // Recipient ID
  actorId: String,    // User who triggered notification
  type: String,       // 'like' | 'comment' | 'follow'
  postId: String,     // Related post (if applicable)
  read: Boolean,      // Read status
  createdAt: Date
}
```

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

## Contributing

Contributions are welcome! This is an open-source project built for learning. Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## License

MIT License - feel free to use this project for learning or building your own social platform!

## Support

For issues, questions, or feature requests, please open an issue on the repository or contact the maintainers.

---

**Built with ❤️ using modern web technologies**

Made for developers who want to learn full-stack development with a practical, real-world project.
