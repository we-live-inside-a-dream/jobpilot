import  {siteConfig}  from "./lib/site";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full flex-1 flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="container mx-auto overflow-hidden p-8 md:rounded-lg md:p-10 lg:p-12">
          <div className="flex justify-between">
            <h1 className="text-3xl font-medium">{siteConfig.title}</h1>
            <Link
              href="/"
              className="focus-visible:ring-2 self-start rounded-lg border border-gray-800 bg-gradient-to-b from-gray-900 to-black px-3 py-2 leading-none text-gray-200 hover:from-indigo-500 focus:outline-none"
            >
              Get Started
            </Link>
          </div>

          <div className="h-32 md:h-40"></div>

          <p className="max-w-5xl text-gray-900 dark:text-gray-200  font-sans text-4xl font-bold text-gray-200 md:text-6xl lg:pr-24 lg:text-7xl">
            {siteConfig.title}
          </p>
          <div className="h-10"></div>
          <p className="max-w-2xl text-xl text-gray-700 dark:text-gray-400 md:text-2xl">
            {siteConfig.description}
          </p>
          <div className="h-12"></div>
        </div>
      </main>
    </div>
  );
}
