import Link from "next/link";
import { GiStoneTablet } from "react-icons/gi";

export default function Navbar() {
  return (
    <header className="mb-16 flex justify-between py-6 text-secondary">
      <Link href={"/"} className="flex items-center gap-2">
        <GiStoneTablet className="text-3xl text-secondary" />
        <span className="text-2xl">Stone Clearance</span>
      </Link>
      <div className="flex items-center gap-2">
        <span>Become a Vendor</span>
        <button className="btn">Register</button>
      </div>
    </header>
  );
}
