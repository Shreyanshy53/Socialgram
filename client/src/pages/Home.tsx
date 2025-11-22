import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import CreatePostModal from "@/components/CreatePostModal";
import { Skeleton } from "@/components/ui/skeleton";
import type { PostWithDetails } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const { data: posts = [], isLoading } = useQuery<PostWithDetails[]>({
    queryKey: ["/api/feed"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCreatePost={() => setShowCreatePost(true)} />

      <main className="container max-w-2xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-md p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No posts yet. Follow some users or create your first post!
            </p>
          </div>
        ) : (
          <div data-testid="feed-posts">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} currentUser={user} />
            ))}
          </div>
        )}
      </main>

      <CreatePostModal
        open={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        currentUser={user}
      />
    </div>
  );
}
