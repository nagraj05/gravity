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

export default function useFetchPosts() {
  const { getAuthenticatedClient } = useSupabaseClient();

  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
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
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });
}
