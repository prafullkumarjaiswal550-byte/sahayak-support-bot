# Sahayak Support

Build a polished, responsive, production-style hackathon prototype named “SAHAYAK – AI-Assisted Trauma and Vulnerability Assessment for NHAA”.

This is a demonstration prototype for Smart India Hackathon problem statement SIH26093. The platform is intended to support victims and complainants from Scheduled Castes and Scheduled Tribes who interact with the National Helpline Against Atrocities, integrated portal, chatbot, IVRS, mobile application, or other approved digital channels.

IMPORTANT SAFETY AND ETHICS REQUIREMENTS:

1. This application must not claim to diagnose depression, PTSD, suicide risk, mental illness, or any clinical condition.

2. Use the wording “AI-assisted preliminary risk screening” and “support prioritization”, not “medical diagnosis”.

3. Every risk result must include:

   “This is a preliminary screening result, not a clinical diagnosis. A trained counsellor or authorized officer must review the case.”

4. The AI must never infer caste, religion, gender, guilt, criminality, credibility, or truthfulness from language, accent, voice, or writing style.

5. Do not use typing speed, grammar, spelling, accent, pitch, or dialect as standalone evidence of trauma.

6. Do not automatically contact the police, hospital, family member, or any authority without explicit consent and configurable human approval.

7. In case of possible immediate danger or self-harm language, display emergency guidance and human escalation options, while clearly stating that the system cannot independently verify the situation.

8. Use only synthetic demo data. Do not store real victim names, phone numbers, addresses, recordings, or identifiable case information in the demo.

9. Add visible consent before text or voice analysis.

10. Add an audit trail showing why a recommendation was made, without exposing sensitive data unnecessarily.

11. Use trauma-informed, empathetic, non-judgmental language throughout the interface.

12. Support multilingual UI labels and sample messages in English, Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi, and Urdu. For the prototype, translations may be static demo translations.

PRODUCT GOAL:

Create a working simulation with two main user roles:

A. Victim/Complainant Interface

B. NHAA Officer/Counsellor Dashboard

The prototype should demonstrate:

1. A victim can submit a text narrative.

2. The victim can optionally use a voice input button.

3. The system analyzes the narrative using a demo AI-analysis service or mock analysis layer.

4. The system generates a Stress Vulnerability Index from 0 to 100.

5. The system categorizes the case as:

   - Low: 0–24

   - Moderate: 25–49

   - High: 50–74

   - Critical: 75–100

6. The officer dashboard updates in real time when a new case is submitted.

7. The system recommends support actions such as:

   - Counselling callback

   - Legal aid

   - Medical assistance

   - Police liaison review

   - Witness protection review

   - Shelter or rehabilitation support

   - Emergency human escalation

8. The interface must clearly distinguish between AI recommendation and final human decision.

BRAND AND VISUAL DESIGN:

Name: SAHAYAK

Tagline: “Early support. Safer response. Human-centred justice.”

Use a calm and trustworthy design:

- Deep navy for authority

- Teal for support and safety

- Warm amber for attention

- Red only for critical risk alerts

- Off-white background

- Rounded cards

- Accessible contrast

- Large readable typography

- Mobile-first responsive layout

- Hindi and English text support

- Avoid frightening animations, flashing elements, or sensational imagery

- Use subtle map, shield, support, helpline, microphone, and counselling icons

- Use professional government-service styling, but do not impersonate any actual government logo

CREATE THESE ROUTES:

1. `/`

Landing page

2. `/victim`

Victim/complainant support interface

3. `/assessment`

Assessment result page

4. `/officer`

NHAA officer dashboard

5. `/case/:id`

Case detail and human review page

6. `/support-directory`

Support services directory

7. `/about`

Privacy, ethics, limitations, and methodology page

LANDING PAGE:

Create a clean hero section containing:

- SAHAYAK logo text

- Tagline

- Short explanation:

  “An AI-assisted preliminary screening and support-prioritization prototype for victims and complainants.”

- Buttons:

  “Start Safe Assessment”

  “View Officer Dashboard”

- A small notice:

  “Demo prototype using synthetic data. This system does not replace trained professionals.”

- Three feature cards:

  1. Trauma-informed interaction

  2. Real-time support prioritization

  3. Human-in-the-loop escalation

VICTIM INTERFACE:

Create a compassionate chat-style or form-based interface.

Header:

- SAHAYAK logo

- Language selector

- Privacy button

- “Leave Safely” button that clears the current screen and navigates to a neutral page

Consent card:

- Explain what data will be analyzed

- Explain that the user can stop at any time

- Checkbox:

  “I understand and consent to preliminary AI-assisted screening.”

- Do not enable analysis until consent is checked

Input area:

- Large text area with placeholder:

  “You may describe what happened in your own words. Take your time. You do not need to use any specific format.”

- Character count

- Optional microphone button

- Voice recording state with start, stop, retry, and delete controls

- Do not upload audio by default in demo mode

- Show a note that voice analysis is simulated unless an API is configured

Quick support buttons:

- “I am in immediate danger”

- “I am afraid to return home”

- “I need medical help”

- “I need legal help”

