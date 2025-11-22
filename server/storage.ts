import {
  users,
  posts,
  comments,
  likes,
  follows,
  messages,
  notifications,
  type User,
  type UpsertUser,
  type Post,
  type InsertPost,
  type Comment,
  type InsertComment,
  type Like,
  type InsertLike,
  type Follow,
  type InsertFollow,
  type Message,
  type InsertMessage,
  type Notification,
  type InsertNotification,
  type PostWithDetails,
  type UserProfile,
  type NotificationWithDetails,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, desc, sql, count, inArray } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User | undefined>;
  getUserProfile(userId: string, currentUserId?: string): Promise<UserProfile | undefined>;
  
  // Post operations
  createPost(post: InsertPost): Promise<Post>;
  getPost(id: string): Promise<Post | undefined>;
  getPosts(userId?: string): Promise<Post[]>;
  getPostsWithDetails(userId?: string, currentUserId?: string): Promise<PostWithDetails[]>;
  getFeedPosts(userId: string): Promise<PostWithDetails[]>;
  getExplorePosts(currentUserId?: string, searchQuery?: string): Promise<PostWithDetails[]>;
  updatePost(id: string, data: Partial<Post>): Promise<Post | undefined>;
  deletePost(id: string): Promise<void>;
  
  // Comment operations
  createComment(comment: InsertComment): Promise<Comment>;
  getCommentsByPost(postId: string): Promise<Comment[]>;
  deleteComment(id: string): Promise<void>;
  
  // Like operations
  createLike(like: InsertLike): Promise<Like>;
  deleteLike(postId: string, userId: string): Promise<void>;
  isPostLiked(postId: string, userId: string): Promise<boolean>;
  
  // Follow operations
  createFollow(follow: InsertFollow): Promise<Follow>;
  deleteFollow(followerId: string, followingId: string): Promise<void>;
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
  getFollowers(userId: string): Promise<User[]>;
  getFollowing(userId: string): Promise<User[]>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(userId1: string, userId2: string): Promise<Message[]>;
  getConversations(userId: string): Promise<any[]>;
  markMessagesAsRead(userId: string, senderId: string): Promise<void>;
  
  // Notification operations
  createNotification(notification: InsertNotification): Promise<Notification>;
  getNotifications(userId: string): Promise<NotificationWithDetails[]>;
  markNotificationAsRead(id: string): Promise<void>;
  markAllNotificationsAsRead(userId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getUserProfile(userId: string, currentUserId?: string): Promise<UserProfile | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) return undefined;

    // Count posts
    const [{ count: postsCount }] = await db
      .select({ count: count() })
      .from(posts)
      .where(eq(posts.userId, userId));

    // Count followers
    const [{ count: followersCount }] = await db
      .select({ count: count() })
      .from(follows)
      .where(eq(follows.followingId, userId));

    // Count following
    const [{ count: followingCount }] = await db
      .select({ count: count() })
      .from(follows)
      .where(eq(follows.followerId, userId));

    // Check if current user is following
    let isFollowing = false;
    if (currentUserId && currentUserId !== userId) {
      isFollowing = await this.isFollowing(currentUserId, userId);
    }

    return {
      ...user,
      postsCount: Number(postsCount),
      followersCount: Number(followersCount),
      followingCount: Number(followingCount),
      isFollowing,
    };
  }

  // Post operations
  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async getPost(id: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async getPosts(userId?: string): Promise<Post[]> {
    if (userId) {
      return db.select().from(posts).where(eq(posts.userId, userId)).orderBy(desc(posts.createdAt));
    }
    return db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPostsWithDetails(userId?: string, currentUserId?: string): Promise<PostWithDetails[]> {
    const postsList = userId
      ? await db.select().from(posts).where(eq(posts.userId, userId)).orderBy(desc(posts.createdAt))
      : await db.select().from(posts).orderBy(desc(posts.createdAt));

    const postsWithDetails: PostWithDetails[] = [];

    for (const post of postsList) {
      const [user] = await db.select().from(users).where(eq(users.id, post.userId));
      
      const postLikes = await db.select().from(likes).where(eq(likes.postId, post.id));
      
      const postComments = await db.select().from(comments).where(eq(comments.postId, post.id));
      const commentsWithUsers = await Promise.all(
        postComments.map(async (comment) => {
          const [commentUser] = await db.select().from(users).where(eq(users.id, comment.userId));
          return { ...comment, user: commentUser };
        })
      );

      const isLiked = currentUserId
        ? await this.isPostLiked(post.id, currentUserId)
        : false;

      postsWithDetails.push({
        ...post,
        user,
        likes: postLikes,
        comments: commentsWithUsers,
        isLiked,
        likesCount: postLikes.length,
        commentsCount: postComments.length,
      });
    }

    return postsWithDetails;
  }

  async getFeedPosts(userId: string): Promise<PostWithDetails[]> {
    // Get users that current user is following
    const following = await db
      .select({ followingId: follows.followingId })
      .from(follows)
      .where(eq(follows.followerId, userId));

    const followingIds = following.map(f => f.followingId);
    
    if (followingIds.length === 0) {
      // If not following anyone, return empty array or own posts
      return this.getPostsWithDetails(userId, userId);
    }

    // Get posts from followed users
    const feedPosts = await db
      .select()
      .from(posts)
      .where(inArray(posts.userId, followingIds))
      .orderBy(desc(posts.createdAt));

    const postsWithDetails: PostWithDetails[] = [];

    for (const post of feedPosts) {
      const [user] = await db.select().from(users).where(eq(users.id, post.userId));
      
      const postLikes = await db.select().from(likes).where(eq(likes.postId, post.id));
      
      const postComments = await db.select().from(comments).where(eq(comments.postId, post.id));
      const commentsWithUsers = await Promise.all(
        postComments.map(async (comment) => {
          const [commentUser] = await db.select().from(users).where(eq(users.id, comment.userId));
          return { ...comment, user: commentUser };
        })
      );

      const isLiked = await this.isPostLiked(post.id, userId);

      postsWithDetails.push({
        ...post,
        user,
        likes: postLikes,
        comments: commentsWithUsers,
        isLiked,
        likesCount: postLikes.length,
        commentsCount: postComments.length,
      });
    }

    return postsWithDetails;
  }

  async getExplorePosts(currentUserId?: string, searchQuery?: string): Promise<PostWithDetails[]> {
    let postsList: Post[];

    // Simple search implementation - in production, use full-text search
    if (searchQuery) {
      const searchUsers = await db
        .select()
        .from(users)
        .where(
          or(
            sql`${users.firstName} ILIKE ${`%${searchQuery}%`}`,
            sql`${users.lastName} ILIKE ${`%${searchQuery}%`}`,
            sql`${users.username} ILIKE ${`%${searchQuery}%`}`
          )
        );
      
      const userIds = searchUsers.map(u => u.id);
      
      if (userIds.length > 0) {
        postsList = await db.select().from(posts).where(
          or(
            inArray(posts.userId, userIds),
            sql`${posts.caption} ILIKE ${`%${searchQuery}%`}`
          )
        ).orderBy(desc(posts.createdAt));
      } else {
        postsList = await db.select().from(posts).where(
          sql`${posts.caption} ILIKE ${`%${searchQuery}%`}`
        ).orderBy(desc(posts.createdAt));
      }
    } else {
      postsList = await db.select().from(posts).orderBy(desc(posts.createdAt));
    }

    const postsWithDetails: PostWithDetails[] = [];

    for (const post of postsList) {
      const [user] = await db.select().from(users).where(eq(users.id, post.userId));
      
      const postLikes = await db.select().from(likes).where(eq(likes.postId, post.id));
      
      const postComments = await db.select().from(comments).where(eq(comments.postId, post.id));
      const commentsWithUsers = await Promise.all(
        postComments.map(async (comment) => {
          const [commentUser] = await db.select().from(users).where(eq(users.id, comment.userId));
          return { ...comment, user: commentUser };
        })
      );

      const isLiked = currentUserId
        ? await this.isPostLiked(post.id, currentUserId)
        : false;

      postsWithDetails.push({
        ...post,
        user,
        likes: postLikes,
        comments: commentsWithUsers,
        isLiked,
        likesCount: postLikes.length,
        commentsCount: postComments.length,
      });
    }

    return postsWithDetails;
  }

  async updatePost(id: string, data: Partial<Post>): Promise<Post | undefined> {
    const [post] = await db
      .update(posts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return post;
  }

  async deletePost(id: string): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }

  // Comment operations
  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await db.insert(comments).values(comment).returning();
    return newComment;
  }

  async getCommentsByPost(postId: string): Promise<Comment[]> {
    return db.select().from(comments).where(eq(comments.postId, postId)).orderBy(desc(comments.createdAt));
  }

  async deleteComment(id: string): Promise<void> {
    await db.delete(comments).where(eq(comments.id, id));
  }

  // Like operations
  async createLike(like: InsertLike): Promise<Like> {
    const [newLike] = await db.insert(likes).values(like).returning();
    return newLike;
  }

  async deleteLike(postId: string, userId: string): Promise<void> {
    await db.delete(likes).where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
  }

  async isPostLiked(postId: string, userId: string): Promise<boolean> {
    const [like] = await db
      .select()
      .from(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
    return !!like;
  }

  // Follow operations
  async createFollow(follow: InsertFollow): Promise<Follow> {
    const [newFollow] = await db.insert(follows).values(follow).returning();
    return newFollow;
  }

  async deleteFollow(followerId: string, followingId: string): Promise<void> {
    await db
      .delete(follows)
      .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const [follow] = await db
      .select()
      .from(follows)
      .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
    return !!follow;
  }

  async getFollowers(userId: string): Promise<User[]> {
    const followerRelations = await db
      .select()
      .from(follows)
      .where(eq(follows.followingId, userId));

    const followerIds = followerRelations.map(f => f.followerId);
    
    if (followerIds.length === 0) return [];

    return db.select().from(users).where(inArray(users.id, followerIds));
  }

  async getFollowing(userId: string): Promise<User[]> {
    const followingRelations = await db
      .select()
      .from(follows)
      .where(eq(follows.followerId, userId));

    const followingIds = followingRelations.map(f => f.followingId);
    
    if (followingIds.length === 0) return [];

    return db.select().from(users).where(inArray(users.id, followingIds));
  }

  // Message operations
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async getMessages(userId1: string, userId2: string): Promise<Message[]> {
    return db
      .select()
      .from(messages)
      .where(
        or(
          and(eq(messages.senderId, userId1), eq(messages.receiverId, userId2)),
          and(eq(messages.senderId, userId2), eq(messages.receiverId, userId1))
        )
      )
      .orderBy(messages.createdAt);
  }

  async getConversations(userId: string): Promise<any[]> {
    const allMessages = await db
      .select()
      .from(messages)
      .where(or(eq(messages.senderId, userId), eq(messages.receiverId, userId)))
      .orderBy(desc(messages.createdAt));

    // Group by conversation partner
    const conversationMap = new Map();

    for (const message of allMessages) {
      const partnerId = message.senderId === userId ? message.receiverId : message.senderId;
      
      if (!conversationMap.has(partnerId)) {
        const [partner] = await db.select().from(users).where(eq(users.id, partnerId));
        
        // Count unread messages
        const unreadMessages = await db
          .select()
          .from(messages)
          .where(
            and(
              eq(messages.senderId, partnerId),
              eq(messages.receiverId, userId),
              eq(messages.read, false)
            )
          );

        conversationMap.set(partnerId, {
          user: partner,
          lastMessage: message,
          unreadCount: unreadMessages.length,
        });
      }
    }

    return Array.from(conversationMap.values());
  }

  async markMessagesAsRead(userId: string, senderId: string): Promise<void> {
    await db
      .update(messages)
      .set({ read: true })
      .where(and(eq(messages.receiverId, userId), eq(messages.senderId, senderId)));
  }

  // Notification operations
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async getNotifications(userId: string): Promise<NotificationWithDetails[]> {
    const userNotifications = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(50);

    const notificationsWithDetails: NotificationWithDetails[] = [];

    for (const notification of userNotifications) {
      const [actor] = await db.select().from(users).where(eq(users.id, notification.actorId));
      
      let post = undefined;
      if (notification.postId) {
        [post] = await db.select().from(posts).where(eq(posts.id, notification.postId));
      }

      notificationsWithDetails.push({
        ...notification,
        actor,
        post,
      });
    }

    return notificationsWithDetails;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));
  }

  async markAllNotificationsAsRead(userId: string): Promise<void> {
    await db.update(notifications).set({ read: true }).where(eq(notifications.userId, userId));
  }
}

export const storage = new DatabaseStorage();
