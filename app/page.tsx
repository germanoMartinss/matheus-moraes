import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import AreasAtuacao from "@/components/AreasAtuacao";
import GoogleReviews from "@/components/GoogleReviews";
import Faq from "@/components/Faq";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

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
