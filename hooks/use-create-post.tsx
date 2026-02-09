import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { useSupabaseClient } from "@/lib/supabase";
import { toast } from "sonner";

interface CreatePostInput {
  content: string;
  link: string | null;
  media_type?: string | null;
}

export default function useCreatePost() {
  const { user } = useUser();
  const { getAuthenticatedClient } = useSupabaseClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, link, media_type }: CreatePostInput) => {
      if (!user) throw new Error("User not authenticated");

      const supabase = await getAuthenticatedClient();

      // Upsert profile
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

      // Create post
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .insert({
          user_id: profileData.id,
          clerk_user_id: user.id,
          content: content.trim(),
          link: link?.trim() || null,
          media_type: media_type || null,
        })
        .select()
        .single();

      if (postError) throw postError;
      return postData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["post-count", user?.id] });
      toast.success("Post created successfully! 🚀");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    },
  });
}
