import { Hero } from "@/components/sections/Hero";
import { getHeroData } from "@/lib/page-data";

export default async function Home() {
  const { name, title } = await getHeroData();

  return <Hero name={name} title={title} />;
}
