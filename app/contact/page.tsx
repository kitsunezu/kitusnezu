import { Contact } from "@/components/sections/Contact";
import { getContactData } from "@/lib/page-data";

export default async function ContactPage() {
  const { email, sns } = await getContactData();
  return <Contact email={email} sns={sns} />;
}
