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

  return (
    <div>
      <h1>Hello, {user?.companyName}</h1>
      <h2>your name is {user?.name}</h2>
      <h2>your company is in {user?.city}</h2>
      <h2>you phone number is {user?.tel}</h2>
    </div>
  );
}
