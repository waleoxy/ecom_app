"use client";

import { signIn, useSession } from "next-auth/react";
import Dashboard from "./dashboard/page";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="overflow-hidden max-width flex justify-center items-center bg-slate-400 h-screen">
        {" "}
        <button
          className="custom-btn rounded-lg bg-white hover:bg-slate-100"
          onClick={() =>
            signIn("google", { callbackUrl: "/dashboard" }) as any
          }>
          Login with Google
        </button>
      </main>
    );
  }

  return <Dashboard />;
}
