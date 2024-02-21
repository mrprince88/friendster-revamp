import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>Home</h1>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}