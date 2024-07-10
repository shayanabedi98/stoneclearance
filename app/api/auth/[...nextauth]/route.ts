import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";

type User = {
  id: string
}

const CustomPrismaAdapter = PrismaAdapter(prisma) as any;

export const authOptions: AuthOptions = {
  adapter: CustomPrismaAdapter,
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        (session.user as User).id = user.id ;
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
