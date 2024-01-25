import { z } from "zod";
import bcrypt from "bcrypt";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { LoginSchema, RegisterSchema } from "~/schemas";

export const authRouter = createTRPCRouter({
  login: protectedProcedure
    .input(LoginSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new Error("No user found! Please register first.");
      }

      const isPasswordValid = await bcrypt.compare(
        input.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new Error("Invalid password!");
      }

      return "Logged in!";
    }),
  register: protectedProcedure
    .input(RegisterSchema)
    .mutation(async ({ input, ctx }) => {
      console.log("hi");
      return ctx.db.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: input.password,
        },
      });
    }),
});
