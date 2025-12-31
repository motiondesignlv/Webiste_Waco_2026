"use client";
import styles from "./FeaturesGrid.module.scss";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";

const icons = {
  "ai-generation": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  "smart-editing": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  "analytics": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  ),
  "recordings": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  ),
  "followup": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  "documents": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  "pdf": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15v-2h2a1 1 0 0 1 0 2H9zM9 15v2" />
      <path d="M15 11v6" />
      <path d="M13 17h4" />
    </svg>
  ),
  "branding": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

const defaultFeatures = [
  {
    id: "ai-generation",
    title: "AI Proposal Generation",
    headline: "From blank page to beautiful proposal in 60 seconds",
    body: "Describe your project in plain language. Waco3's AI creates a complete proposal with:",
    bullets: [
      "Executive summary that sells your approach",
      "Detailed scope of work",
      "Professional timeline with milestones",
      "Pricing table with line items",
      "Terms and conditions",
      "About section with your credentials",
    ],
    note: "No templates to fill out. No copy-pasting from old projects. Just tell AI what you're building, and it writes a proposal your clients will actually want to read.",
  },
  {
    id: "smart-editing",
    title: "Smart Editing with AI",
    headline: "Select. Ask. Done.",
    body: "Highlight any text and tell AI what you want:",
    bullets: [
      "\"Make this section more confident\"",
      "\"Shorten this to 2 sentences\"",
      "\"Add more technical detail\"",
      "\"Translate to Spanish\"",
      "\"Explain why this matters to the client\"",
    ],
    note: "AI suggests 3 variations. Pick your favorite. Your proposal gets better with every edit—and you stay in control.",
  },
  {
    id: "analytics",
    title: "Client Engagement Analytics",
    headline: "See your proposals through your client's eyes",
    body: "When clients view your proposal, Waco3 records everything:",
    bullets: [
      "Engagement Score — High, Medium, or Low intent at a glance",
      "Time Spent — Total viewing time and time per section",
      "Return Visits — How many times they came back",
      "Device Type — Desktop or mobile viewing",
      "Section Focus — Which parts got the most attention",
    ],
    note: "Know if they spent 30 seconds or 30 minutes. Know if they focused on pricing or process. Know if they forwarded it to their boss.",
  },
  {
    id: "recordings",
    title: "Session Recordings",
    headline: "Watch clients read your proposal (yes, really)",
    body: "Our session replay shows you exactly how clients interact with your proposal:",
    bullets: [
      "Where they scrolled",
      "What they re-read",
      "Where they paused",
      "What they skipped",
    ],
    note: "It's like sitting next to them while they review your work—without the awkwardness.",
  },
  {
    id: "followup",
    title: "AI-Powered Follow-Up Recommendations",
    headline: "Know exactly when and how to follow up",
    body: "Waco3 analyzes client behavior and tells you what to do next:",
    insights: [
      "\"Client viewed pricing 3 times—they're interested but may have budget concerns. Consider offering payment plans.\"",
      "\"High engagement with timeline section—client may be on deadline. Mention quick turnaround in your follow-up.\"",
      "\"Client forwarded to 2 other viewers—this is a committee decision. Prepare talking points for stakeholders.\"",
    ],
    note: "Stop guessing. Start closing.",
  },
  {
    id: "documents",
    title: "Quotes & Invoices Included",
    headline: "Proposals. Quotes. Invoices. One platform.",
    body: "Don't juggle multiple tools. Waco3 handles your entire document workflow:",
    documentTypes: [
      { type: "Proposals", description: "Visual, story-driven documents that win clients" },
      { type: "Quotes", description: "Clean pricing documents for faster approvals" },
      { type: "Invoices", description: "Professional payment requests that get paid" },
    ],
    note: "Convert a proposal to a quote when they're interested. Convert the quote to an invoice when they approve. Your branding stays consistent across everything.",
  },
  {
    id: "pdf",
    title: "Professional PDFs",
    headline: "Beautiful PDFs when you need them",
    body: "Some clients want attachments. We've got you covered:",
    bullets: [
      "Full-color branded PDFs",
      "Print-optimized B&W versions",
      "Custom margins and layouts",
      "Automatic page numbering",
      "Your logo on every page",
    ],
    note: "Web links for tracking. PDFs for old-school clients. Both look stunning.",
  },
  {
    id: "branding",
    title: "Brand Consistency",
    headline: "Set it once. Look professional forever.",
    body: "Upload your logo. Pick your colors. Choose your fonts. Every document you create automatically looks like you:",
    bullets: [
      "Brand colors applied throughout",
      "Your logo perfectly placed",
      "Consistent typography",
      "Custom footer with contact info",
      "Saved terms and conditions",
    ],
    note: "Change your brand? Update once—every future document reflects the change.",
  },
];

export default function FeaturesGrid({ dictionary }) {
  const dictCopy = dictionary?.featuresGrid;
  const title = dictCopy?.title || "Everything You Need to Win More Clients";
  const features = dictCopy?.items || defaultFeatures;

  return (
    <section className={styles.section} id="features">
      <div className="page-shell">
        <ScrollReveal>
          <h2 className={styles.title}>{title}</h2>
        </ScrollReveal>

        <ScrollReveal className={styles.grid} stagger>
          {features.map((feature) => (
            <div key={feature.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>{icons[feature.id]}</div>
                <span className={styles.featureTitle}>{feature.title}</span>
              </div>
              <h3 className={styles.headline}>{feature.headline}</h3>
              <p className={styles.body}>{feature.body}</p>

              {feature.bullets && (
                <ul className={styles.bullets}>
                  {feature.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              )}

              {feature.insights && (
                <div className={styles.insights}>
                  {feature.insights.map((insight, index) => (
                    <p key={index} className={styles.insight}>
                      💡 {insight}
                    </p>
                  ))}
                </div>
              )}

              {feature.documentTypes && (
                <div className={styles.documentTypes}>
                  {feature.documentTypes.map((doc, index) => (
                    <div key={index} className={styles.docType}>
                      <strong>{doc.type}</strong> — {doc.description}
                    </div>
                  ))}
                </div>
              )}

              <p className={styles.note}>{feature.note}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