- “I want to talk to a counsellor”

Empathetic assistant messages:

- “Thank you for sharing this.”

- “You can take a pause whenever you need.”

- “Your safety is important.”

- “A trained person should review this assessment.”

Submit button:

- “Analyze for Preliminary Support Needs”

- Show loading state with neutral wording:

  “Preparing a preliminary support summary…”

ASSESSMENT ENGINE:

Create a structured analysis service abstraction. Do not expose API keys in the frontend.

Create a server-side function or mock service named:

`analyzeNarrativeForSupportNeeds`

Input:

- narrative text

- selected language

- optional voice metadata

- consent status

- demo mode status

Output must be strict JSON with this shape:

{

  "sviScore": 0,

  "riskCategory": "Low | Moderate | High | Critical",

  "confidence": 0,

  "detectedIndicators": [

    {

      "indicator": "fear | panic | threat | physical_harm | sexual_violence | bereavement | displacement | social_isolation | prolonged_legal_distress | self_harm_concern | immediate_danger | unknown",

      "evidence": "short paraphrased explanation, never a long quotation",

      "severity": "low | medium | high"

    }

  ],

  "recommendedActions": [

    {

      "action": "counselling_callback | legal_aid | medical_assistance | police_liaison_review | witness_protection_review | shelter_support | emergency_human_escalation",

      "priority": "routine | urgent | immediate",

      "reason": "short explanation"

    }

  ],

  "empatheticResponse": "short trauma-informed response",

  "humanReviewRequired": true,

  "immediateSafetyConcern": false,

  "limitations": [

    "This is not a clinical diagnosis",

    "Human review is required"

  ]

}

SCORING LOGIC:

Use a transparent, configurable rule-based scoring layer plus optional LLM extraction.

Base score: 0.

Add points only for explicit or strongly indicated content:

- General distress or fear: +10

- Panic or severe anxiety language: +10

- Threats or intimidation: +15

- Physical violence or injury: +20

- Sexual violence or rape-related disclosure: +25

- Death of family member or severe bereavement: +20

- Forced displacement or homelessness: +15

- Social boycott or isolation: +15

- Immediate danger: +30

- Explicit self-harm or suicide concern: +35

- Multiple severe indicators: additional maximum +10

Clamp final score between 0 and 100.

Risk thresholds:

- 0–24 Low

- 25–49 Moderate

- 50–74 High

- 75–100 Critical

Use conservative escalation:

- Any explicit immediate-danger statement must trigger `immediateSafetyConcern: true`.

- Any explicit self-harm or suicide-related statement must trigger `humanReviewRequired: true` and `emergency_human_escalation`.

- Sexual violence, severe physical violence, murder-related threat, or forced displacement must trigger urgent human review.

- Do not lower risk because the narrative is short, grammatically incorrect, written in a dialect, or contains spelling mistakes.

- If the text is ambiguous, mark the uncertainty and recommend human review rather than inventing facts.

- Never fabricate a diagnosis, location, perpetrator identity, or incident details.

ASSESSMENT RESULT PAGE:

Display:

- SVI score as a circular gauge from 0 to 100

- Risk category badge

- Short empathetic response

- “Why this result was generated” card

- Indicator chips

- Recommended support actions

- Human-review warning

- Buttons:

  1. Request counsellor callback

  2. Request legal aid

  3. Request medical assistance

  4. View emergency support

  5. Download/print support summary

  6. Return to safe home page

For Critical cases:

- Show a prominent but calm emergency card

- Text:

  “Your message suggests that urgent human support may be needed. If you are in immediate danger, contact local emergency services or a trusted person now. This prototype cannot make calls automatically.”

- Show “Connect to human support” button

- Show “I am safe for now” button

- Never use an alarming flashing animation

OFFICER DASHBOARD:

Create a professional command-center dashboard with:

Top statistics:

- New cases

- Cases requiring urgent review

- Critical cases

- Pending counsellor callbacks

- Average preliminary SVI

Main sections:

1. Live Trauma and Vulnerability Queue

2. Risk distribution chart

3. Cases by language

4. Support-action demand chart

5. Recent alerts

6. Ethical monitoring panel

Case table columns:

- Case ID

- Time received

- Language

- SVI score

- Risk category

- Main indicators

- Suggested action

- Human review status

- Consent status

- Assigned officer

- Last updated

Use color-coded but accessible badges:

- Low: green/teal

- Moderate: amber

- High: orange

- Critical: red

Critical cases should appear at the top with a calm alert banner:

“Immediate human review recommended.”

Add a “Demo Simulation” button that creates 5 synthetic cases with different languages and risk levels. Clearly label every synthetic case as “DEMO DATA”.

REAL-TIME BEHAVIOUR:

When a victim submits an assessment:

- Create a synthetic case record

- Update the officer dashboard

- Update case counts and charts

- Add a new alert

- Keep personally identifiable data out of the demo record

- Use Supabase Realtime if configured

- If Supabase is not configured, use local mock state so the prototype still works

CASE DETAIL PAGE:

Show:

- Case ID

- Timestamp

- Language

- Consent record

- Narrative summary, not necessarily the full raw narrative

