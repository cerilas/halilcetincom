# Routes (Next.js App Router)

| Path | File | Layout | Summary |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | SiteShell | Landing: spotlight hero, treatments, stats, process rail, results, testimonials, FAQ, CTA |
| `/tedaviler` | `app/tedaviler/page.tsx` | SiteShell | Treatment card grid |
| `/tedaviler/[slug]` | `app/tedaviler/[slug]/page.tsx` | SiteShell | Treatment long-form + JSON-LD |
| `/surec` | `app/surec/page.tsx` | SiteShell | Scroll process rail |
| `/sonuclar` | `app/sonuclar/page.tsx` | SiteShell | Before/after placeholder grid |
| `/hakkimizda` | `app/hakkimizda/page.tsx` | SiteShell | Clinic/physician story |
| `/iletisim` | `app/iletisim/page.tsx` | SiteShell | NAP + contact form |
| `/admin/login` | `app/admin/login/page.tsx` | AdminLayout | Password form |
| `/admin` | `app/admin/page.tsx` | AdminLayout | JSON CMS editor |

Public pages wrap with `SiteShell` (ScrollProgress + Header + Footer). Admin is isolated, `noindex`.
