import Navbar from '../components/Navbar';
import HeroVideo from '../components/HeroVideo';
import MarqueeBar from '../components/MarqueeBar';
import CategoryShowcase from '../components/CategoryShowcase';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandStory from '../components/BrandStory';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      {/* Film grain overlay */}
      <div className="grain-overlay" />
      
      <Navbar />
      <main>
        <HeroVideo />
        <MarqueeBar />
        <CategoryShowcase />
        <FeaturedProducts />
        <BrandStory />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
