import Image from "next/image";
import banner from "@/public/assets/banner.webp";

export default function Banner() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Image
        className="h-[650px] max-w-screen-2xl rounded-md object-cover object-right-bottom"
        src={banner}
        alt=""
      />
      <div className="font absolute flex flex-col items-center justify-center gap-4 rounded-md border-2 bg-primary bg-opacity-50 px-10 py-12 text-bg">
        <h1>Welcome to Stone Clearance</h1>
        <h2>The GTA&apos;s Stones Clearance Section</h2>
      </div>
    </div>
  );
}
