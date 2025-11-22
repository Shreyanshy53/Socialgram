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
- PostgreSQL as primary database
- Drizzle ORM for type-safe database queries and schema management
- Neon serverless PostgreSQL driver for connection pooling
- Schema-first approach with generated TypeScript types

**Database Schema Design**
- Users table: profiles, authentication metadata, profile images
- Posts table: user-generated content with images and captions
- Comments table: post interactions with cascade deletion
- Likes table: many-to-many relationship between users and posts
- Follows table: social graph for user relationships
- Messages table: one-to-one chat history
- Notifications table: activity feed for likes, comments, follows
- Sessions table: server-side session storage for authentication

**API Architecture**
- RESTful endpoints with resource-based routing
- Separation of concerns: routes, storage layer, database operations
- Storage abstraction layer providing clean interface for data operations
- Request/response validation using Zod schemas
- Protected routes requiring authentication middleware

### Authentication System

**Replit Auth Integration**
- OpenID Connect (OIDC) flow for secure authentication
- Passport.js strategy for session management
- Multiple authentication providers: Google, GitHub, Twitter, Apple, email/password
- Token-based authentication with refresh token support
- PostgreSQL-backed session storage using connect-pg-simple
- Session expiration: 7 days with automatic renewal
- User profile synchronization on login

**Session Management**
- HTTP-only cookies for security
- Secure flag enabled for production environments
- CSRF protection through session secrets
- Automatic session cleanup and TTL management

### Real-time Communication

**WebSocket Architecture**
- Socket.IO for bidirectional real-time communication
- Room-based messaging for one-to-one conversations
- Online/offline user status tracking
- Automatic reconnection handling
- Message delivery confirmation

**Real-time Features**
- Instant message delivery in chat interface
- Live notification updates for likes, comments, follows
- Unread message count synchronization
- Typing indicators and presence information

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

## External Dependencies

### Third-party Services

**Cloudinary**
- Purpose: Image hosting and transformation CDN
- Configuration: Cloud name, API key, API secret via environment variables
- Usage: Profile photos, post images with automatic optimization

**Replit Auth**
- Purpose: Authentication and user identity provider
- Configuration: Issuer URL, OIDC discovery endpoint
- Integration: OpenID Connect with Passport.js strategy

**Neon Database**
- Purpose: Serverless PostgreSQL database hosting
- Configuration: DATABASE_URL environment variable
- Features: Connection pooling, WebSocket support for serverless environments

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
- Drizzle ORM for database operations
- Passport.js for authentication
- Socket.IO for WebSocket communication
- Multer for file uploads

**UI & Styling**
- Tailwind CSS for styling
- Radix UI for accessible components
- Lucide React for icons
- class-variance-authority for component variants
- date-fns for date formatting

### Environment Configuration

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption key
- `CLOUDINARY_CLOUD_NAME`: Cloudinary account identifier
- `CLOUDINARY_API_KEY`: Cloudinary API authentication
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `ISSUER_URL`: Replit Auth OIDC issuer (defaults to replit.com/oidc)
- `REPL_ID`: Replit environment identifier