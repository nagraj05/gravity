import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@/lib/supabase";
import { toast } from "sonner";

export default function useDeleteComment() {
  const { getAuthenticatedClient } = useSupabaseClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      postId,
    }: {
      commentId: string;
      postId: string;
    }) => {
      const supabase = await getAuthenticatedClient();
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;
      return { commentId, postId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] });
      toast.success("Comment deleted");
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    },
  });
}
