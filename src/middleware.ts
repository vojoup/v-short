import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/r/")) {
    const slug = req.nextUrl.pathname.split("/").pop();

    const data = await (
      await fetch(`${req.nextUrl.origin}/api/r/${slug}`)
    ).json();

    if (data?.url) {
      return NextResponse.redirect(data.url);
    }
  }
}
