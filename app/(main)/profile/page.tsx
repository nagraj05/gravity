"use client";

import { useUser } from "@clerk/nextjs";
import { useFetchProfile } from "@/hooks/use-fetch-profile";
import ProfileView from "@/components/gravity-components/profile-view";
import Loader from "@/components/gravity-components/loader";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { data: profile, isLoading: isProfileLoading } = useFetchProfile(
    user?.id || "",
  );

  if (!isLoaded || isProfileLoading) {
    return <Loader />;
  }

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-muted-foreground">Profile not found</div>
      </div>
    );
  }

  return <ProfileView profile={profile} isOwner={true} />;
}
