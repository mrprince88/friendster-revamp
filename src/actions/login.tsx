"use server";
import { signIn as serverSignIn } from "~/server/auth";
import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { AuthError } from "next-auth";

export async function signIn(email: string, password: string) {
  try {
    await serverSignIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      switch (type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        case "CallbackRouteError":
          return { error: cause?.err?.toString() };
        default:
          return { error: "Something went wrong." };
      }
    }

    // i dont know why but it does not work without this
    throw error;
  }
}
