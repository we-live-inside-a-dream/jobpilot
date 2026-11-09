"use client";

import { authClient } from "@/lib/auth-client";

export function SignInButton() {
  return (
    <button
      onClick={() =>
        authClient.signIn.social({
          provider: "github",
          callbackURL: "/dashboard",
        })
      }
      className="self-start rounded-lg border border-gray-800 bg-linear-to-b from-gray-900 to-black px-3 py-2 leading-none text-gray-200 hover:from-indigo-500 focus:outline-none focus-visible:ring-2"
    >
      Sign in with GitHub
    </button>
  );
}
