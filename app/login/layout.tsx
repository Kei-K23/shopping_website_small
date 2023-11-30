import { authOptions } from "@/lib/authOptions";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page for user",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    return redirect("/");
  }
  return <main>{children}</main>;
};

export default layout;
