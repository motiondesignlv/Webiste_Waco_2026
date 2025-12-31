
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./ImpactTimeline.module.scss";

export default function ImpactTimeline({ dictionary }) {
  const copy = dictionary?.impactTimeline || {
    header: ["Results that start immediately", "and compound over time"],
    steps: [
      {
        time: "Within Minutes",
        title: "Proposals in minutes, not hours.",
        items: [
          "AI writes your proposals for you",
          "Instant polished design",
          "Quote quickly, close faster",
        ],
      },
      {
        time: "Within Days",
        title: "Know when to follow up.",
        items: [
          "See exactly when clients open",
          "Track engagement scores",
          "Never guess again",
        ],
      },
      {
        time: "Within Months",
        title: "Scale your creative business.",
        items: [
          "Win more high-value clients",
          "Streamline your entire workflow",
          "One platform for quotes & invoices",
        ],
      },
    ],
  };

  const icons = [
    <svg key="lightning" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    <svg key="chart" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
    <svg key="cycle" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>,
  ];

  return (
    <section className={styles.section}>
      <div className="page-shell">
        <ScrollReveal>
          <h2 className={styles.header}>
            {copy.header[0]}
            <br />
            {copy.header[1]}
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger className={styles.timeline}>
          {copy.steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.iconWrapper}>
                {icons[index]}
              </div>
              <div className={styles.timeLabel}>{step.time}</div>
              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <ul className={styles.list}>
                  {step.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
