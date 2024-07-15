import Banner from "@/components/home/Banner";
import Inventory from "@/components/home/Inventory";
import PageDescription from "@/components/home/PageDescription";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
    });

    if (!user?.isActive) {
      redirect("/account-deactivated");
    }
  }

  return (
    <main>
      <Banner />
      <PageDescription />
      <Inventory />
    </main>
  );
}
