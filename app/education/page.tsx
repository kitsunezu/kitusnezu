import { Education } from "@/components/sections/Education";
import { getEducationData } from "@/lib/page-data";

export default async function EducationPage() {
  const items = await getEducationData();
  return <Education items={items} />;
}
