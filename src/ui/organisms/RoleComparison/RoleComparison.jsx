import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./RoleComparison.module.scss";

export default function RoleComparison({ dictionary }) {
  const copy = dictionary?.roleComparison || {};
  const oldWay = copy.oldWay || { features: [] };
  const newWay = copy.newWay || { features: [] };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Personal Column */}
        <ScrollReveal className={styles.cardPersonal}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.roleTitle}>{oldWay.title}</h2>
              <p className={styles.roleSubtitle}>{oldWay.subtitle}</p>
            </div>
            <div className={styles.dot} />
          </div>
          <div className={styles.list}>
            {(oldWay.features || []).map((feature, i) => (
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
              <img src="/waco3.svg" alt="Waco3.io" className={styles.logo} />
              <p className={styles.roleSubtitle}>{newWay.subtitle}</p>
            </div>
            <div className={styles.dot} />
          </div>
          <div className={styles.list}>
            {(newWay.features || []).map((feature, i) => (
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
