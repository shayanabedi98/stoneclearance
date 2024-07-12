import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import PostForm from "@/components/create-post/PostForm";

export default async function CreatePost() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center">
      <PostForm
        titleState=""
        typeState=""
        descriptionState=""
        thicknessState=""
        heightState=""
        widthState=""
        imageUrlState=""
        priceState={[""]}
        quantityState={[""]}
      />
    </div>
  );
}
