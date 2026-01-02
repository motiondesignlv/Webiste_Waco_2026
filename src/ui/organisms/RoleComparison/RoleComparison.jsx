'use client';

import { useState } from 'react';
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import GlowLogo from "./GlowLogo";
import styles from "./RoleComparison.module.scss";

export default function RoleComparison({ dictionary }) {
  const copy = dictionary?.roleComparison || {};
  const oldWay = copy.oldWay || { features: [] };
  const newWay = copy.newWay || { features: [] };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className={styles.section} id="comparison">
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
        <ScrollReveal
          className={styles.cardProfessional}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles.header}>
            <div>
              <GlowLogo isHovered={isHovered} />
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
