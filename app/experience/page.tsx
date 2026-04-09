import { Experience } from "@/components/sections/Experience";
import { getExperienceData, getEducationData } from "@/lib/page-data";

export default async function ExperiencePage() {
  const [items, educationItems] = await Promise.all([
    getExperienceData(),
    getEducationData(),
  ]);
  return <Experience items={items} educationItems={educationItems} />;
}
