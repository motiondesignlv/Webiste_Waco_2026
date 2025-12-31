"use client";
import styles from "./ConditionGrid.module.scss";
import Button from "@/ui/atoms/Button/Button";
import ScrollReveal from "@/ui/atoms/ScrollReveal/ScrollReveal";

const defaultCopy = {
  title: ["From web design to video production —", "One platform for every creative professional."],
  cta: "Join the Waitlist",
  categories: [
    {
      title: "Design & Branding",
      items: [
        "Logo Design", "Brand Identity", "Web Design", "UI/UX Design", "Graphic Design",
        "Packaging Design", "Print Design", "Motion Graphics", "Illustration", "Typography",
        "Social Media Graphics", "Presentation Design", "Icon Design", "Infographics",
      ],
    },
    {
      title: "Development & Tech",
      items: [
        "Web Development", "WordPress", "Shopify", "Webflow", "App Development",
        "Custom Software", "API Integration", "E-commerce", "Site Maintenance",
        "Database Design", "No-Code Solutions", "Technical Consulting", "Automation",
      ],
    },
    {
      title: "Content & Marketing",
      items: [
        "Copywriting", "Content Strategy", "Social Media Management", "Video Production",
        "Photography", "Podcast Production", "Email Marketing", "SEO Services",
        "Ad Campaigns", "Brand Storytelling", "Blog Writing", "Product Descriptions",
      ],
    },
  ],
  footnote: "Not on the list? Waco3 works for any industry — real estate, consulting, coaching, legal, accounting, and beyond.",
};

export default function ConditionGrid({ dictionary }) {
  const dictCopy = dictionary?.conditionGrid;
  const copy = {
    title: dictCopy?.title || defaultCopy.title,
    cta: dictCopy?.cta || defaultCopy.cta,
    categories: dictCopy?.categories || defaultCopy.categories,
    footnote: dictCopy?.footnote || defaultCopy.footnote,
  };

  return (
    <section className={styles.section}>
      <div className="page-shell">
        <ScrollReveal className={styles.header}>
          <h2 className={styles.title}>
            {copy.title[0]}<br />
            {copy.title[1]}
          </h2>
          <div className={styles.cta}>
            <Button as="a" href="#waitlist" variant="primary" className={styles.button} icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }>
              {copy.cta}
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal className={styles.grid} stagger>
          {copy.categories.map((cat, i) => (
            <div key={i} className={styles.column}>
              <h3 className={styles.catTitle}>{cat.title}</h3>
              <ul className={styles.list}>
                {cat.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal>
          <p className={styles.footnote}>
            {copy.footnote}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
