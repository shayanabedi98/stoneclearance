import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { isActiveState: isActive } = await req.json();
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        isActive,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
