"use client";
import Link from "next/link";
import { GiStoneTablet } from "react-icons/gi";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

type User = {
  id: string
}

export default function Navbar() {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const path = usePathname();
  const route = useRouter();
  const { status, data: session } = useSession();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopUpVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    if (!isPopUpVisible) {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopUpVisible]);

  return (
    <header className="relative mb-16 flex min-h-28 justify-between py-6 text-secondary">
      <Link href={"/"} className="flex items-center gap-2">
        <GiStoneTablet className="text-3xl text-secondary" />
        <span className="text-2xl">Stone Clearance</span>
      </Link>
      {status === "authenticated"
        ? path !== "/sign-in" && (
            <div className="flex items-center gap-4">
              <span className="font-semibold">{session.user?.name}</span>
              <Image
                className="cursor-pointer rounded-full border-2 border-secondary"
                onClick={() => setIsPopUpVisible((prev) => !prev)}
                src={session.user?.image || ""}
                alt="User Profile Pic"
                width={40}
                height={40}
              />
              {isPopUpVisible && (
                <div
                  ref={popupRef}
                  className="absolute right-0 top-20 z-20 flex min-w-56 flex-col items-center justify-center gap-2 rounded-md bg-bg p-2 shadow-lg shadow-slate-800"
                >
                  <span className="text-sm">{session.user?.email}</span>
                  <Link
                    className="font-bold hover:underline"
                    href={`/dashboard/${(session.user as User).id}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="font-bold hover:underline"
                    href={"/create-post"}
                  >
                    Create Post
                  </Link>
                  <button
                    className="w-full bg-secondary p-2 font-bold text-bg"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )
        : path === "/" && (
            <div className="flex items-center gap-2">
              <span>Become a Vendor</span>
              <button className="btn" onClick={() => route.push("/sign-in")}>
                Join
              </button>
            </div>
          )}
    </header>
  );
}
