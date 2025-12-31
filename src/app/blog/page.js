import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/ui/organisms/BlogCard/BlogCard";

export const metadata = {
  title: "Blog | Waco3",
  description:
    "Insights on AI proposals, freelancing tips, and client management strategies for creative professionals.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          padding: "clamp(120px, 15vw, 180px) 0 clamp(60px, 10vw, 100px)",
          textAlign: "center",
        }}
      >
        <div className="page-shell">
          <p className="eyebrow" style={{ marginBottom: "16px" }}>
            Waco3 Blog
          </p>
          <h1
            className="blog-title"
            style={{
              maxWidth: "800px",
              margin: "0 auto 24px",
              fontSize: "clamp(38px, 6vw, 60px)",
            }}
          >
            Insights for Modern Freelancers
          </h1>
          <p
            className="blog-lead"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            Tips, strategies, and stories to help you win more clients, create
            better proposals, and grow your creative business.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section style={{ paddingBottom: "clamp(80px, 12vw, 140px)" }}>
        <div className="page-shell">
          {posts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "32px",
              }}
            >
              {posts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                color: "var(--muted)",
              }}
            >
              <p style={{ fontSize: "18px", marginBottom: "16px" }}>
                No posts yet. Check back soon!
              </p>
              <Link
                href="/"
                style={{
                  color: "var(--accent)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                ← Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Back Link */}
      <section style={{ paddingBottom: "60px" }}>
        <div className="page-shell" style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{
              color: "var(--muted)",
              fontSize: "14px",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
