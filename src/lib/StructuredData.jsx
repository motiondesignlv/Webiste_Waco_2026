/**
 * JSON-LD Structured Data Components for SEO
 * These schemas help search engines understand our content and enable rich results
 */

// Organization Schema - Company information for Google Knowledge Panel
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Waco3",
    url: "https://www.waco3.io",
    logo: "https://www.waco3.io/waco3.svg",
    description: "AI-powered proposal creation platform with client engagement analytics for freelancers and creative professionals.",
    foundingDate: "2025",
    sameAs: [
      "https://twitter.com/waco3io",
      "https://www.instagram.com/waco3io"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@waco3.io",
      contactType: "customer support",
      availableLanguage: ["English", "Spanish"]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// SoftwareApplication Schema - Product information for rich results
export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Waco3",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Create proposals, quotes, and invoices in minutes with AI. See exactly how clients engage with your documents through analytics and session recordings.",
    url: "https://www.waco3.io",
    offers: {
      "@type": "Offer",
      price: "19.00",
      priceCurrency: "USD",
      priceValidUntil: "2025-12-31",
      availability: "https://schema.org/PreOrder",
      description: "Pro Plan - Monthly subscription"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1"
    },
    featureList: [
      "AI proposal generation",
      "Client engagement analytics",
      "Session recordings",
      "AI follow-up recommendations",
      "Custom branding",
      "Professional PDF exports",
      "Quote and invoice creation"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema - Site-level information with search action
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Waco3",
    url: "https://www.waco3.io",
    description: "AI proposal creation with client analytics",
    inLanguage: ["en-US", "es-ES"],
    publisher: {
      "@type": "Organization",
      name: "Waco3"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined component that renders all schemas
export default function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <SoftwareApplicationSchema />
      <WebSiteSchema />
    </>
  );
}
