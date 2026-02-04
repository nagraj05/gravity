"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Link as LinkIcon, Send } from "lucide-react";
import { Button } from "../ui/button";
import useCreatePost from "@/hooks/use-create-post";

export default function CreatePost() {
  const { user } = useUser();
  const createPost = useCreatePost();
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const MAX_LENGTH = 500;
  const currentLength = content.length;
  const isOverLimit = currentLength > MAX_LENGTH;
  const isNearLimit = currentLength > 450 && currentLength <= MAX_LENGTH;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim() || isOverLimit) return;

    createPost.mutate(
      { content, link: link || null },
      {
        onSuccess: () => {
          setContent("");
          setLink("");
          setShowLinkInput(false);
        },
      }
    );
  };

  return (
    <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          {user && (
            <img
              src={user.imageUrl}
              alt="You"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10"
            />
          )}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="May the force be with you..."
              className="w-full py-2 resize-none border-0 bg-transparent focus:outline-none min-h-[80px] placeholder:text-muted-foreground"
              disabled={createPost.isPending}
            />

            {content.length > 0 && (
              <div className="flex justify-end mt-1">
                <span
                  className={`text-xs font-medium transition-colors ${
                    isOverLimit
                      ? "text-red-500"
                      : isNearLimit
                      ? "text-orange-500"
                      : "text-muted-foreground"
                  }`}
                >
                  {currentLength} / {MAX_LENGTH}
                  {isOverLimit && (
                    <span className="ml-1">
                      ({currentLength - MAX_LENGTH} over limit)
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {showLinkInput && (
          <div className="pl-[52px]">
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-border/50 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              disabled={createPost.isPending}
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => setShowLinkInput(!showLinkInput)}
              className={`p-2 rounded-lg transition-colors ${
                showLinkInput
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent"
              }`}
              title="Add link"
              variant="ghost"
              size="icon"
              disabled={createPost.isPending}
            >
              <LinkIcon className="w-5 h-5" />
            </Button>
          </div>

          <Button
            type="submit"
            disabled={createPost.isPending || !content.trim() || isOverLimit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
          >
            <Send className="w-4 h-4" />
            {createPost.isPending ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}