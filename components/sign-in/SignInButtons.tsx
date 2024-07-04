"use client";

import { FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";

export default function SignInButtons() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex h-14 items-center font-semibold bg-bg gap-2 rounded-full border-2 px-4 shadow-md"
    >
      <FaGoogle className="text-2xl" /> Sign up with Google
    </button>
  );
}
