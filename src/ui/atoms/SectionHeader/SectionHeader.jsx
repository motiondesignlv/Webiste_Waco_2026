import { cn } from "@/lib/cn";
import styles from "./SectionHeader.module.scss";

export default function SectionHeader({ eyebrow, title, subtitle, alignment = "left" }) {
  return (
    <div className={cn(styles.wrapper, styles[alignment])}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="text-gradient">{title}</h2>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
    </div>
  );
}
