import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FlatsShowcase from "@/components/FlatsShowcase";
import TrustSection from "@/components/TrustSection";
import VideoGallery from "@/components/VideoGallery";
import LocationExplorer from "@/components/LocationExplorer";
import ActivitiesSection from "@/components/ActivitiesSection";
import BlogSection from "@/components/BlogSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FlatsShowcase />
      <TrustSection />
      <VideoGallery />
      <LocationExplorer />
      <ActivitiesSection />
      <BlogSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
