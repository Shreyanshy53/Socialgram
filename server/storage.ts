import { v4 as uuidv4 } from "uuid";
import {
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
import { User as UserModel, Post as PostModel, Comment as CommentModel, Like as LikeModel, Follow as FollowModel, Message as MessageModel, Notification as NotificationModel } from "./db";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
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

function generateId(): string {
  return uuidv4();
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ id }).lean();
    return (user || undefined) as User | undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ username }).lean();
    return (user || undefined) as User | undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ email }).lean();
    return (user || undefined) as User | undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const id = userData.id || generateId();
    const user = await UserModel.findOneAndUpdate(
      { id },
      { ...userData, id, updatedAt: new Date() },
      { upsert: true, new: true, lean: true }
    );
    return (user || {}) as User;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const user = await UserModel.findOneAndUpdate(
      { id },
      { ...data, updatedAt: new Date() },
      { new: true, lean: true }
    );
    return (user || undefined) as User | undefined;
  }

  async getUserProfile(userId: string, currentUserId?: string): Promise<UserProfile | undefined> {
    const user = await UserModel.findOne({ id: userId }).lean();
    if (!user) return undefined;

    const postsCount = await PostModel.countDocuments({ userId });
    const followersCount = await FollowModel.countDocuments({ followingId: userId });
    const followingCount = await FollowModel.countDocuments({ followerId: userId });

    let isFollowing = false;
    if (currentUserId && currentUserId !== userId) {
      isFollowing = await this.isFollowing(currentUserId, userId);
    }

    return {
      ...user,
      postsCount,
      followersCount,
      followingCount,
      isFollowing,
    } as unknown as UserProfile;
  }

  // Post operations
  async createPost(post: InsertPost): Promise<Post> {
    const id = post.id || generateId();
    const newPost = await PostModel.create({ ...post, id, createdAt: new Date(), updatedAt: new Date() });
    return newPost.toObject() as unknown as Post;
  }

  async getPost(id: string): Promise<Post | undefined> {
    const post = await PostModel.findOne({ id }).lean();
    return (post || undefined) as Post | undefined;
  }

  async getPosts(userId?: string): Promise<Post[]> {
    if (userId) {
      const posts = await PostModel.find({ userId }).sort({ createdAt: -1 }).lean();
      return posts as unknown as Post[];
    }
    const posts = await PostModel.find({}).sort({ createdAt: -1 }).lean();
    return posts as unknown as Post[];
  }

  async getPostsWithDetails(userId?: string, currentUserId?: string): Promise<PostWithDetails[]> {
    let postsList: any[];
    if (userId) {
      postsList = await PostModel.find({ userId }).sort({ createdAt: -1 }).lean();
    } else {
      postsList = await PostModel.find({}).sort({ createdAt: -1 }).lean();
    }

    const postsWithDetails: PostWithDetails[] = [];

    for (const post of postsList) {
      const user = await UserModel.findOne({ id: post.userId }).lean();
      const postLikes = await LikeModel.find({ postId: post.id }).lean();
      const postComments = await CommentModel.find({ postId: post.id }).lean();
      
      const commentsWithUsers = await Promise.all(
        postComments.map(async (comment: any) => {
          const commentUser = await UserModel.findOne({ id: comment.userId }).lean();
          return { ...comment, user: commentUser };
        })
      );

      const isLiked = currentUserId ? await this.isPostLiked(post.id, currentUserId) : false;

      postsWithDetails.push({
        ...post,
        user,
        likes: postLikes,
        comments: commentsWithUsers,
        isLiked,
        likesCount: postLikes.length,
        commentsCount: postComments.length,
      } as PostWithDetails);
    }

    return postsWithDetails;
  }

  async getFeedPosts(userId: string): Promise<PostWithDetails[]> {
    const following = await FollowModel.find({ followerId: userId }).lean();
    const followingIds = (following as any[]).map(f => f.followingId);
    
    if (followingIds.length === 0) {
      return this.getPostsWithDetails(userId, userId);
    }

    const feedPosts = await PostModel.find({ userId: { $in: followingIds } }).sort({ createdAt: -1 }).lean();
    const postsWithDetails: PostWithDetails[] = [];

    for (const post of feedPosts as any[]) {
      const user = await UserModel.findOne({ id: post.userId }).lean();
      const postLikes = await LikeModel.find({ postId: post.id }).lean();
      const postComments = await CommentModel.find({ postId: post.id }).lean();
      
      const commentsWithUsers = await Promise.all(
        (postComments as any[]).map(async (comment) => {
          const commentUser = await UserModel.findOne({ id: comment.userId }).lean();
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
      } as PostWithDetails);
    }

    return postsWithDetails;
  }

  async getExplorePosts(currentUserId?: string, searchQuery?: string): Promise<PostWithDetails[]> {
    let postsList: any[];

    if (searchQuery) {
      const searchUsers = await UserModel.find({
        $or: [
          { firstName: { $regex: searchQuery, $options: "i" } },
          { lastName: { $regex: searchQuery, $options: "i" } },
          { username: { $regex: searchQuery, $options: "i" } },
        ],
      }).lean();
      
      const userIds = (searchUsers as any[]).map(u => u.id);
      
      if (userIds.length > 0) {
        postsList = await PostModel.find({
          $or: [
            { userId: { $in: userIds } },
            { caption: { $regex: searchQuery, $options: "i" } },
          ],
        }).sort({ createdAt: -1 }).lean();
      } else {
        postsList = await PostModel.find({
          caption: { $regex: searchQuery, $options: "i" },
        }).sort({ createdAt: -1 }).lean();
      }
    } else {
      postsList = await PostModel.find({}).sort({ createdAt: -1 }).lean();
    }

    const postsWithDetails: PostWithDetails[] = [];

    for (const post of postsList as any[]) {
      const user = await UserModel.findOne({ id: post.userId }).lean();
      const postLikes = await LikeModel.find({ postId: post.id }).lean();
      const postComments = await CommentModel.find({ postId: post.id }).lean();
      
      const commentsWithUsers = await Promise.all(
        (postComments as any[]).map(async (comment) => {
          const commentUser = await UserModel.findOne({ id: comment.userId }).lean();
          return { ...comment, user: commentUser };
        })
      );

      const isLiked = currentUserId ? await this.isPostLiked(post.id, currentUserId) : false;

      postsWithDetails.push({
        ...post,
        user,
        likes: postLikes,
        comments: commentsWithUsers,
        isLiked,
        likesCount: postLikes.length,
        commentsCount: postComments.length,
      } as PostWithDetails);
    }

    return postsWithDetails;
  }

  async updatePost(id: string, data: Partial<Post>): Promise<Post | undefined> {
    const post = await PostModel.findOneAndUpdate(
      { id },
      { ...data, updatedAt: new Date() },
      { new: true, lean: true }
    );
    return (post || undefined) as Post | undefined;
  }

  async deletePost(id: string): Promise<void> {
    await PostModel.deleteOne({ id });
  }

  // Comment operations
  async createComment(comment: InsertComment): Promise<Comment> {
    const id = comment.id || generateId();
    const newComment = await CommentModel.create({ ...comment, id, createdAt: new Date() });
    return newComment.toObject() as unknown as Comment;
  }

  async getCommentsByPost(postId: string): Promise<Comment[]> {
    const comments = await CommentModel.find({ postId }).sort({ createdAt: -1 }).lean();
    return comments as unknown as Comment[];
  }

  async deleteComment(id: string): Promise<void> {
    await CommentModel.deleteOne({ id });
  }

  // Like operations
  async createLike(like: InsertLike): Promise<Like> {
    const id = like.id || generateId();
    const newLike = await LikeModel.create({ ...like, id, createdAt: new Date() });
    return newLike.toObject() as unknown as Like;
  }

  async deleteLike(postId: string, userId: string): Promise<void> {
    await LikeModel.deleteOne({ postId, userId });
  }

  async isPostLiked(postId: string, userId: string): Promise<boolean> {
    const like = await LikeModel.findOne({ postId, userId });
    return !!like;
  }

  // Follow operations
  async createFollow(follow: InsertFollow): Promise<Follow> {
    const id = follow.id || generateId();
    const newFollow = await FollowModel.create({ ...follow, id, createdAt: new Date() });
    return newFollow.toObject() as unknown as Follow;
  }

  async deleteFollow(followerId: string, followingId: string): Promise<void> {
    await FollowModel.deleteOne({ followerId, followingId });
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const follow = await FollowModel.findOne({ followerId, followingId });
    return !!follow;
  }

  async getFollowers(userId: string): Promise<User[]> {
    const followerRelations = await FollowModel.find({ followingId: userId }).lean();
    const followerIds = (followerRelations as any[]).map(f => f.followerId);
    
    if (followerIds.length === 0) return [];

    const users = await UserModel.find({ id: { $in: followerIds } }).lean();
    return users as unknown as User[];
  }

  async getFollowing(userId: string): Promise<User[]> {
    const followingRelations = await FollowModel.find({ followerId: userId }).lean();
    const followingIds = (followingRelations as any[]).map(f => f.followingId);
    
    if (followingIds.length === 0) return [];

    const users = await UserModel.find({ id: { $in: followingIds } }).lean();
    return users as unknown as User[];
  }

  // Message operations
  async createMessage(message: InsertMessage): Promise<Message> {
    const id = message.id || generateId();
    const newMessage = await MessageModel.create({ ...message, id, read: false, createdAt: new Date() });
    return newMessage.toObject() as unknown as Message;
  }

  async getMessages(userId1: string, userId2: string): Promise<Message[]> {
    const messages = await MessageModel.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    }).sort({ createdAt: 1 }).lean();
    return messages as unknown as Message[];
  }

  async getConversations(userId: string): Promise<any[]> {
    const allMessages = await MessageModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: -1 }).lean();

    const conversationMap = new Map();

    for (const message of (allMessages as any[])) {
      const partnerId = message.senderId === userId ? message.receiverId : message.senderId;
      
      if (!conversationMap.has(partnerId)) {
        const partner = await UserModel.findOne({ id: partnerId }).lean();
        
        const unreadMessages = await MessageModel.countDocuments({
          senderId: partnerId,
          receiverId: userId,
          read: false,
        });

        conversationMap.set(partnerId, {
          user: partner,
          lastMessage: message,
          unreadCount: unreadMessages,
        });
      }
    }

    return Array.from(conversationMap.values());
  }

  async markMessagesAsRead(userId: string, senderId: string): Promise<void> {
    await MessageModel.updateMany(
      { receiverId: userId, senderId, read: false },
      { read: true }
    );
  }

  // Notification operations
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const id = notification.id || generateId();
    const newNotification = await NotificationModel.create({ ...notification, id, read: false, createdAt: new Date() });
    return newNotification.toObject() as unknown as Notification;
  }

  async getNotifications(userId: string): Promise<NotificationWithDetails[]> {
    const userNotifications = await NotificationModel.find({ userId }).sort({ createdAt: -1 }).limit(50).lean();
    const notificationsWithDetails: NotificationWithDetails[] = [];

    for (const notification of (userNotifications as any[])) {
      const actor = await UserModel.findOne({ id: notification.actorId }).lean();
      
      let post = undefined;
      if (notification.postId) {
        post = await PostModel.findOne({ id: notification.postId }).lean();
      }

      notificationsWithDetails.push({
        ...notification,
        actor,
        post,
      } as NotificationWithDetails);
    }

    return notificationsWithDetails;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await NotificationModel.updateOne({ id }, { read: true });
  }

  async markAllNotificationsAsRead(userId: string): Promise<void> {
    await NotificationModel.updateMany({ userId }, { read: true });
  }
}

export const storage = new DatabaseStorage();
