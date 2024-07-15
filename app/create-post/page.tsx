import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CreatePostForm from "@/components/create-post/CreatePostForm";
import prisma from "@/lib/prismadb";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
  });

  if (!user?.isActive) {
    redirect("/account-deactivated");
  }

  return (
    <div className="flex flex-col items-center">
      <CreatePostForm />
    </div>
  );
}
