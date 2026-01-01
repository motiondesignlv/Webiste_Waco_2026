import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";
import styles from "./EvolutionFeatures.module.scss";

const icons = [
  <svg key="ai" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  <svg key="analytics" fill="currentColor" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>,
  <svg key="latam" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>,
  <svg key="simple" fill="currentColor" viewBox="0 0 24 24"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>,
];

export default function EvolutionFeatures({ dictionary }) {
  const copy = dictionary?.evolutionFeatures || {};
  const title = copy.title || [];
  const descriptions = copy.descriptions || [];
  const features = copy.features || [];

  return (
    <section className={styles.section}>
      <div className="page-shell">
        <div className={styles.grid}>
          <ScrollReveal className={styles.leftCol}>
            <h2 className={styles.title}>
              {title[0]}
              <br />
              {title[1]}
            </h2>
            <div className={styles.descriptions}>
              <p>{descriptions[0]}</p>
              <p>{descriptions[1]}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal stagger className={styles.rightCol}>
            <div className={styles.featureList}>
              {features.map((feature, i) => (
                <div key={i} className={styles.feature}>
                  <div className={styles.iconWrapper}>
                    {icons[i]}
                  </div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureText}>{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
