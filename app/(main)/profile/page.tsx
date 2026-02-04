"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  Mail,
  Calendar,
  Edit,
  MoveLeft,
  Bookmark,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import PostCard from "@/components/gravity-components/post-card";
import LogoutButton from "@/components/gravity-components/logout-button";

interface Post {
  id: string;
  clerk_user_id: string;
  content: string;
  link: string | null;
  created_at: string;
  profiles: {
    username: string;
    first_name: string;
    last_name: string;
    image_url: string;
  } | null;
}

import useFetchUserPosts from "@/hooks/use-fetch-user-posts";

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  const { data: posts = [], isLoading: loading } = useFetchUserPosts(user?.id);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const stats = [
    { label: "Posts", value: posts.length.toString() },
    { label: "Followers", value: "0" },
    { label: "Following", value: "0" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        className="w-fit text-xs ml-4 mt-4"
        size={"xs"}
        variant={"outline"}
        onClick={() => router.back()}
      >
        <MoveLeft className="w-4 h-4 mr-1" />
        Back
      </Button>
      <div className="p-4">
        <Card className="border-border/50 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Profile Picture */}
              <div className="relative mx-auto sm:mx-0">
                <div className="relative w-32 h-32 rounded-full ring-4 ring-background overflow-hidden">
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || "Profile"}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{user.fullName}</h1>
                    <p className="text-muted-foreground">
                      @{user.username || user.id.slice(0, 8)}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <LogoutButton />
                  </div>
                </div>

                <p className="text-sm mb-4">
                  ✨ Living my best life in the Gravity universe 🚀
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  {user.primaryEmailAddress && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>{user.primaryEmailAddress.emailAddress}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined{" "}
                      {formatDistanceToNow(new Date(user.createdAt!), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-6 justify-center sm:justify-start">
                  {stats.map((stat) => (
                    <button
                      key={stat.label}
                      className="hover:underline transition-all"
                    >
                      <span className="font-bold">{stat.value}</span>
                      <span className="text-muted-foreground ml-1 text-sm">
                        {stat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-4">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="posts" className="cursor-pointer">Posts</TabsTrigger>
            <TabsTrigger value="likes" className="cursor-pointer">Likes</TabsTrigger>
            <TabsTrigger value="saved" className="cursor-pointer">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-2">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="border-border/50 animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex gap-3 mb-4">
                        <div className="w-10 h-10 bg-muted rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-1/4"></div>
                          <div className="h-3 bg-muted rounded w-1/6"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <Card className="border-border/50">
                <CardContent className="p-12 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No posts yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start sharing your thoughts with the world!
                  </p>
                  <Button onClick={() => router.push("/")}>
                    Create Your First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <Card className="border-border/50">
              <CardContent className="p-12 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No likes yet</h3>
                <p className="text-sm text-muted-foreground">
                  Posts you like will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <Card className="border-border/50">
              <CardContent className="p-12 text-center">
                <Bookmark className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No saved posts</h3>
                <p className="text-sm text-muted-foreground">
                  Save posts to view them later
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
