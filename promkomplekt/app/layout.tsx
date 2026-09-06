import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promkomplekt.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ПромКомплект — Запасные части для промышленного оборудования",
    template: "%s | ПромКомплект",
  },
  description:
    "Поставки запасных частей и комплектующих для промышленного оборудования. Широкий каталог: подшипники, редукторы, гидравлика, электрооборудование. Оперативная доставка по Казахстану.",
  keywords: ["запасные части", "промышленное оборудование", "комплектующие", "подшипники", "редукторы", "гидравлика", "Казахстан"],
  openGraph: { type: "website", locale: "ru_KZ", siteName: "ПромКомплект" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-steel-900 text-white font-inter antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ПромКомплект",
              url: siteUrl,
              telephone: "+7-727-200-11-22",
              email: "info@promkomplekt.kz",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Промышленная, 14А",
                addressLocality: "Алматы",
                addressCountry: "KZ",
              },
            }),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
