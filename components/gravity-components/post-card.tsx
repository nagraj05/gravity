"use client";

import { Heart, MessageCircle, Share2, ExternalLink, Link2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: {
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
  };
}

export default function PostCard({ post }: PostCardProps) {
  const displayName = post.profiles?.first_name
    ? `${post.profiles.first_name} ${post.profiles.last_name || ""}`
    : post.profiles?.username || "Unknown User";

  const displayHandle = post.profiles?.username
    ? `@${post.profiles.username}`
    : `@${post.clerk_user_id.slice(0, 8)}`;

  return (
    <article className="bg-card border rounded-lg px-6 py-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-4">
        {post.profiles?.image_url ? (
          <img
            src={post.profiles.image_url}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            {post.clerk_user_id.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="font-medium">{displayName}</p>
          <p className="text-xs text-muted-foreground">
            {displayHandle} ·{" "}
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </div>

      {post.link && (
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary hover:underline mb-4"
        >
          <Link2 className="w-4 h-4" />
          {post.link}
        </a>
      )}

      <div className="flex items-center gap-6 pt-4 border-t">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" />
          <span className="text-sm">0</span>
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">0</span>
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </article>
  );
}
