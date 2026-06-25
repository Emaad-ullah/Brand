import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiShield, FiClock, FiMaximize } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';

/**
 * HOME PAGE COMPONENT
 * This file contains the main landing page for VALORE.
 * It includes the Hero section, About rows, Brand pillars, and Collection highlights.
 */

// --- Sub-components ---
const CollectionCard = ({ title, image, link, className = "" }) => (
  <Link to={link} className={`group relative h-[380px] md:h-[480px] overflow-hidden block shadow-2xl ${className}`}>
    <div className="absolute inset-0 bg-brand-navy/30 group-hover:bg-brand-navy/10 group-hover:backdrop-blur-[2px] transition-all duration-1000 z-10"></div>
    <img
      src={image}
      alt={title}
      className="w-full h-full transform group-hover:scale-105 transition-transform duration-[3000ms] ease-out object-cover object-top"
    />
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-white">
      <div className="overflow-hidden mb-4">
        <h3 className="font-serif text-3xl md:text-5xl tracking-[1px] md:tracking-[2px] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out font-light" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}>{title}</h3>
      </div>
      <div className="w-0 group-hover:w-20 h-[1px] bg-brand-gold transition-all duration-1000 mb-8 delay-100"></div>
      <span className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 delay-200 text-brand-grey-600 uppercase tracking-[2px] text-[12px] font-medium border-b border-brand-grey/30 pb-2 font-sans">
        Explore Collection
      </span>
    </div>
  </Link>
);

const BrandPillar = ({ title, desc, icon: Icon }) => (
  <div className="bg-white border-l-2 border-brand-gold pl-8 py-6 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 group hover:shadow-2xl hover:shadow-brand-navy/10">
    <div className="text-brand-gold mb-5 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
      <Icon size={24} />
    </div>
    <h4 className="font-sans text-[15px] uppercase tracking-[2px] font-bold mb-4 text-brand-navy">{title}</h4>
    <p className="text-brand-grey text-[21px] md:text-[23px] font-light leading-relaxed font-sans">{desc}</p>
  </div>
);

