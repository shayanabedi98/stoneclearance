"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container-margin flex flex-col items-center py-16 border-t border-neutral text-sm">
      <div className="flex gap-1">
        &copy; {new Date().getFullYear()}{" "}
        Stone Clearance, Designed and Developed by
        <Link className="underline" target="_blank" href={"https://pantheras.ca"}>
          Pantheras Digital
        </Link>
      </div>
    </footer>
  );
}
