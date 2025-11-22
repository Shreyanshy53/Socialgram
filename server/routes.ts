import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import {
  insertPostSchema,
  insertCommentSchema,
  insertLikeSchema,
  insertFollowSchema,
  insertMessageSchema,
  insertNotificationSchema,
} from "@shared/schema";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Image upload route
  app.post("/api/upload", isAuthenticated, upload.single("image"), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image provided" });
      }

      // Verify Cloudinary is configured
      if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.error("Cloudinary not configured. Missing env vars:", {
          cloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
          apiKey: !!process.env.CLOUDINARY_API_KEY,
          apiSecret: !!process.env.CLOUDINARY_API_SECRET,
        });
        return res.status(500).json({ message: "Server not configured for image uploads" });
      }

      // Upload to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "socialgram" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            }
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      res.json({ url: (uploadResult as any).secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}` });
    }
  });

  // Profile routes
  app.get("/api/profile/:userId", isAuthenticated, async (req: any, res) => {
    try {
      const { userId } = req.params;
      const currentUserId = req.user.id;
      const profile = await storage.getUserProfile(userId, currentUserId);
      
      if (!profile) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.patch("/api/profile", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { firstName, lastName, username, bio, profileImageUrl } = req.body;

      const updatedUser = await storage.updateUser(userId, {
        firstName,
        lastName,
        username,
        bio,
        profileImageUrl,
      });

      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Post routes
  app.post("/api/posts", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const postData = insertPostSchema.parse({ ...req.body, userId });
      const post = await storage.createPost(postData);
      res.json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.get("/api/posts", isAuthenticated, async (req: any, res) => {
    try {
      const { userId } = req.query;
      const currentUserId = req.user.id;
      const posts = await storage.getPostsWithDetails(userId, currentUserId);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/feed", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const feedPosts = await storage.getFeedPosts(userId);
      res.json(feedPosts);
    } catch (error) {
      console.error("Error fetching feed:", error);
      res.status(500).json({ message: "Failed to fetch feed" });
    }
  });

  app.get("/api/explore", isAuthenticated, async (req: any, res) => {
    try {
      const currentUserId = req.user.id;
      const { q } = req.query;
      const posts = await storage.getExplorePosts(currentUserId, q as string);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching explore posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.delete("/api/posts/:postId", isAuthenticated, async (req: any, res) => {
    try {
      const { postId } = req.params;
      const userId = req.user.id;
      
      const post = await storage.getPost(postId);
      if (!post || post.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await storage.deletePost(postId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // Comment routes
  app.post("/api/posts/:postId/comments", isAuthenticated, async (req: any, res) => {
    try {
      const { postId } = req.params;
      const userId = req.user.id;
      const commentData = insertCommentSchema.parse({ ...req.body, postId, userId });
      
      const comment = await storage.createComment(commentData);
      
      // Create notification
      const post = await storage.getPost(postId);
      if (post && post.userId !== userId) {
        await storage.createNotification({
          userId: post.userId,
          actorId: userId,
          type: "comment",
          postId,
        });
      }

      res.json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Like routes
  app.post("/api/posts/:postId/like", isAuthenticated, async (req: any, res) => {
    try {
      const { postId } = req.params;
      const userId = req.user.id;

      const alreadyLiked = await storage.isPostLiked(postId, userId);
      if (alreadyLiked) {
        return res.status(400).json({ message: "Already liked" });
      }

      const like = await storage.createLike({ postId, userId });

      // Create notification
      const post = await storage.getPost(postId);
      if (post && post.userId !== userId) {
        await storage.createNotification({
          userId: post.userId,
          actorId: userId,
          type: "like",
          postId,
        });
      }

      res.json(like);
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ message: "Failed to like post" });
    }
  });

  app.delete("/api/posts/:postId/like", isAuthenticated, async (req: any, res) => {
    try {
      const { postId } = req.params;
      const userId = req.user.id;

      await storage.deleteLike(postId, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error unliking post:", error);
      res.status(500).json({ message: "Failed to unlike post" });
    }
  });

  // Follow routes
  app.post("/api/users/:userId/follow", isAuthenticated, async (req: any, res) => {
    try {
      const { userId: followingId } = req.params;
      const followerId = req.user.id;

      if (followerId === followingId) {
        return res.status(400).json({ message: "Cannot follow yourself" });
      }

      const alreadyFollowing = await storage.isFollowing(followerId, followingId);
      if (alreadyFollowing) {
        return res.status(400).json({ message: "Already following" });
      }

      const follow = await storage.createFollow({ followerId, followingId });

      // Create notification
      await storage.createNotification({
        userId: followingId,
        actorId: followerId,
        type: "follow",
      });

      res.json(follow);
    } catch (error) {
      console.error("Error following user:", error);
      res.status(500).json({ message: "Failed to follow user" });
    }
  });

  app.delete("/api/users/:userId/follow", isAuthenticated, async (req: any, res) => {
    try {
      const { userId: followingId } = req.params;
      const followerId = req.user.id;

      await storage.deleteFollow(followerId, followingId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error unfollowing user:", error);
      res.status(500).json({ message: "Failed to unfollow user" });
    }
  });

  // Message routes
  app.post("/api/messages", isAuthenticated, async (req: any, res) => {
    try {
      const senderId = req.user.id;
      const messageData = insertMessageSchema.parse({ ...req.body, senderId });
      
      const message = await storage.createMessage(messageData);

      // Notify via WebSocket
      const wsMessage = JSON.stringify({
        type: "new_message",
        message,
      });

      connectedClients.forEach((client, userId) => {
        if (userId === messageData.receiverId && client.readyState === WebSocket.OPEN) {
          client.send(wsMessage);
        }
      });

      res.json(message);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.get("/api/messages/:userId", isAuthenticated, async (req: any, res) => {
    try {
      const currentUserId = req.user.id;
      const { userId: otherUserId } = req.params;

      const messages = await storage.getMessages(currentUserId, otherUserId);
      
      // Mark messages as read
      await storage.markMessagesAsRead(currentUserId, otherUserId);

      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.get("/api/conversations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const conversations = await storage.getConversations(userId);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  // Notification routes
  app.get("/api/notifications", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const notifications = await storage.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.patch("/api/notifications/:notificationId/read", isAuthenticated, async (req: any, res) => {
    try {
      const { notificationId } = req.params;
      await storage.markNotificationAsRead(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  // Create HTTP server and WebSocket server
  const httpServer = createServer(app);

  // WebSocket setup for real-time messaging
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });
  const connectedClients = new Map<string, WebSocket>();

  wss.on("connection", (ws: WebSocket) => {
    console.log("New WebSocket connection");

    ws.on("message", (data: string) => {
      try {
        const message = JSON.parse(data.toString());

        if (message.type === "auth" && message.userId) {
          connectedClients.set(message.userId, ws);
          console.log(`User ${message.userId} connected via WebSocket`);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    });

    ws.on("close", () => {
      // Remove client from connected clients
      for (const [userId, client] of Array.from(connectedClients.entries())) {
        if (client === ws) {
          connectedClients.delete(userId);
          console.log(`User ${userId} disconnected from WebSocket`);
          break;
        }
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  return httpServer;
}
