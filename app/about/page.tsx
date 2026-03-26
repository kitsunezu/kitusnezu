import { About } from "@/components/sections/About";
import { getAboutData } from "@/lib/page-data";

export default async function AboutPage() {
  const { bio } = await getAboutData();
  return <About bio={bio} />;
}
