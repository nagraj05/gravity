import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { HOME_URL } from "./constants/app-routes";

const isProtectedRoute = createRouteMatcher(["/home(.*)", "/profile(.*)"]);
const isAuthRoute = createRouteMatcher(["/login(.*)", "/signup(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const isAuthenticated = !!userId;

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  if (isAuthenticated && (isAuthRoute(req) || req.nextUrl.pathname === "/")) {
    return NextResponse.redirect(new URL(HOME_URL, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
