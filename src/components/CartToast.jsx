import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartToast = () => {
  const { toast, setToast, setIsCartOpen, setCartStep } = useCart();

  const handleViewCart = () => {
    setToast({ visible: false, productName: '' });
    if (setCartStep) setCartStep('cart'); // Ensure it opens at the shopping bag summary
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          exit={{ opacity: 0, y: -20, scale: 0.95, x: '-50%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-6 left-1/2 z-[999] bg-white shadow-2xl border border-brand-lightNavy flex items-center gap-4 px-6 py-4 min-w-[320px] max-w-[90vw]"
        >
          <div className="w-10 h-10 rounded-full bg-brand-navy/10 flex items-center justify-center flex-shrink-0">
            <FiShoppingBag size={18} className="text-brand-navy" />
          </div>

          <div className="flex-1">
            <p className="font-serif text-brand-navy text-[16px] leading-tight">
              Added to Cart
            </p>
            <p className="text-brand-grey text-[13px] font-sans truncate max-w-[160px]">
              {toast.productName}
            </p>
          </div>

          <div className="w-[1px] h-8 bg-brand-lightNavy flex-shrink-0" />

          <button
            onClick={handleViewCart}
            className="text-brand-gold font-sans text-[13px] uppercase tracking-[1.5px] font-bold hover:text-brand-navy transition-colors duration-300 flex-shrink-0"
          >
            View Cart
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartToast;
