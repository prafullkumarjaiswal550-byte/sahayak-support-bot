import type { LanguageCode } from "./types";

/** Fully fictional synthetic narratives. No real people, places or incidents. */
export interface SampleNarrative {
  id: string;
  language: LanguageCode;
  label: string;
  expected: string;
  text: string;
  summary: string;
}

export const SAMPLE_NARRATIVES: SampleNarrative[] = [
  {
    id: "s1",
    language: "hi",
    label: "Legal information request (Hindi)",
    expected: "Low",
    text: "मुझे अदालत की प्रक्रिया के बारे में जानकारी चाहिए। मेरा मुकदमा लंबे समय से चल रहा है और मुझे समझ नहीं आ रहा कि आगे क्या करना है।",
    summary: "Requests guidance about an ongoing legal process; no violence reported.",
  },
  {
    id: "s2",
    language: "mr",
    label: "Fear and social isolation (Marathi)",
    expected: "Moderate",
    text: "गावात आमच्यावर बहिष्कार टाकला आहे. कोणी बोलत नाही आणि मला खूप भीती वाटते. रात्री झोप येत नाही.",
    summary: "Describes social boycott in the village, fear and sleep difficulty.",
  },
  {
    id: "s3",
    language: "bn",
    label: "Physical violence and displacement (Bengali)",
    expected: "High",
    text: "গত সপ্তাহে আমাদের উপর মারধর করা হয়েছে এবং হুমকি দেওয়া হয়েছে। আমরা ঘর ছাড়তে বাধ্য হয়েছি এবং এখন ফিরতে ভয় পাচ্ছি।",
    summary: "Reports assault and intimidation leading to leaving home; fears returning.",
  },
  {
    id: "s4",
    language: "hi",
    label: "Sexual violence disclosure (Hindi)",
    expected: "High",
    text: "मेरे साथ यौन हिंसा हुई है। मुझे धमकी दी गई कि शिकायत की तो और मारपीट होगी। मैं बहुत डरी हुई हूँ।",
    summary: "Discloses sexual violence with subsequent threats; reports intense fear.",
  },
  {
    id: "s5",
    language: "en",
    label: "Immediate danger and self-harm concern (English)",
    expected: "Critical",
    text: "They are outside my house right now and said they are coming to kill us after they beat my brother. I feel like I want to end my life, I cannot take this anymore.",
    summary: "Describes possible immediate danger, assault of a relative and self-harm concern.",
  },
];

export interface SupportService {
  id: string;
  name: string;
  serviceType: "medical" | "legal" | "counselling" | "shelter" | "emergency";
  state: string;
  district: string;
  languages: LanguageCode[];
  availability: string;
  demoContact: string;
  referralType: string;
  verified: boolean;
}

const DEMO_CONTACT = "Demo number – replace with verified official contact.";

export const SUPPORT_SERVICES: SupportService[] = [
  { id: "svc-1", name: "District Counselling Centre (Demo)", serviceType: "counselling", state: "Maharashtra", district: "Demo District A", languages: ["mr", "hi", "en"], availability: "Mon–Sat, 9:00–18:00", demoContact: DEMO_CONTACT, referralType: "Officer referral", verified: false },
  { id: "svc-2", name: "Legal Aid Desk (Demo)", serviceType: "legal", state: "Maharashtra", district: "Demo District B", languages: ["mr", "hi", "en"], availability: "Mon–Fri, 10:00–17:00", demoContact: DEMO_CONTACT, referralType: "Self or officer referral", verified: false },
  { id: "svc-3", name: "Community Health Support Unit (Demo)", serviceType: "medical", state: "Bihar", district: "Demo District C", languages: ["hi", "en"], availability: "24x7", demoContact: DEMO_CONTACT, referralType: "Emergency referral", verified: false },
  { id: "svc-4", name: "Safe Shelter Home (Demo)", serviceType: "shelter", state: "West Bengal", district: "Demo District D", languages: ["bn", "hi", "en"], availability: "24x7", demoContact: DEMO_CONTACT, referralType: "Officer referral", verified: false },
  { id: "svc-5", name: "Emergency Response Liaison (Demo)", serviceType: "emergency", state: "Tamil Nadu", district: "Demo District E", languages: ["ta", "en"], availability: "24x7", demoContact: DEMO_CONTACT, referralType: "Human-approved escalation", verified: false },
  { id: "svc-6", name: "Women's Counselling Collective (Demo)", serviceType: "counselling", state: "Telangana", district: "Demo District F", languages: ["te", "hi", "en"], availability: "Mon–Sat, 10:00–19:00", demoContact: DEMO_CONTACT, referralType: "Self referral", verified: false },
  { id: "svc-7", name: "Legal Awareness Cell (Demo)", serviceType: "legal", state: "Punjab", district: "Demo District G", languages: ["pa", "hi", "en"], availability: "Mon–Fri, 9:30–17:30", demoContact: DEMO_CONTACT, referralType: "Self referral", verified: false },
  { id: "svc-8", name: "Rehabilitation and Shelter Trust (Demo)", serviceType: "shelter", state: "Gujarat", district: "Demo District H", languages: ["gu", "hi", "en"], availability: "24x7", demoContact: DEMO_CONTACT, referralType: "Officer referral", verified: false },
  { id: "svc-9", name: "Trauma Support Helpdesk (Demo)", serviceType: "counselling", state: "Kerala", district: "Demo District I", languages: ["ml", "en"], availability: "Mon–Sun, 8:00–20:00", demoContact: DEMO_CONTACT, referralType: "Self or officer referral", verified: false },
  { id: "svc-10", name: "Emergency Medical Liaison (Demo)", serviceType: "medical", state: "Karnataka", district: "Demo District J", languages: ["kn", "en", "ur"], availability: "24x7", demoContact: DEMO_CONTACT, referralType: "Emergency referral", verified: false },
];

export const OFFICERS = [
  "Unassigned",
  "Officer A (Demo)",
  "Counsellor B (Demo)",
  "Legal Officer C (Demo)",
  "Supervisor D (Demo)",
];
