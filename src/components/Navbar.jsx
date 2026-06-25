import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';
import CartToast from './CartToast';
import SearchModal from './SearchModal';
import { useFavourites } from '../context/FavouritesContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { favourites } = useFavourites();
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Women', path: '/women' },
    { name: 'Men', path: '/men' },
    { name: 'JUNIORS', path: '/junior' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Sale', path: '/sale' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHeroPage = isHomePage ||
    ['/men', '/women', '/junior', '/new-arrivals', '/sale', '/contact'].includes(location.pathname);

  const navbarClass = `fixed w-full z-20 transition-all duration-300 ${isScrolled || !isHeroPage
    ? 'bg-white shadow-sm text-brand-navy py-3'
    : 'bg-transparent text-white py-5'
    }`;

  return (
    <>
      {/* Toast — navbar se alag, scroll affect nahi karega */}
      <CartToast />

      {/* Drawers — navbar se alag, scroll affect nahi karega */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={navbarClass}
      >
        <div className="max-w-full mx-auto px-6 md:px-16">
          <div className="flex items-center">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-baseline text-2xl sm:text-4xl font-serif font-semibold tracking-wider transition-all duration-500 group relative hover:text-brand-gold"
            >
              VALORE
              <span className="text-brand-gold ml-0.5 text-2xl sm:text-3xl leading-none group-hover:animate-pulse">.</span>
            </Link>

            {/* Right Side Wrapper */}
            <div className="ml-auto flex items-center space-x-4 sm:space-x-8 lg:space-x-12">

              {/* Desktop Menu */}
              <div className="hidden lg:flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-[14px] uppercase tracking-[3px] font-sans font-medium transition-colors hover:text-brand-gold
                      ${location.pathname === link.path ? 'text-brand-gold border-b border-brand-gold/30' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Icons Group */}
              <div className="flex items-center space-x-2 md:space-x-6">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="touch-target hover:text-brand-gold transition-colors relative"
                  aria-label="Cart"
                >
                  <FiShoppingCart size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[15px] font-bold h-6 w-6 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <Link
                  to="/favourites"
                  className="touch-target hover:text-brand-gold transition-colors relative"
                  aria-label="Favourites"
                >
                  <FiHeart size={18} />
                  {favourites.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[15px] font-bold h-6 w-6 rounded-full flex items-center justify-center">
                      {favourites.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/login"
                  className="touch-target hover:text-brand-gold transition-colors hidden sm:flex items-center justify-center"
                  aria-label="Login"
                >
                  {user ? (
                    <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-[10px] flex items-center justify-center font-bold border border-brand-gold/30">
                      {user.initials}
                    </div>
                  ) : (
                    <FiUser size={18} />
                  )}
                </Link>
                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden touch-target hover:text-brand-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle Menu"
                >
                  {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[80%] max-w-[400px] bg-white z-[70] shadow-2xl lg:hidden flex flex-col"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <span className="font-serif text-xl font-semibold tracking-wider text-brand-navy">
                    VALORE<span className="text-brand-gold">.</span>
                  </span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-navy hover:text-brand-gold transition-colors">
                    <FiX size={24} />
                  </button>
                </div>
                <div className="flex-grow overflow-y-auto py-8 px-6">
                  <div className="flex flex-col space-y-6">
                    {navLinks.map((link, idx) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          className={`block text-[20px] uppercase tracking-[3px] font-sans font-medium transition-colors py-2 border-b border-gray-50
                            ${location.pathname === link.path ? 'text-brand-gold' : 'text-brand-navy hover:text-brand-gold'}`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center space-x-3 text-brand-navy py-4 border border-brand-navy/10 hover:bg-brand-navy hover:text-white transition-all duration-300"
                  >
                    {user ? (
                      <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-[10px] flex items-center justify-center font-bold border border-brand-gold/30">
                        {user.initials}
                      </div>
                    ) : (
                      <FiUser size={18} />
                    )}
                    <span className="text-[17px] uppercase tracking-widest font-semibold">
                      {user ? user.name : 'My Account'}
                    </span>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </motion.nav>
    </>
  );
};

export default Navbar;