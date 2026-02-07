import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";

export interface Profiles {
  clerk_user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  image_url: string;
  bio: string | null;
  created_at: string;
}

function shuffleArray<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}

export function useFetchProfiles() {
  const { getAuthenticatedClient } = useSupabaseClient();
  const { user } = useUser();

  return useQuery({
    queryKey: ["profiles", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const supabase = await getAuthenticatedClient();

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("clerk_user_id", user!.id); 

      if (error) throw error;

      return shuffleArray(data ?? []).slice(0, 3);
    },
  });
}
