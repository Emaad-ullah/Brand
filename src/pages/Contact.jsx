import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import ContactSection from '../components/ContactSection';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="w-full pt-0 bg-white">
      {/* Half-Screen Banner */}
      <div className="relative w-full h-[60vh] overflow-hidden shadow-lg">
        <img 
          src="/images/about-section/contact-us-background-1.jpg" 
          alt="Contact Us" 
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        
        {/* Text Overlay — centered */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-3 tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] text-center uppercase"
            >
              Contact Us
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-[1.5px] bg-brand-gold mx-auto mb-4"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white font-sans uppercase tracking-[4px] md:tracking-[6px] text-[11px] md:text-[14px] font-black drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)] text-center"
            >
              Exceptional Support for Exceptional Style
            </motion.p>
          </div>
        </div>
      </div>

      {/* Spacing between sections */}
      <div className="pt-0">
        <ContactSection tightPadding={true} />
      </div>
    </div>
  );
};

export default Contact;
