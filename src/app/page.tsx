import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Sobre from "@/components/sections/Sobre";
import AreasAtuacao from "@/components/sections/AreasAtuacao";
import GoogleReviews from "@/components/sections/GoogleReviews";
import Faq from "@/components/sections/Faq";
import Contato from "@/components/sections/Contato";
import ScrollToTop from "@/components/ui/ScrollToTop";

// Rating and review count from the Places API are refreshed once a day.
export const revalidate = 86400;

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Sobre />
      <AreasAtuacao />
      <GoogleReviews />
      <Faq />
      <Contato />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
