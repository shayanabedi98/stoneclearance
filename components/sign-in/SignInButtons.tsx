"use client";

import { FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";

export default function SignInButtons() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex h-14 items-center gap-2 rounded-full border-2 bg-bg px-4 font-semibold shadow-md"
    >
      <FaGoogle className="text-2xl" /> Sign in with Google
    </button>
  );
}
