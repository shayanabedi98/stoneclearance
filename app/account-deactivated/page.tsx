import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";

export default async function AccountDeactivated() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    select: { isActive: true },
  });

  if (user?.isActive) {
    redirect("/sign-in")
  }

  return (
    <div>
      <h1>
        Your Account has been disabled. Please contact us for more information.
      </h1>
    </div>
  );
}
