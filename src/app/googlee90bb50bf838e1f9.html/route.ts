import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("google-site-verification: googlee90bb50bf838e1f9", {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
