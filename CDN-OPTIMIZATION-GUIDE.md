# CDN & Performance Optimization Guide for Static Next.js Website

> **Goal:** Deploy a blazing-fast static website optimized for Google Ads campaigns with CDN delivery for images, videos, and static assets.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [CDN Options Comparison](#cdn-options-comparison)
3. [Recommended Solution](#recommended-solution)
4. [Image Optimization Strategy](#image-optimization-strategy)
5. [Video Hosting Options](#video-hosting-options)
6. [Cost Breakdown](#cost-breakdown)
7. [Setup Procedures](#setup-procedures)
8. [Google Ads Landing Page Optimization](#google-ads-landing-page-optimization)
9. [Sources](#sources)

---

## Executive Summary

For your use case (static Next.js site on DigitalOcean with existing Cloudflare/AWS/GCP accounts), the **recommended stack** is:

| Component | Solution | Cost |
|-----------|----------|------|
| **CDN** | Cloudflare (Free Tier) | **$0/month** |
| **Image Storage** | Cloudflare R2 | **$0** (under 10GB) |
| **Image Optimization** | next-image-export-optimizer (build-time) | **$0** |
| **Video Hosting** | Cloudflare Stream OR YouTube embeds | $5/mo or **$0** |
| **DDoS Protection** | Cloudflare (included) | **$0** |

**Total estimated cost: $0-5/month** for most small-to-medium websites.

---

## CDN Options Comparison

### 1. Cloudflare (Recommended - Free)

**Pros:**
- ✅ **Unlimited bandwidth** on free tier (no data transfer fees)
- ✅ 330+ global edge locations (fastest in ~48% of top networks)
- ✅ Free SSL/TLS certificates
- ✅ Built-in DDoS protection
- ✅ Easy DNS management
- ✅ No trial period - permanently free

**Cons:**
- ❌ Advanced image optimization requires Pro plan ($20/mo)
- ❌ Video streaming is a separate paid product (Cloudflare Stream)
- ❌ Free tier only has email support

**Best for:** Your use case - static websites with budget constraints.

---

### 2. AWS CloudFront

**Pros:**
- ✅ 450+ edge locations worldwide (most of any CDN)
- ✅ Deep AWS ecosystem integration (S3, Lambda@Edge)
- ✅ Advanced security (AWS Shield, WAF)
- ✅ Free tier: 1TB transfer/month for 12 months

**Cons:**
- ❌ Free tier expires after 12 months
- ❌ Complex pricing structure
- ❌ High egress fees after free tier (~$0.085/GB)
- ❌ Steep learning curve

**Pricing after free tier:**
- $0.085/GB for first 10TB
- $0.080/GB for 10-50TB

**Best for:** Organizations already invested in AWS ecosystem.

---

### 3. Google Cloud CDN

**Pros:**
- ✅ Deep integration with GCP services
- ✅ Google's global network infrastructure
- ✅ Good analytics

**Cons:**
- ❌ No free tier for CDN
- ❌ $0.08-0.15/GB egress fees
- ❌ More expensive than Cloudflare

**Best for:** Teams already using GCP extensively.

---

### 4. DigitalOcean Spaces CDN (Built-in)

**Pros:**
- ✅ Simple setup if already on DO
- ✅ $5/month includes 250GB storage + 1TB bandwidth

**Cons:**
- ❌ Not free
- ❌ Fewer edge locations than Cloudflare
- ❌ Less comprehensive than Cloudflare's free tier

---

## Recommended Solution

### Architecture

```
User Request
     │
     ▼
┌─────────────────┐
│   Cloudflare    │  ← Free CDN + SSL + DDoS
│   (DNS + CDN)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  DigitalOcean   │  ← Static HTML/CSS/JS
│  (App Platform) │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Cloudflare R2  │  ← Images & Large Assets
│  (Object Store) │     (Optional)
└─────────────────┘
```

### Why This Stack?

1. **Cloudflare Free Tier** gives you everything AWS charges for:
   - Unlimited bandwidth (CloudFront charges ~$0.085/GB)
   - Global CDN with 330+ PoPs
   - DDoS protection
   - Free SSL

2. **DigitalOcean App Platform** offers:
   - 3 free static sites
   - Built-in CI/CD from GitHub
   - Automatic HTTPS

3. **Cloudflare R2** (if needed for large assets):
   - 10GB free storage
   - **Zero egress fees** (this is huge!)
   - S3-compatible API

---

## Image Optimization Strategy

### Option 1: Build-Time Optimization (Recommended - Free)

Use **next-image-export-optimizer** to optimize images during the build process.

**Benefits:**
- Zero runtime costs
- All images pre-optimized as WebP
- Generates responsive srcset automatically
- Creates blur placeholders
- No external service dependencies

**Installation:**

```bash
npm install next-image-export-optimizer sharp
```

**Configuration (next.config.js):**

```javascript
module.exports = {
  output: "export",
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public/images",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: "75",
    nextImageExportOptimizer_storePicturesInWEBP: "true",
    nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
    nextImageExportOptimizer_generateAndUseBlurImages: "true",
  },
};
```

**Usage:**

```jsx
// Replace this:
import Image from "next/image";

// With this:
import ExportedImage from "next-image-export-optimizer";

<ExportedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority // For above-the-fold images
/>
```

---

### Option 2: Cloudinary (Free Tier Available)

**Free tier includes:**
- 25 monthly credits
- Automatic format conversion
- On-the-fly transformations
- Global CDN delivery

**Pricing:**
- Free: 25 credits/month
- Plus: $89/month for 225 credits

**Best for:** Dynamic image transformations, AI-powered features.

---

### Option 3: Cloudflare Images (Pay-as-you-go)

**Pricing:**
- Storage: $5/month per 100,000 images
- Delivery: $1 per 100,000 images served
- Transformations: $0.50 per 1,000 unique transforms

**Best for:** High-volume sites already on Cloudflare ecosystem.

---

## Video Hosting Options

### Option 1: Cloudflare Stream ($5/month)

**Pricing:**
- $5/month = 1,000 min storage + 5,000 min streaming
- $50/month = 10,000 min storage + 50,000 min streaming

**Features:**
- Adaptive bitrate streaming
- Global CDN delivery
- No buffering
- Analytics included

---

### Option 2: YouTube Embeds (Free)

**Pros:**
- Completely free
- Handles all transcoding
- Global delivery
- Built-in player

**Cons:**
- YouTube branding
- Ads may appear (unless YouTube Premium viewers)
- Less control over player

**Best practice:** Use `loading="lazy"` and `srcdoc` pattern for better performance:

```html
<iframe
  srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img{position:absolute;width:100%;top:0;bottom:0;margin:auto}</style><a href='https://www.youtube.com/embed/VIDEO_ID?autoplay=1'><img src='https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg'></a>"
  loading="lazy"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

---

### Option 3: AWS S3 + CloudFront

**Approximate costs for video:**
- S3 storage: $0.023/GB/month
- CloudFront delivery: $0.085/GB

**Example:** 10GB of video, 100GB monthly bandwidth = ~$9/month

---

## Cost Breakdown

### Scenario: Small Marketing Website

| Item | Free Option | Paid Option |
|------|-------------|-------------|
| CDN | Cloudflare Free ($0) | CloudFront (~$8.50/100GB) |
| Static Hosting | DO App Platform ($0) | DO Droplet ($4-6/mo) |
| Image Storage | R2 Free 10GB ($0) | R2 ($0.015/GB/mo) |
| Image Optimization | Build-time ($0) | Cloudinary ($89/mo) |
| Video | YouTube embeds ($0) | CF Stream ($5/mo) |
| SSL | Cloudflare ($0) | Let's Encrypt ($0) |
| **TOTAL** | **$0/month** | **$10-100/month** |

### Scenario: Medium Traffic (100K visitors/month)

Assuming:
- 50 page views per visitor avg
- 2MB average page weight
- 10TB monthly bandwidth

| Provider | Estimated Cost |
|----------|---------------|
| Cloudflare Free | **$0** |
| AWS CloudFront | ~$800/month |
| Google Cloud CDN | ~$1,000/month |

**Winner: Cloudflare (by far)**

---

## Setup Procedures

### Step 1: Configure Cloudflare (15 minutes)

1. **Sign up/Login** at [cloudflare.com](https://cloudflare.com)

2. **Add your domain:**
   - Click "Add a Site"
   - Enter your domain name
   - Select "Free" plan

3. **Update nameservers:**
   - Cloudflare will provide 2 nameservers
   - Go to your domain registrar
   - Replace existing nameservers with Cloudflare's

4. **Configure DNS:**
   ```
   Type: A
   Name: @
   Content: [Your DigitalOcean IP]
   Proxy: Enabled (orange cloud)
   ```

5. **Enable optimizations:**
   - Go to Speed → Optimization
   - Enable: Auto Minify (JS, CSS, HTML)
   - Enable: Brotli compression
   - Enable: Early Hints
   - Enable: Rocket Loader (test first)

6. **Configure caching:**
   - Go to Caching → Configuration
   - Set Browser Cache TTL: 1 year
   - Create Page Rules for static assets:
     ```
     URL: *yourdomain.com/static/*
     Setting: Cache Level → Cache Everything
     Edge Cache TTL: 1 month
     ```

---

### Step 2: Set Up Cloudflare R2 for Assets (Optional)

1. **Create R2 bucket:**
   - Go to R2 → Create bucket
   - Name: `your-site-assets`
   - Location: Automatic

2. **Enable public access:**
   - Settings → Public access → Allow Access

3. **Connect custom domain (optional):**
   - Settings → Custom domain
   - Add: `cdn.yourdomain.com`

4. **Upload assets:**
   ```bash
   # Install Wrangler CLI
   npm install -g wrangler

   # Login
   wrangler login

   # Upload files
   wrangler r2 object put your-site-assets/images/hero.webp --file=./public/images/hero.webp
   ```

---

### Step 3: Deploy to DigitalOcean App Platform

1. **Connect GitHub repo**

2. **Configure build:**
   ```yaml
   # app.yaml
   name: your-website
   static_sites:
     - name: web
       github:
         repo: your-username/your-repo
         branch: main
       build_command: npm run build
       output_dir: out
   ```

3. **Add environment variables if needed**

4. **Deploy**

---

### Step 4: Implement Build-Time Image Optimization

1. **Install dependencies:**
   ```bash
   npm install next-image-export-optimizer sharp
   ```

2. **Update next.config.js** (see Image Optimization section above)

3. **Update package.json:**
   ```json
   {
     "scripts": {
       "build": "next build && next-image-export-optimizer"
     }
   }
   ```

4. **Replace Image components:**
   ```jsx
   import ExportedImage from "next-image-export-optimizer";
   ```

5. **Organize images:**
   ```
   public/
     images/
       hero.jpg
       about.png
       ...
   ```

---

## Google Ads Landing Page Optimization

Google's Quality Score heavily impacts your CPC. Here's how to maximize it:

### Target Metrics

| Metric | Target | Impact |
|--------|--------|--------|
| Page Load Time | < 2-3 seconds | 53% users leave after 3s |
| LCP (Largest Contentful Paint) | < 2.5s | Core Web Vital |
| FID/INP (Interaction) | < 100ms | Core Web Vital |
| CLS (Layout Shift) | < 0.1 | Core Web Vital |
| Quality Score | 7+ | Lower CPC, better rank |

### Checklist for Ad Landing Pages

**Speed Optimizations:**
- [ ] Use CDN (Cloudflare) for all assets
- [ ] Compress images to WebP format
- [ ] Implement lazy loading for below-fold images
- [ ] Minify HTML, CSS, JavaScript
- [ ] Enable Brotli/Gzip compression
- [ ] Preload critical assets
- [ ] Use `font-display: swap` for web fonts

**Mobile Optimizations:**
- [ ] Responsive design (86% top pages are mobile-optimized)
- [ ] Touch-friendly buttons (min 48x48px)
- [ ] No horizontal scrolling
- [ ] Readable font sizes (min 16px)

**Content Optimizations:**
- [ ] Match landing page headline to ad copy
- [ ] Clear call-to-action above fold
- [ ] Fast, visible contact information
- [ ] No intrusive interstitials

**Technical Optimizations:**
```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
<link rel="preload" href="/images/hero.webp" as="image">

<!-- Preconnect to CDN -->
<link rel="preconnect" href="https://cdn.yourdomain.com">
<link rel="dns-prefetch" href="https://cdn.yourdomain.com">
```

### Create Multiple Landing Page Variations

For A/B testing with ads:

```
/landing/
  variation-a/  ← Original
  variation-b/  ← Different headline
  variation-c/  ← Different CTA
```

Each variation should be:
- Lightweight (< 500KB total page weight ideal)
- Fast loading (< 2s)
- Mobile-first

---

## Final Recommendation

**For your specific situation:**

1. **Use Cloudflare Free** for CDN + DNS + SSL + DDoS
2. **Use build-time image optimization** with next-image-export-optimizer
3. **Host videos on YouTube** (free) or Cloudflare Stream ($5/mo)
4. **Store large assets in Cloudflare R2** if needed (10GB free)
5. **Deploy to DigitalOcean App Platform** (3 free static sites)

**Total cost: $0-5/month** with enterprise-grade performance.

This setup will:
- Load pages in < 2 seconds globally
- Handle traffic spikes from ad campaigns
- Protect against DDoS attacks
- Score 90+ on PageSpeed Insights
- Improve Google Ads Quality Score

---

## Sources

- [Cloudflare vs CloudFront Comparison](https://www.cloudflare.com/cloudflare-vs-cloudfront/)
- [Top 9 CDN Providers in 2025](https://www.redswitches.com/blog/top-9-cdn-providers-in-2025/)
- [Cloudflare R2 Pricing](https://developers.cloudflare.com/r2/pricing/)
- [Cloudflare R2 Overview](https://www.cloudflare.com/developer-platform/products/r2/)
- [next-image-export-optimizer on npm](https://www.npmjs.com/package/next-image-export-optimizer)
- [next-image-export-optimizer GitHub](https://github.com/Niels-IO/next-image-export-optimizer)
- [Next.js Static Exports Guide](https://nextjs.org/docs/pages/guides/static-exports)
- [Next.js Image Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Cloudinary vs Cloudflare Comparison](https://cloudinary.com/guides/vs/cloudflare-vs-cloudinary)
- [Free Image CDNs Guide](https://theimagecdn.com/docs/free-image-cdns)
- [Cloudflare Stream Pricing](https://www.dacast.com/blog/cloudfront-vs-cloudflare-vs-akamai-cdn-for-live-video-streaming-delivery/)
- [AWS CloudFront Cost Optimization](https://repost.aws/questions/QUboIiK5SESA-G3ZjcmbRu7w/cost-optimization-strategies-for-cloudfront-in-video-streaming-setup)
- [Google Ads Landing Page Tips 2025](https://datastreetmarketing.com/google-ads-landing-page-tips-2025/)
- [Landing Page Experience Optimization](https://nitropack.io/blog/landing-page-experience-optimization/)
- [Google Ads Landing Page Help](https://support.google.com/google-ads/answer/7543502?hl=en)
- [DigitalOcean Cloudflare Setup Tutorial](https://www.digitalocean.com/community/tutorials/how-to-host-a-website-using-cloudflare-and-nginx-on-ubuntu-22-04)
- [R2 Image Hosting Guide 2025](https://dev.to/leonwong282/the-complete-beginners-guide-to-cloudflare-r2-image-hosting-2025-2g4k)
