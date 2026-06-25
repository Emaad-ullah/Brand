import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import AlertPopup from './AlertPopup';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, subtotal, removeFromCart, updateQuantity, clearCart, cartStep: checkoutStep, setCartStep: setCheckoutStep } = useCart();
  const [formData, setFormData] = useState({
    name: '', cardNumber: '', expiry: '', cvv: '', address: ''
  });
  const [alertInfo, setAlertInfo] = useState({ isOpen: false, message: '' });

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.cartQuantity, 0);

  const handlePayment = () => {
    const { name, cardNumber, expiry, cvv, address } = formData;
    if (!name || !cardNumber || !expiry || !cvv || !address) {
      setAlertInfo({ isOpen: true, message: 'Please fill in all payment details to complete your order.' });
      return;
    }
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;
    if (!cardRegex.test(cardNumber)) {
      setAlertInfo({ isOpen: true, message: 'Please enter a valid 16-digit card number.' });
      return;
    }
    if (!expiryRegex.test(expiry)) {
      setAlertInfo({ isOpen: true, message: 'Please enter a valid expiry date (MM/YY).' });
      return;
    }
    if (!cvvRegex.test(cvv)) {
      setAlertInfo({ isOpen: true, message: 'Please enter a valid 3-digit CVV.' });
      return;
    }
    setCheckoutStep('success');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-brand-navy/60 z-[60] backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
              className={`fixed top-0 right-0 h-full bg-white z-[70] shadow-2xl flex flex-col transition-all duration-500 ${checkoutStep === 'payment' ? 'w-full sm:w-[600px] md:w-[700px]' : 'w-full sm:w-[450px]'}`}
            >
              <div className="flex justify-between items-center p-6 border-b border-brand-lightNavy">
                <h2 className="font-serif text-[30px] text-brand-navy drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                  {checkoutStep === 'cart' ? `Your Cart (${totalQuantity})` :
                    checkoutStep === 'payment' ? 'Checkout & Payment' : 'Order Confirmed'}
                </h2>
                <button onClick={onClose} className="text-brand-grey hover:text-brand-navy transition-colors">
                  <FiX size={24} />
                </button>
              </div>

              {/* ── CART STEP ── */}
              {checkoutStep === 'cart' && (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-20">
                        <p className="font-serif text-[30px] text-brand-navy mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">Your cart is empty</p>
                        <div className="w-8 h-[1px] bg-brand-gold mx-auto mb-4" />
                        <p className="text-brand-grey text-[20px] font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Add items to get started.</p>
                      </div>
                    ) : (
                      cartItems.map((item, index) => (
                        <div key={`${item.id}-${item.selectedSize}-${item.selectedColorName}-${index}`} className="flex gap-4">
                          <div className="w-24 h-32 bg-brand-lightNavy flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-1">
                                <h3 className="font-serif text-[22px] text-brand-navy leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">{item.name}</h3>
                                <button
                                  onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColorName)}
                                  className="text-brand-grey hover:text-red-500 transition-colors ml-2"
                                >
                                  <FiTrash2 size={15} />
                                </button>
                              </div>
                              <p className="text-brand-grey text-[18px] font-sans uppercase tracking-widest mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                                Size: <span className="font-bold text-brand-navy">{item.selectedSize}</span>
                                {' '}| Color:{' '}
                                <span
                                  className="inline-block w-3 h-3 rounded-full border border-gray-300 ml-1 translate-y-[2px]"
                                  style={{ backgroundColor: item.selectedColorHex }}
                                />
                              </p>
                              <p className="font-sans text-brand-navy text-[20px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Rs. {item.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center border border-gray-300 w-24 h-8 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColorName, -1)}
                                className="flex-1 flex justify-center text-brand-grey hover:text-brand-navy"
                              >
                                <FiMinus size={12} />
                              </button>
                              <span className="flex-1 text-center font-sans text-[18px] font-bold">{item.cartQuantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColorName, +1)}
                                className="flex-1 flex justify-center text-brand-grey hover:text-brand-navy"
                              >
                                <FiPlus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="p-6 border-t border-brand-lightNavy bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-sans text-[24px] text-brand-navy drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Subtotal</span>
                        <span className="font-sans text-[26px] text-brand-navy font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Rs. {subtotal.toLocaleString()}</span>
                      </div>
                      <p className="text-[18px] text-brand-grey text-center mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">Shipping & taxes calculated at checkout.</p>
                      <button
                        onClick={() => setCheckoutStep('payment')}
                        className="w-full bg-brand-navy text-white py-4 uppercase tracking-widest text-[18px] font-semibold hover:bg-brand-gold transition-colors duration-300 shadow-lg"
                      >
                        Proceed to Payment
                      </button>
                      <button
                        onClick={clearCart}
                        className="w-full text-brand-grey text-[16px] uppercase tracking-[2px] underline mt-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                      >
                        Clear Cart
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* ── PAYMENT STEP ── */}
              {checkoutStep === 'payment' && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-8 pb-8 border-b border-gray-100">
                      <h3 className="font-serif text-[24px] text-brand-navy mb-4">Order Summary</h3>
                      <div className="space-y-4">
                        {cartItems.map((item, index) => (
                          <div key={`${item.id}-${item.selectedSize}-${item.selectedColorName}-${index}`} className="flex justify-between items-center text-[18px]">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-[14px] font-bold">{item.cartQuantity}x</span>
                              <span className="text-brand-grey">{item.name}</span>
                            </div>
                            <span className="font-bold text-brand-navy">Rs. {(item.price * item.cartQuantity).toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                          <span className="font-serif text-[22px] text-brand-navy">Total Amount</span>
                          <span className="font-serif text-[24px] text-brand-navy font-bold">Rs. {subtotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="font-serif text-[28px] text-brand-navy drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">Payment Details</h3>
                      <div className="w-8 h-[1px] bg-brand-gold mb-2" />
                      <input
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="border-b border-brand-navy/20 py-3 text-[20px] font-light focus:outline-none focus:border-brand-gold bg-transparent"
                      />
                      <input
                        placeholder="Card Number (16 digits)"
                        maxLength={16}
                        value={formData.cardNumber}
                        onChange={e => setFormData({ ...formData, cardNumber: e.target.value.replace(/\D/g, '') })}
                        className="border-b border-brand-navy/20 py-3 text-[20px] font-light focus:outline-none focus:border-brand-gold bg-transparent"
                      />
                      <div className="flex gap-4">
                        <input
                          placeholder="MM/YY"
                          maxLength={5}
                          value={formData.expiry}
                          onChange={e => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                            setFormData({ ...formData, expiry: val });
                          }}
                          className="w-1/2 border-b border-brand-navy/20 py-3 text-[20px] font-light focus:outline-none focus:border-brand-gold bg-transparent"
                        />
                        <input
                          placeholder="CVV"
                          maxLength={3}
                          value={formData.cvv}
                          onChange={e => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                          className="w-1/2 border-b border-brand-navy/20 py-3 text-[20px] font-light focus:outline-none focus:border-brand-gold bg-transparent"
                        />
                      </div>
                      <input
                        placeholder="Billing Address"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        className="border-b border-brand-navy/20 py-3 text-[20px] font-light focus:outline-none focus:border-brand-gold bg-transparent"
                      />
                      <button
                        onClick={handlePayment}
                        className="bg-brand-gold text-white py-5 uppercase tracking-[2px] text-[18px] font-bold mt-6 hover:bg-brand-navy transition-all duration-500 shadow-xl"
                      >
                        Confirm Order & Pay Rs. {subtotal.toLocaleString()}
                      </button>
                      <button
                        onClick={() => setCheckoutStep('cart')}
                        className="text-brand-navy text-[16px] uppercase tracking-[2px] underline mt-2 text-center"
                      >
                        Back to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SUCCESS STEP ── */}
              {checkoutStep === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6">
                    <span className="text-brand-gold text-3xl">✓</span>
                  </div>
                  <h3 className="font-serif text-[36px] text-brand-navy mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">Order Confirmed!</h3>
                  <div className="w-8 h-[1px] bg-brand-gold mx-auto mb-6" />
                  <p className="font-sans text-brand-grey text-[20px] font-light leading-relaxed mb-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    Thank you for your purchase. Your order has been placed successfully. You will receive a confirmation shortly.
                  </p>
                  <button
                    onClick={() => {
                      clearCart();
                      setCheckoutStep('cart');
                      setFormData({ name: '', cardNumber: '', expiry: '', cvv: '', address: '' });
                      onClose();
                    }}
                    className="border border-brand-gold text-brand-gold px-12 py-4 uppercase tracking-[2px] text-[16px] font-bold hover:bg-brand-gold hover:text-white transition-all duration-500 shadow-md"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AlertPopup
        isOpen={alertInfo.isOpen}
        onClose={() => setAlertInfo(prev => ({ ...prev, isOpen: false }))}
        message={alertInfo.message}
      />
    </>
  );
};

export default CartDrawer;