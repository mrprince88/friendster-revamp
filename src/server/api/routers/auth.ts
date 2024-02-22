import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcryptjs";
import { LoginSchema, RegisterSchema } from "~/schemas";
import { signIn } from "~/server/auth";
import { AuthError } from "next-auth";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(LoginSchema).mutation(async ({ input, ctx }) => {
    try {
      signIn("credentials", {
        email: input.email,
        password: input.password,
        redirect: false,
      }).then(() => console.log("signed in"));
    } catch (error) {
      if (error instanceof Error) {
        const { type, cause } = error as AuthError;
        switch (type) {
          case "CredentialsSignin":
            return "Invalid credentials.";
          case "CallbackRouteError":
            return cause?.err?.toString();
          default:
            return "Something went wrong.";
        }
      }
    }
  }),
  register: publicProcedure
    .input(RegisterSchema)
    .mutation(async ({ input, ctx }) => {
      const userExists = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (userExists) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          name: input.name,
        },
      });

      return user;
    }),
});
