import styles from "./SocialProofBar.module.scss";

export default function SocialProofBar({ dictionary }) {
  const copy = dictionary?.socialProofBar || {};

  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <span className={styles.stat}>
          <span className={styles.emoji}>⚡</span>
          <strong>{copy.launching}</strong>
        </span>
        <span className={styles.divider}>|</span>
        <span className={styles.tagline}>{copy.tagline}</span>
      </div>
    </div>
  );
}
