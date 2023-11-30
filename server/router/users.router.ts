import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const usersRouter = router({
  createUsers: publicProcedure
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation((opts) => {
      const { input } = opts;

      return input;
    }),
});
