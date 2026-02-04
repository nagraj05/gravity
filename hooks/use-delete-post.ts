import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function useDeletePost() {
  const { user } = useUser();
  const { getAuthenticatedClient } = useSupabaseClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      if (!user) throw new Error("User not authenticated");

      const supabase = await getAuthenticatedClient();
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .eq("clerk_user_id", user.id); 

      if (error) throw error;
      return postId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post-count", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["user-posts", user?.id] });
      toast.success("Post deleted successfully! 🗑️");
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post. Please try again.");
    },
  });
}
