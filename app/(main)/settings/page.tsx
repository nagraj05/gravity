"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type ThemeFlavor = "default" | "vintage" | "bubblegum";

export default function SettingsPage() {
  const router = useRouter();
  
  const [flavor, setFlavor] = useState<ThemeFlavor>(() => {
    if (typeof window !== "undefined") {
      const savedFlavor = localStorage.getItem("theme-flavor") as ThemeFlavor;
      return savedFlavor || "default";
    }
    return "default";
  });

  useEffect(() => {
    const savedFlavor = localStorage.getItem("theme-flavor") as ThemeFlavor;
    if (savedFlavor && savedFlavor !== "default") {
      document.documentElement.setAttribute("data-theme", savedFlavor);
    }
  }, []);

  const handleFlavorChange = (newFlavor: ThemeFlavor) => {
    setFlavor(newFlavor);
    if (newFlavor === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", newFlavor);
    }
    localStorage.setItem("theme-flavor", newFlavor);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="px-1 py-4">
        <Button
          className="w-fit text-xs mb-2"
          size={"xs"}
          variant={"outline"}
          onClick={() => router.back()}
        >
          <MoveLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Space Station Settings</h1>
        <p className="text-muted-foreground">
          Manage your universe preferences.
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how Gravity looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Color Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark mode.
                </p>
              </div>
              <ModeToggle />
            </div>

            <div className="space-y-3">
              <div className="space-y-0.5">
                <Label>Theme Flavor</Label>
                <p className="text-sm text-muted-foreground">
                  Select a curated color palette for your interface.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    id: "default",
                    name: "Gravity Default",
                    desc: "Sleek & Spacey",
                    bg: "bg-[#1a1a1a]",
                  },
                  {
                    id: "vintage",
                    name: "Vintage",
                    desc: "Classic & Warm",
                    bg: "bg-[#f4f2e9]",
                  },
                  {
                    id: "bubblegum",
                    name: "Bubblegum",
                    desc: "Sweet & Fun",
                    bg: "bg-[#f8f0f4]",
                  },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleFlavorChange(t.id as ThemeFlavor)}
                    className={cn(
                      "flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left cursor-pointer",
                      flavor === t.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-border/80",
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border border-border mb-3",
                        t.bg,
                      )}
                    />
                    <span className="font-semibold text-sm">{t.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {t.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your profile and authentication settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use the Astronaut Profile page to update your personal details.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}