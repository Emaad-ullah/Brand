import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white border-t border-brand-gold/10 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/about-section/contact-us-background-1.jpg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-[32px] md:text-[42px] text-brand-navy mb-4 uppercase tracking-[6px]">Get In Touch</h2>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto mb-6"></div>
          <p className="text-brand-grey text-[18px] max-w-lg mx-auto font-light leading-relaxed">
            Have a question about our collections or need styling advice? Send us a message and our concierge team will get back to you within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-8 mb-20 md:mb-32 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="relative group">
              <label htmlFor="name" className="block text-[17px] uppercase tracking-widest text-brand-grey mb-2 group-focus-within:text-brand-gold transition-colors">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-gold text-brand-navy bg-transparent transition-all"
                required
              />
            </div>
            <div className="relative group">
              <label htmlFor="email" className="block text-[17px] uppercase tracking-widest text-brand-grey mb-2 group-focus-within:text-brand-gold transition-colors">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-gold text-brand-navy bg-transparent transition-all"
                required
              />
            </div>
          </div>
          <div className="relative group">
            <label htmlFor="subject" className="block text-[17px] uppercase tracking-widest text-brand-grey mb-2 group-focus-within:text-brand-gold transition-colors">Subject</label>
            <input 
              type="text" 
              id="subject" 
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-gold text-brand-navy bg-transparent transition-all"
              required
            />
          </div>
          <div className="relative group">
            <label htmlFor="message" className="block text-[17px] uppercase tracking-widest text-brand-grey mb-2 group-focus-within:text-brand-gold transition-colors">Message</label>
            <textarea 
              id="message" 
              rows="3"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-gold text-brand-navy bg-transparent resize-none transition-all"
              required
            ></textarea>
          </div>
          <div className="pt-4 text-center">
            <button 
              type="submit" 
              className="bg-brand-gold text-white px-12 py-3 uppercase tracking-[3px] text-[17px] font-bold hover:bg-brand-navy transition-all duration-500 shadow-lg hover:shadow-brand-navy/10 transform hover:-translate-y-1"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 border-t border-gray-200/50 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 bg-white shadow-sm">
              <FiMapPin size={20} />
            </div>
            <h4 className="font-serif text-[18px] text-brand-navy mb-2">Visit Us</h4>
            <p className="text-[15px] text-brand-grey font-light leading-relaxed">123 Luxury Avenue<br/>New York, NY 10012</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 bg-white shadow-sm">
              <FiMail size={20} />
            </div>
            <h4 className="font-serif text-[18px] text-brand-navy mb-2">Email Us</h4>
            <p className="text-[15px] text-brand-grey font-light leading-relaxed">concierge@valore.com</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 bg-white shadow-sm">
              <FiPhone size={20} />
            </div>
            <h4 className="font-serif text-[18px] text-brand-navy mb-2">Call Us</h4>
            <p className="text-[15px] text-brand-grey font-light leading-relaxed">+1 (800) 123-4567</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
