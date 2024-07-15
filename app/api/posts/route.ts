import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    title,
    description,
    imageUrl,
    type,
    height,
    width,
    thickness,
    originalPrice,
    discountedPrice,
    quantity,
    authorEmail,
    visible
  } = await req.json();

  if (
    !title ||
    !description ||
    !imageUrl ||
    !type ||
    !height ||
    !width ||
    !thickness ||
    !originalPrice ||
    !authorEmail ||
    !quantity
  ) {
    return NextResponse.json({ message: "Missing fields" }, { status: 500 });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        imageUrl,
        type,
        height,
        width,
        thickness,
        originalPrice,
        discountedPrice,
        authorEmail,
        quantity,
        visible,
      },
    });
    console.log(newPost);
    return NextResponse.json(newPost);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "could not post" });
  }
}

export async function GET(req: Request) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            city: true,
            companyName: true,
            tel: true,
            contactEmail: true,
          },
        },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: "Could not find posts" });
  }
}
