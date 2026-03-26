import { Skills } from "@/components/sections/Skills";
import { getSkillsData } from "@/lib/page-data";

export default async function SkillsPage() {
  const categories = await getSkillsData();
  return <Skills categories={categories} />;
}
