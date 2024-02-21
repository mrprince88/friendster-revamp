import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      authorize(credentials) {
        return credentials;
      },
    }),
  ],
} satisfies NextAuthConfig;
