# Google Analytics & A/B Testing Guide

Complete guide for tracking user behavior and running experiments on your Waco3 marketing site.

## Table of Contents

- [Setup](#setup)
- [Event Tracking](#event-tracking)
- [A/B Testing](#ab-testing)
- [Deployment](#deployment)
- [Viewing Analytics](#viewing-analytics)
- [Best Practices](#best-practices)

---

## Setup

### 1. Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Admin" (gear icon in bottom left)
3. Click "Create Property"
4. Fill in property details:
   - Property name: "Waco3 Marketing Site"
   - Time zone: Your local time zone
   - Currency: USD
5. Click "Next" and follow the setup wizard
6. Under "Data Streams", click "Add stream" → "Web"
7. Enter your website URL
8. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

1. Copy the environment variables template:

   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and add your Measurement ID:

   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. For production deployment, set the environment variable on your hosting platform

### 3. Build and Deploy

```bash
# Build static export
npm run build

# The output will be in the 'out/' directory
# Upload the contents of 'out/' to your web server
```

---

## Event Tracking

### Automatic Tracking

The following events are tracked automatically:

**Button Clicks**: All `Button` components automatically track:

- `button_label`: The text on the button
- `button_category`: Custom category (e.g., "hero_cta", "footer_navigation")
- `button_destination`: Where the button leads
- `button_variant`: Button style (primary, secondary)

**Link Clicks**: Footer and navigation links track:

- `link_text`: The link text
- `link_url`: Destination URL
- `link_category`: Link category (e.g., "footer_navigation", "footer_legal")

**Form Submissions**: Waitlist form tracks:

- `form_name`: "waitlist"
- `success`: true/false
- `error_message`: Error details if failed

### Manual Tracking

Add custom tracking to any component:

```javascript
import { trackEvent, trackButtonClick, trackLinkClick } from "@/lib/analytics";

// Track custom event
trackEvent("video_play", {
  video_title: "Product Demo",
  video_duration: 120,
});

// Track button click manually
trackButtonClick("Download PDF", {
  category: "resources",
  destination: "/downloads/brochure.pdf",
});

// Track link click
trackLinkClick("Learn More", "/about", "content_link");
```

### Available Tracking Functions

| Function                                    | Parameters                                | Description                 |
| ------------------------------------------- | ----------------------------------------- | --------------------------- |
| `trackEvent(name, params)`                  | Event name, custom parameters object      | Track any custom event      |
| `trackButtonClick(label, options)`          | Button text, options object               | Track button interactions   |
| `trackLinkClick(text, url, category)`       | Link text, URL, category                  | Track link clicks           |
| `trackFormSubmit(formName, success, error)` | Form name, success boolean, error message | Track form submissions      |
| `trackPageView(title, path)`                | Page title, page path                     | Track page views (for SPAs) |
| `setUserProperty(name, value)`              | Property name, value                      | Set custom user properties  |

---

## A/B Testing

### How It Works

A/B testing uses **localStorage** to assign and persist variants:

- Variants are assigned randomly on first visit
- Assignments persist until browser cache is cleared
- All experiments are tracked as GA4 user properties
- View results in GA4 by filtering on experiment dimensions

### Running an Experiment

#### 1. Import the Hook

```javascript
import useABTest from "@/hooks/useABTest";
```

#### 2. Use in Your Component

```javascript
export default function MyComponent() {
  // Basic 50/50 split
  const variant = useABTest("hero_copy", ["control", "variant_a"]);

  return (
    <h1>
      {variant === "control"
        ? "Original Headline"
        : "New Experimental Headline"}
    </h1>
  );
}
```

#### 3. Weighted Distribution

```javascript
// 70% control, 30% variant_a
const variant = useABTest("pricing_layout", ["control", "variant_a"], {
  weights: [70, 30],
});
```

#### 4. Multiple Variants

```javascript
// Test 3 different versions
const variant = useABTest("cta_button_text", [
  "control",
  "variant_a",
  "variant_b",
]);

const buttonText = {
  control: "Join Waitlist",
  variant_a: "Get Early Access",
  variant_b: "Claim Your Spot",
}[variant];
```

### Managing Experiments

**View Active Experiments** (Browser Console):

```javascript
// Import function in a client component and call
import { getActiveExperiments } from "@/lib/abtest";
console.log(getActiveExperiments());
```

**Clear Specific Experiment**:

```javascript
import { clearVariant } from "@/lib/abtest";
clearVariant("hero_copy");
```

**Clear All Experiments**:

```javascript
import { clearAllVariants } from "@/lib/abtest";
clearAllVariants();
```

---

## Deployment

### Static Export Process

1. **Set Environment Variables**

   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **Build Static Files**

   ```bash
   npm run build
   ```

   This generates static HTML/CSS/JS in the `out/` directory.

3. **Test Locally**

   ```bash
   npx serve out
   # Or use Python
   python3 -m http.server 8000 --directory out
   ```

4. **Deploy to Your Server**
   Upload the contents of the `out/` directory to your web server. Works with:
   - Traditional web hosting (cPanel, FTP)
   - Netlify (drag and drop or Git deploy)
   - AWS S3 + CloudFront
   - GitHub Pages
   - Any static hosting service

---

## Viewing Analytics

### Real-Time Reports

1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to **Reports** → **Realtime**
3. Click buttons on your site
4. See events appear within 10-30 seconds

### Event Reports

1. **Reports** → **Engagement** → **Events**
2. View all tracked events:
   - `button_click`
   - `link_click`
   - `form_submit`
   - `experiment_view`
3. Click any event to see parameters

### A/B Test Results

1. **Reports** → **Engagement** → **Events**
2. Filter by event: `experiment_view`
3. Add secondary dimension: `variant_name`
4. View distribution of users across variants
5. Compare conversion rates by variant

### Custom Reports

Create custom explorations:

1. **Explore** → **Blank**
2. Add dimensions:
   - User property: `experiment_hero_copy` (or your experiment name)
   - Event name
3. Add metrics:
   - Event count
   - Conversions
   - Engagement rate

---

## Best Practices

### Event Naming

- Use lowercase with underscores: `button_click`, `video_play`
- Be specific but consistent: `hero_cta_click` vs. `footer_cta_click`
- Avoid PII (Personally Identifiable Information)

### A/B Testing

- **Sample Size**: Run experiments for at least 1-2 weeks
- **Statistical Significance**: Need ~100+ conversions per variant
- **Single Variable**: Test one change at a time
- **Clear Hypothesis**: Know what you're testing and why

### Performance

- All tracking is asynchronous and won't block page load
- Events are batched and sent in the background
- localStorage is faster than cookies and has no size limits

### Privacy

- GA4 is configured with `anonymize_ip: true`
- localStorage doesn't track across domains (privacy-friendly)
- No cookie consent banner required for localStorage-based A/B tests

### Debugging

Test in development:

```bash
npm run dev
```

Check browser console:

```javascript
// Verify gtag loaded
console.log(window.gtag);

// View pending events
console.log(window.dataLayer);

// Check localStorage
console.log(localStorage.getItem("waco3_experiment_hero_copy"));
```

Enable GA4 DebugView:

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) Chrome extension
2. Go to GA4 → **Admin** → **DebugView**
3. See events in real-time with full parameters

---

## Troubleshooting

**Events not appearing in GA4?**

- Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
- Verify you're viewing the correct GA4 property
- Wait 24-48 hours for data to populate in standard reports (use Realtime for immediate feedback)
- Check browser console for errors

**A/B test not working?**

- Check browser console for localStorage
- Try incognito mode to test fresh assignment
- Verify the hook is called in a client component (`'use client'`)

**Build failing?**

- Make sure `output: 'export'` is in `next.config.mjs`
- Check that all images use `next/image` with `unoptimized: true`
- Verify no server-side only features are used

---

## Support

For issues or questions:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [GA4 documentation](https://support.google.com/analytics/answer/9304153)
3. Check browser console for error messages
