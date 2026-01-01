'use client';

import Link from "next/link";
import { trackLinkClick } from "@/lib/analytics";
import styles from "./SimpleFooter.module.scss";

function GlitchLogo({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1595.3 329.8"
      className={className}
    >
      <defs>
        <filter id="footer-glitch" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood floodColor="black" result="black" />
          <feFlood floodColor="#6df1ff" result="cyan" />
          <feFlood floodColor="#ff00ff" result="magenta" />
          <feOffset in="SourceGraphic" dx="8" dy="0" result="off1a" />
          <feOffset in="SourceGraphic" dx="5" dy="0" result="off1b" />
          <feOffset in="SourceGraphic" dx="-8" dy="0" result="off2a" />
          <feOffset in="SourceGraphic" dx="-5" dy="0" result="off2b" />
          <feComposite in="cyan" in2="off1a" operator="in" result="comp1" />
          <feComposite in="magenta" in2="off2a" operator="in" result="comp2" />

          <feMerge x="0" width="100%" result="merge1">
            <feMergeNode in="black" />
            <feMergeNode in="comp1" />
            <feMergeNode in="off1b" />
            <animate
              attributeName="y"
              dur="4s"
              values="330; 330; 30; 330; 105; 30; 2; 50; 40; 330; 105; 20; 60; 40; 330; 40; 70; 10; 30; 330; 330"
              keyTimes="0; 0.36; 0.37; 0.42; 0.44; 0.48; 0.52; 0.56; 0.59; 0.61; 0.64; 0.69; 0.72; 0.74; 0.77; 0.82; 0.84; 0.89; 0.93; 0.94; 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              dur="4s"
              values="0; 0; 80; 0; 50; 60; 80; 40; 30; 0; 70; 90; 60; 50; 0; 40; 80; 50; 40; 0; 0"
              keyTimes="0; 0.36; 0.37; 0.42; 0.44; 0.48; 0.52; 0.56; 0.59; 0.61; 0.64; 0.69; 0.72; 0.74; 0.77; 0.82; 0.84; 0.89; 0.93; 0.94; 1"
              repeatCount="indefinite"
            />
          </feMerge>

          <feMerge x="0" width="100%" result="merge2">
            <feMergeNode in="black" />
            <feMergeNode in="comp2" />
            <feMergeNode in="off2b" />
            <animate
              attributeName="y"
              dur="4s"
              values="330; 330; 180; 69; 53; 42; 330; 78; 89; 96; 100; 67; 50; 96; 66; 88; 42; 13; 100; 330"
              keyTimes="0; 0.05; 0.10; 0.13; 0.16; 0.18; 0.20; 0.24; 0.27; 0.33; 0.36; 0.40; 0.41; 0.46; 0.49; 0.51; 0.55; 0.58; 0.61; 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              dur="4s"
              values="0; 0; 60; 80; 70; 50; 0; 60; 40; 30; 50; 80; 90; 60; 50; 40; 70; 80; 0; 0"
              keyTimes="0; 0.05; 0.10; 0.13; 0.16; 0.18; 0.20; 0.24; 0.27; 0.33; 0.36; 0.40; 0.41; 0.46; 0.49; 0.51; 0.55; 0.58; 0.61; 1"
              repeatCount="indefinite"
            />
          </feMerge>

          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="merge1" />
            <feMergeNode in="merge2" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#footer-glitch)" fill="#fff">
        <path d="M922.9,122.7c-7.1-16.3-17-30.8-29.6-43.5-12.6-12.6-27.1-22.5-43.5-29.8-16.3-7.2-33.8-10.8-52.3-10.8s-36.3,3.6-52.7,10.8c-16.4,7.2-30.7,17.1-43.1,29.8-12.4,12.6-22.1,27.1-29,43.5-7,16.4-10.5,33.7-10.5,51.9s3.5,36.3,10.5,52.7c7,16.4,16.6,30.7,29,43.1,12.4,12.4,26.7,22.1,43.1,29,16.3,7,33.9,10.5,52.7,10.5s35.9-3.5,52.3-10.5c16.3-7,30.8-16.6,43.5-29,12.6-12.4,22.5-26.7,29.6-43.1,7.1-16.3,10.6-33.9,10.6-52.7s-3.5-35.6-10.6-51.9M873.4,207.7c-4.1,10.2-9.7,19.2-17,27.1-7.2,7.8-15.7,13.9-25.4,18.2-9.7,4.3-20.3,6.5-31.6,6.5s-22.7-2.2-32.6-6.5c-10-4.3-18.8-10.4-26.3-18.2-7.6-7.8-13.5-16.8-17.7-27.1-4.2-10.2-6.3-21.2-6.3-33s2-23.2,6.1-33.5c4.1-10.3,9.9-19.4,17.3-27.2,7.4-7.8,16.1-13.9,26-18.2,9.9-4.3,20.6-6.5,32.1-6.5s22.2,2.2,32.1,6.5c9.9,4.3,18.5,10.4,25.8,18.2,7.3,7.8,13.1,16.9,17.3,27.2,4.2,10.3,6.3,21.5,6.3,33.5s-2.1,22.8-6.1,33" />
        <path d="M1565.9,122.7c-7.1-16.3-17-30.8-29.6-43.5-12.6-12.6-27.1-22.5-43.5-29.8-16.3-7.2-33.8-10.8-52.3-10.8s-36.3,3.6-52.7,10.8c-16.4,7.2-30.7,17.1-43.1,29.8-12.4,12.6-22.1,27.1-29,43.5-7,16.4-10.5,33.7-10.5,51.9s3.5,36.3,10.5,52.7c7,16.4,16.6,30.7,29,43.1,12.4,12.4,26.7,22.1,43.1,29,16.3,7,33.9,10.5,52.7,10.5s35.9-3.5,52.3-10.5c16.3-7,30.8-16.6,43.5-29,12.6-12.4,22.5-26.7,29.6-43.1,7.1-16.3,10.6-33.9,10.6-52.7s-3.5-35.6-10.6-51.9M1516.3,207.7c-4.1,10.2-9.7,19.2-17,27.1-7.2,7.8-15.7,13.9-25.4,18.2-9.7,4.3-20.3,6.5-31.6,6.5s-22.7-2.2-32.6-6.5c-10-4.3-18.8-10.4-26.3-18.2-7.6-7.8-13.5-16.8-17.7-27.1-4.2-10.2-6.3-21.2-6.3-33s2-23.2,6.1-33.5c4.1-10.3,9.9-19.4,17.3-27.2,7.4-7.8,16.1-13.9,26-18.2,9.9-4.3,20.6-6.5,32.1-6.5s22.2,2.2,32.1,6.5c9.9,4.3,18.5,10.4,25.8,18.2,7.3,7.8,13.1,16.9,17.3,27.2,4.2,10.3,6.3,21.5,6.3,33.5s-2.1,22.8-6.1,33" />
        <path d="M645.6,252.4c-10.1,4.6-22.2,6.8-36.4,6.8s-23.2-2-33-6.1c-9.7-4.1-18.1-9.9-25-17.5-7-7.6-12.3-16.6-16-27.2-3.7-10.6-5.6-22.2-5.6-35s2-23.1,6.1-33.3c4.1-10.2,9.7-19.2,16.8-26.8,7.1-7.7,15.3-13.6,24.5-17.8,9.2-4.2,18.9-6.3,29-6.3s24.4,2.5,34.4,7.4c10,4.9,18,9.7,24,14.2l20.5-49.4c-8.7-5.5-19.8-10.7-33.5-15.5-13.7-4.8-29.4-7.2-47.2-7.2s-36.8,3.4-52.6,10.1c-15.9,6.7-29.5,16.2-40.9,28.5-11.4,12.3-20.2,26.8-26.3,43.6-6.1,16.8-9.2,35.3-9.2,55.5s3,35,9,50.8c6,15.9,14.7,29.9,26.1,42.2,11.4,12.3,25.3,21.9,41.8,29,16.5,7.1,35.1,10.9,56,11.4,13.7.2,26.2-1.2,37.5-4.3,11.3-3.1,20.8-6.7,28.7-10.8,7.8-4.1,13.2-7.3,16-9.7l-21.6-46.9c-5.3,5-13,9.9-23.1,14.4" />
        <path d="M391.6,38.9l-117.5,270.7h50.6l21.2-51h86.5l20.1,51h59.5L394.5,38.9h-2.8ZM363.9,215.5l26.4-63.5,25,63.5h-51.5Z" />
        <polygon points="325.4 38.9 267.9 183.5 209.4 38.9 158.4 38.9 179 90.3 139.1 189.5 77.7 38.9 18.8 38.9 132.6 309.6 204.8 154.6 266.7 308.9 381.1 38.9 325.4 38.9" />
        <path d="M969.3,174.7l50-90.3h-82.1c-1.5-7.5-2.2-14.9-2.2-22.4s.7-15.7,2.2-23.1h156l3.7,6.3-60.1,99.6h1.5c9.7,0,18.5,1.9,26.3,5.6s14.4,8.6,19.8,14.7c5.3,6.1,9.5,13.1,12.3,21.1,2.9,8,4.3,16,4.3,24.3,0,15.9-2.7,29.9-8.2,42-5.5,12.1-13.1,22.1-22.8,30.2-9.7,8.1-21.1,14.2-34.3,18.3-13.2,4.1-27.5,6.2-42.9,6.2s-14.1-.2-20-.6c-5.8-.4-11.4-1.1-16.8-2.1-5.4-1-10.8-2.3-16.2-3.9-5.5-1.6-11.6-3.5-18.3-5.8.5-7.7,1.9-15.4,4.3-23.1,2.4-7.7,5.3-14.6,8.8-20.5,9.5,3,18.3,5.5,26.7,7.5,8.3,2,18,3,28.9,3s15.5-.9,22.6-2.8c7.1-1.9,13.2-4.7,18.5-8.6,5.2-3.9,9.4-8.8,12.5-14.7,3.1-6,4.7-13.2,4.7-21.6s-1.4-11.6-4.1-16.2c-2.7-4.6-6.3-8.4-10.8-11.4-4.5-3-9.7-5.2-15.7-6.5-6-1.4-12.2-2.1-18.7-2.1s-8.6.1-13.1.4c-4.5.3-8.8,1-13.1,2.2l-3.7-5.6Z" />
        <path d="M1109.3,307.2c-.7-4.1-1-8.2-1-12.3s.3-8.2,1-12.4c4.1-.7,8.2-1,12.3-1s8.2.3,12.4,1c.7,4.3,1,8.3,1,12.3s-.3,8.3-1,12.4c-4.3.7-8.3,1-12.3,1s-8.3-.3-12.4-1Z" />
        <path d="M1210.2,42.7c9-1.5,17.9-2.2,26.7-2.2s17.8.7,27.1,2.2v263.4c-9.3,1.5-18.2,2.2-26.7,2.2s-18.1-.7-27.1-2.2V42.7Z" />
        <path d="M1295.6,39c.7,7.5,1,14.8,1,22.1s-.3,14.7-1,22.4h-117c-.7-7.7-1-15-1-22.1s.3-14.9,1-22.4h117Z" />
        <path d="M1295.6,263.7c.7,7.5,1,14.8,1,22.1s-.3,14.7-1,22.4h-117c-.7-7.7-1-15-1-22.1s.3-14.9,1-22.4h117Z" />
      </g>
    </svg>
  );
}

export default function SimpleFooter({ dictionary }) {
  const copy = dictionary?.footer || {};
  const navigation = copy.navigation || [];
  const legal = copy.legal || [];
  const social = copy.social || [];

  const handleLinkClick = (text, href, category) => {
    trackLinkClick(text, href, category);
  };

  const navLinks = [
    { label: navigation[0], href: "#features" },
    { label: navigation[1], href: "#pricing" },
    { label: navigation[2], href: "#faq" },
    { label: navigation[3], href: "/blog" },
    { label: navigation[4], href: "#" },
  ];

  const legalLinks = [
    { label: legal[0], href: "/privacy" },
    { label: legal[1], href: "/terms" },
    { label: legal[2], href: "/cookies" },
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
              {social.map((s) => (
                <li key={s}>
                  <Link href="#" onClick={() => handleLinkClick(s, '#', 'footer_social')}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
            <p className={styles.email}>{copy.email}</p>
          </div>
        </div>

        <div className={styles.logoSection}>
          <GlitchLogo className={styles.bigLogo} />
        </div>
      </div>
    </footer>
  );
}
