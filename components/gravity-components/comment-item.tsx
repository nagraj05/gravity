"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Reply,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Comment } from "@/hooks/use-fetch-comments";
import CommentComposer from "./comment-composer";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import useDeleteComment from "@/hooks/use-delete-comment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
  allComments: Comment[];
  postId: string;
  postAuthorId: string;
  depth?: number;
}

export default function CommentItem({
  comment,
  replies,
  allComments,
  postId,
  postAuthorId,
  depth = 0,
}: CommentItemProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const { user } = useUser();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();

  // Deletion logic: Comment author OR Post author
  const canDelete =
    user?.id === comment.clerk_user_id || user?.id === postAuthorId;

  const displayName = comment.profiles?.username || "Unknown User";

  return (
    <div
      className={`mt-4 ${depth > 0 ? "ml-4 pl-4 border-l border-border/50" : ""}`}
    >
      <div className="flex gap-3">
        {/* User Image / Initial */}
        <Link
          href={`/profile/@${comment.profiles?.username || comment.clerk_user_id}`}
        >
          {comment.profiles?.image_url ? (
            <img
              src={comment.profiles.image_url}
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover border border-border/50"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
              {comment.clerk_user_id.slice(0, 2).toUpperCase()}
            </div>
          )}
        </Link>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/profile/@${comment.profiles?.username || comment.clerk_user_id}`}
              className="font-medium text-sm hover:underline"
            >
              {displayName}
            </Link>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), {
                addSuffix: true,
              })}
            </span>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              {isCollapsed ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>

          {!isCollapsed && (
            <>
              {/* Content */}
              <div className="text-sm leading-relaxed mb-2 whitespace-pre-wrap">
                {comment.content.split(/(@\w+)/g).map((part, i) => {
                  if (part.startsWith("@")) {
                    const username = part.slice(1);
                    return (
                      <Link
                        key={i}
                        href={`/profile/@${username}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {part}
                      </Link>
                    );
                  }
                  return part;
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  <Reply className="w-4 h-4" />
                  Reply
                </button>

                {canDelete && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        disabled={isDeleting}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors font-medium disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete comment?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this comment and all its
                          replies.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            deleteComment({ commentId: comment.id, postId })
                          }
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Reply Composer */}
              {isReplying && (
                <div className="mt-4">
                  <CommentComposer
                    postId={postId}
                    parentId={comment.id}
                    onSuccess={() => setIsReplying(false)}
                    onCancel={() => setIsReplying(false)}
                    autoFocus
                    placeholder="Write a reply..."
                  />
                </div>
              )}

              {/* Children */}
              <div className="space-y-4">
                {replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    replies={allComments.filter(
                      (c) => c.parent_id === reply.id,
                    )}
                    allComments={allComments}
                    postId={postId}
                    postAuthorId={postAuthorId}
                    depth={depth + 1}
                  />
                ))}
              </div>
            </>
          )}

          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(false)}
              className="text-xs text-muted-foreground hover:underline font-medium mt-1"
            >
              Expand thread
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
