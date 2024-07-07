import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stone Clearance",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="relative mx-auto min-h-screen max-w-screen-2xl">
          <NextAuthProvider>
            <Navbar />
            <div className="min-h-[780px]">{children}</div>
            <Footer />
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
