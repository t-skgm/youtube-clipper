import { initTRPC } from "@trpc/server";
import type { createTRPCContext } from "./createTRPCContext";

const trpc = initTRPC.context<typeof createTRPCContext>().create();

// Base router and procedure helpers
export const router = trpc.router;
export const procedure = trpc.procedure;
