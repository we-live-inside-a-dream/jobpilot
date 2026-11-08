import { siteConfig } from "@/lib/site";
import Link from "next/link";
import { SignInButton } from "@/components/sign-in-button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full flex-1 flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="container mx-auto overflow-hidden p-8 md:rounded-lg md:p-10 lg:p-12">
          <div className="flex justify-between gap-6 md:gap-8 lg:gap-10">
            <h1 className="mb-20 text-3xl font-medium">{siteConfig.title}</h1>
            <Link
              href="/"
              className="self-start rounded-lg border border-gray-800 bg-linear-to-b from-gray-900 to-black px-3 py-2 leading-none text-gray-200 hover:from-indigo-500 focus:outline-none focus-visible:ring-2"
            >
              <SignInButton />
            </Link>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            <p className="max-w-5xl text-4xl font-bold text-gray-900 md:text-6xl lg:pr-24 lg:text-7xl dark:text-gray-200">
              {siteConfig.title}
            </p>
            <p className="max-w-2xl text-xl text-gray-700 md:text-2xl dark:text-gray-400">
              {siteConfig.description}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
