import { getLocale } from "next-intl/server";
import { getProfile } from "@/lib/gist";
import { localized } from "@/lib/localized";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { ThreeBackground } from "@/components/three/ThreeBackground";

export default async function Home() {
  const locale = await getLocale();
  const profile = await getProfile();

  const experienceItems = profile.experience.map((exp) => ({
    company: localized(exp.company, locale),
    title: localized(exp.title, locale),
    location: localized(exp.location, locale),
    startDate: exp.startDate,
    endDate: exp.endDate,
    description: localized(exp.description, locale),
    highlights: exp.highlights.map((h) => localized(h, locale)),
  }));

  const skillCategories = profile.skills.map((cat) => ({
    name: localized(cat.name, locale),
    items: cat.items,
  }));

  const projectItems = profile.projects.map((p) => ({
    name: p.name,
    description: localized(p.description, locale),
    url: p.url,
    sourceUrl: p.sourceUrl,
    tags: p.tags,
  }));

  const educationItems = profile.education.map((e) => ({
    school: localized(e.school, locale),
    degree: localized(e.degree, locale),
    startDate: e.startDate,
    endDate: e.endDate,
    description: e.description ? localized(e.description, locale) : undefined,
  }));

  return (
    <>
      <ThreeBackground />
      <Navbar />
      <main className="flex-1">
        <Hero
          name={profile.name}
          title={localized(profile.title, locale)}
        />
        <About bio={localized(profile.bio, locale)} />
        <Experience items={experienceItems} />
        <Skills categories={skillCategories} />
        <Projects items={projectItems} />
        <Education items={educationItems} />
        <Contact email={profile.email} sns={profile.sns} />
      </main>
      <Footer />
    </>
  );
}
