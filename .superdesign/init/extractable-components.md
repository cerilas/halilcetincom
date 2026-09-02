# Extractable components

## Header
- Source: `components/layout/header.tsx`
- Category: layout
- Description: Fixed glass header with gold-dot wordmark, pill nav, Analiz CTA
- Extractable props: activeItem (string, default: "home")
- Hardcoded: labels (Tedaviler, Süreç, Sonuçlar, Klinik, İletişim, Analiz), gold dot mark, all CSS

## Footer
- Source: `components/layout/footer.tsx`
- Category: layout
- Description: 4-col footer with tagline, nav, NAP, admin link
- Extractable props: none required for drafts (content is brand-static for design)
- Hardcoded: clinic name, tagline, links, NAP, all CSS

## PinCard
- Source: `components/ui/pin-card.tsx`
- Category: basic
- Description: 3D tilt treatment card — skip extraction (basic)

## MagneticButton
- Source: `components/react-bits/magnetic-button.tsx`
- Category: basic
- Description: Pill CTA — skip extraction (basic)
