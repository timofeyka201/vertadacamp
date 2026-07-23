import { SiteProvider } from "@/components/SiteContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteProvider>
      <Header />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
      <OrderModal />
    </SiteProvider>
  );
}
