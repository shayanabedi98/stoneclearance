import Banner from "@/components/home/Banner";
import Inventory from "@/components/home/Inventory";
import PageDescription from "@/components/home/PageDescription";

export default function Home() {
  return (
    <main>
      <Banner />
      <PageDescription />
      <Inventory />
    </main>
  );
}