const AboutRow = ({ label, heading, body, image, reverse = false, delay = 0, imgClass = "object-cover", heightClass = "md:h-[80vh] h-[50vh]" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
    className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} h-auto ${heightClass} w-full bg-white`}
  >
    <div className="w-full md:w-1/2 h-full overflow-hidden flex items-start justify-center">
      <img src={image} alt={heading} className={`w-full h-full ${imgClass} transition-transform duration-[2000ms] hover:scale-105`} />
    </div>
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center px-10 py-16 md:px-20 lg:px-32">
      <span className="text-brand-gold font-sans uppercase tracking-[3px] text-[19px] font-bold mb-6">{label}</span>
      <h2 className="font-serif text-3xl md:text-5xl text-brand-navy mb-8 leading-tight">{heading}</h2>
      <p className="text-brand-grey font-sans font-light text-[21px] leading-relaxed mb-10 max-w-lg">{body}</p>
    </div>
  </motion.div>
);

// --- Main Home Component ---
const Home = () => {
  // State for the story modal
  const [showStory, setShowStory] = useState(false);
  const location = useLocation();

  // Effect to handle scroll-to-hash (e.g., when clicking "About" in Navbar)
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  // Curated New Arrivals (Mixed Men & Women)
  const newArrivals = products
    .filter(p => p.tags.includes('New Arrival') && !p.tags.includes('Sale'))
    .sort(() => 0.5 - Math.random()) // Randomize for variety
    .slice(0, 8);

  return (
    <div className="w-full bg-white">

      {/* ==========================================
          4.1 HERO SECTION
          Featuring background logo, massive typography, and glassmorphism quote
          ========================================== */}
      {/* ==========================================
          4.1 HERO SECTION (CLEAN VIDEO VERSION)
          ========================================== */}
      <section className="relative h-screen w-full flex items-center bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/backgroundvideo/backgroundvideo.mp4" type="video/mp4" />
          </video>
          {/* Left-side subtle black gradient for text readability */}
          <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[1]"></div>
        </div>

        <div className="w-full px-4 md:px-8 lg:px-12 z-10 flex flex-col justify-center items-start h-full pt-[48px] text-left">
          <div className="max-w-3xl">
            {/* Collection Label */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-gold font-sans font-bold uppercase tracking-[6px] text-[14px] md:text-[14px] mb-6 block drop-shadow-lg"
            >
              SS 2026 Collection
            </motion.span>

            {/* Main Headline */}
            <motion.h1
              // initial={{ opacity: 0, y: 20 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ delay: 0.1 }}
              className="font-serif text-[60px] md:text-[100px] lg:text-[130px] text-white font-medium leading-[0.85] mb-8 drop-shadow-2xl"
            >
              Refined <br />
              Everyday Wear
            </motion.h1>

            {/* Brand Pillars */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-sans uppercase tracking-[8px] text-[16px] md:text-[18px] text-white font-bold mb-12 drop-shadow-lg"
            >
              MINIMAL. ELEGANT. TIMELESS.
            </motion.p>

            {/* Brand Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl"
            >
              <p
                className="font-serif italic text-white text-[22px] md:text-[28px] lg:text-[32px] leading-relaxed"
                style={{ textShadow: '2px 2px 15px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)' }}
              >
                "We don't sell clothes. We sell confidence stitched into fabric, elegance pressed into every fold, and a legacy worn on your back every single day."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMMENTED OUT IMAGE HERO VERSION 
      <section className="relative h-screen w-full flex items-center bg-brand-navy overflow-hidden">
        ... (omitted for brevity) ...
      </section>
      */}

      {/* ==========================================
          4.2 ABOUT SECTION
          Alternating rows of imagery and brand narrative
          ========================================== */}
      <section id="about" className="pt-0 pb-10 scroll-mt-24">
        {/* Row 1: Brand Intro */}
        <AboutRow label="OUR STORY" heading="Born From a Passion For Refined Everyday Wear" body="Every stitch and silhouette is meticulously chosen to make you feel premium. Our journey began with a simple mission to redefine the essentials of the modern wardrobe by blending effortless style with uncompromised quality." image="/images/about-section/image1.2.1.jpg" imgClass="object-cover object-[50%_50%]" heightClass="md:h-[100vh] h-[60vh]" />

        {/* Row 2: Craftsmanship */}
        <AboutRow label="OUR CRAFT" heading="Precision Cut. Thoughtfully Made." body="We obsess over every detail so you never have to think twice. From the sourcing of the finest fabrics to the final press, our craftsmanship ensures that every piece tells a story of dedication and refinement." image="/images/about-section/image2.1.jpg" reverse={true} heightClass="md:h-[95vh] h-[55vh]" />

        {/* Row 3: Legacy */}
        <AboutRow label="OUR LEGACY" heading="A Pakistani Heritage. A Global Vision." body="Rooted in the rich textile history of Pakistan, VALORE combines traditional craftsmanship with contemporary global aesthetics." image="/images/about-section/image3.1.jpg" />

        {/* Brand Pillars: Grid of 4 value propositions */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <BrandPillar icon={FiStar} title="Premium Materials" desc="Sourced from the finest mills worldwide." />
            <BrandPillar icon={FiShield} title="Ethical Production" desc="Fair trade and sustainable practices." />
            <BrandPillar icon={FiClock} title="Timeless Design" desc="Aesthetic that outlasts fleeting trends." />
            <BrandPillar icon={FiMaximize} title="Perfect Fit" desc="Tailored to perfection for every body." />
          </div>
        </div>
      </section>

      {/* ==========================================
          4.3 SHOP BY COLLECTION
          Quick access to major product categories
          ========================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-[36px] md:text-[56px] text-brand-navy text-center mb-12 leading-tight font-light tracking-[1px] md:tracking-[2px]">Shop by Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <CollectionCard title="Men" image="/images/Shop by Collectionimages/Men-section2.png" link="/men" />
            <CollectionCard title="Women" image="/images/Shop by Collectionimages/Women-section1.png" link="/women" />
            <CollectionCard title="Junior" image="/images/Shop by Collectionimages/Junior-section2.png" link="/junior" />
            <CollectionCard title="New Arrivals" image="/images/about-section/newarrival-2.jpg" link="/new-arrivals" />
            <CollectionCard title="Sale" image="/images/about-section/salesimage2.jpg" link="/sale" />
          </div>
        </div>
      </section>

      {/* ==========================================
          4.1.5 NEW ARRIVALS (Mixed Men & Women)
          ========================================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-6 text-center md:text-left">
            <div>
              <span className="text-brand-gold font-sans uppercase tracking-[3px] text-[14px] font-bold mb-2 block">Latest Drops</span>
              <Link to="/new-arrivals" className="group">
                <h2 className="font-serif text-4xl md:text-5xl text-brand-navy leading-tight group-hover:text-brand-gold transition-colors">New Arrivals</h2>
              </Link>
            </div>
            <Link to="/new-arrivals" className="text-brand-navy font-bold uppercase tracking-[2px] text-[13px] border-b-2 border-brand-gold pb-1 hover:text-brand-gold transition-colors">
              View All Collection
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
            {newArrivals.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4.4 NEWSLETTER SECTION
          ========================================== */}
      <section className="py-32 text-center bg-brand-lightNavy/10">
        <h2 className="font-serif text-4xl md:text-5xl mb-6">Join The Valore Club</h2>
        <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 px-6">
          <input type="email" placeholder="Email Address" className="flex-grow border-b border-brand-navy py-3 bg-transparent focus:outline-none text-[16px]" required />
          <button className="bg-brand-navy text-white px-10 py-3 uppercase font-bold hover:bg-brand-gold transition-all text-[15px]">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;