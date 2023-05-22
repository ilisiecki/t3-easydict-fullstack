import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const historyRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.history.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ searchedWord: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.history.create({
        data: {
          searchedWord: input.searchedWord,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.history.delete({
        where: {
          id: input,
        },
      });
    }),
});
