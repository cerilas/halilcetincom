import type { SiteContent } from "@/lib/types";
import { siteUrl } from "@/lib/utils";

export function clinicJsonLd(content: SiteContent) {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: content.clinic.legalName,
    url,
    telephone: content.clinic.phone,
    email: content.clinic.email,
    image: `${url}/og.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: content.clinic.address,
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
    openingHours: "Mo-Sa 09:00-19:00",
    medicalSpecialty: "https://schema.org/PlasticSurgery",
    founder: {
      "@type": "Physician",
      name: content.clinic.doctorName,
      jobTitle: content.clinic.doctorTitle,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: String(content.testimonials.length),
    },
  };
}

export function faqJsonLd(content: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
