import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPostSlugs, formatDate } from "@/lib/blog";
import { mdxComponents } from "@/lib/mdx-components";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Waco3 Blog",
    };
  }

  return {
    title: `${post.title} | Waco3 Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article style={{ minHeight: "100vh" }}>
      {/* Hero Image */}
      {post.image && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(300px, 40vw, 500px)",
            marginBottom: "0",
          }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(5, 6, 15, 0.5) 50%, rgba(5, 6, 15, 1) 100%)",
            }}
          />
        </div>
      )}

      {/* Post Header */}
      <header
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: post.image
            ? "0 clamp(20px, 5vw, 40px) 40px"
            : "clamp(120px, 15vw, 180px) clamp(20px, 5vw, 40px) 40px",
          marginTop: post.image ? "-80px" : "0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span className="blog-category">{post.category}</span>
        <h1 className="blog-title">{post.title}</h1>
        <div className="blog-meta">
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatDate(post.date)}
          </span>
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {post.readTime}
          </span>
        </div>
      </header>

      {/* Post Content */}
      <div
        className="blog-body"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 40px) clamp(80px, 12vw, 120px)",
        }}
      >
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      {/* Back Link */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 40px) 80px",
          borderTop: "1px solid var(--border)",
          paddingTop: "40px",
        }}
      >
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--accent)",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: "500",
            transition: "opacity 0.2s ease",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </article>
  );
}
