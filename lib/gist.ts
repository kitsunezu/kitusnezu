import type { Profile } from "@/types/profile";
import { fallbackProfile } from "./fallback-profile";

const GIST_ID = process.env.GIST_ID;

export async function getProfile(): Promise<Profile> {
  if (!GIST_ID) {
    console.warn("GIST_ID not set, using fallback profile data");
    return fallbackProfile;
  }

  try {
    const res = await fetch(
      `https://api.github.com/gists/${GIST_ID}`,
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch Gist: ${res.status}`);
      return fallbackProfile;
    }

    const gist = await res.json();
    const file = gist.files["profile.json"];
    if (!file) {
      console.error("profile.json not found in Gist");
      return fallbackProfile;
    }

    return JSON.parse(file.content) as Profile;
  } catch (error) {
    console.error("Error fetching profile from Gist:", error);
    return fallbackProfile;
  }
}
