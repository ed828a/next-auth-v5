import { Button } from "@/components/ui/button";
import { cn, poppins } from "@/lib/utils";
import LoginButton from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 border border-red-500">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            poppins.className
          )}
        >
          🔐Auth
        </h1>
        <p className="text-white text-lg">A simple authentication server</p>
        <div className="">
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
