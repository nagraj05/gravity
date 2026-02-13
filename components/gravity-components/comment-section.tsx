"use client";

import useFetchComments from "@/hooks/use-fetch-comments";
import CommentItem from "./comment-item";
import CommentComposer from "./comment-composer";
import { Loader2, MessageSquare } from "lucide-react";

interface CommentSectionProps {
  postId: string;
  postAuthorId: string;
}

export default function CommentSection({
  postId,
  postAuthorId,
}: CommentSectionProps) {
  const { data: comments = [], isLoading, error } = useFetchComments(postId);

  const rootComments = comments.filter((comment) => !comment.parent_id);

  return (
    <div className="mt-8 pt-8 border-t">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold">Comments ({comments.length})</h3>
      </div>

      <div className="mb-8">
        <CommentComposer postId={postId} />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p>Loading comments...</p>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 border border-destructive/50 rounded-xl p-6 text-center">
          <p className="text-destructive font-bold mb-1">
            Failed to load comments
          </p>
          <p className="text-xs text-destructive/80 font-mono">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-xs underline hover:text-destructive/80 transition-colors"
          >
            Refresh page
          </button>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm italic">Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rootComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={comments.filter((c) => c.parent_id === comment.id)}
              allComments={comments}
              postId={postId}
              postAuthorId={postAuthorId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
