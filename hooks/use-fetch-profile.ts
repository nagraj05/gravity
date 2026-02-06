import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@/lib/supabase";

export interface Profile {
  clerk_user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  image_url: string;
  bio: string | null;
  created_at: string;
}

export function useFetchProfile(identifier: string, isUsername = false) {
  const { getAuthenticatedClient } = useSupabaseClient();

  return useQuery({
    queryKey: ["profile", identifier],
    queryFn: async () => {
      if (!identifier) return null;

      const supabase = await getAuthenticatedClient();
      const query = supabase.from("profiles").select("*");

      if (isUsername) {
        // Decode in case of %40 and strip leading @
        const cleanUsername = decodeURIComponent(identifier).replace(/^@/, "");
        query.eq("username", cleanUsername);
      } else {
        query.eq("clerk_user_id", identifier);
      }

      const { data, error } = await query.single();

      if (error) {
        if (error.code === "PGRST116") return null; // Not found
        throw error;
      }

      return data as Profile;
    },
    enabled: !!identifier,
  });
}
