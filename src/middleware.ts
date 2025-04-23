import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = auth();

  // Check if sessionClaims are available and the role is missing
  if (sessionClaims?.publicMetadata?.role == null) {
    const isOnRolePage = req.nextUrl.pathname === "/select-role";

    // Only redirect to /select-role if user doesn't already have a role
    // and is not already on the /select-role page
    if (!isOnRolePage) {
      // const url = new URL("/select-role", req.url);
      // return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
