"use client";

import { useFetchProfiles } from "@/hooks/use-fetch-profiles";
import { UserPlus } from "lucide-react";
import Loader from "../loader";
import Image from "next/image";

export default function AstronautsSuggestionsCard() {
  const { data, isLoading } = useFetchProfiles();

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Astronauts!!!</h3>
        </div>
      </div>

      <div className="p-2">
        {isLoading ? (
          <Loader />
        ) : (
          data?.map((user) => (
            <div
              key={user.username}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 shrink-0">
                <Image
                  src={user.image_url}
                  alt={user.first_name + " " + user.last_name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user.first_name + " " + user.last_name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  @{user.username}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {user.bio}
                </p>
              </div>

              {/* <button className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all flex-shrink-0 font-medium shadow-sm">
                Follow
              </button> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
