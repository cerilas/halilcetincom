import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { getContent } from "@/lib/content";
import { siteUrl } from "@/lib/utils";
import { SplashScreen } from "@/components/ui/splash-screen";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const url = siteUrl();

  return {
    metadataBase: new URL(url),
    title: {
      default: content.seo.title,
      template: `%s | ${content.clinic.name}`,
    },
    description: content.seo.description,
    keywords: content.seo.keywords,
    authors: [{ name: content.clinic.doctorName }],
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: content.clinic.legalName,
      title: content.seo.title,
      description: content.seo.description,
      images: [
        {
          url: `${url}/sac-ekim-uzmani-halil-cetin-portre.jpg`,
          width: 1200,
          height: 630,
          alt: "Saç Ekim Uzmanı Halil Çetin",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: [`${url}/sac-ekim-uzmani-halil-cetin-portre.jpg`],
    },
    alternates: { canonical: url },
    verification: {
      google: "google-site-verification-id",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await getContent();
  const url = siteUrl();

  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "name": content.clinic.legalName,
        "image": `${url}/sac-ekim-uzmani-halil-cetin-portre.jpg`,
        "@id": `${url}/#clinic`,
        "url": url,
        "telephone": content.clinic.phone,
        "email": content.clinic.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Atay Plaza, Mücahitler Mah. 52062 Nolu Sk Bina No: 2, A Blok Kat: 8 Daire: 29",
          "addressLocality": "Şehitkamil",
          "addressRegion": "Gaziantep",
          "postalCode": "27090",
          "addressCountry": "TR"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      },
      {
        "@type": "Person",
        "name": "Halil Çetin",
        "jobTitle": "Saç Ekim Uzmanı",
        "url": url,
        "worksFor": {
          "@id": `${url}/#clinic`
        }
      }
    ]
  };

  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KMNBGHWJ"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KMNBGHWJ');
          `}
        </Script>
        
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SplashScreen />
          <CookieBanner />
          <AnalyticsTracker />
          {children}
          <a
            href={`https://wa.me/${content.clinic.whatsapp}?text=Merhaba,%20saç%20ekimi%20hakkında%20bilgi%20almak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl dark:shadow-black/50"
            aria-label="WhatsApp ile iletişime geçin"
          >
            <img 
              src="/whatsapp.png" 
              alt="WhatsApp" 
              width={32}
              height={32}
              loading="lazy"
              className="h-8 w-8 object-contain" 
            />
          </a>
          <Toaster position="top-center" richColors theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
