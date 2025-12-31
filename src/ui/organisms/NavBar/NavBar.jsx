import Button from "@/ui/atoms/Button/Button";
import LanguageSwitcher from "@/ui/molecules/LanguageSwitcher/LanguageSwitcher";
import styles from "./NavBar.module.scss";

export default function NavBar({ dictionary }) {
  const nav = dictionary?.nav || {};

  return (
    <header className={styles.nav}>
      <div className="page-shell">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <img src="/waco3.svg" alt="Waco3.io" className={styles.logo} />
          </div>
          <div className={styles.actions}>
            <LanguageSwitcher />
            <Button as="a" href="#waitlist" variant="primary" size="md">
              {nav.primaryCta || "Join Waitlist"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
