import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "~/schemas";
import { getUserByEmail } from "~/data/account";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;
        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    authorized(params) {
      return !!params.auth?.user;
    },
  },
} satisfies NextAuthConfig;
