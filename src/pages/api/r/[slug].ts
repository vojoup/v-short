import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const slugResolver = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "Please use with a slug!" }));
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "Slug not found" }));
    return;
  }

  return res.json(data);
};

export default slugResolver;
