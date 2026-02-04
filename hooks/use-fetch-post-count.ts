import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { useSupabaseClient } from "@/lib/supabase";

export default function useFetchPostCount() {
  const { user } = useUser();
  const { getAuthenticatedClient } = useSupabaseClient();

  return useQuery({
    queryKey: ["post-count", user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;

      const supabase = await getAuthenticatedClient();
      const { count, error } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("clerk_user_id", user.id);

      if (error) throw error;
      return count || 0;
    },
    enabled: !!user?.id,
  });
}
