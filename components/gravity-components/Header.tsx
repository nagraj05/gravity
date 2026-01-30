"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
    const router = useRouter();
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/70 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-semibold tracking-tight">
                        Gravity
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <SignedOut>
                        <Link href="/login">
                            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button variant="outline" className="border-white/15 bg-white/5 hover:bg-white/10" >
                                Sign Up
                            </Button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}
