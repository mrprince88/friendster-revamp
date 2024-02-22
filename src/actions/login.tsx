"use server";
import { signIn as serverSignIn } from "~/server/auth";

export async function signIn(email: string, password: string) {
  await serverSignIn("credentials", {
    email,
    password,
    redirectTo: "/home",
  });
}
