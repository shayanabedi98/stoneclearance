import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CreatePostForm from "@/components/create-post/CreatePostForm";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center">
      <CreatePostForm />
    </div>
  );
}
