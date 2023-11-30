import { initTRPC } from "@trpc/server";

// create trpc server
export const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
