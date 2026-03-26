import { Experience } from "@/components/sections/Experience";
import { getExperienceData } from "@/lib/page-data";

export default async function ExperiencePage() {
  const items = await getExperienceData();
  return <Experience items={items} />;
}
