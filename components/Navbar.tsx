"use client";
import Link from "next/link";
import { GiStoneTablet } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const path = usePathname();
  const { status } = useSession();

  return (
    <header className="mb-16 flex min-h-28 justify-between py-6 text-secondary">
      <Link href={"/"} className="flex items-center gap-2">
        <GiStoneTablet className="text-3xl text-secondary" />
        <span className="text-2xl">Stone Clearance</span>
      </Link>
      {status === "authenticated"
        ? path !== "/sign-in" && (
            <div className="flex items-center">
              <Link href={"/"} className="btn" onClick={() => signOut()}>
                Sign Out
              </Link>
            </div>
          )
        : path !== "/sign-in" && (
            <div className="flex items-center gap-2">
              <span>Become a Vendor</span>
              <Link className="btn" href={"/sign-in"}>
                Join
              </Link>
            </div>
          )}
    </header>
  );
}
