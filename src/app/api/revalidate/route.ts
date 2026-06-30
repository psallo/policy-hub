import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { postId } = await req.json();

  revalidatePath("/");
  revalidatePath("/posts");
  if (postId) {
    revalidatePath(`/posts/${postId}`);
  }

  return NextResponse.json({ revalidated: true });
}
