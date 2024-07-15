import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import UserCard from "@/components/admin/UserCard";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== "abedishayan@gmail.com") {
    redirect("/");
  }

  let users;

  try {
    users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>Admin Portal</h1>
      <h2>Users</h2>
      {users && (
        <div className="flex gap-10">
          {users?.map((user, index) => (
            <UserCard
              id={user.id}
              key={index}
              name={user.name}
              city={user.city}
              companyName={user.companyName}
              email={user.email}
              isActive={user.isActive}
              posts={user.posts}
            />
          ))}
        </div>
      )}
    </div>
  );
}
