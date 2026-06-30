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

export default function Home() {
  return (
    <SiteProvider>
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
