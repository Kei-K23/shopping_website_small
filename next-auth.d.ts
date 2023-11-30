import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      userId?: string;
    } & DefaultSession["user"];
  }
}
