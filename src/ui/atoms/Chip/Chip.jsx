import { cn } from "@/lib/cn";
import styles from "./Chip.module.scss";

export default function Chip({ children, tone = "default", className }) {
  return <span className={cn(styles.chip, styles[tone], className)}>{children}</span>;
}
