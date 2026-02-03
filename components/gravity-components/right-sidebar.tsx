"use client";

import { Sparkles, UserPlus } from "lucide-react";

export default function RightSidebar() {
  const trendingTopics = [
    { tag: "webdev", posts: "1.2K", trend: "up" },
    { tag: "nextjs", posts: "856", trend: "up" },
    { tag: "typescript", posts: "645", trend: "up" },
    { tag: "react", posts: "523", trend: "neutral" },
  ];

  const suggestedUsers = [
    { name: "John Doe", username: "johndoe", bio: "Full-stack developer" },
    { name: "Jane Smith", username: "janesmith", bio: "UI/UX Designer" },
    { name: "Alex Johnson", username: "alexj", bio: "Tech enthusiast" },
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

      <div className="bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Who to Follow</h3>
          </div>
        </div>
        <div className="p-2">
          {suggestedUsers.map((user) => (
            <div
              key={user.username}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  @{user.username}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {user.bio}
                </p>
              </div>
              <button className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all flex-shrink-0 font-medium shadow-sm">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

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
