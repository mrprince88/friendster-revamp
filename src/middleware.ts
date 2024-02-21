import authConfig from "~/server/auth.config";
import NextAuth from "next-auth";

import { authRoutes, apiAuthPrefix, DEFAUT_LOGIN_REDIRECT } from "~/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const nextUrl = req.nextUrl;

  console.log("isLoggedIn", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  // if (isAuthRoute) {
  //   if (isLoggedIn) return;
  //   return;
  // }

  // if (!isLoggedIn) {
  //   return Response.redirect(new URL("/auth/login", nextUrl));
  // }

  // return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
