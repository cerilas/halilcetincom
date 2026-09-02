# Page dependency trees

## /
Entry: `app/page.tsx`
Dependencies:
- `components/layout/site-shell.tsx`
  - `components/ui/scroll-progress.tsx`
  - `components/layout/header.tsx`
    - `lib/utils.ts`
  - `components/layout/footer.tsx`
- `components/sections/home-view.tsx`
  - `components/ui/spotlight.tsx`
  - `components/ui/hero-field.tsx`
  - `components/ui/marquee.tsx`
  - `components/ui/number-ticker.tsx`
  - `components/ui/border-beam.tsx`
  - `components/ui/pin-card.tsx`
  - `components/react-bits/magnetic-button.tsx`
  - `components/react-bits/split-text.tsx`
  - `components/ui/faq-list.tsx`
  - `components/sections/process-rail.tsx`
- `lib/content.ts`
- `lib/seo.tsx`
- `app/globals.css`

## /tedaviler
Entry: `app/tedaviler/page.tsx`
Dependencies:
- `components/layout/site-shell.tsx` (same shell)
- `components/ui/pin-card.tsx`

## /tedaviler/[slug]
Entry: `app/tedaviler/[slug]/page.tsx`
Dependencies:
- `components/layout/site-shell.tsx`
- `components/react-bits/magnetic-button.tsx`

## /surec
Entry: `app/surec/page.tsx`
Dependencies:
- `components/layout/site-shell.tsx`
- `components/sections/process-rail.tsx`

## /sonuclar
Entry: `app/sonuclar/page.tsx`
Dependencies:
- `components/layout/site-shell.tsx`

## /hakkimizda
Entry: `app/hakkimizda/page.tsx`
Dependencies:
- `components/layout/site-shell.tsx`
- `lib/seo.tsx`

## /iletisim
Entry: `app/iletisim/page.tsx`
Dependencies:
- `components/layout/site-shell.tsx`
- `components/sections/contact-form.tsx`
  - `components/react-bits/magnetic-button.tsx`

## /admin
Entry: `app/admin/page.tsx`
Dependencies:
- `app/admin/layout.tsx`
- `components/admin/admin-desk.tsx`
