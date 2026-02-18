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
import Image from "next/image";
import LogoutButton from "./logout-button";
import useFetchPostCount from "@/hooks/use-fetch-post-count";

export default function LeftSidebar() {
  const { user, isLoaded } = useUser();
  const { data: count = 0 } = useFetchPostCount();

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50 animate-pulse h-[160px]" />
        <div className="bg-card rounded-xl shadow-sm border border-border/50 p-2 h-[260px] animate-pulse" />
      </div>
    );
  }

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
            <div className="w-12 h-12 rounded-full ring-2 ring-primary/10 relative">
              <Image
                src={user.imageUrl}
                alt={user.firstName || "User"}
                fill
                className=" object-cover rounded-full"
              />
              <div className="absolute -bottom-1 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                @{user.username || user.id.slice(0, 8)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
          </div>

          <div className="flex justify-between mt-4 pt-4 border-t border-border/50">
            <ModeToggle />
            <LogoutButton />
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
