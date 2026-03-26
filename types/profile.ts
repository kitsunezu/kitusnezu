export interface LocalizedString {
  en: string;
  "zh-TW": string;
  ja: string;
}

export interface Experience {
  company: LocalizedString;
  title: LocalizedString;
  location: LocalizedString;
  startDate: string;
  endDate: string | null;
  description: LocalizedString;
  highlights: LocalizedString[];
}

export interface Education {
  school: LocalizedString;
  degree: LocalizedString;
  startDate: string;
  endDate: string;
  description?: LocalizedString;
}

export interface Project {
  name: string;
  description: LocalizedString;
  url?: string;
  sourceUrl?: string;
  tags: string[];
}

export interface SkillCategory {
  name: LocalizedString;
  items: string[];
}

export interface Profile {
  name: string;
  title: LocalizedString;
  bio: LocalizedString;
  email: string;
  sns: { platform: string; url: string; label: string }[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
}
