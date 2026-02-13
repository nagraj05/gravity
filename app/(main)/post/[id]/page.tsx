"use client";

import { useParams } from "next/navigation";
import useFetchPost from "@/hooks/use-fetch-post";
import PostCard from "@/components/gravity-components/post-card";
import CommentSection from "@/components/gravity-components/comment-section";
import LeftSidebar from "@/components/gravity-components/left-sidebar";
import RightSidebar from "@/components/gravity-components/right-sidebar";
import Loader from "@/components/gravity-components/loader";
import { AnimatePresence } from "motion/react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PostPage() {
  const { id } = useParams();
  const postId = Array.isArray(id) ? id[0] : id;
  const { data: post, isLoading, error } = useFetchPost(postId);

  if (isLoading) return <Loader />;

  if (error || !post) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-destructive">⚠️</span>
          </div>
          <h1 className="text-xl font-bold mb-2">Post not found</h1>
          <p className="text-muted-foreground mb-6">
            The post you're looking for might have been deleted or doesn't
            exist.
          </p>
          <Link href="/home">
            <Button variant="default" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6">
              <LeftSidebar />
            </div>
          </aside>

          <main className="col-span-1 lg:col-span-6">
            <div className="max-w-2xl mx-auto space-y-4">
              <Link href="/home">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-2 -ml-2 text-muted-foreground hover:text-primary"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Feed
                </Button>
              </Link>

              <PostCard post={post} />
              <CommentSection
                postId={post.id}
                postAuthorId={post.clerk_user_id}
              />
            </div>
          </main>

          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6">
              <RightSidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
