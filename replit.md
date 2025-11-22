# Socialgram - Instagram-like Social Media Platform

## Overview

Socialgram is a full-stack social media platform inspired by Instagram, built with modern web technologies. The application enables users to share photos, interact through likes and comments, follow other users, exchange real-time messages, and receive notifications for social interactions. The platform emphasizes a content-first design with familiar social media UX patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React-based single-page application using Vite for build tooling
- Client-side routing implemented with Wouter (lightweight alternative to React Router)
- Route protection based on authentication state, redirecting unauthenticated users to landing page

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management, caching, and data synchronization
- Custom query client with centralized API request handling
- Optimistic updates and automatic cache invalidation for real-time-like experience

**UI Component System**
- Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- shadcn/ui component library following "New York" style variant
- Design system inspired by Instagram with content-first philosophy

**Key Design Decisions**
- Mobile-first responsive design with container-based layouts (max-width constraints per page type)
- Instagram-style spacing units (2, 4, 6, 8, 12, 16) for consistent visual rhythm
- Custom color system with light/dark mode support through CSS variables
- Typography using Inter/DM Sans for clean, modern appearance

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for type-safe API development
- Separate development and production entry points for optimized builds
- Development mode includes Vite middleware for hot module replacement

**Database Layer**
- MongoDB as primary database with Mongoose ODM
- Schema-first approach with proper indexing for performance
- Separate development and production MongoDB connections

**Database Schema Design**
- Users table: profiles, authentication metadata, profile images
- Posts table: user-generated content with images and captions
- Comments table: post interactions with cascade deletion
- Likes table: many-to-many relationship between users and posts
- Follows table: social graph for user relationships
- Messages table: one-to-one chat history
- Notifications table: activity feed for likes, comments, follows

**API Architecture**
- RESTful endpoints with resource-based routing
- Separation of concerns: routes, storage layer, database operations
- Storage abstraction layer providing clean interface for data operations
- Request/response validation using Zod schemas
- Protected routes requiring authentication middleware

### Authentication System

**Email & Password Authentication**
- Secure authentication using bcryptjs for password hashing
- Express-session with MemoryStore for session management
- Session expiration and automatic cleanup
- Secure HTTP-only cookies
- User profile synchronization on login

**Session Management**
- Session-based authentication via express-session
- Configurable session secret from environment variables
- Proper session cleanup on logout

### Real-time Communication

**WebSocket Architecture**
- Native WebSocket (ws package) for bidirectional real-time communication
- Room-based messaging for one-to-one conversations
- Automatic reconnection handling
- Message delivery confirmation

**Real-time Features**
- Instant message delivery in chat interface
- Live notification updates for likes, comments, follows
- User search with real-time results
- Online/offline user status tracking

### File Upload & Storage

**Image Upload Strategy**
- Cloudinary integration for cloud-based image hosting
- Multer middleware for multipart form data handling
- Memory storage for temporary file processing
- Image optimization and transformation via Cloudinary API
- Secure upload with API key authentication
- URL-based image serving for performance

**Upload Flow**
- Client selects image file
- File uploaded to server endpoint with authentication
- Server forwards to Cloudinary with credentials
- Cloudinary URL returned and stored in database
- Images served directly from Cloudinary CDN

## Features

### Core Features
- ✅ User authentication (email/password with bcryptjs)
- ✅ User profiles with bio, follower/following counts
- ✅ Posts with image uploads via Cloudinary
- ✅ Like and comment on posts
- ✅ Follow/unfollow users
- ✅ Real-time messaging with WebSocket
- ✅ Search users by name
- ✅ Direct messaging capabilities
- ✅ Video call buttons (UI integrated)
- ✅ Notifications for interactions
- ✅ Feed based on following
- ✅ Explore page with search

## External Dependencies

### Third-party Services

**Cloudinary**
- Purpose: Image hosting and transformation CDN
- Configuration: Cloud name, API key, API secret via environment variables
- Usage: Profile photos, post images with automatic optimization

**MongoDB**
- Purpose: NoSQL database for data persistence
- Configuration: MONGODB_URI environment variable
- Features: Document storage with Mongoose ODM

### Key Libraries & Frameworks

