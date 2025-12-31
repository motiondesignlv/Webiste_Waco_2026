'use client';

import Link from "next/link";
import Image from "next/image";
import { trackLinkClick } from "@/lib/analytics";
import styles from "./SimpleFooter.module.scss";

const defaultCopy = {
  navigationTitle: "Navigation",
  legalTitle: "Legal",
  connectTitle: "Connect",
  navigation: ["Features", "Pricing", "FAQ", "Blog", "Contact"],
  legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  social: ["Instagram"],
  email: "hello@waco3.io",
  note: "Smart document creation powered by AI and client intelligence to help creative professionals win more work.",
};

export default function SimpleFooter({ dictionary }) {
  const dictCopy = dictionary?.footer;
  const copy = {
    navigationTitle: dictCopy?.navigationTitle || defaultCopy.navigationTitle,
    legalTitle: dictCopy?.legalTitle || defaultCopy.legalTitle,
    connectTitle: dictCopy?.connectTitle || defaultCopy.connectTitle,
    navigation: dictCopy?.navigation || defaultCopy.navigation,
    legal: dictCopy?.legal || defaultCopy.legal,
    social: dictCopy?.social || defaultCopy.social,
    email: dictCopy?.email || defaultCopy.email,
    note: dictCopy?.note || defaultCopy.note,
  };

  const handleLinkClick = (text, href, category) => {
    trackLinkClick(text, href, category);
  };

  const navLinks = [
    { label: copy.navigation[0], href: "#features" },
    { label: copy.navigation[1], href: "#pricing" },
    { label: copy.navigation[2], href: "#faq" },
    { label: copy.navigation[3], href: "/blog" },
    { label: copy.navigation[4], href: "#" },
  ];

  const legalLinks = [
    { label: copy.legal[0], href: "/privacy" },
    { label: copy.legal[1], href: "/terms" },
    { label: copy.legal[2], href: "/cookies" },
  ];

  return (
    <footer className={styles.footer}>
      <div className="page-shell">
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <p className={styles.tagline}>{copy.note}</p>
          </div>

          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>{copy.navigationTitle}</h3>
            <ul className={styles.linkList}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} onClick={() => handleLinkClick(link.label, link.href, 'footer_navigation')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.legalCol}>
            <h3 className={styles.colTitle}>{copy.legalTitle}</h3>
            <ul className={styles.linkList}>
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} onClick={() => handleLinkClick(link.label, link.href, 'footer_legal')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.socialCol}>
            <h3 className={styles.colTitle}>{copy.connectTitle}</h3>
            <ul className={styles.linkList}>
              {(copy.social || ["Instagram"]).map((social) => (
                <li key={social}>
                  <Link href="#" onClick={() => handleLinkClick(social, '#', 'footer_social')}>
                    {social}
                  </Link>
                </li>
              ))}
            </ul>
            <p className={styles.email}>{copy.email}</p>
          </div>
        </div>

        <div className={styles.logoSection}>
          <Image
            src="/waco3.svg"
            alt="Waco3"
            width={1595}
            height={330}
            className={styles.bigLogo}
          />
        </div>
      </div>
    </footer>
  );
}
