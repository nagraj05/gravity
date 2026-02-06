"use client";

import { useUser } from "@clerk/nextjs";
import { useFetchProfile } from "@/hooks/use-fetch-profile";
import ProfileView from "@/components/gravity-components/profile-view";
import { useParams } from "next/navigation";
import Loader from "@/components/gravity-components/loader";

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { user, isLoaded } = useUser();

  const { data: profile, isLoading } = useFetchProfile(username, true);

  if (!isLoaded || isLoading) {
    return <Loader />;
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">User not found</h1>
          <p className="text-muted-foreground">
            The user @{username.replace("@", "")} doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === profile.clerk_user_id;

  return <ProfileView profile={profile} isOwner={isOwner} />;
}
