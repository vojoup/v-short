import { createRouter } from "./context";
import { z } from "zod";

export const shortLinkRouter = createRouter()
  .query("getBySlug", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input, ctx }) {
      const data = await ctx.prisma.shortLink.findFirst({
        where: { slug: input.slug },
      });
      if (!data) {
        console.log("No slug found!");
      }
      return data;
    },
  })
  .mutation("add", {
    input: z.object({
      slug: z.string(),
      url: z.string(),
    }),
    async resolve({ input, ctx }) {
      const data = await ctx.prisma.shortLink.create({
        data: { slug: input.slug, url: input.url },
      });
      const origin = ctx.req?.headers.origin;
      if (!origin) {
        console.log("No origin");
      }
      const fullUrl = `${origin}/r/${data.slug}`;
      return { ...data, fullUrl };
    },
  });
