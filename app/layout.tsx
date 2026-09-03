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
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
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
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SplashScreen />
          <CookieBanner />
          <AnalyticsTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
