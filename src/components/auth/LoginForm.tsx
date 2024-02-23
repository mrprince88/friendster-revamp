"use client";

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";

import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import FormError from "~/components/auth/FormError";
import FormSuccess from "~/components/auth/FormSuccess";
import { LoginSchema } from "~/schemas";
import { signIn } from "~/actions/login";

export default function Login() {
  const router = useRouter();
  const [isLoading, startLogin] = useTransition();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startLogin(async () => {
      const data = await signIn(values.email, values.password);
      if (data?.error) setError(data.error);
    });
  };

  return (
    <Card className="flex min-w-[350px] flex-col p-10 md:min-w-[550px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormError message={error} />}
          {/* {isSuccess && <FormSuccess message="Successful!" />} */}
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Login
          </Button>
        </form>
        <Button
          variant="secondary"
          className="mt-4 w-full bg-green-500 text-white hover:bg-green-600"
          onClick={() => router.push("/auth/register")}
        >
          Register
        </Button>
      </Form>
    </Card>
  );
}
