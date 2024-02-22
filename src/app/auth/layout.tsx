export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-[1500px] flex min-h-screen items-center justify-center bg-slate-200 py-2 min-[320px]:flex-col lg:flex-row">
      <div className="flex w-1/2 flex-col items-center justify-center py-2">
        <h1 className=" text-6xl font-bold text-blue-800">Friendster</h1>
        <p className="mt-3 text-xl">Connect with friends</p>
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center min-[320px]:mt-4">
        {children}
      </div>
    </div>
  );
}
