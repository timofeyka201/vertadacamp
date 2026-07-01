import type { Metadata } from "next";
import { Oswald, Manrope } from "next/font/google";
import "./globals.css";

const heading = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://vertadacamp.ru";
const SITE_TITLE = "VertadaCamp — кэмперы-прицепы | Твоя свобода путешествовать";
const SITE_DESCRIPTION =
  "VertadaCamp — производитель кэмперов-прицепов. Эконом, Базовая и Комфорт комплектации. Надёжная конструкция, продуманная эргономика, уют в дороге.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "кэмпер прицеп",
    "кэмпер-прицеп купить",
    "дом на колёсах прицеп",
    "прицеп для путешествий",
    "автодом прицеп",
    "VertadaCamp",
  ],
  authors: [{ name: "VertadaCamp" }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "VertadaCamp",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1920,
        height: 1080,
        alt: "Кэмпер-прицеп VertadaCamp в путешествии",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/hero.jpg"],
  },
  verification: {
    yandex: "ee6f0c1f0d732a3f",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
