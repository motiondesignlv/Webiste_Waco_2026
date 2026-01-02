'use client';

import { memo } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { trackButtonClick } from "@/lib/analytics";
import styles from "./Button.module.scss";

const Button = memo(function Button({
  as = "button",
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  trackingCategory = "button",
  onClick,
  ...props
}) {
  const classes = cn(styles.button, styles[variant], styles[size], className);
  
  const handleClick = (e) => {
    // Track the button click
    trackButtonClick(typeof children === 'string' ? children : 'Button', {
      category: trackingCategory,
      destination: href || '',
      variant: variant,
    });
    
    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  if (as === "a" && href) {
    return (
      <Link href={href} className={classes} onClick={handleClick} {...props}>
        <span>{children}</span>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={handleClick} {...props}>
      <span>{children}</span>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
    </button>
  );
});

export default Button;
