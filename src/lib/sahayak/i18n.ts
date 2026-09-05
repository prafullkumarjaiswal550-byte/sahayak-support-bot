import type { LanguageCode } from "./types";

export const LANGUAGES: { code: LanguageCode; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "ur", label: "Urdu", native: "اردو" },
];

type Dict = {
  consentTitle: string;
  consentCheckbox: string;
  narrativePlaceholder: string;
  submit: string;
  thanks: string;
  pause: string;
  safety: string;
  reviewNote: string;
};

/** Static demo translations for prototype purposes only. */
const STRINGS: Record<LanguageCode, Dict> = {
  en: {
    consentTitle: "Your consent",
    consentCheckbox: "I understand and consent to preliminary AI-assisted screening.",
    narrativePlaceholder:
      "You may describe what happened in your own words. Take your time. You do not need to use any specific format.",
    submit: "Analyze for Preliminary Support Needs",
    thanks: "Thank you for sharing this.",
    pause: "You can take a pause whenever you need.",
    safety: "Your safety is important.",
    reviewNote: "A trained person should review this assessment.",
  },
  hi: {
    consentTitle: "आपकी सहमति",
    consentCheckbox: "मैं समझता/समझती हूँ और प्रारंभिक AI-सहायित स्क्रीनिंग के लिए सहमति देता/देती हूँ।",
    narrativePlaceholder:
      "आप अपनी भाषा में बता सकते हैं कि क्या हुआ। समय लीजिए। किसी विशेष प्रारूप की आवश्यकता नहीं है।",
    submit: "प्रारंभिक सहायता आवश्यकताओं का विश्लेषण करें",
    thanks: "यह साझा करने के लिए धन्यवाद।",
    pause: "जब भी ज़रूरत हो, आप रुक सकते हैं।",
    safety: "आपकी सुरक्षा महत्वपूर्ण है।",
    reviewNote: "इस आकलन की समीक्षा एक प्रशिक्षित व्यक्ति द्वारा की जानी चाहिए।",
  },
  mr: {
    consentTitle: "तुमची संमती",
    consentCheckbox: "मी समजतो/समजते आणि प्राथमिक AI-सहाय्यित तपासणीस संमती देतो/देते.",
    narrativePlaceholder: "काय घडले ते तुम्ही तुमच्या शब्दांत सांगू शकता. वेळ घ्या.",
    submit: "प्राथमिक मदतीच्या गरजांचे विश्लेषण करा",
    thanks: "हे सांगितल्याबद्दल धन्यवाद.",
    pause: "गरज वाटल्यास तुम्ही थांबू शकता.",
    safety: "तुमची सुरक्षा महत्त्वाची आहे.",
    reviewNote: "प्रशिक्षित व्यक्तीने या मूल्यांकनाचा आढावा घ्यावा.",
  },
  bn: {
    consentTitle: "আপনার সম্মতি",
    consentCheckbox: "আমি বুঝেছি এবং প্রাথমিক AI-সহায়ক স্ক্রিনিংয়ে সম্মতি দিচ্ছি।",
    narrativePlaceholder: "কী ঘটেছে তা আপনি নিজের ভাষায় বলতে পারেন। সময় নিন।",
    submit: "প্রাথমিক সহায়তার প্রয়োজন বিশ্লেষণ করুন",
    thanks: "এটি জানানোর জন্য ধন্যবাদ।",
    pause: "প্রয়োজনে আপনি বিরতি নিতে পারেন।",
    safety: "আপনার নিরাপত্তা গুরুত্বপূর্ণ।",
    reviewNote: "একজন প্রশিক্ষিত ব্যক্তির এই মূল্যায়ন পর্যালোচনা করা উচিত।",
  },
  ta: {
    consentTitle: "உங்கள் ஒப்புதல்",
    consentCheckbox: "நான் புரிந்துகொண்டு முதற்கட்ட AI-உதவி பரிசோதனைக்கு ஒப்புதல் அளிக்கிறேன்.",
    narrativePlaceholder: "நடந்ததை உங்கள் சொற்களில் விவரிக்கலாம். நேரம் எடுத்துக்கொள்ளுங்கள்.",
    submit: "முதற்கட்ட ஆதரவுத் தேவைகளை பகுப்பாய்வு செய்யவும்",
    thanks: "பகிர்ந்ததற்கு நன்றி.",
    pause: "தேவைப்படும்போது ஓய்வெடுக்கலாம்.",
    safety: "உங்கள் பாதுகாப்பு முக்கியம்.",
    reviewNote: "பயிற்சி பெற்ற நபர் இதை மறுஆய்வு செய்ய வேண்டும்.",
  },
  te: {
    consentTitle: "మీ సమ్మతి",
    consentCheckbox: "నేను అర్థం చేసుకున్నాను మరియు ప్రాథమిక AI-సహాయ స్క్రీనింగ్‌కు సమ్మతిస్తున్నాను.",
    narrativePlaceholder: "జరిగినది మీ మాటల్లో చెప్పవచ్చు. సమయం తీసుకోండి.",
    submit: "ప్రాథమిక సహాయ అవసరాలను విశ్లేషించండి",
    thanks: "పంచుకున్నందుకు ధన్యవాదాలు.",
    pause: "అవసరమైనప్పుడు విరామం తీసుకోవచ్చు.",
    safety: "మీ భద్రత ముఖ్యం.",
    reviewNote: "శిక్షణ పొందిన వ్యక్తి దీన్ని సమీక్షించాలి.",
  },
  kn: {
    consentTitle: "ನಿಮ್ಮ ಸಮ್ಮತಿ",
    consentCheckbox: "ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ ಮತ್ತು ಪ್ರಾಥಮಿಕ AI-ಸಹಾಯಕ ಪರಿಶೀಲನೆಗೆ ಸಮ್ಮತಿಸುತ್ತೇನೆ.",
    narrativePlaceholder: "ಏನಾಯಿತು ಎಂಬುದನ್ನು ನಿಮ್ಮ ಮಾತಿನಲ್ಲಿ ಹೇಳಬಹುದು. ಸಮಯ ತೆಗೆದುಕೊಳ್ಳಿ.",
    submit: "ಪ್ರಾಥಮಿಕ ಬೆಂಬಲ ಅಗತ್ಯಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    thanks: "ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
    pause: "ಅಗತ್ಯವಿದ್ದಾಗ ವಿರಾಮ ತೆಗೆದುಕೊಳ್ಳಬಹುದು.",
    safety: "ನಿಮ್ಮ ಸುರಕ್ಷತೆ ಮುಖ್ಯ.",
    reviewNote: "ತರಬೇತಿ ಪಡೆದ ವ್ಯಕ್ತಿ ಇದನ್ನು ಪರಿಶೀಲಿಸಬೇಕು.",
  },
  ml: {
    consentTitle: "നിങ്ങളുടെ സമ്മതം",
    consentCheckbox: "ഞാൻ മനസ്സിലാക്കുന്നു, പ്രാഥമിക AI-സഹായ പരിശോധനയ്ക്ക് സമ്മതിക്കുന്നു.",
    narrativePlaceholder: "സംഭവിച്ചത് നിങ്ങളുടെ വാക്കുകളിൽ പറയാം. സമയമെടുക്കുക.",
    submit: "പ്രാഥമിക പിന്തുണ ആവശ്യങ്ങൾ വിശകലനം ചെയ്യുക",
    thanks: "പങ്കുവെച്ചതിന് നന്ദി.",
    pause: "ആവശ്യമുള്ളപ്പോൾ വിശ്രമിക്കാം.",
    safety: "നിങ്ങളുടെ സുരക്ഷ പ്രധാനമാണ്.",
    reviewNote: "പരിശീലനം ലഭിച്ച ഒരാൾ ഇത് പുനഃപരിശോധിക്കണം.",
  },
  gu: {
    consentTitle: "તમારી સંમતિ",
    consentCheckbox: "હું સમજું છું અને પ્રાથમિક AI-સહાયિત સ્ક્રીનિંગ માટે સંમતિ આપું છું.",
    narrativePlaceholder: "શું થયું તે તમે તમારા શબ્દોમાં જણાવી શકો છો. સમય લો.",
    submit: "પ્રાથમિક સહાય જરૂરિયાતોનું વિશ્લેષણ કરો",
    thanks: "આ વહેંચવા બદલ આભાર.",
    pause: "જરૂર પડે ત્યારે વિરામ લઈ શકો છો.",
    safety: "તમારી સલામતી મહત્વપૂર્ણ છે.",
    reviewNote: "તાલીમ પામેલ વ્યક્તિએ આ સમીક્ષા કરવી જોઈએ.",
  },
  pa: {
    consentTitle: "ਤੁਹਾਡੀ ਸਹਿਮਤੀ",
    consentCheckbox: "ਮੈਂ ਸਮਝਦਾ/ਸਮਝਦੀ ਹਾਂ ਅਤੇ ਸ਼ੁਰੂਆਤੀ AI-ਸਹਾਇਤ ਜਾਂਚ ਲਈ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।",
    narrativePlaceholder: "ਜੋ ਹੋਇਆ ਉਹ ਤੁਸੀਂ ਆਪਣੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਦੱਸ ਸਕਦੇ ਹੋ। ਸਮਾਂ ਲਓ।",
    submit: "ਸ਼ੁਰੂਆਤੀ ਸਹਾਇਤਾ ਲੋੜਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    thanks: "ਸਾਂਝਾ ਕਰਨ ਲਈ ਧੰਨਵਾਦ।",
    pause: "ਲੋੜ ਪੈਣ 'ਤੇ ਤੁਸੀਂ ਰੁਕ ਸਕਦੇ ਹੋ।",
    safety: "ਤੁਹਾਡੀ ਸੁਰੱਖਿਆ ਮਹੱਤਵਪੂਰਨ ਹੈ।",
    reviewNote: "ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਵਿਅਕਤੀ ਨੂੰ ਇਸ ਦੀ ਸਮੀਖਿਆ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ।",
  },
  ur: {
    consentTitle: "آپ کی رضامندی",
    consentCheckbox: "میں سمجھتا/سمجھتی ہوں اور ابتدائی AI-معاون اسکریننگ کی رضامندی دیتا/دیتی ہوں۔",
    narrativePlaceholder: "جو ہوا آپ اپنے الفاظ میں بتا سکتے ہیں۔ وقت لیں۔",
    submit: "ابتدائی معاونت کی ضروریات کا تجزیہ کریں",
    thanks: "بتانے کے لیے شکریہ۔",
    pause: "ضرورت ہو تو وقفہ لے سکتے ہیں۔",
    safety: "آپ کی حفاظت اہم ہے۔",
    reviewNote: "تربیت یافتہ فرد کو اس کا جائزہ لینا چاہیے۔",
  },
};

export function t(lang: LanguageCode, key: keyof Dict): string {
  return STRINGS[lang]?.[key] ?? STRINGS.en[key];
}

export function languageLabel(code: LanguageCode): string {
  return LANGUAGES.find((l) => l.code === code)?.label ?? code;
}

export const DISCLAIMER =
  "This is a preliminary screening result, not a clinical diagnosis. A trained counsellor or authorized officer must review the case.";
