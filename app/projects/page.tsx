import { Projects } from "@/components/sections/Projects";
import { getProjectsData } from "@/lib/page-data";

export default async function ProjectsPage() {
  const items = await getProjectsData();
  return <Projects items={items} />;
}
