import { SiteProvider } from "@/components/SiteContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Catalog from "@/components/Catalog";
import Gallery from "@/components/Gallery";
import UseCases from "@/components/UseCases";
import Testimonials from "@/components/Testimonials";
import ArticlesSection from "@/components/ArticlesSection";
import FAQ from "@/components/FAQ";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import VideoModal from "@/components/VideoModal";
import { PRODUCTS } from "@/lib/products";
import { FAQ_ITEMS } from "@/lib/faq";
import { ARTICLES } from "@/lib/articles";

const SITE_URL = "https://vertadacamp.ru";

function minPrice(price: string): number | undefined {
  const digits = price.replace(/\D/g, "");
  return digits ? Number(digits) : undefined;
}

const AREA_SERVED = [
  { "@type": "AdministrativeArea", name: "Республика Марий Эл" },
  { "@type": "AdministrativeArea", name: "Приволжский федеральный округ" },
  { "@type": "Country", name: "Россия" },
];

function structuredData() {
  const organization = {
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: "VertadaCamp",
    legalName: 'ООО «Вертада»',
    description:
      "Завод-производитель автодомов-прицепов (кэмперов) в Йошкар-Оле. Продажа напрямую, без посредников, доставка по Республике Марий Эл, Приволжскому федеральному округу и всей России.",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/hero.jpg`,
    email: "Maf@vertada.ru",
    telephone: "+79276847252",
    priceRange: "от 350 000 ₽",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Машиностроителей, д. 72, корпус литер В, офис 1",
      addressLocality: "Йошкар-Ола",
      addressRegion: "Республика Марий Эл",
      postalCode: "424028",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 56.6383,
      longitude: 47.8917,
    },
    areaServed: AREA_SERVED,
    sameAs: ["https://t.me/Kotletkad", "https://vk.com/vertada"],
  };

  const products = PRODUCTS.map((product) => ({
    "@type": "Product",
    name: `Автодом-прицеп (кэмпер) VertadaCamp ${product.name}`,
    description: product.tagline,
    image: `${SITE_URL}${product.image}`,
    brand: { "@type": "Brand", name: "VertadaCamp" },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    areaServed: AREA_SERVED,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/#catalog`,
      priceCurrency: "RUB",
      price: minPrice(product.price),
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  }));

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const articles = ARTICLES.map((article) => ({
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.metaDescription,
    image: `${SITE_URL}${article.coverImage}`,
    datePublished: article.publishedAt,
    url: `${SITE_URL}/blog/${article.slug}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [organization, ...products, faqPage, ...articles],
  };
}

export default function Home() {
  return (
    <SiteProvider>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <VideoSection />
        <Catalog />
        <Gallery />
        <UseCases />
        <Testimonials />
        <ArticlesSection />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />

      <OrderModal />
      <ProductDetailModal />
      <VideoModal />
    </SiteProvider>
  );
}
