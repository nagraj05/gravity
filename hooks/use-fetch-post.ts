import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@/lib/supabase";

interface Post {
  id: string;
  clerk_user_id: string;
  content: string;
  link: string | null;
  media_type: string | null;
  created_at: string;
  profiles: {
    username: string;
    first_name: string;
    last_name: string;
    image_url: string;
  } | null;
}

export default function useFetchPost(postId: string | undefined) {
  const { getAuthenticatedClient } = useSupabaseClient();

  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      if (!postId) return null;
      const supabase = await getAuthenticatedClient();
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
                *,
                profiles (
                    username,
                    first_name,
                    last_name,
                    image_url
                )
            `,
        )
        .eq("id", postId)
        .single();

      if (error) throw error;
      return data as Post;
    },
    enabled: !!postId,
  });
}
