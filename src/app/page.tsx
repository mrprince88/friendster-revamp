import { unstable_noStore as noStore } from "next/cache";
import { Input } from "~/components/ui/input";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export default async function Login() {
  noStore();

  return (
    <div className="max-w-screen-[1500px] flex min-h-screen items-center justify-center bg-slate-200 py-2 min-[320px]:flex-col lg:flex-row">
      <div className="flex w-1/2 flex-col items-center justify-center py-2">
        <h1 className=" text-6xl font-bold text-blue-800">Friendster</h1>
        <p className="mt-3 text-xl">Connect with friends</p>
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center min-[320px]:mt-4">
        <Card className="flex min-w-[350px] flex-col p-10 md:min-w-[550px]">
          <Input type="text" placeholder="Username" autoComplete="username" />
          <Input
            className="mt-5"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <Button className="mt-5" variant="default">
            Login
          </Button>
        </Card>
      </div>
    </div>
  );
}
