"use client";

import { useUser } from "@clerk/nextjs";
import CreatePost from "./create-post";
import PostCard from "./post-card";
import useFetchPosts from "@/hooks/use-fetch-posts";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Feed() {
  const { user } = useUser();
  const { data: posts = [], isLoading, error, refetch, isRefetching } = useFetchPosts();

  return (
    <div className="space-y-4">
      {user && <CreatePost />}

      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold">Latest Posts</h2>
        <Button
          onClick={() => refetch()}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          disabled={isRefetching}
        >
          <RefreshCw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/50 rounded-xl p-6 text-center">
          <p className="text-destructive font-medium">
            Failed to load posts. Please try again.
          </p>
          <Button onClick={() => refetch()} className="mt-4" variant="outline">
            Retry
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-xl p-6 animate-pulse"
            >
              <div className="flex gap-3 mb-4">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-1/6"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-muted-foreground font-medium">No posts yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Be the first to share something!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}