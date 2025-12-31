import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./RoleComparison.module.scss";

const defaultCopy = {
  oldWay: {
    title: "The Old Way",
    subtitle: "Slow, manual, and unreliable",
    features: [
      { title: "Hours of Writing", text: "Staring at a blank screen trying to sound professional." },
      { title: "Generic Templates", text: "Using the same Word doc that looks like everyone else's." },
      { title: "Guessing Games", text: "Sending PDFs into the void and wondering if they were opened." },
      { title: "Slow Turnaround", text: "Taking days to reply because paperwork is a chore." },
      { title: "Chasing Payments", text: "Manual invoices and awkward payment reminders." },
    ],
  },
  newWay: {
    title: "Waco3.io",
    subtitle: "Fast, data-driven, and winning",
    features: [
      { title: "AI-Powered Writing", text: "Generate persuasive, custom proposals in seconds." },
      { title: "Instant Analytics", text: "Know the moment your proposal is viewed and for how long." },
      { title: "Polished Design", text: "Look as professional as a top-tier agency automatically." },
      { title: "One-Click Payments", text: "Integrated invoicing that makes getting paid effortless." },
      { title: "Smart Follow-ups", text: "Data-driven insights on exactly when to reach out." },
    ],
  },
};

export default function RoleComparison({ dictionary }) {
  const dictCopy = dictionary?.roleComparison;
  const copy = {
    oldWay: dictCopy?.oldWay || defaultCopy.oldWay,
    newWay: dictCopy?.newWay || defaultCopy.newWay,
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Personal Column */}
        <ScrollReveal className={styles.cardPersonal}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.roleTitle}>{copy.oldWay.title}</h2>
              <p className={styles.roleSubtitle}>{copy.oldWay.subtitle}</p>
            </div>
            <div className={styles.dot} />
          </div>
          <div className={styles.list}>
            {copy.oldWay.features.map((feature, i) => (
              <div key={i} className={styles.item}>
                <h3 className={styles.itemTitle}>{feature.title}</h3>
                <p className={styles.itemText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Professional Column */}
        <ScrollReveal className={styles.cardProfessional}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.roleTitle}>{copy.newWay.title}</h2>
              <p className={styles.roleSubtitle}>{copy.newWay.subtitle}</p>
            </div>
            <div className={styles.dot} />
          </div>
          <div className={styles.list}>
            {copy.newWay.features.map((feature, i) => (
              <div key={i} className={styles.item}>
                <h3 className={styles.itemTitle}>{feature.title}</h3>
                <p className={styles.itemText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
