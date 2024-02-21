"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
import { authRouter } from "~/server/api/routers/auth";
import { LoginSchema } from "~/schemas";

import { api } from "~/trpc/react";

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isError, isSuccess, isLoading } = api.auth.login.useMutation();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    mutate(values);
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
          {isError && <FormError message="Some error occured" />}
          {isSuccess && <FormSuccess message="Successful!" />}
          <Button type="submit" className="w-full">
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
