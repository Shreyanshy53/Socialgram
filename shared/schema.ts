import { z } from "zod";

// User schema
export const userSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().optional(),
  bio: z.string().optional(),
  username: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;

// Post schema
export const postSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  userId: z.string(),
  imageUrl: z.string(),
  caption: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Post = z.infer<typeof postSchema>;

// Comment schema
export const commentSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  postId: z.string(),
  userId: z.string(),
  content: z.string(),
  createdAt: z.date().optional(),
});

export type Comment = z.infer<typeof commentSchema>;

// Like schema
export const likeSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  postId: z.string(),
  userId: z.string(),
  createdAt: z.date().optional(),
});

export type Like = z.infer<typeof likeSchema>;

// Follow schema
export const followSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  followerId: z.string(),
  followingId: z.string(),
  createdAt: z.date().optional(),
});

export type Follow = z.infer<typeof followSchema>;

// Message schema
export const messageSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string(),
  read: z.boolean().default(false),
  createdAt: z.date().optional(),
});

export type Message = z.infer<typeof messageSchema>;

// Notification schema
export const notificationSchema = z.object({
  _id: z.string().optional(),
  id: z.string(),
  userId: z.string(),
  actorId: z.string(),
  type: z.enum(["like", "comment", "follow"]),
  postId: z.string().optional(),
  read: z.boolean().default(false),
  createdAt: z.date().optional(),
});

export type Notification = z.infer<typeof notificationSchema>;

// Insert schemas (for creating new documents)
export const insertUserSchema = userSchema.omit({ _id: true, createdAt: true, updatedAt: true }).extend({
  id: z.string().optional(),
});

export type UpsertUser = z.infer<typeof insertUserSchema>;

export const insertPostSchema = postSchema.omit({ _id: true, createdAt: true, updatedAt: true }).extend({
  id: z.string().optional(),
});

export type InsertPost = z.infer<typeof insertPostSchema>;

export const insertCommentSchema = commentSchema.omit({ _id: true, createdAt: true }).extend({
  id: z.string().optional(),
});

export type InsertComment = z.infer<typeof insertCommentSchema>;

export const insertLikeSchema = likeSchema.omit({ _id: true, createdAt: true }).extend({
  id: z.string().optional(),
});

export type InsertLike = z.infer<typeof insertLikeSchema>;

export const insertFollowSchema = followSchema.omit({ _id: true, createdAt: true }).extend({
  id: z.string().optional(),
});

export type InsertFollow = z.infer<typeof insertFollowSchema>;

export const insertMessageSchema = messageSchema.omit({ _id: true, createdAt: true, read: true }).extend({
  id: z.string().optional(),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;

export const insertNotificationSchema = notificationSchema.omit({ _id: true, createdAt: true, read: true }).extend({
  id: z.string().optional(),
});

export type InsertNotification = z.infer<typeof insertNotificationSchema>;

// Extended types for API responses
export type PostWithDetails = Post & {
  user: User;
  likes: Like[];
  comments: (Comment & { user: User })[];
  isLiked?: boolean;
  likesCount: number;
  commentsCount: number;
};

export type NotificationWithDetails = Notification & {
  actor: User;
  post?: Post;
};

export type MessageWithUsers = Message & {
  sender: User;
  receiver: User;
};

export type UserProfile = User & {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
};
