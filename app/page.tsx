import Header from "@/components/gravity-components/Header";
import { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white">
      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center px-6 sm:px-16">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-tight flex gap-2 items-center justify-center">Gravity!</h1>
        <section className="max-w-5xl w-full text-center space-y-8">
          <h1 className="text-4xl sm:text-6xl lg:text-4xl font-bold tracking-tight leading-tight flex gap-2 items-center justify-center">
            What pulls
            <span className="block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              you in.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400">
            Gravity is a social space built around thoughts, depth, and meaning —
            not likes, not noise.
          </p>

        </section>

        <div className="my-20 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full">
          <FeatureCard
            title="No Likes"
            description="Posts don’t compete for attention. They earn gravity through depth."
          />

          <FeatureCard
            title="Interest-Driven"
            description="You don’t follow people. You fall into ideas and thoughts."
          />

          <FeatureCard
            title="Finite Feed"
            description="No infinite scroll. Consume consciously. Leave fulfilled."
          />
        </section>
      </main>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({
  title,
  description,
}: FeatureCardProps): JSX.Element {
  return (
    <div className="rounded-2xl border border-gray-800 p-6 hover:border-purple-500 transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
