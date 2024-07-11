import UserInformationForm from "@/components/user-information/UserInformationForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";

type User = {
  id: string;
};

export default async function UserInformation() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    select: {
      city: true,
      contactEmail: true,
      tel: true,
      companyName: true,
    },
  });

  if (user && user.city && user.contactEmail && user.tel && user.companyName) {
    redirect(`/dashboard/${(session.user as User).id}`);
  }

  return (
    <div className="flex flex-col items-center">
      <UserInformationForm
        nameState=""
        companyNameState=""
        telState=""
        contactEmailState=""
        selectedCityState=""
      />
    </div>
  );
}
