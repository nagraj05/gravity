import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

interface CreateCommentData {
  postId: string;
  parentId?: string | null;
  content: string;
}

export default function useCreateComment() {
  const { getAuthenticatedClient } = useSupabaseClient();
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, parentId, content }: CreateCommentData) => {
      if (!user) throw new Error("Unauthorized");

      const supabase = await getAuthenticatedClient();
      const { data, error } = await supabase
        .from("comments")
        .insert({
          post_id: postId,
          parent_id: parentId || null,
          content,
          clerk_user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      toast.success("Comment posted!");
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
      toast.error("Failed to post comment");
    },
  });
}
