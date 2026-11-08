import "server-only"; // build error if a client component ever imports this file
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireUser() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return session.user;
}
