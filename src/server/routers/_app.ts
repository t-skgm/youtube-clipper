import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "../../infrastructure/prisma";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),

  feed: procedure.query(async () => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return { posts };
  }),

  drafts: procedure.query(async ({ ctx }) => {
    const { session } = ctx;
    if (!session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const drafts = await prisma.post.findMany({
      where: {
        author: { email: session.user.email },
        published: false,
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });
    console.log("drafts", drafts);

    return { drafts };
  }),

  createDraft: procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx;
      if (!session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const result = await prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          author: session.user.email
            ? { connect: { email: session.user.email } }
            : undefined,
        },
      });

      return { post: result };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
