"use client";

import { useUser } from "@clerk/nextjs";
import {
  Home,
  Compass,
  TrendingUp,
  User,
  Bookmark,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { useSupabaseClient } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function LeftSidebar() {
  const { user } = useUser();
  const { getAuthenticatedClient } = useSupabaseClient();
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    if (!user?.id) return;
    try {
      const supabase = await getAuthenticatedClient();
      const { count, error } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("clerk_user_id", user.id);

      if (error) throw error;
      setCount(count || 0);
    } catch (error) {
      console.error("Error fetching post count:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCount();
    }
  }, [user?.id]);

  const menuItems = [
    { icon: Home, label: "Home Planet", href: "/", active: true },
    {
      icon: Compass,
      label: "Explore Universes",
      href: "/explore",
      active: false,
    },
    {
      icon: TrendingUp,
      label: "Trending Orbits",
      href: "/trending",
      active: false,
    },
    { icon: Bookmark, label: "Saved Orbits", href: "/saved", active: false },
    { icon: User, label: "Astronaut Profile", href: "/profile", active: false },
    {
      icon: Settings,
      label: "Space Station Settings",
      href: "/settings",
      active: false,
    },
  ];

  return (
    <div className="space-y-4">
      {user && (
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt={user.firstName || "User"}
                className="w-12 h-12 rounded-full ring-2 ring-primary/10 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                @{user.username || user.id.slice(0, 8)}
              </p>
            </div>
            <ModeToggle />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/50">
            <div className="text-center">
              <p className="text-lg font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">0</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">0</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-card rounded-xl shadow-sm border border-border/50 p-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              item.active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
