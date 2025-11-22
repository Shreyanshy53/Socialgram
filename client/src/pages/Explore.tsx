import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import CreatePostModal from "@/components/CreatePostModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { PostWithDetails } from "@shared/schema";

export default function Explore() {
  const { user } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data: posts = [], isLoading } = useQuery<PostWithDetails[]>({
    queryKey: ["/api/explore", searchQuery],
    queryFn: async () => {
      const url = searchQuery
        ? `/api/explore?q=${encodeURIComponent(searchQuery)}`
        : "/api/explore";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCreatePost={() => setShowCreatePost(true)} />

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts and users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-explore"
            />
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery ? "No posts found" : "No posts to explore yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1" data-testid="explore-grid">
            {posts.map((post) => (
              <div
                key={post.id}
                className="aspect-square relative group cursor-pointer hover-elevate"
                data-testid={`explore-post-${post.id}`}
                onClick={() => (window.location.href = `/profile/${post.userId}`)}
              >
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.likesCount}</span>
                    <span>likes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.commentsCount}</span>
                    <span>comments</span>
                  </div>
                </div>
              </div>
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
