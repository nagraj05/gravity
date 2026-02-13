"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useCreateComment from "@/hooks/use-create-comment";
import { Loader2 } from "lucide-react";
import useSearchUsers from "@/hooks/use-search-users";

interface CommentComposerProps {
  postId: string;
  parentId?: string | null;
  onSuccess?: () => void;
  onCancel?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
}

export default function CommentComposer({
  postId,
  parentId,
  onSuccess,
  onCancel,
  autoFocus = false,
  placeholder = "What are your thoughts?",
}: CommentComposerProps) {
  const [content, setContent] = useState("");
  const { mutate: createComment, isPending } = useCreateComment();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mentions state
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionStartIndex, setMentionStartIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: users = [], isLoading: isSearching } =
    useSearchUsers(mentionQuery);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursorPosition = e.target.selectionStart;
    setContent(value);

    // Detect @ for mentions
    const textBeforeCursor = value.slice(0, cursorPosition);
    const lastAtSymbol = textBeforeCursor.lastIndexOf("@");

    if (lastAtSymbol !== -1) {
      const query = textBeforeCursor.slice(lastAtSymbol + 1);
      // Valid query: no spaces after @
      if (!query.includes(" ")) {
        setMentionQuery(query);
        setMentionStartIndex(lastAtSymbol);
        setSelectedIndex(0);
        return;
      }
    }

    setMentionQuery("");
    setMentionStartIndex(-1);
  };

  const selectUser = (username: string) => {
    if (mentionStartIndex === -1) return;

    const beforeMention = content.slice(0, mentionStartIndex);
    const afterMention = content.slice(
      textareaRef.current?.selectionStart || 0,
    );
    const newContent = `${beforeMention}@${username} ${afterMention}`;

    setContent(newContent);
    setMentionQuery("");
    setMentionStartIndex(-1);

    // Focus back to textarea
    setTimeout(() => {
      textareaRef.current?.focus();
      const newCursorPos = beforeMention.length + username.length + 2;
      textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mentionQuery && users.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % users.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + users.length) % users.length);
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        selectUser(users[selectedIndex].username);
      } else if (e.key === "Escape") {
        setMentionQuery("");
        setMentionStartIndex(-1);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isPending) return;

    createComment(
      { postId, parentId, content: content.trim() },
      {
        onSuccess: () => {
          setContent("");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 relative">
      <div className="relative">
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          className="w-full min-h-[100px] p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:outline-hidden resize-none transition-all placeholder:text-muted-foreground/60"
          value={content}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          disabled={isPending}
        />

        {/* Mention Dropdown */}
        {mentionQuery && users.length > 0 && (
          <div className="absolute z-50 bottom-full left-0 mb-2 w-64 bg-card border rounded-lg shadow-xl overflow-hidden py-1">
            <div className="px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase bg-muted/30 border-b mb-1">
              Mention users
            </div>
            {users.map((user, index) => (
              <button
                key={user.clerk_user_id}
                type="button"
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                  index === selectedIndex
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
                onClick={() => selectUser(user.username)}
              >
                {user.image_url ? (
                  <img src={user.image_url} className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px]">
                    {user.username.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <span className="font-medium">@{user.username}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
        <button
          type="submit"
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            content.trim() && !isPending
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-primary/50 text-primary-foreground/50 cursor-not-allowed"
          }`}
          disabled={!content.trim() || isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Posting...
            </div>
          ) : (
            "Comment"
          )}
        </button>
      </div>
    </form>
  );
}
