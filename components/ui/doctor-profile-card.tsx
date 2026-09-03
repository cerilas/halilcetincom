"use client";

import { useRouter } from "next/navigation";
import { ProfileCard } from "@/components/ui/profile-card";

export function DoctorProfileCard() {
  const router = useRouter();

  return (
    <ProfileCard
      avatarUrl="/halil-cetin-hair-transplant-doktor.jpg"
      name="Saç Ekim Uzmanı Halil Çetin"
      title="Saç Ekimi ve Medikal Estetik"
      handle="Saç Ekim Uzmanı"
      status="İstanbul"
      contactText="İletişim"
      showUserInfo
      enableTilt={true}
      enableMobileTilt
      onContactClick={() => router.push("/iletisim")}
      iconUrl="/assets/demo/iconpattern.png"
      behindGlowEnabled
      behindGlowColor="rgba(125, 190, 255, 0.67)"
      innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
    />
  );
}
