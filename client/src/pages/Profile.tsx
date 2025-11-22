import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import CreatePostModal from "@/components/CreatePostModal";
import EditProfileModal from "@/components/EditProfileModal";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Settings, Grid, Heart, MessageCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { UserProfile, PostWithDetails } from "@shared/schema";

export default function Profile() {
  const { user: currentUser } = useAuth();
  const [, params] = useRoute("/profile/:userId");
  const userId = params?.userId;
  const { toast } = useToast();

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const { data: profile, isLoading: profileLoading } = useQuery<UserProfile>({
    queryKey: ["/api/profile", userId],
    queryFn: async () => {
      const res = await fetch(`/api/profile/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
    enabled: !!userId,
  });

  const { data: posts = [], isLoading: postsLoading } = useQuery<PostWithDetails[]>({
    queryKey: ["/api/posts", userId],
    queryFn: async () => {
      const res = await fetch(`/api/posts?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
    enabled: !!userId,
  });

  const followMutation = useMutation({
    mutationFn: async () => {
      if (profile?.isFollowing) {
        await apiRequest("DELETE", `/api/users/${userId}/follow`);
      } else {
        await apiRequest("POST", `/api/users/${userId}/follow`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile", userId] });
      toast({
        title: profile?.isFollowing ? "Unfollowed successfully" : "Following!",
      });
    },
  });

  const isOwnProfile = currentUser?.id === userId;

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onCreatePost={() => setShowCreatePost(true)} />
        <main className="container max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <Skeleton className="h-32 w-32 md:h-40 md:w-40 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onCreatePost={() => setShowCreatePost(true)} />
        <main className="container max-w-4xl mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">User not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCreatePost={() => setShowCreatePost(true)} />

      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8" data-testid="profile-header">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-start">
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4">
              <AvatarImage src={profile.profileImageUrl || undefined} />
              <AvatarFallback className="text-4xl">
                {getInitials(profile.firstName, profile.lastName)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            {/* Username and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <h1 className="text-2xl font-semibold" data-testid="profile-username">
                @{profile.username}
              </h1>
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  onClick={() => setShowEditProfile(true)}
                  data-testid="button-edit-profile"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <Button
                  onClick={() => followMutation.mutate()}
                  disabled={followMutation.isPending}
                  variant={profile.isFollowing ? "outline" : "default"}
                  data-testid="button-follow"
                >
                  {profile.isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-8" data-testid="profile-stats">
              <div>
                <span className="font-semibold" data-testid="posts-count">{profile.postsCount}</span>{" "}
                <span className="text-muted-foreground">posts</span>
              </div>
              <div>
                <span className="font-semibold" data-testid="followers-count">{profile.followersCount}</span>{" "}
                <span className="text-muted-foreground">followers</span>
              </div>
              <div>
                <span className="font-semibold" data-testid="following-count">{profile.followingCount}</span>{" "}
                <span className="text-muted-foreground">following</span>
              </div>
            </div>

            {/* Name and Bio */}
            <div>
              <p className="font-semibold" data-testid="profile-name">
                {profile.firstName} {profile.lastName}
              </p>
              {profile.bio && (
                <p className="text-sm text-muted-foreground mt-1" data-testid="profile-bio">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="border-t pt-8">
          <div className="flex items-center gap-2 mb-4">
            <Grid className="h-4 w-4" />
            <span className="font-semibold">POSTS</span>
          </div>

          {postsLoading ? (
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {isOwnProfile ? "You haven't posted anything yet" : "No posts yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1" data-testid="profile-posts-grid">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square relative group cursor-pointer hover-elevate"
                  data-testid={`profile-post-${post.id}`}
                >
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 fill-current" />
                      <span className="font-semibold">{post.likesCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 fill-current" />
                      <span className="font-semibold">{post.commentsCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <CreatePostModal
        open={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        currentUser={currentUser}
      />

      {isOwnProfile && currentUser && (
        <EditProfileModal
          open={showEditProfile}
          onClose={() => setShowEditProfile(false)}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}
