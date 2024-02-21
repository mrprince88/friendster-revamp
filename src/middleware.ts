import authConfig from "~/server/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log("ROUTE", req.nextUrl.pathname);
  console.log("IS AUTHENTICATED", !!req.auth);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
