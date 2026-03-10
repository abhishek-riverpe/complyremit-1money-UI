import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  await auth.protect();

  // For dashboard routes, check if user has completed onboarding
  if (isDashboardRoute(req)) {
    try {
      const { getToken } = await auth();
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/business`,
        { headers: { "x-auth-token": token ?? "" } }
      );

      if (res.status === 404) {
        return NextResponse.redirect(new URL("/onboarding/tos", req.url));
      }

      if (res.ok) {
        const data = await res.json();
        const user = data.data ?? data;
        if (!user.oneMoneyCustomerId) {
          return NextResponse.redirect(new URL("/onboarding/tos", req.url));
        }
      }
    } catch {
      // Backend unreachable — block dashboard access instead of failing open
      return new NextResponse("Service unavailable", { status: 503 });
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
