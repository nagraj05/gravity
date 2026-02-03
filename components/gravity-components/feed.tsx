"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSupabaseClient } from "@/lib/supabase";
import CreatePost from "./create-post";
import PostCard from "./post-card";
import { RefreshCw } from "lucide-react";

interface Post {
  id: string;
  clerk_user_id: string;
  content: string;
  link: string | null;
  created_at: string;
  profiles: {
    username: string;
    first_name: string;
    last_name: string;
    image_url: string;
  } | null;
}

export default function Feed() {
  const { user } = useUser();
  const { getAuthenticatedClient } = useSupabaseClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const supabase = await getAuthenticatedClient();
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          profiles (
            username,
            first_name,
            last_name,
            image_url
          )
        `,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      // @ts-ignore
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-4">
      {user && <CreatePost onPostCreated={fetchPosts} />}

      <div className="flex items-center justify-between px-1">
        <h2 className="text-md font-bold">Latest Posts</h2>
        <button
          onClick={fetchPosts}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Refresh
        </button>
      </div>

      {loading ? (
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
