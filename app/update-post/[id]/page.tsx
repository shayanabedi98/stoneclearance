import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UpdatePostForm from "@/components/update-post/UpdatePostForm";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UpdatePost({
  params,
}: {
  params: { id: string };
}) {
  let post;
  const { id } = params;
  const session = await getServerSession(authOptions);

  try {
    post = await prisma.post.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
  }

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center">
      {post ? (
        <UpdatePostForm
          _title={post.title}
          _imageUrl={post.imageUrl}
          _description={post.description}
          _type={post.type}
          _height={post.height}
          _originalPrice={post.originalPrice}
          _discountedPrice={post.discountedPrice ? post.discountedPrice : ""}
          _quanitity={post.quantity}
          _thickness={post.thickness}
          _width={post.width}
          postId={post.id}
        />
      ) : (
        <h1>Post {id} does not exist</h1>
      )}
    </div>
  );
}
