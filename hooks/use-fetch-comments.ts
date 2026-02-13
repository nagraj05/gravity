import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@/lib/supabase";

export interface Comment {
  id: string;
  post_id: string;
  parent_id: string | null;
  clerk_user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  profiles: {
    username: string;
    first_name: string;
    last_name: string;
    image_url: string;
  } | null;
}

export default function useFetchComments(postId: string | undefined) {
  const { getAuthenticatedClient } = useSupabaseClient();

  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      if (!postId) return [];
      const supabase = await getAuthenticatedClient();
      const { data, error } = await supabase
        .from("comments")
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
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!postId,
  });
}