**Runtime & Build**
- Node.js with ES modules
- TypeScript for type safety
- Vite for frontend bundling and development server
- esbuild for production backend bundling

**Frontend Core**
- React 18+ with hooks
- Wouter for routing
- TanStack Query for data fetching
- React Hook Form with Zod resolvers for form validation

**Backend Core**
- Express.js for HTTP server
- Mongoose for MongoDB operations
- Passport.js for authentication
- WebSocket (ws) for real-time communication
- Multer for file uploads

**UI & Styling**
- Tailwind CSS for styling
- Radix UI for accessible components
- Lucide React for icons
- class-variance-authority for component variants
- date-fns for date formatting

## Environment Configuration

Required environment variables:
- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: Session encryption key
- `CLOUDINARY_CLOUD_NAME`: Cloudinary account identifier
- `CLOUDINARY_API_KEY`: Cloudinary API authentication
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

Optional environment variables:
- `NODE_ENV`: Set to "production" for production builds
- `ISSUER_URL`: Replit Auth OIDC issuer (if using Replit Auth)
- `REPL_ID`: Replit environment identifier

## Recent Changes

### Latest Updates (Current Session)

1. **Fixed WebSocket Connection Issues**
   - Properly constructs WebSocket URL with hostname and port
   - Handles missing hostname gracefully
   - Improved error handling and logging

2. **Implemented User Search**
   - Added `/api/users/search` endpoint
   - Searches by firstName, lastName, username, and email
   - Case-insensitive MongoDB regex search
   - Excludes current user from results
   - Limited to 10 results for performance

3. **Integrated Direct Messaging with User Search**
   - Search box in Messages page
   - Click to start conversation with searched user
   - Real-time message sync via WebSocket
   - Conversation list with last message preview

4. **Added Video/Audio Call Integration**
   - Video call button in chat header
   - Audio call button in chat header
   - WebSocket integration for call notifications
   - Toast notifications for incoming calls

5. **Deployment Configuration**
   - Created Dockerfile for containerization
   - Added docker-compose.yml for local MongoDB setup
   - Created DEPLOYMENT.md with multi-platform guides
   - Added deploy.sh script for easy deployment
   - Updated .env.example with detailed documentation

## Deployment

### Quick Start Deployment

**Option 1: Railway.app (Recommended)**
```bash
npm install -g @railway/cli
railway login
railway init
railway add # Add MongoDB
railway deploy
```

**Option 2: Docker Compose (Local Development)**
```bash
docker-compose up
```

**Option 3: Production VPS**
See DEPLOYMENT.md for detailed instructions

### Deployment Checklist
- [ ] MongoDB connection tested
- [ ] Cloudinary credentials verified
- [ ] SESSION_SECRET configured
- [ ] `npm run build` succeeds
- [ ] Environment variables set in hosting platform
- [ ] Domain configured (if using custom domain)
- [ ] SSL certificate configured
- [ ] Uptime monitoring enabled
- [ ] Error tracking setup (optional but recommended)

## Local Development Setup

### Prerequisites
- Node.js 20+ 
- MongoDB (local or Atlas)
- Cloudinary account

### Steps

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/socialgram.git
   cd socialgram
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   Edit `.env` with your:
   - MongoDB URI
   - Cloudinary credentials
   - Session secret

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Access application**
   Open http://localhost:5000 in browser

## Production Build

```bash
# Build
npm run build

# Start
npm start
```

## Troubleshooting

### WebSocket Connection Issues
- Ensure WebSocket URL is properly constructed
- Check that server and client use same protocol (ws/wss)
- Verify port is accessible

### Image Upload Failures
- Check Cloudinary credentials
- Verify Cloudinary account has upload permissions
- Check .env file for correct API keys

### MongoDB Connection Issues
- Verify MONGODB_URI is correct
- Check IP allowlist in MongoDB Atlas
- Ensure database exists

See DEPLOYMENT.md for more troubleshooting

## Next Steps

1. Deploy to production using DEPLOYMENT.md guide
2. Setup monitoring and error tracking
3. Configure custom domain
4. Enable SSL/HTTPS
5. Setup automated backups
6. Monitor performance metrics
