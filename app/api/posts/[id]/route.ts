import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const posts = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "Could not get posts" });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const {
    title,
    description,
    originalPrice,
    discountedPrice,
    height,
    width,
    thickness,
    type,
    imageUrl,
    quantity,
    visible,
  } = await req.json();
  const { id } = params;
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        description,
        originalPrice,
        discountedPrice,
        quantity,
        height,
        width,
        thickness,
        type,
        imageUrl,
        visible,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not update post" });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not delete post" });
  }
}
