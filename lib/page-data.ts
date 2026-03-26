import { getLocale } from "next-intl/server";
import { fallbackProfile } from "@/lib/fallback-profile";
import { localized } from "@/lib/localized";

export async function getHeroData() {
  const locale = await getLocale();
  const profile = fallbackProfile;
  return {
    name: profile.name,
    title: localized(profile.title, locale),
  };
}

export async function getAboutData() {
  const locale = await getLocale();
  const profile = fallbackProfile;
  return { bio: localized(profile.bio, locale) };
}

export async function getExperienceData() {
  const locale = await getLocale();
  const profile = fallbackProfile;
  return profile.experience.map((exp) => ({
    company: localized(exp.company, locale),
    title: localized(exp.title, locale),
    location: localized(exp.location, locale),
    startDate: exp.startDate,
    endDate: exp.endDate,
    description: localized(exp.description, locale),
    highlights: exp.highlights.map((h) => localized(h, locale)),
  }));
}

export async function getSkillsData() {
  const locale = await getLocale();
  const profile = fallbackProfile;
  return profile.skills.map((cat) => ({
    name: localized(cat.name, locale),
    items: cat.items,
  }));
}

export async function getProjectsData() {
  const locale = await getLocale();
  const profile = fallbackProfile;
  return profile.projects.map((p) => ({
    name: p.name,
    description: localized(p.description, locale),
    url: p.url,
    sourceUrl: p.sourceUrl,
    tags: p.tags,
  }));
}

export async function getEducationData() {
  const locale = await getLocale();
  const profile = fallbackProfile;
  return profile.education.map((e) => ({
    school: localized(e.school, locale),
    degree: localized(e.degree, locale),
    startDate: e.startDate,
    endDate: e.endDate,
    location: e.location ? localized(e.location, locale) : undefined,
    description: e.description ? localized(e.description, locale) : undefined,
  }));
}

export async function getContactData() {
  const profile = fallbackProfile;
  return { email: profile.email, sns: profile.sns };
}
