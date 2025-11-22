import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI must be set");
}

// Define schemas
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  profileImageUrl: { type: String },
  bio: { type: String },
  username: { type: String, unique: true, sparse: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  caption: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const likeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const followSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  followerId: { type: String, required: true },
  followingId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const notificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  actorId: { type: String, required: true },
  type: { type: String, enum: ["like", "comment", "follow"], required: true },
  postId: { type: String },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Create indexes
postSchema.index({ userId: 1, createdAt: -1 });
commentSchema.index({ postId: 1 });
commentSchema.index({ userId: 1 });
likeSchema.index({ postId: 1 });
likeSchema.index({ userId: 1 });
followSchema.index({ followerId: 1 });
followSchema.index({ followingId: 1 });
messageSchema.index({ senderId: 1, receiverId: 1 });
notificationSchema.index({ userId: 1, createdAt: -1 });

// Export models
export const User = mongoose.model("User", userSchema);
export const Post = mongoose.model("Post", postSchema);
export const Comment = mongoose.model("Comment", commentSchema);
export const Like = mongoose.model("Like", likeSchema);
export const Follow = mongoose.model("Follow", followSchema);
export const Message = mongoose.model("Message", messageSchema);
export const Notification = mongoose.model("Notification", notificationSchema);

// Connect to MongoDB
export async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
  return mongoose.connection;
}
