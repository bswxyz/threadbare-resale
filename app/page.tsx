import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Rack from '@/components/Rack';
import StorySection from '@/components/StorySection';
import CarbonBand from '@/components/CarbonBand';
import SellSteps from '@/components/SellSteps';
import TrustBand from '@/components/TrustBand';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div id="top">
      <Nav />
      <main id="main">
        <Hero />
        <Rack />
        <StorySection />
        <CarbonBand />
        <SellSteps />
        <TrustBand />
      </main>
      <Footer />
    </div>
  );
}
