import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yönetim Paneli",
};

export default function YonetimRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
