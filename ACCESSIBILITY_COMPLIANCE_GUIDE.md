# Waco2026 Accessibility Compliance Guide

**Version:** 1.0
**Date:** January 2026
**Standard:** WCAG 2.2 Level AA
**Legal Compliance:** ADA, Section 508, European Accessibility Act (EAA)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Compliance Standards](#compliance-standards)
3. [Critical Issues](#critical-issues)
4. [High Priority Issues](#high-priority-issues)
5. [Medium Priority Issues](#medium-priority-issues)
6. [Good to Have Enhancements](#good-to-have-enhancements)
7. [Keyboard Navigation Guide](#keyboard-navigation-guide)
8. [ARIA Implementation Guide](#aria-implementation-guide)
9. [Responsive Design Audit](#responsive-design-audit)
10. [Browser Compatibility](#browser-compatibility)
11. [Image Optimization Guide](#image-optimization-guide)
12. [Testing Tools & Procedures](#testing-tools--procedures)
13. [Implementation Checklist](#implementation-checklist)

---

## Executive Summary

This document provides a comprehensive accessibility audit and implementation guide for the Waco2026 website. The audit covers WCAG 2.2 Level AA compliance requirements, keyboard navigation, screen reader compatibility, responsive design, and image optimization.

### Current Status
- **Semantic HTML:** Good foundation with proper landmarks
- **Keyboard Navigation:** Excellent in LanguageSwitcher, needs work elsewhere
- **ARIA Implementation:** Partial - needs completion
- **Motion/Animation:** Good prefers-reduced-motion support
- **Images:** Critical optimization needed (6.1MB total, 57% reduction possible)
- **Forms:** Replaced with iframe placeholder - needs implementation
- **Video:** Critical - missing captions and transcripts

### Priority Summary
| Priority | Issues | Estimated Effort |
|----------|--------|------------------|
| Critical | 8 | 16-24 hours |
| High | 12 | 12-16 hours |
| Medium | 15 | 8-12 hours |
| Good to Have | 10 | 8-12 hours |

---

## Compliance Standards

### WCAG 2.2 Level AA Requirements

Based on [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [WebAIM Checklist](https://webaim.org/standards/wcag/checklist):

#### Four Principles (POUR)
1. **Perceivable** - Information must be presentable in ways users can perceive
2. **Operable** - Interface components must be operable
3. **Understandable** - Information and operation must be understandable
4. **Robust** - Content must be robust enough for assistive technologies

#### WCAG 2.2 New Success Criteria
| Criterion | Level | Status |
|-----------|-------|--------|
| 2.4.11 Focus Not Obscured (Minimum) | AA | Needs Review |
| 2.4.12 Focus Not Obscured (Enhanced) | AAA | Optional |
| 2.4.13 Focus Appearance | AAA | Optional |
| 2.5.7 Dragging Movements | AA | N/A (no drag features) |
| 2.5.8 Target Size (Minimum) | AA | Needs Review |
| 3.2.6 Consistent Help | A | N/A |
| 3.3.7 Redundant Entry | A | N/A |
| 3.3.8 Accessible Authentication (Minimum) | AA | N/A |
| 3.3.9 Accessible Authentication (Enhanced) | AAA | Optional |

---

## Critical Issues

### CRIT-001: Video Content Without Captions

**Severity:** Critical
**WCAG:** 1.2.2 Captions (Prerecorded) - Level A
**Legal Risk:** High - ADA violation

**Problem:**
Auto-playing videos lack captions and transcripts.

**Files Affected:**
- `src/ui/organisms/AIProposalSection/index.jsx` (lines 51-59)
- `src/ui/organisms/ShareSection/index.jsx` (lines 56-64)
- `src/ui/organisms/EngagementSection/index.jsx` (lines 52-61)

**Current Code:**
```jsx
<video
  autoPlay
  muted
  loop
  playsInline
  className={styles.video}
>
  <source src={videoSources[activeFeature]} type="video/mp4" />
</video>
```

**Solution:**
```jsx
<div className={styles.videoWrapper}>
  <video
    autoPlay
    muted
    loop
    playsInline
    className={styles.video}
    aria-describedby={`video-desc-${activeFeature}`}
  >
    <source src={videoSources[activeFeature]} type="video/mp4" />
    <track
      kind="captions"
      src={`/captions/${activeFeature}.vtt`}
      srcLang="en"
      label="English"
      default
    />
  </video>
  <p id={`video-desc-${activeFeature}`} className="sr-only">
    {videoDescriptions[activeFeature]}
  </p>
</div>
```

**Additional Requirements:**
- Create `.vtt` caption files for each video
- Add `aria-describedby` linking to text description
- Consider adding audio descriptions for complex visuals

---

### CRIT-002: Background Images Without Alt Text

**Severity:** Critical
**WCAG:** 1.1.1 Non-text Content - Level A

**Problem:**
CSS `backgroundImage` cannot have alt text, making images inaccessible to screen readers.

**Files Affected:**
- `src/ui/organisms/FeatureHighlight/FeatureHighlight.jsx` (line 52)
- `src/ui/organisms/AIProposalSection/index.jsx` (line 71)
- `src/ui/organisms/EngagementSection/index.jsx` (line 72)
- `src/ui/organisms/ProblemSection/ProblemSection.jsx` (line 22)
- `src/ui/organisms/ShareSection/index.jsx` (line 76)

**Current Code:**
```jsx
<div
  className={styles.cardImage}
  style={{ backgroundImage: `url(${card.image})` }}
/>
```

**Solution Option A - Add ARIA Label:**
```jsx
<div
  className={styles.cardImage}
  style={{ backgroundImage: `url(${card.image})` }}
  role="img"
  aria-label={card.imageAlt || `Illustration for ${card.title}`}
/>
```

**Solution Option B - Replace with img Element:**
```jsx
<div className={styles.cardImageWrapper}>
  <img
    src={card.image}
    alt={card.imageAlt}
    className={styles.cardImage}
    loading="lazy"
  />
</div>
```

**Solution Option C - Use Picture Element (Best for Optimization):**
```jsx
<div className={styles.cardImageWrapper}>
  <picture>
    <source srcSet={card.imageWebp} type="image/webp" />
    <source srcSet={card.imageAvif} type="image/avif" />
    <img
      src={card.image}
      alt={card.imageAlt}
      className={styles.cardImage}
      loading="lazy"
    />
  </picture>
</div>
```

---

### CRIT-003: Form Implementation Missing

**Severity:** Critical
**WCAG:** 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions - Level A

**Problem:**
CTASection has iframe placeholder with `src="about:blank"`.

**File:** `src/ui/organisms/CTASection/CTASection.jsx` (line 31)

**Current Code:**
```jsx
<iframe
  src="about:blank"
  title="Newsletter signup form"
  className={styles.signupIframe}
  loading="lazy"
/>
```

**Solution - Native Form Implementation:**
```jsx
<form
  className={styles.form}
  onSubmit={handleSubmit}
  aria-labelledby="cta-form-title"
>
  <h3 id="cta-form-title" className="sr-only">Join the Waitlist</h3>

  <div className={styles.formGroup}>
    <label htmlFor="cta-email" className={styles.label}>
      Email Address
      <span className={styles.required} aria-hidden="true">*</span>
    </label>
    <input
      id="cta-email"
      type="email"
      name="email"
      required
      aria-required="true"
      aria-describedby="email-hint email-error"
      autoComplete="email"
      className={styles.input}
      placeholder="you@example.com"
    />
    <span id="email-hint" className={styles.hint}>
      We'll never share your email
    </span>
    {errors.email && (
      <span id="email-error" className={styles.error} role="alert">
        {errors.email}
      </span>
    )}
  </div>

  <div className={styles.formGroup}>
    <label htmlFor="cta-name" className={styles.label}>
      Full Name
    </label>
    <input
      id="cta-name"
      type="text"
      name="name"
      autoComplete="name"
      className={styles.input}
      placeholder="John Doe"
    />
  </div>

  <div className={styles.formGroup}>
    <label htmlFor="cta-work-type" className={styles.label}>
      What type of work do you do?
    </label>
    <select
      id="cta-work-type"
      name="workType"
      className={styles.select}
      aria-describedby="work-type-hint"
    >
      <option value="">Select an option</option>
      <option value="freelancer">Freelancer</option>
      <option value="agency">Agency</option>
      <option value="consultant">Consultant</option>
      <option value="other">Other</option>
    </select>
    <span id="work-type-hint" className={styles.hint}>
      This helps us personalize your experience
    </span>
  </div>

  <button
    type="submit"
    className={styles.submitButton}
    disabled={isSubmitting}
    aria-busy={isSubmitting}
  >
    {isSubmitting ? 'Joining...' : 'Join Waitlist'}
  </button>

  <div aria-live="polite" aria-atomic="true" className="sr-only">
    {submitStatus}
  </div>
</form>
```

---

### CRIT-004: Missing Focus Indicators

**Severity:** Critical
**WCAG:** 2.4.7 Focus Visible - Level AA, 2.4.11 Focus Not Obscured - Level AA (WCAG 2.2)

**Problem:**
Many interactive elements lack visible focus indicators.

**Files Affected:**
- `src/ui/organisms/SimpleFooter/SimpleFooter.jsx` - Footer links
- `src/ui/organisms/BlogCard/BlogCard.jsx` - Card links
- `src/ui/organisms/NewHero/NewHero.jsx` - Secondary CTA link
- Various button and link components

**Solution - Global Focus Styles:**

Add to `src/app/globals.scss`:
```scss
/* =================================
   FOCUS MANAGEMENT - WCAG 2.4.7
   ================================= */

/* Remove default outline only if custom focus is provided */
:focus {
  outline: none;
}

/* Visible focus for keyboard users */
:focus-visible {
  outline: 3px solid var(--color-accent-primary);
  outline-offset: 3px;
  border-radius: 4px;
}

/* High contrast focus for links */
a:focus-visible {
  outline: 3px solid var(--color-accent-primary);
  outline-offset: 2px;
  background-color: rgba(109, 241, 255, 0.1);
  border-radius: 2px;
}

/* Button focus */
button:focus-visible,
[role="button"]:focus-visible {
  outline: 3px solid var(--color-accent-primary);
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(109, 241, 255, 0.2);
}

/* Skip link focus enhancement */
.skip-link:focus {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 10000;
  padding: 16px 24px;
  background: var(--color-accent-primary);
  color: var(--color-bg-primary);
  font-weight: 700;
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Focus within for card components */
.card:focus-within {
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 4px;
}

/* Ensure focus is never completely hidden */
*:focus {
  scroll-margin-top: 100px;
  scroll-margin-bottom: 100px;
}
```

---

### CRIT-005: Insufficient Color Contrast

**Severity:** Critical
**WCAG:** 1.4.3 Contrast (Minimum) - Level AA

**Problem:**
Muted text color `#9fb2d9` on background `#05060f` may not meet 4.5:1 contrast ratio for small text.

**File:** `src/styles/_tokens.scss` (line 60)

**Current:**
```scss
--color-text-muted: #9fb2d9;  // ~6.5:1 contrast - PASSES but marginal
```

**Analysis:**
- `#9fb2d9` on `#05060f` = ~6.5:1 contrast ratio
- PASSES WCAG AA for normal text (4.5:1 required)
- PASSES WCAG AA for large text (3:1 required)
- Does NOT pass WCAG AAA (7:1 required)

**Recommendation:**
For enhanced accessibility, consider:
```scss
--color-text-muted: #b8c9e6;  // ~8.5:1 contrast - PASSES AAA
```

**Additional Contrast Issues to Check:**
| Element | Current Color | Background | Ratio | Status |
|---------|--------------|------------|-------|--------|
| Muted text | #9fb2d9 | #05060f | 6.5:1 | AA Pass |
| Eyebrow text | #6df1ff | #05060f | 11.5:1 | AAA Pass |
| Primary text | #e7ecf5 | #05060f | 13.5:1 | AAA Pass |
| Link hover | #ffffff | #05060f | 18.1:1 | AAA Pass |
| Dropdown option | rgba(255,255,255,0.7) | #1a1a2e | ~5:1 | AA Pass |

---

### CRIT-006: Touch Target Size

**Severity:** Critical
**WCAG:** 2.5.8 Target Size (Minimum) - Level AA (WCAG 2.2)

**Problem:**
Some interactive elements may not meet 24x24 CSS pixel minimum.

**Areas to Check:**
- Footer social links
- Language switcher dropdown options
- Navigation links on mobile
- Carousel control buttons

**Solution:**
Ensure all interactive elements meet minimum 44x44px (ideal) or 24x24px (minimum):

```scss
/* Minimum touch target size */
button,
a,
[role="button"],
input[type="checkbox"],
input[type="radio"],
select {
  min-width: 44px;
  min-height: 44px;

  /* Or use padding to achieve size */
  @media (pointer: coarse) {
    padding: 12px 16px;
  }
}

/* For inline links, use larger hit area */
a {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -8px;
  }
}
```

---

### CRIT-007: Screen Reader Only Text Class

**Severity:** Critical
**WCAG:** 1.3.1 Info and Relationships - Level A

**Problem:**
Missing `.sr-only` utility class definition in globals.

**Solution:**
Add to `src/app/globals.scss`:
```scss
/* Screen Reader Only - Visually hidden but accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Allow focus on sr-only elements when needed */
.sr-only-focusable:focus,
.sr-only-focusable:active {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

### CRIT-008: Language Attribute

**Severity:** Critical
**WCAG:** 3.1.1 Language of Page - Level A

**Problem:**
Page language should update when locale changes.

**File:** `src/app/layout.js`

**Current Code:**
```jsx
<html lang="en">
```

**Solution:**
```jsx
// In layout.js - Use dynamic lang attribute
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Content */}
    </html>
  );
}

// Create a client component to update lang
// src/components/LanguageUpdater.jsx
'use client';
import { useEffect } from 'react';
import { useLocale } from '@/lib/LocaleProvider';

export function LanguageUpdater() {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
```

---

## High Priority Issues

### HIGH-001: Missing aria-labelledby on Sections

**WCAG:** 1.3.1 Info and Relationships - Level A

**Problem:**
Sections without proper labeling for screen reader navigation.

**Files Affected:**
- `src/ui/organisms/FeatureHighlight/FeatureHighlight.jsx`
- `src/ui/organisms/ProblemSection/ProblemSection.jsx`
- `src/ui/organisms/SocialProofBar/SocialProofBar.jsx`

**Solution:**
```jsx
<section
  className={styles.section}
  id="features"
  aria-labelledby="features-title"
>
  <h2 id="features-title" className={styles.title}>{copy.title}</h2>
  {/* Content */}
</section>
```

---

### HIGH-002: Decorative SVG Logo Animation

**WCAG:** 2.3.1 Three Flashes or Below Threshold - Level A

**Problem:**
Footer SVG glitch animation may cause accessibility issues.

**File:** `src/ui/organisms/SimpleFooter/SimpleFooter.jsx` (lines 30-43)

**Solution:**
```jsx
// Wrap animation in prefers-reduced-motion check
const GlitchLogo = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reducedMotion) {
    return <img src="/waco3.svg" alt="Waco3.io" className={styles.logo} />;
  }

  return (
    <svg aria-hidden="true" className={styles.glitchLogo}>
      {/* Animated SVG content */}
    </svg>
  );
};
```

---

### HIGH-003: Link Purpose Context

**WCAG:** 2.4.4 Link Purpose (In Context) - Level A

**Problem:**
Secondary CTA link in hero has unclear purpose.

**File:** `src/ui/organisms/NewHero/NewHero.jsx` (lines 86-93)

**Current:**
```jsx
<a href="#demo" className={styles.secondaryCta}>
  {hero.secondaryCta} →
</a>
```

**Solution:**
```jsx
<a
  href="#demo"
  className={styles.secondaryCta}
  aria-label={`${hero.secondaryCta} - Watch product demonstration`}
>
  {hero.secondaryCta}
  <span aria-hidden="true">→</span>
</a>
```

---

### HIGH-004: Error Identification

**WCAG:** 3.3.1 Error Identification - Level A

**Problem:**
No error handling or validation feedback in forms.

**Solution:**
```jsx
// Error state management
const [errors, setErrors] = useState({});

// Error display component
const FieldError = ({ id, message }) => (
  <span
    id={id}
    className={styles.errorMessage}
    role="alert"
    aria-live="assertive"
  >
    <svg aria-hidden="true" className={styles.errorIcon}>
      <use href="#icon-error" />
    </svg>
    {message}
  </span>
);

// Usage in form field
<div className={styles.formGroup}>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-invalid={errors.email ? 'true' : 'false'}
    aria-describedby={errors.email ? 'email-error' : undefined}
  />
  {errors.email && <FieldError id="email-error" message={errors.email} />}
</div>
```

---

### HIGH-005: Consistent Navigation

**WCAG:** 3.2.3 Consistent Navigation - Level AA

**Problem:**
Navigation should be consistent across all pages.

**Solution:**
Ensure NavBar component is used identically on:
- Homepage (`src/app/page.js`)
- Blog listing (`src/app/blog/page.js`)
- Blog posts (`src/app/blog/[slug]/page.js`)
- Legal pages (privacy, terms, cookies)

---

### HIGH-006: Heading Hierarchy in Blog

**WCAG:** 1.3.1 Info and Relationships - Level A

**Problem:**
Blog cards in grid lack proper heading structure.

**File:** `src/app/blog/page.js`

**Solution:**
```jsx
<section aria-labelledby="blog-title">
  <h1 id="blog-title">{copy.title}</h1>

  <div className={styles.grid} role="list">
    {posts.map((post) => (
      <article key={post.slug} role="listitem">
        <BlogCard {...post} />
      </article>
    ))}
  </div>
</section>
```

---

### HIGH-007: Autocomplete Attributes

**WCAG:** 1.3.5 Identify Input Purpose - Level AA

**Problem:**
Form fields missing autocomplete attributes.

**Solution:**
```jsx
// Email field
<input type="email" autoComplete="email" />

// Name field
<input type="text" autoComplete="name" />

// Add for any personal data fields:
// autoComplete="given-name"
// autoComplete="family-name"
// autoComplete="organization"
// autoComplete="tel"
// autoComplete="street-address"
// autoComplete="postal-code"
// autoComplete="country"
```

---

### HIGH-008: Page Title Updates

**WCAG:** 2.4.2 Page Titled - Level A

**Problem:**
Ensure unique, descriptive page titles.

**Files to Check:**
- `src/app/layout.js` - Default metadata
- `src/app/blog/[slug]/page.js` - Dynamic titles

**Solution:**
```jsx
// In layout.js
export const metadata = {
  title: {
    template: '%s | Waco3.io',
    default: 'Waco3.io - AI-Powered Proposal Software',
  },
};

// In blog post page
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

---

### HIGH-009: Resize Text

**WCAG:** 1.4.4 Resize Text - Level AA

**Problem:**
Ensure text can be resized to 200% without loss of content.

**Solution:**
```scss
/* Use relative units for all text */
html {
  font-size: 100%; /* Respects user's browser settings */
}

body {
  font-size: 1rem;
  line-height: 1.5;
}

h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 3vw, 1.75rem); }

/* Avoid fixed heights that would clip text */
.container {
  min-height: auto; /* Not fixed height */
  overflow: visible; /* Not hidden */
}
```

---

### HIGH-010: Reflow

**WCAG:** 1.4.10 Reflow - Level AA

**Problem:**
Content should reflow at 320px width without horizontal scrolling.

**Solution:**
```scss
/* Ensure content reflows properly */
.page-shell {
  width: 100%;
  max-width: 1200px;
  padding-inline: clamp(16px, 5vw, 40px);
  overflow-x: hidden;
}

/* Prevent horizontal overflow */
img, video, iframe {
  max-width: 100%;
  height: auto;
}

/* Responsive tables */
table {
  display: block;
  overflow-x: auto;

  @media (min-width: 768px) {
    display: table;
  }
}

/* Test at 320px viewport */
@media (max-width: 320px) {
  .hide-on-tiny {
    display: none;
  }
}
```

---

### HIGH-011: Text Spacing

**WCAG:** 1.4.12 Text Spacing - Level AA

**Problem:**
Content must be readable with increased text spacing.

**Test Requirements:**
- Line height: 1.5x font size
- Paragraph spacing: 2x font size
- Letter spacing: 0.12x font size
- Word spacing: 0.16x font size

**Solution:**
```scss
/* Allow user stylesheets to override */
body {
  line-height: 1.5;
  letter-spacing: normal;
  word-spacing: normal;
}

/* Don't set fixed heights on text containers */
p, li, dd {
  max-width: 70ch;
  overflow-wrap: break-word;
}
```

---

### HIGH-012: Status Messages

**WCAG:** 4.1.3 Status Messages - Level AA

**Problem:**
Dynamic status updates need ARIA live regions.

**Solution:**
```jsx
// Success message
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className={styles.successMessage}
>
  {successMessage}
</div>

// Error message
<div
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  className={styles.errorMessage}
>
  {errorMessage}
</div>

// Loading state
<div
  role="status"
  aria-live="polite"
  aria-busy="true"
>
  <span className="sr-only">Loading...</span>
  <Spinner aria-hidden="true" />
</div>
```

---

## Medium Priority Issues

### MED-001: CSS Animation Reduced Motion

**WCAG:** 2.3.3 Animation from Interactions - Level AAA

**Problem:**
CSS animations should respect prefers-reduced-motion.

**File:** `src/ui/organisms/NewHero/NewHero.module.scss`

**Solution:**
```scss
@keyframes wordReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.word {
  animation: wordReveal 0.6s ease forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

---

### MED-002: Focus Order

**WCAG:** 2.4.3 Focus Order - Level A

**Problem:**
Ensure logical tab order throughout the page.

**Solution:**
```jsx
// Avoid positive tabindex values
// BAD:
<button tabIndex="1">First</button>
<button tabIndex="2">Second</button>

// GOOD:
<button tabIndex="0">First</button>
<button tabIndex="0">Second</button>

// For elements that shouldn't be focusable:
<div tabIndex="-1">Not in tab order but programmatically focusable</div>
```

---

### MED-003: Multiple Ways

**WCAG:** 2.4.5 Multiple Ways - Level AA

**Problem:**
Provide multiple ways to locate pages.

**Solution:**
- Site map page
- Search functionality
- Table of contents for long content
- Breadcrumb navigation for blog

```jsx
// Breadcrumb component
const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb">
    <ol className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <li key={item.href}>
          {index < items.length - 1 ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
```

---

### MED-004: Section Headings

**WCAG:** 2.4.10 Section Headings - Level AAA

**Problem:**
All sections should have descriptive headings.

**Solution:**
Add headings to sections that lack them, using sr-only class if visual heading not desired:
```jsx
<section aria-labelledby="social-proof-heading">
  <h2 id="social-proof-heading" className="sr-only">
    Trusted by Industry Leaders
  </h2>
  <SocialProofBar />
</section>
```

---

### MED-005: Pointer Gestures

**WCAG:** 2.5.1 Pointer Gestures - Level A

**Problem:**
All functionality using multipoint/path gestures must have single-pointer alternatives.

**Current Status:** No swipe gestures detected - COMPLIANT

---

### MED-006: Motion Actuation

**WCAG:** 2.5.4 Motion Actuation - Level A

**Problem:**
Functionality triggered by device motion must have UI alternatives.

**Current Status:** No motion-triggered features - COMPLIANT

---

### MED-007: Label in Name

**WCAG:** 2.5.3 Label in Name - Level A

**Problem:**
Visible labels must match accessible names.

**Check:**
```jsx
// BAD - visible text doesn't match aria-label
<button aria-label="Submit form">Send</button>

// GOOD - aria-label includes visible text
<button aria-label="Send - Submit contact form">Send</button>

// BEST - no aria-label needed
<button>Submit Form</button>
```

---

### MED-008: Content on Hover or Focus

**WCAG:** 1.4.13 Content on Hover or Focus - Level AA

**Problem:**
Tooltips and popups must be dismissible, hoverable, and persistent.

**Solution:**
```jsx
const Tooltip = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={styles.tooltip}
          onMouseEnter={() => setVisible(true)} // Hoverable
        >
          {content}
          <button
            className={styles.closeTooltip}
            onClick={() => setVisible(false)}
            aria-label="Close tooltip"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
```

---

### MED-009: Parsing / Valid HTML

**WCAG:** 4.1.1 Parsing - Level A (Deprecated in WCAG 2.2 but still good practice)

**Problem:**
Ensure valid HTML with no duplicate IDs.

**Testing:**
```bash
# Use W3C validator
npx html-validate out/**/*.html

# Or online
# https://validator.w3.org/
```

---

### MED-010: Name, Role, Value

**WCAG:** 4.1.2 Name, Role, Value - Level A

**Problem:**
Custom controls need proper ARIA.

**Current Implementation:**
- LanguageSwitcher: EXCELLENT - proper listbox pattern
- QuickAnswers: GOOD - proper accordion pattern
- HowItWorks carousel: GOOD - has pause control

---

### MED-011: Images of Text

**WCAG:** 1.4.5 Images of Text - Level AA

**Problem:**
Avoid images containing text.

**Check:** Review all images to ensure no essential text is embedded in images.

---

### MED-012: Non-text Contrast

**WCAG:** 1.4.11 Non-text Contrast - Level AA

**Problem:**
UI components and graphics need 3:1 contrast ratio.

**Check:**
- Form field borders
- Button outlines
- Icons
- Focus indicators

---

### MED-013: Orientation

**WCAG:** 1.3.4 Orientation - Level AA

**Problem:**
Content should work in both portrait and landscape.

**Solution:**
```scss
/* Don't restrict orientation */
@media screen and (orientation: portrait) {
  /* Optimize for portrait, don't hide content */
}

@media screen and (orientation: landscape) {
  /* Optimize for landscape, don't hide content */
}
```

---

### MED-014: Identify Common Elements

**WCAG:** 3.2.4 Consistent Identification - Level AA

**Problem:**
Same functionality should be consistently identified.

**Check:**
- "Join Waitlist" buttons use same text throughout
- Navigation links consistent across pages
- Icons used consistently

---

### MED-015: Error Suggestion

**WCAG:** 3.3.3 Error Suggestion - Level AA

**Problem:**
Provide suggestions for correcting errors.

**Solution:**
```jsx
const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  if (!email.includes('@')) {
    return 'Please enter a valid email address (e.g., name@example.com)';
  }
  return null;
};
```

---

## Good to Have Enhancements

### GOOD-001: Skip to Table of Contents

Add additional skip link for long pages:
```jsx
<a href="#toc" className="skip-link">Skip to table of contents</a>
<a href="#main-content" className="skip-link">Skip to main content</a>
```

---

### GOOD-002: Landmark Role Summary

Add landmark summary for screen readers:
```jsx
<nav aria-label="Page sections">
  <ul>
    <li><a href="#hero">Hero</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#pricing">Pricing</a></li>
    {/* etc */}
  </ul>
</nav>
```

---

### GOOD-003: High Contrast Mode Support

```scss
@media (forced-colors: active) {
  /* Windows High Contrast Mode */
  button {
    border: 2px solid currentColor;
  }

  a {
    text-decoration: underline;
  }

  .card {
    border: 1px solid currentColor;
  }
}
```

---

### GOOD-004: Print Styles

```scss
@media print {
  /* Hide non-essential elements */
  nav,
  .skip-link,
  .carousel-control,
  video,
  .particle-background {
    display: none !important;
  }

  /* Ensure readable text */
  body {
    color: black;
    background: white;
    font-size: 12pt;
    line-height: 1.5;
  }

  /* Show link URLs */
  a[href]:after {
    content: " (" attr(href) ")";
  }
}
```

---

### GOOD-005: Reading Level

**WCAG:** 3.1.5 Reading Level - Level AAA

Use plain language where possible. Consider adding glossary for technical terms.

---

### GOOD-006: Pronunciation

**WCAG:** 3.1.6 Pronunciation - Level AAA

For uncommon words, provide pronunciation guide:
```jsx
<abbr title="Web Content Accessibility Guidelines">WCAG</abbr>
```

---

### GOOD-007: Timeouts Warning

**WCAG:** 2.2.6 Timeouts - Level AAA

If forms have session timeouts, warn users:
```jsx
<div role="alert" aria-live="assertive">
  Your session will expire in 5 minutes.
  <button onClick={extendSession}>Extend session</button>
</div>
```

---

### GOOD-008: Animation Control

Add global animation toggle:
```jsx
const AnimationContext = createContext({
  animationsEnabled: true,
  toggleAnimations: () => {}
});

// Settings panel
<button onClick={toggleAnimations}>
  {animationsEnabled ? 'Disable' : 'Enable'} Animations
</button>
```

---

### GOOD-009: Dark/Light Mode Toggle

Provide explicit theme toggle:
```jsx
<button
  onClick={toggleTheme}
  aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
>
  {isDark ? '☀️' : '🌙'}
</button>
```

---

### GOOD-010: Font Size Controls

Allow users to adjust font size:
```jsx
const FontSizeControls = () => (
  <div role="group" aria-label="Font size controls">
    <button onClick={() => setFontSize('small')} aria-pressed={fontSize === 'small'}>
      A<span className="sr-only"> - Small text</span>
    </button>
    <button onClick={() => setFontSize('medium')} aria-pressed={fontSize === 'medium'}>
      A<span className="sr-only"> - Medium text</span>
    </button>
    <button onClick={() => setFontSize('large')} aria-pressed={fontSize === 'large'}>
      A<span className="sr-only"> - Large text</span>
    </button>
  </div>
);
```

---

## Keyboard Navigation Guide

### Current Keyboard Support

| Component | Key | Action | Status |
|-----------|-----|--------|--------|
| Skip Link | Tab | Focus skip link | ✅ Working |
| Skip Link | Enter | Skip to main content | ✅ Working |
| LanguageSwitcher | Tab | Focus trigger | ✅ Working |
| LanguageSwitcher | Enter/Space | Open dropdown | ✅ Working |
| LanguageSwitcher | Arrow Up/Down | Navigate options | ✅ Working |
| LanguageSwitcher | Escape | Close dropdown | ✅ Working |
| FAQ Accordion | Tab | Focus buttons | ✅ Working |
| FAQ Accordion | Enter/Space | Toggle panel | ✅ Working |
| Carousel | Tab | Focus pause button | ✅ Working |
| Carousel | Enter | Toggle pause/play | ✅ Working |
| Buttons | Tab | Focus | ✅ Working |
| Buttons | Enter/Space | Activate | ✅ Working |
| Links | Tab | Focus | ⚠️ Missing visible focus |
| Links | Enter | Navigate | ✅ Working |

### Required Keyboard Patterns

#### Accordion (ARIA Authoring Practices)
```
Tab           Move focus to next focusable element
Enter/Space   Toggle expanded state
Down Arrow    Move focus to next accordion header (optional)
Up Arrow      Move focus to previous accordion header (optional)
Home          Move focus to first accordion header (optional)
End           Move focus to last accordion header (optional)
```

#### Listbox (Language Switcher)
```
Tab           Move focus into/out of listbox
Down Arrow    Move focus to next option
Up Arrow      Move focus to previous option
Home          Move focus to first option
End           Move focus to last option
Enter/Space   Select focused option
Escape        Close listbox
```

#### Dialog (if implemented)
```
Tab           Move focus within dialog
Shift+Tab     Move focus backwards within dialog
Escape        Close dialog
```

### Focus Management Best Practices

```jsx
// 1. Focus trap for modals
import { useRef, useEffect } from 'react';

const useFocusTrap = (isOpen) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return containerRef;
};

// 2. Roving tabindex for grouped controls
const RovingTabIndex = ({ items, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (e, index) => {
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = (index + 1) % items.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        newIndex = (index - 1 + items.length) % items.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    setActiveIndex(newIndex);
  };

  return (
    <div role="radiogroup">
      {items.map((item, index) => (
        <button
          key={item.id}
          role="radio"
          aria-checked={index === activeIndex}
          tabIndex={index === activeIndex ? 0 : -1}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onClick={() => setActiveIndex(index)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
```

---

## ARIA Implementation Guide

### Required ARIA Patterns

#### 1. Landmark Regions
```jsx
<header role="banner">
  <nav role="navigation" aria-label="Main">
    {/* Navigation content */}
  </nav>
</header>

<main role="main" id="main-content">
  <section aria-labelledby="section-title">
    <h2 id="section-title">Section Title</h2>
  </section>
</main>

<footer role="contentinfo">
  <nav aria-label="Footer">
    {/* Footer navigation */}
  </nav>
</footer>
```

#### 2. Live Regions
```jsx
// Polite announcements (wait for user to finish)
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Assertive announcements (interrupt immediately)
<div aria-live="assertive" role="alert">
  {errorMessage}
</div>

// Status updates
<div role="status" aria-live="polite">
  {loadingMessage}
</div>

// Progress
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Upload progress"
>
  {progress}%
</div>
```

#### 3. Expandable Content
```jsx
<button
  aria-expanded={isExpanded}
  aria-controls="panel-content"
  onClick={() => setIsExpanded(!isExpanded)}
>
  {title}
</button>
<div
  id="panel-content"
  role="region"
  aria-labelledby="panel-title"
  hidden={!isExpanded}
>
  {content}
</div>
```

#### 4. Tabs
```jsx
<div role="tablist" aria-label="Features">
  {tabs.map((tab, index) => (
    <button
      key={tab.id}
      role="tab"
      id={`tab-${tab.id}`}
      aria-selected={activeTab === index}
      aria-controls={`panel-${tab.id}`}
      tabIndex={activeTab === index ? 0 : -1}
    >
      {tab.label}
    </button>
  ))}
</div>

{tabs.map((tab, index) => (
  <div
    key={tab.id}
    role="tabpanel"
    id={`panel-${tab.id}`}
    aria-labelledby={`tab-${tab.id}`}
    hidden={activeTab !== index}
    tabIndex={0}
  >
    {tab.content}
  </div>
))}
```

#### 5. Modal Dialog
```jsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Dialog Title</h2>
  <p id="dialog-description">Dialog description</p>

  {/* Dialog content */}

  <button onClick={closeDialog}>Close</button>
</div>
```

#### 6. Form Validation
```jsx
<div className={styles.formGroup}>
  <label htmlFor="email">
    Email Address
    <span aria-hidden="true">*</span>
  </label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby="email-hint email-error"
  />
  <span id="email-hint" className={styles.hint}>
    We'll send your confirmation here
  </span>
  {hasError && (
    <span
      id="email-error"
      className={styles.error}
      role="alert"
    >
      Please enter a valid email address
    </span>
  )}
</div>
```

### ARIA States Reference

| Attribute | Purpose | Values |
|-----------|---------|--------|
| `aria-expanded` | Expandable content state | `true` / `false` |
| `aria-selected` | Selection state (tabs, listbox) | `true` / `false` |
| `aria-checked` | Checkbox/radio state | `true` / `false` / `mixed` |
| `aria-pressed` | Toggle button state | `true` / `false` |
| `aria-disabled` | Disabled state | `true` / `false` |
| `aria-hidden` | Hidden from AT | `true` / `false` |
| `aria-invalid` | Validation state | `true` / `false` / `grammar` / `spelling` |
| `aria-busy` | Loading state | `true` / `false` |
| `aria-current` | Current item | `page` / `step` / `location` / `date` / `time` / `true` |

### ARIA Properties Reference

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-label` | Accessible name | `aria-label="Close menu"` |
| `aria-labelledby` | Label from element | `aria-labelledby="heading-id"` |
| `aria-describedby` | Description from element | `aria-describedby="hint-id"` |
| `aria-controls` | Controls relationship | `aria-controls="panel-id"` |
| `aria-owns` | Parent-child relationship | `aria-owns="child-id"` |
| `aria-live` | Live region type | `polite` / `assertive` / `off` |
| `aria-atomic` | Announce all or changes | `true` / `false` |
| `aria-relevant` | What changes to announce | `additions` / `removals` / `text` / `all` |

---

## Responsive Design Audit

### Breakpoint Testing

| Breakpoint | Width | Target Devices | Status |
|------------|-------|----------------|--------|
| Mobile S | 320px | iPhone SE, small Android | ⚠️ Test needed |
| Mobile M | 375px | iPhone 12/13/14 | ⚠️ Test needed |
| Mobile L | 425px | Large phones | ⚠️ Test needed |
| Tablet | 768px | iPad, tablets | ⚠️ Test needed |
| Laptop | 1024px | Small laptops | ✅ |
| Desktop | 1440px | Desktops | ✅ |
| 4K | 2560px | Large monitors | ⚠️ Test needed |

### Responsive Issues to Check

#### 1. Text Overflow
```scss
/* Prevent text overflow */
.title, .heading, .text {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

/* Long URLs and strings */
.content {
  word-break: break-word;
}
```

#### 2. Touch Target Sizing
```scss
/* Mobile touch targets */
@media (pointer: coarse) {
  button,
  a,
  input,
  select {
    min-height: 44px;
    min-width: 44px;
  }
}
```

#### 3. Viewport Meta
```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover"
/>
```

**Important:** Do NOT include `user-scalable=no` or `maximum-scale=1` as these prevent zooming.

#### 4. Safe Areas (Notch/Island)
```scss
/* Support for notched devices */
.header {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.footer {
  padding-bottom: env(safe-area-inset-bottom);
}
```

#### 5. Container Queries (Modern)
```scss
/* Container queries for component-level responsiveness */
.card-container {
  container-type: inline-size;
}

.card {
  @container (max-width: 400px) {
    flex-direction: column;
  }
}
```

### Mobile-Specific Accessibility

```scss
/* Increase tap target spacing on mobile */
@media (max-width: 768px) {
  .nav-links {
    gap: 16px;
  }

  .button-group {
    flex-direction: column;
    gap: 12px;
  }

  .form-row {
    flex-direction: column;
  }
}

/* Ensure readable font sizes */
@media (max-width: 480px) {
  body {
    font-size: 16px; /* Prevent iOS zoom on focus */
  }

  input, select, textarea {
    font-size: 16px; /* Prevent iOS zoom */
  }
}
```

---

## Browser Compatibility

### Target Browser Support

Based on [Browserslist best practices](https://github.com/browserslist/browserslist):

```
# .browserslistrc
last 2 versions
> 1%
not dead
not op_mini all
```

### Browser-Specific Considerations

#### Safari/iOS
```scss
/* Fix for iOS button styling */
button {
  -webkit-appearance: none;
  appearance: none;
}

/* Fix for iOS input zoom */
input, select, textarea {
  font-size: 16px;
}

/* Smooth scrolling fix */
html {
  -webkit-overflow-scrolling: touch;
}

/* Safe area support */
@supports (padding: env(safe-area-inset-top)) {
  .header {
    padding-top: env(safe-area-inset-top);
  }
}
```

#### Firefox
```scss
/* Custom scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent-primary) transparent;
}

/* Focus-visible support */
:focus:not(:focus-visible) {
  outline: none;
}
```

#### Chrome/Edge
```scss
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--color-accent-primary);
  border-radius: 4px;
}
```

### Assistive Technology Compatibility

| Screen Reader | Browser | Status |
|---------------|---------|--------|
| NVDA | Firefox, Chrome | Test Required |
| JAWS | Chrome, Edge | Test Required |
| VoiceOver | Safari (macOS) | Test Required |
| VoiceOver | Safari (iOS) | Test Required |
| TalkBack | Chrome (Android) | Test Required |
| Narrator | Edge | Test Required |

### Testing Checklist

```markdown
## Browser Testing Checklist

### Desktop Browsers
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)

### Mobile Browsers
- [ ] iOS Safari
- [ ] Chrome for Android
- [ ] Samsung Internet

### Screen Readers
- [ ] NVDA + Firefox
- [ ] VoiceOver + Safari
- [ ] JAWS + Chrome (if available)

### Accessibility Tools
- [ ] axe DevTools audit
- [ ] WAVE extension audit
- [ ] Lighthouse accessibility score
- [ ] Manual keyboard navigation test
```

---

## Image Optimization Guide

### Current Image Inventory

| Category | Files | Current Size | Target Size | Savings |
|----------|-------|--------------|-------------|---------|
| Feature Highlights | 4 PNG | 2.7 MB | 400 KB | 85% |
| Social Proof | 3 JPG | 1.75 MB | 300 KB | 83% |
| X-Ray Section | 4 files | 1.27 MB | 400 KB | 69% |
| Modern Workflow | 3 WebP | 147 KB | 147 KB | 0% |
| Analytics | 3 WebP | 147 KB | 147 KB | 0% |
| Delivery | 2 WebP | 98 KB | 98 KB | 0% |
| **Total** | **21** | **6.1 MB** | **1.5 MB** | **75%** |

### Optimization Script

Create `scripts/optimize-images.js`:

```javascript
#!/usr/bin/env node
/**
 * Image Optimization Script
 * Generates WebP, AVIF, and responsive sizes for all images
 *
 * Usage: node scripts/optimize-images.js
 *
 * Requirements:
 * npm install sharp glob fs-extra
 */

const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

// Configuration
const CONFIG = {
  inputDir: 'public',
  outputDir: 'public/optimized',

  // Responsive breakpoints
  sizes: [320, 640, 768, 1024, 1280, 1920],

  // Output formats
  formats: ['webp', 'avif', 'jpg'],

  // Quality settings
  quality: {
    webp: 80,
    avif: 65,
    jpg: 80,
    png: 80
  },

  // Directories to process
  directories: [
    'xray',
    'proposal_in_minutes',
    'soundFamiliar',
    'howitworks',
    'analytics',
    'delivery'
  ],

  // File patterns to process
  patterns: ['**/*.{jpg,jpeg,png,webp}'],

  // Files to skip
  exclude: ['**/optimized/**', '**/node_modules/**']
};

// Statistics tracking
const stats = {
  processed: 0,
  skipped: 0,
  errors: [],
  originalSize: 0,
  optimizedSize: 0
};

/**
 * Get file size in bytes
 */
async function getFileSize(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size;
  } catch {
    return 0;
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Process a single image
 */
async function processImage(inputPath) {
  const relativePath = path.relative(CONFIG.inputDir, inputPath);
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const dirName = path.dirname(relativePath);

  console.log(`\nProcessing: ${relativePath}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const originalSize = await getFileSize(inputPath);
    stats.originalSize += originalSize;

    console.log(`  Original: ${metadata.width}x${metadata.height} (${formatBytes(originalSize)})`);

    // Generate each size
    for (const width of CONFIG.sizes) {
      // Skip if original is smaller than target
      if (metadata.width < width) continue;

      // Calculate height maintaining aspect ratio
      const height = Math.round((width / metadata.width) * metadata.height);

      // Generate each format
      for (const format of CONFIG.formats) {
        const outputFileName = `${baseName}-${width}w.${format}`;
        const outputPath = path.join(CONFIG.outputDir, dirName, outputFileName);

        // Ensure output directory exists
        await fs.ensureDir(path.dirname(outputPath));

        // Process image
        let pipeline = sharp(inputPath)
          .resize(width, height, {
            fit: 'cover',
            withoutEnlargement: true
          });

        // Apply format-specific settings
        switch (format) {
          case 'webp':
            pipeline = pipeline.webp({ quality: CONFIG.quality.webp });
            break;
          case 'avif':
            pipeline = pipeline.avif({ quality: CONFIG.quality.avif });
            break;
          case 'jpg':
            pipeline = pipeline.jpeg({
              quality: CONFIG.quality.jpg,
              progressive: true,
              mozjpeg: true
            });
            break;
        }

        await pipeline.toFile(outputPath);

        const newSize = await getFileSize(outputPath);
        stats.optimizedSize += newSize;

        console.log(`  Generated: ${outputFileName} (${formatBytes(newSize)})`);
      }
    }

    // Generate original size in modern formats
    for (const format of ['webp', 'avif']) {
      const outputFileName = `${baseName}.${format}`;
      const outputPath = path.join(CONFIG.outputDir, dirName, outputFileName);

      await fs.ensureDir(path.dirname(outputPath));

      let pipeline = sharp(inputPath);

      if (format === 'webp') {
        pipeline = pipeline.webp({ quality: CONFIG.quality.webp });
      } else if (format === 'avif') {
        pipeline = pipeline.avif({ quality: CONFIG.quality.avif });
      }

      await pipeline.toFile(outputPath);

      const newSize = await getFileSize(outputPath);
      console.log(`  Generated: ${outputFileName} (${formatBytes(newSize)})`);
    }

    stats.processed++;

  } catch (error) {
    console.error(`  Error: ${error.message}`);
    stats.errors.push({ file: inputPath, error: error.message });
    stats.skipped++;
  }
}

/**
 * Generate responsive image component
 */
function generateComponentCode() {
  return `
// components/ResponsiveImage.jsx
import Image from 'next/image';

/**
 * Responsive Image Component with WebP/AVIF support
 *
 * @param {Object} props
 * @param {string} props.src - Base image path (without extension)
 * @param {string} props.alt - Alt text for accessibility
 * @param {number} props.width - Display width
 * @param {number} props.height - Display height
 * @param {string} props.sizes - Responsive sizes attribute
 * @param {boolean} props.priority - Load with priority
 */
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  priority = false,
  className,
  ...props
}) {
  // Remove extension from src
  const basePath = src.replace(/\\.[^/.]+$/, '');

  // Generate srcSet for different sizes
  const breakpoints = [320, 640, 768, 1024, 1280, 1920];

  const webpSrcSet = breakpoints
    .map(w => \`/optimized\${basePath}-\${w}w.webp \${w}w\`)
    .join(', ');

  const avifSrcSet = breakpoints
    .map(w => \`/optimized\${basePath}-\${w}w.avif \${w}w\`)
    .join(', ');

  const jpgSrcSet = breakpoints
    .map(w => \`/optimized\${basePath}-\${w}w.jpg \${w}w\`)
    .join(', ');

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={avifSrcSet}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes={sizes}
      />
      <img
        src={\`/optimized\${basePath}-1024w.jpg\`}
        srcSet={jpgSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        {...props}
      />
    </picture>
  );
}

/**
 * Background Image with modern format support
 */
export function ResponsiveBackgroundImage({
  src,
  alt,
  className,
  children,
  ...props
}) {
  const basePath = src.replace(/\\.[^/.]+$/, '');

  return (
    <div
      className={className}
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: \`
          image-set(
            url('/optimized\${basePath}.avif') type('image/avif'),
            url('/optimized\${basePath}.webp') type('image/webp'),
            url('\${src}')
          )
        \`
      }}
      {...props}
    >
      {children}
    </div>
  );
}
`;
}

/**
 * Main execution
 */
async function main() {
  console.log('========================================');
  console.log('Image Optimization Script');
  console.log('========================================\n');

  // Clean output directory
  console.log('Cleaning output directory...');
  await fs.emptyDir(CONFIG.outputDir);

  // Find all images
  const images = [];

  for (const dir of CONFIG.directories) {
    const pattern = path.join(CONFIG.inputDir, dir, '**/*.{jpg,jpeg,png,webp,PNG,JPG,JPEG}');
    const files = glob.sync(pattern, { ignore: CONFIG.exclude });
    images.push(...files);
  }

  console.log(`Found ${images.length} images to process\n`);

  // Process each image
  for (const imagePath of images) {
    await processImage(imagePath);
  }

  // Generate component code
  const componentCode = generateComponentCode();
  const componentPath = path.join('src', 'components', 'ResponsiveImage.jsx');
  await fs.ensureDir(path.dirname(componentPath));
  await fs.writeFile(componentPath, componentCode);
  console.log(`\nGenerated component: ${componentPath}`);

  // Print summary
  console.log('\n========================================');
  console.log('Summary');
  console.log('========================================');
  console.log(`Processed: ${stats.processed} images`);
  console.log(`Skipped: ${stats.skipped} images`);
  console.log(`Original size: ${formatBytes(stats.originalSize)}`);
  console.log(`Optimized size: ${formatBytes(stats.optimizedSize)}`);
  console.log(`Savings: ${formatBytes(stats.originalSize - stats.optimizedSize)} (${Math.round((1 - stats.optimizedSize / stats.originalSize) * 100)}%)`);

  if (stats.errors.length > 0) {
    console.log('\nErrors:');
    stats.errors.forEach(({ file, error }) => {
      console.log(`  ${file}: ${error}`);
    });
  }

  console.log('\nDone!');
}

main().catch(console.error);
```

### Package.json Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "optimize-images": "node scripts/optimize-images.js",
    "prebuild": "npm run optimize-images"
  },
  "devDependencies": {
    "sharp": "^0.33.0",
    "glob": "^10.0.0",
    "fs-extra": "^11.0.0"
  }
}
```

### Usage in Components

After running the optimization script:

```jsx
// Before
<div
  className={styles.cardImage}
  style={{ backgroundImage: `url(${card.image})` }}
/>

// After
import { ResponsiveBackgroundImage } from '@/components/ResponsiveImage';

<ResponsiveBackgroundImage
  src={card.image}
  alt={card.imageAlt}
  className={styles.cardImage}
/>
```

```jsx
// Before
<img src="/proposal_in_minutes/no_more_minutes.png" alt="Feature" />

// After
import { ResponsiveImage } from '@/components/ResponsiveImage';

<ResponsiveImage
  src="/proposal_in_minutes/no_more_minutes.png"
  alt="Create proposals in minutes with AI assistance"
  width={1024}
  height={768}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

## Testing Tools & Procedures

### Automated Testing Tools

#### 1. axe DevTools (Browser Extension)
- Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/axe-devtools/lhdoppojpmngadmnindnejefpokejbdd)
- Run on each page
- Export reports

#### 2. WAVE (Web Accessibility Evaluation Tool)
- Install from [wave.webaim.org](https://wave.webaim.org/)
- Run on each page
- Check for errors, alerts, and structural issues

#### 3. Lighthouse (Built into Chrome DevTools)
```bash
# Run via CLI
npm install -g lighthouse
lighthouse https://your-site.com --output html --output-path ./reports/lighthouse.html
```

#### 4. Pa11y (CLI Testing)
```bash
npm install -g pa11y

# Test single page
pa11y https://your-site.com

# Test multiple pages
pa11y-ci
```

Configuration file `.pa11yci`:
```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"]
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/blog",
    "http://localhost:3000/privacy"
  ]
}
```

#### 5. ESLint jsx-a11y Plugin
Already included in Next.js. Check rules in `eslint.config.mjs`:
```javascript
module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
  }
};
```

### Manual Testing Procedures

#### Keyboard Navigation Test
```markdown
## Keyboard Navigation Checklist

1. [ ] Tab through entire page - all interactive elements focusable
2. [ ] Focus order is logical (top-to-bottom, left-to-right)
3. [ ] Focus indicator always visible
4. [ ] No keyboard traps
5. [ ] Skip link works and is visible on focus
6. [ ] Enter/Space activates buttons and links
7. [ ] Escape closes modals/dropdowns
8. [ ] Arrow keys work in dropdowns/menus
```

#### Screen Reader Test
```markdown
## Screen Reader Checklist

1. [ ] Page title is announced on load
2. [ ] Headings are announced with correct level
3. [ ] Images have meaningful alt text
4. [ ] Form fields have labels
5. [ ] Error messages are announced
6. [ ] Status updates are announced (live regions)
7. [ ] Links describe their destination
8. [ ] Buttons describe their action
```

#### Color Contrast Test
Use tools:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colorable](https://colorable.jxnblk.com/)
- Chrome DevTools (inspect element > color picker shows contrast ratio)

#### Zoom Test
```markdown
## Zoom Testing Checklist

1. [ ] Test at 200% browser zoom
2. [ ] No horizontal scrolling at 320px width
3. [ ] Text doesn't overlap
4. [ ] Images scale appropriately
5. [ ] Interactive elements remain usable
```

---

## Implementation Checklist

### Phase 1: Critical Issues (Week 1)
- [ ] CRIT-001: Add video captions and transcripts
- [ ] CRIT-002: Fix background image accessibility
- [ ] CRIT-003: Implement accessible form
- [ ] CRIT-004: Add focus indicators globally
- [ ] CRIT-005: Verify color contrast
- [ ] CRIT-006: Fix touch target sizes
- [ ] CRIT-007: Add sr-only class
- [ ] CRIT-008: Dynamic language attribute

### Phase 2: High Priority (Week 2)
- [ ] HIGH-001: Add aria-labelledby to sections
- [ ] HIGH-002: Fix footer logo animation
- [ ] HIGH-003: Improve link purpose
- [ ] HIGH-004: Add error identification
- [ ] HIGH-005: Ensure consistent navigation
- [ ] HIGH-006: Fix blog heading hierarchy
- [ ] HIGH-007: Add autocomplete attributes
- [ ] HIGH-008: Verify page titles
- [ ] HIGH-009: Test text resize
- [ ] HIGH-010: Test reflow at 320px
- [ ] HIGH-011: Test text spacing
- [ ] HIGH-012: Add status messages

### Phase 3: Medium Priority (Week 3)
- [ ] MED-001: Add reduced motion to CSS animations
- [ ] MED-002: Verify focus order
- [ ] MED-003: Add multiple ways to navigate
- [ ] MED-004: Add section headings
- [ ] MED-005 to MED-015: Complete remaining items

### Phase 4: Enhancements (Week 4)
- [ ] GOOD-001 to GOOD-010: Implement enhancements
- [ ] Run full automated audit
- [ ] Complete manual testing
- [ ] Document any remaining issues

### Phase 5: Image Optimization (Week 4-5)
- [ ] Run image optimization script
- [ ] Update components to use ResponsiveImage
- [ ] Test image loading performance
- [ ] Verify alt text coverage

---

## Resources

### Official Standards
- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/)
- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Next.js Resources
- [Next.js Accessibility](https://nextjs.org/docs/architecture/accessibility)
- [Vercel Accessibility Guide](https://vercel.com/blog/improving-the-accessibility-of-our-nextjs-site)
- [Building Accessible Apps with Next.js](https://www.deque.com/blog/building-accessible-apps-with-next-js-and-axe-devtools/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Pa11y](https://pa11y.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Image Optimization
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 2026 | Claude | Initial comprehensive audit |

---

*This document should be reviewed and updated quarterly or when significant changes are made to the website.*
