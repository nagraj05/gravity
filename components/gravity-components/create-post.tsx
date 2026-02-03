"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSupabaseClient } from "@/lib/supabase";
import { Link as LinkIcon, Send } from "lucide-react";
import { Button } from "../ui/button";

interface CreatePostProps {
  onPostCreated?: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const { user } = useUser();
  const { getAuthenticatedClient } = useSupabaseClient();
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    setLoading(true);
    try {
      const supabase = await getAuthenticatedClient();

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .upsert(
          {
            clerk_user_id: user.id,
            username: user.username || user.firstName,
            first_name: user.firstName,
            last_name: user.lastName,
            image_url: user.imageUrl,
            email: user.emailAddresses[0]?.emailAddress,
          },
          { onConflict: "clerk_user_id" },
        )
        .select("id")
        .single();

      if (profileError) throw profileError;

      const { error: postError } = await supabase.from("posts").insert({
        user_id: profileData.id,
        clerk_user_id: user.id,
        content: content.trim(),
        link: link.trim() || null,
      });

      if (postError) throw postError;

      setContent("");
      setLink("");
      setShowLinkInput(false);
      onPostCreated?.();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          {user && (
            <img
              src={user.imageUrl}
              alt="You"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="May the force be with you..."
            className="flex-1 py-2 resize-none border-0 bg-transparent focus:outline-none min-h-[80px]"
            maxLength={500}
          />
        </div>

        {showLinkInput && (
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter URL..."
            className="w-full px-3 py-2 border rounded-md"
          />
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button
              onClick={() => setShowLinkInput(!showLinkInput)}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              title="Add link"
              variant={"link"}
            >
              <LinkIcon className="w-5 h-5" />
            </Button>
          </div>

          <Button
            disabled={loading || !content.trim()}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            {loading ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
