"use client";

import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">Profile</h1>
      {user && (
        <div className="space-y-4">
          <img
            src={user.imageUrl}
            alt={user.fullName || ""}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <p className="font-semibold text-lg">{user.fullName}</p>
          <p className="text-muted-foreground">
            @{user.username || user.id.slice(0, 8)}
          </p>
        </div>
      )}
    </div>
  );
}
