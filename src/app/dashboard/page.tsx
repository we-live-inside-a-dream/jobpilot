import { siteConfig } from "@/lib/site";
import { SignOutButton } from "@/components/sign-out-button";
import { requireUser } from "@/lib/session";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full flex-1 flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="container mx-auto overflow-hidden p-8 md:rounded-lg md:p-10 lg:p-12">
          <div className="flex justify-between gap-6 md:gap-8 lg:gap-10">
            <h1 className="mb-20 text-3xl font-medium">{siteConfig.title}</h1>
            <SignOutButton />
          </div>

          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            <div className="max-w-2xl text-xl text-gray-700 md:text-2xl dark:text-gray-400">
              <Suspense fallback={<p>Loading…</p>}>
                <Welcome />
              </Suspense>
              {siteConfig.description}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

async function Welcome() {
  const user = await requireUser();
  return (
    <p className="max-w-5xl text-4xl font-bold text-gray-900 md:text-6xl lg:pr-24 lg:text-7xl dark:text-gray-200">
      Welcome {user.name}
    </p>
  );
}
