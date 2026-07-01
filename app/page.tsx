import { SiteProvider } from "@/components/SiteContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Catalog from "@/components/Catalog";
import Gallery from "@/components/Gallery";
import UseCases from "@/components/UseCases";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import ProductDetailModal from "@/components/ProductDetailModal";
import VideoModal from "@/components/VideoModal";
import { PRODUCTS } from "@/lib/products";

const SITE_URL = "https://vertadacamp.ru";

function minPrice(price: string): number | undefined {
  const digits = price.replace(/\D/g, "");
  return digits ? Number(digits) : undefined;
}

function structuredData() {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "VertadaCamp",
    legalName: 'ООО «Вертада»',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/hero.jpg`,
    email: "Maf@vertada.ru",
    telephone: "+79276847252",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Машиностроителей, д. 72, корпус литер В, офис 1",
      addressLocality: "Йошкар-Ола",
      addressRegion: "Республика Марий Эл",
      postalCode: "424028",
      addressCountry: "RU",
    },
    sameAs: ["https://t.me/Kotletkad", "https://vk.com/vertada"],
  };

  const products = PRODUCTS.map((product) => ({
    "@type": "Product",
    name: `Кэмпер-прицеп VertadaCamp ${product.name}`,
    description: product.tagline,
    image: `${SITE_URL}${product.image}`,
    brand: { "@type": "Brand", name: "VertadaCamp" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/#catalog`,
      priceCurrency: "RUB",
      price: minPrice(product.price),
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [organization, ...products],
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
        <FinalCta />
      </main>
      <Footer />

      <OrderModal />
      <ProductDetailModal />
      <VideoModal />
    </SiteProvider>
  );
}
