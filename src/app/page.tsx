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
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-5 focus:py-3 focus:bg-gold focus:text-bg-primary focus:rounded-[2px] focus:font-medium"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Sobre />
        <AreasAtuacao />
        <GoogleReviews />
        <Faq />
        <Contato />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
