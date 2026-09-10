import { Metadata } from "next";
import { BookingClient } from "./booking-client";

export const metadata: Metadata = {
  title: "Randevu Al | Halil Çetin",
  description: "Ücretsiz saç analizi ve ön görüşme için online randevunuzu hemen oluşturun.",
};

import { getContent } from "@/lib/content";

export default async function RandevuPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const content = await getContent(params.lang);

  return (
    <div className="min-h-screen pt-32 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl mb-4">{content.ui.booking.title}</h1>
          <p className="text-muted max-w-xl mx-auto">
            {content.ui.booking.description}
          </p>
        </div>
        
        <div className="bg-card border border-line rounded-3xl p-6 md:p-10 shadow-2xl">
          <BookingClient content={content} />
        </div>
      </div>
    </div>
  );
}
