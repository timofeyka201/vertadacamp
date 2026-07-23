import type { Metadata } from "next";
import { Oswald, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { YANDEX_METRIKA_ID } from "@/lib/metrika";

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
const SITE_TITLE =
  "VertadaCamp — автодома-прицепы (кэмперы) от производителя в Йошкар-Оле";
const SITE_DESCRIPTION =
  "VertadaCamp — завод-производитель автодомов-прицепов (кэмперов) в Йошкар-Оле (Республика Марий Эл). Продажа и доставка по ПФО и всей России напрямую, без посредников. Эконом, Базовая и Комфорт комплектации.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "автодом прицеп",
    "кэмпер прицеп",
    "прицеп автодом",
    "прицеп-кэмпер",
    "автодом прицеп купить",
    "кэмпер-прицеп купить",
    "производитель автодомов-прицепов",
    "производитель кэмперов-прицепов",
    "завод автодомов Йошкар-Ола",
    "завод кэмперов Йошкар-Ола",
    "автодом на колёсах",
    "прицепы для путешествий ПФО",
    "дом на колёсах прицеп",
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
        alt: "Автодом-прицеп VertadaCamp в путешествии",
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
  other: {
    "geo.region": "RU-ME",
    "geo.placename": "Йошкар-Ола",
    "geo.position": "56.6383;47.8917",
    ICBM: "56.6383, 47.8917",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        {children}

        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

            ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
