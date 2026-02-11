import Header from "@/components/gravity-components/Header";
import { JSX } from "react";
import StarBackground from "@/components/gravity-components/landing-page/StarBackground";
import FloatingBlobs from "@/components/gravity-components/landing-page/FloatingBlobs";
import HeroSection from "@/components/gravity-components/landing-page/HeroSection";
import OrbitingDivider from "@/components/gravity-components/landing-page/OrbitingDivider";
import FeaturesSection from "@/components/gravity-components/landing-page/FeaturesSection";

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col w-full min-h-screen bg-linear-to-b dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950 overflow-hidden relative">
      {/* Animated background stars */}
      <StarBackground />

      {/* Floating planets */}
      <FloatingBlobs />

      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center px-6 sm:px-16 relative z-10">
        <HeroSection />

        {/* Orbiting planets around divider */}
        <OrbitingDivider />

        <FeaturesSection />
      </main>
    </div>
  );
}
