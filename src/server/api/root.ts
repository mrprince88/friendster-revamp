import { authRouter } from "./routers/auth";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
