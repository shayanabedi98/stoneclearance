import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserInformationForm from "@/components/user-information/UserInformationForm";
import prisma from "@/lib/prismadb";

export default async function UserSettings() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const userInfo = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    select: {
      name: true,
      tel: true,
      companyName: true,
      contactEmail: true,
      city: true,
    },
  });

  if (
    !userInfo?.name ||
    !userInfo?.companyName ||
    !userInfo?.tel ||
    !userInfo?.contactEmail ||
    !userInfo?.city
  ) {
    redirect("/user-information");
  }
  
  return (
    <div className="flex flex-col items-center">
      <h1>User Settings</h1>
      <UserInformationForm
        nameState={userInfo?.name}
        companyNameState={userInfo?.companyName}
        telState={userInfo?.tel}
        contactEmailState={userInfo?.contactEmail}
        selectedCityState={userInfo?.city}
      />
    </div>
  );
}
