"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import PostComposer from "./post-composer";
import { X } from "lucide-react";

export default function CreatePostModal({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || <Button variant="outline">Create Post</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-xl">
        <AlertDialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <AlertDialogTitle>Create Post Orbits</AlertDialogTitle>
            <AlertDialogDescription>
              Deploy your thoughts to the gravity universe.
            </AlertDialogDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 transition-colors hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertDialogHeader>

        <div className="py-4">
          <PostComposer isModal onSuccess={() => setOpen(false)} />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
