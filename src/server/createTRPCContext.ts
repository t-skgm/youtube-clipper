import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession({ req: opts.req });

  return {
    session,
  };
};
