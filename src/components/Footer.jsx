import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-brand-navy border-t border-brand-gold/10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Logo & Tagline */}
          <div className="col-span-1">
            <Link to="/" className="inline-block text-2xl font-serif font-semibold tracking-wider mb-6 text-white">
              VALORE<span className="text-brand-gold ml-0.5 text-3xl leading-none">.</span>
            </Link>
            <p className="text-gray-400 text-[17px] font-sans mb-8 max-w-xs mx-auto md:mx-0 leading-relaxed">
              Refined Everyday Wear. Minimal, elegant, and timeless pieces designed for the modern wardrobe.
            </p>
            <div className="flex justify-center md:justify-start space-x-6 text-white">
              <a href="#" className="hover:text-brand-gold transition-colors" aria-label="Instagram">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors" aria-label="Facebook">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors" aria-label="Twitter">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="hover:text-brand-gold transition-colors" aria-label="TikTok">
                <FaTiktok size={18} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="col-span-1">
            <h4 className="font-serif text-[16px] uppercase tracking-[2px] font-medium text-white mb-6">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/men" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Men's Collection</Link></li>
              <li><Link to="/women" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Women's Collection</Link></li>
              <li><Link to="/kids" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Kids' Collection</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">New Arrivals</Link></li>
              <li><Link to="/sale" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div className="col-span-1">
            <h4 className="font-serif text-[16px] uppercase tracking-[2px] font-medium text-white mb-6">Help</h4>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Size Guide</Link></li>
              <li><Link to="/track-order" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Track Order</Link></li>
              <li><Link to="/#contact" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h4 className="font-serif text-[16px] uppercase tracking-[2px] font-medium text-white mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/#about" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Our Story</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Careers</Link></li>
              <li><Link to="/sustainability" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Sustainability</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-brand-gold text-[17px] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-gray-500 text-[17px] uppercase tracking-[2px]">
            &copy; {new Date().getFullYear()} VALORE Premium Clothing. &nbsp;
            <span className="text-gray-600">Powered by </span>
            <a href="https://hattechmedia.com/" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-white transition-colors font-semibold tracking-widest">HAT-TECH</a>
          </p>
          <div className="flex space-x-8">
            <span className="text-gray-500 text-[17px] uppercase tracking-[2px] cursor-pointer hover:text-white transition-colors">USD ($)</span>
            <span className="text-gray-500 text-[17px] uppercase tracking-[2px] cursor-pointer hover:text-white transition-colors">English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
