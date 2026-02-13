import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@/lib/supabase";

export interface UserProfile {
  clerk_user_id: string;
  username: string;
  image_url: string;
}

export default function useSearchUsers(query: string) {
  const { getAuthenticatedClient } = useSupabaseClient();

  return useQuery({
    queryKey: ["search-users", query],
    queryFn: async () => {
      if (!query || query.length < 2) return [];

      const supabase = await getAuthenticatedClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("clerk_user_id, username, image_url")
        .ilike("username", `%${query}%`)
        .limit(5);

      if (error) throw error;
      return data as UserProfile[];
    },
    enabled: query.length >= 2,
  });
}
