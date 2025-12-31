import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./AnalyticsSection.module.scss";

const defaultComparison = [
  { feature: "Did they open it?", basic: true, waco3: true },
  { feature: "How long did they spend?", basic: false, waco3: "Total + per section" },
  { feature: "Which sections did they read?", basic: false, waco3: "With time breakdown" },
  { feature: "Did they re-read anything?", basic: false, waco3: "Session recordings" },
  { feature: "What device did they use?", basic: false, waco3: "Mobile vs desktop" },
  { feature: "Did they share it with others?", basic: false, waco3: "Multiple viewer tracking" },
  { feature: "How interested are they?", basic: false, waco3: "AI engagement scoring" },
  { feature: "When should I follow up?", basic: false, waco3: "AI recommendations" },
  { feature: "What should I say?", basic: false, waco3: "AI-powered talking points" },
];

const defaultCopy = {
  eyebrow: "Primary differentiator",
  title: "Most Proposal Tools Tell You \"Opened.\" We Tell You Everything.",
  subtitle: "Basic tools send you a notification when someone opens your proposal. Waco3 shows you how they engaged—so you can follow up smarter and close more deals.",
  tableHeaders: ["What You Learn", "Basic Tools", "Waco3"],
  closingStatement: "Information is power. When you know exactly how clients engage with your proposals, you can follow up at the right moment, address their actual concerns, and close deals you would have lost.",
};

export default function AnalyticsSection({ dictionary }) {
  const dictCopy = dictionary?.analyticsSection;
  const copy = {
    eyebrow: dictCopy?.eyebrow || defaultCopy.eyebrow,
    title: dictCopy?.title || defaultCopy.title,
    subtitle: dictCopy?.subtitle || defaultCopy.subtitle,
    closingStatement: dictCopy?.closingStatement || defaultCopy.closingStatement,
  };
  const comparisonData = dictCopy?.comparison || defaultComparison;
  const headers = dictCopy?.tableHeaders || defaultCopy.tableHeaders;

  return (
    <section className={styles.section} id="analytics">
      <div className="page-shell">
        <ScrollReveal className={styles.header}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{headers[0]}</th>
                <th>{headers[1]}</th>
                <th className={styles.highlight}>{headers[2]}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index}>
                  <td>{row.feature}</td>
                  <td>
                    {row.basic === true ? (
                      <span className={styles.check}>✓</span>
                    ) : (
                      <span className={styles.cross}>✗</span>
                    )}
                  </td>
                  <td className={styles.highlight}>
                    {row.waco3 === true ? (
                      <span className={styles.check}>✓</span>
                    ) : (
                      <span className={styles.featureText}>{row.waco3}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>

        <ScrollReveal className={styles.closing}>
          <p>{copy.closingStatement}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
