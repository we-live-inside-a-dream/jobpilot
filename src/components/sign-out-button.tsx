"use client";

import { authClient } from "@/lib/auth-client";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () =>
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
              router.refresh()
            },
          },
        })
      }
      className="self-start rounded-lg border border-gray-800 bg-linear-to-b from-gray-900 to-black px-3 py-2 leading-none text-gray-200 hover:from-indigo-500 focus:outline-none focus-visible:ring-2"
    >
      Sign in with GitHub
    </button>
  );
}
