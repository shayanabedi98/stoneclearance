import Image from "next/image";
import banner from "@/public/assets/banner.webp";

export default function Banner() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Image
        className="h-[650px] max-w-screen-2xl rounded-md object-cover"
        src={banner}
        alt=""
      />
      <div className="font bg-opacity-90 absolute flex flex-col items-center justify-center gap-4 rounded-md bg-bg px-8 py-10">
        <h1>Welcome to Stone Clearance</h1>
        <h2>The GTA&apos;s Clearance Section for Stones</h2>
      </div>
    </div>
  );
}
