import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/blog";
import styles from "./BlogCard.module.scss";

const BlogCard = memo(function BlogCard({
  slug,
  title,
  excerpt,
  image,
  date,
  readTime,
  category,
}) {
  return (
    <Link href={`/blog/${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          width={600}
          height={340}
          className={styles.image}
        />
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.meta}>
          <span className={styles.date}>{formatDate(date)}</span>
          <span className={styles.separator} aria-hidden="true">•</span>
          <span className={styles.readTime}>{readTime}</span>
        </div>
      </div>
    </Link>
  );
});

export default BlogCard;
