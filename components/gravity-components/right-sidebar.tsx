"use client";

import { Sparkles, UserPlus } from "lucide-react";
import AstronautsSuggestionsCard from "./cards/astronauts-suggestions-card";

export default function RightSidebar() {
  const trendingTopics = [
    { tag: "webdev", posts: "1.2K", trend: "up" },
    { tag: "nextjs", posts: "856", trend: "up" },
    { tag: "typescript", posts: "645", trend: "up" },
    { tag: "react", posts: "523", trend: "neutral" },
  ];


  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Trending Now</h3>
          </div>
        </div>
        <div className="p-2">
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.tag}
              className="hover:bg-accent p-3 rounded-lg cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      #{index + 1}
                    </span>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                      #{topic.tag}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {topic.posts} posts
                  </p>
                </div>
                {topic.trend === "up" && (
                  <div className="text-green-500 text-xs font-medium">↗</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

     <AstronautsSuggestionsCard />

      <div className="bg-card/50 rounded-xl p-4 text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:text-foreground transition-colors">
            About
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Help
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
        </div>
        <p className="mt-2 text-xs">© 2026 Gravity</p>
      </div>
    </div>
  );
}
