import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";
import { signIn } from "~/server/auth";
import { LoginSchema, RegisterSchema } from "~/schemas";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(LoginSchema).mutation(async ({ input, ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(input.password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    signIn("credentials", {
      email: input.email,
      password: input.password,
    });

    return user;
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
