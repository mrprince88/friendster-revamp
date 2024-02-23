"use server";
import { signIn as serverSignIn } from "~/server/auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";

export async function signIn(email: string, password: string) {
  await serverSignIn("credentials", {
    email,
    password,
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
}
