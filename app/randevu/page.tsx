import { Metadata } from "next";
import { BookingClient } from "./booking-client";

export const metadata: Metadata = {
  title: "Randevu Al | Halil Çetin",
  description: "Ücretsiz saç analizi ve ön görüşme için online randevunuzu hemen oluşturun.",
};

export default function RandevuPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl mb-4">Randevu Alın</h1>
          <p className="text-muted max-w-xl mx-auto">
            Aşağıdaki takvimden size en uygun gün ve saati seçerek ücretsiz saç analizi ve planlama görüşmesi için yerinizi ayırtın.
          </p>
        </div>
        
        <div className="bg-card border border-line rounded-3xl p-6 md:p-10 shadow-2xl">
          <BookingClient />
        </div>
      </div>
    </div>
  );
}
