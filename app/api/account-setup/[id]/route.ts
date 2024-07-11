import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const {
    name,
    companyName,
    tel,
    selectedCity: city,
    contactEmail,
  } = await req.json();
  const { id } = params;

  try {
    const post = await prisma.user.update({
      where: { id },
      data: { name, companyName, tel, city, contactEmail },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not update info" });
  }
}
