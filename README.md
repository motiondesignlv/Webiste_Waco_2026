# MonoWaco marketing site (Next.js + Sass)

- Next.js (App Router, JavaScript) with Sass design system and layered atomic structure (atoms, molecules, organisms, templates).
- Bilingual content (English/Spanish) pulled from `src/messages/en.js` and `src/messages/es.js`; language auto-detects from `Accept-Language` with a client switcher that writes a `lang` cookie.
- CTA email capture hits `/api/subscribe` and integrates with SendGrid when env vars are present; falls back to local success in dev if missing.

## Project layout
- `src/app` – App Router entry, global styles, API routes.
- `src/lib` – utilities (`i18n`, class name helper).
- `src/messages` – EN/ES dictionaries fed into components.
- `src/styles` – Sass tokens and mixins (design primitives).
- `src/ui/atoms|molecules|organisms|templates` – reusable UI layers for the landing page.

## Setup
```bash
npm install
npm run dev
```

## SendGrid configuration
Create a `.env.local` with:
```
SENDGRID_API_KEY=your-key
SENDGRID_FROM_EMAIL=from@example.com
SENDGRID_TO_EMAIL=leads@example.com
```
Without these, `/api/subscribe` returns success locally without sending email.

## Scripts
- `npm run dev` – start the dev server.
- `npm run build` – production build.
- `npm run start` – run the built app.
- `npm run lint` – ESLint (App Router defaults).

## Notes
- Default metadata is EN; the UI content respects the selected locale via cookie or browser language.
- Design tokens live in `src/styles/_tokens.scss`; tweak colors/spacing there to update the theme globally.
