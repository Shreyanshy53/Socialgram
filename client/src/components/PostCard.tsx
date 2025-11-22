import { useState } from "react";
import { Link } from "wouter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, MoreHorizontal, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { PostWithDetails, InsertComment, User } from "@shared/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  post: PostWithDetails;
  currentUser?: User;
}

export default function PostCard({ post, currentUser }: PostCardProps) {
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (post.isLiked) {
        await apiRequest("DELETE", `/api/posts/${post.id}/like`);
      } else {
        await apiRequest("POST", `/api/posts/${post.id}/like`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/feed"] });
      queryClient.invalidateQueries({ queryKey: ["/api/explore"] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (comment: InsertComment) => {
      await apiRequest("POST", `/api/posts/${post.id}/comments`, comment);
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/feed"] });
      toast({ title: "Comment added successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/posts/${post.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/feed"] });
      toast({ title: "Post deleted successfully" });
    },
  });

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser) return;
    commentMutation.mutate({
      postId: post.id,
      userId: currentUser.id,
      content: commentText.trim(),
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="bg-background border rounded-md mb-6" data-testid={`post-${post.id}`}>
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <Link href={`/profile/${post.user.id}`}>
          <a className="flex items-center gap-3 hover-elevate rounded-md p-1 -m-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user.profileImageUrl || undefined} />
              <AvatarFallback>
                {getInitials(post.user.firstName, post.user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm" data-testid={`post-username-${post.id}`}>
                {post.user.firstName} {post.user.lastName}
              </p>
              <p className="text-xs text-muted-foreground">
                @{post.user.username}
              </p>
            </div>
          </a>
        </Link>

        {currentUser?.id === post.userId && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid={`post-menu-${post.id}`}>
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive"
                data-testid={`post-delete-${post.id}`}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Post Image Container with Responsive Media Query */}
      <div className="w-full bg-muted flex justify-center">
        <div className="w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl aspect-square">
          <img
            src={post.imageUrl}
            alt="Post"
            className="w-full h-full object-cover"
            data-testid={`post-image-${post.id}`}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => likeMutation.mutate()}
            className={post.isLiked ? "text-red-500" : ""}
            data-testid={`post-like-${post.id}`}
          >
            <Heart className={`h-6 w-6 ${post.isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowComments(!showComments)}
            data-testid={`post-comment-toggle-${post.id}`}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>

        {/* Likes Count */}
        <p className="font-semibold text-sm" data-testid={`post-likes-${post.id}`}>
          {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
        </p>

        {/* Caption */}
        {post.caption && (
          <p className="text-sm" data-testid={`post-caption-${post.id}`}>
            <Link href={`/profile/${post.user.id}`}>
              <span className="font-semibold cursor-pointer hover:underline">
                {post.user.firstName} {post.user.lastName}
              </span>
            </Link>{" "}
            {post.caption}
          </p>
        )}

        {/* View Comments */}
        {post.commentsCount > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-sm text-muted-foreground hover:underline"
            data-testid={`post-view-comments-${post.id}`}
          >
            View all {post.commentsCount} comments
          </button>
        )}

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 space-y-3 border-t pt-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="text-sm" data-testid={`comment-${comment.id}`}>
                <Link href={`/profile/${comment.user.id}`}>
                  <span className="font-semibold cursor-pointer hover:underline">
                    {comment.user.firstName} {comment.user.lastName}
                  </span>
                </Link>{" "}
                {comment.content}
              </div>
            ))}
          </div>
        )}

        {/* Add Comment */}
        {currentUser && (
          <form onSubmit={handleComment} className="flex gap-2 mt-3">
            <Textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="resize-none min-h-0 h-9"
              rows={1}
              data-testid={`post-comment-input-${post.id}`}
            />
            <Button
              type="submit"
              size="sm"
              disabled={!commentText.trim() || commentMutation.isPending}
              data-testid={`post-comment-submit-${post.id}`}
            >
              Post
            </Button>
          </form>
        )}

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground">
          {new Date(post.createdAt!).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
