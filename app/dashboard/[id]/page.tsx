import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";

export default async function Dashboard({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const { id } = params;

  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  return <h1>Hello, {user?.companyName}</h1>;
}