- SVI score

- Risk category

- Detected indicators

- Recommended actions

- AI reasoning summary

- Model confidence

- Human review panel

- Officer notes

- Assign case dropdown

- Status dropdown:

  - New

  - Human review pending

  - Counsellor contacted

  - Legal aid referred

  - Medical support referred

  - Escalated

  - Resolved

- “Confirm action” button

- Full audit timeline

The officer must be able to override the AI recommendation. Store:

- Previous AI recommendation

- Human decision

- Reason for override

- Timestamp

- Officer role

SUPPORT DIRECTORY:

Create synthetic support directory data with:

- Service name

- Service type

- State

- District

- Language

- Availability

- Phone placeholder

- Referral type

Include filters:

- State

- District

- Language

- Medical

- Legal

- Counselling

- Shelter

- Emergency

Use clearly marked placeholder numbers in demo mode, such as:

“Demo number – replace with verified official contact.”

Do not invent real helpline numbers or present unverified numbers as official.

PRIVACY AND ETHICS PAGE:

Explain:

- Consent before analysis

- Data minimization

- No clinical diagnosis

- Human-in-the-loop review

- No automated punitive action

- Secure access control

- Role-based permissions

- Audit logs

- Synthetic demo data

- Data retention configuration

- User right to stop

- Accessibility and multilingual support

- Bias monitoring

- Limitations of speech and emotion analysis

Add a disclaimer:

“Emotion and stress signals from language or voice are uncertain and can be affected by language, culture, disability, health, environment, and communication style. The system must not be used as the sole basis for any legal, police, medical, or welfare decision.”

DATA MODEL:

Create these Supabase tables if Supabase is connected:

`assessments`

- id

- created_at

- language

- svi_score

- risk_category

- confidence

- indicators_json

- recommendations_json

- immediate_safety_concern

- human_review_required

- consent_given

- demo_data

- status

`human_reviews`

- id

- assessment_id

- reviewer_id

- reviewer_role

- decision

- override_reason

- notes

- created_at

`support_services`

- id

- name

- service_type

- state

- district

- language

- availability

- demo_contact

- verified

`audit_events`

- id

- assessment_id

- event_type

- actor_role

- metadata_json

- created_at

Implement basic Row Level Security concepts:

- Victim users can create their own assessment but cannot see officer-only notes.

- Officers can view and update assigned cases.

- Admins can view aggregate analytics.

- Do not expose raw narratives in aggregate charts.

DEMO MODE:

The complete prototype must work even without an AI API key or Supabase connection.

Create a toggle:

- Demo mode ON/OFF

When Demo mode is ON:

- Use deterministic mock analysis based on sample narratives

- Generate realistic synthetic output

- Label all cases “DEMO DATA”

- Show a small “AI simulation” label

When Demo mode is OFF:

- Call the secure server-side AI function only if an API key is configured

- Never put API keys in client-side code

- If the API fails, show a graceful fallback message and offer human review

- Never display raw provider errors to the victim

SAMPLE DEMO CASES:

Create at least five fictional sample narratives:

1. Low-risk general legal-information request in Hindi

2. Moderate fear and social isolation case in Marathi

3. High physical violence and displacement case in Bengali

4. High sexual violence disclosure in Hindi

5. Critical immediate-danger and self-harm concern case in English

Do not use real names, phone numbers, addresses, case numbers, or real incidents.

ACCESSIBILITY:

- Keyboard navigable

- ARIA labels

- Screen-reader friendly status messages

- Good contrast

- Large touch targets

- Reduced-motion support

- Text alternatives for charts

- Language selector

- Avoid color-only risk communication

ENGINEERING REQUIREMENTS:

- Use TypeScript throughout

- Use reusable components

- Use clear folder structure

- Add loading, empty, error, and offline states

- Add form validation

- Add unit-testable scoring utility

- Add a README with setup instructions

- Add `.env.example`

- Add comments explaining safety-critical code

- Do not hardcode secrets

- Do not include real victim data

- Make the application deployable on Vercel

- Make sure `npm run build` succeeds

- Make sure there are no TypeScript errors

- Make sure all routes are functional

- Use responsive design for desktop, tablet, and mobile

- Add a “Presentation Mode” option for the dashboard that hides sensitive sample text and emphasizes aggregate metrics

ACCEPTANCE CRITERIA:

1. A user can complete the victim flow from consent to assessment result.

2. The assessment produces SVI, category, indicators, and recommendations.

3. The officer dashboard displays incoming synthetic cases.

4. A critical case is visually prioritized.

5. The officer can review and override an AI recommendation.

6. The support directory is searchable.

7. Demo mode works without API keys.

8. No secret is exposed in the browser.

9. Privacy and limitations are visible.

10. The app looks polished enough for a Smart India Hackathon presentation.

11. The app builds successfully.

12. All visible data is synthetic and clearly marked where appropriate.

Start by implementing the complete UI with mock data and mock analysis. Then add Supabase persistence and realtime updates if credentials are available. Finally, add the secure AI analysis adapter without breaking demo mode.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sahayak-support-bot.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/86d85186-e9bc-4f92-a104-86335db71f52).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
