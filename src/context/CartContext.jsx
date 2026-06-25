import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartStep, setCartStep] = useState('cart');
  const [toast, setToast] = useState({ visible: false, productName: '' });

  const showToast = (productName) => {
    setToast({ visible: true, productName });
    setTimeout(() => setToast({ visible: false, productName: '' }), 3500);
  };

  const addToCart = (product, selectedSize, selectedColor) => {
    const colorName = selectedColor?.name || selectedColor || 'default';
    const colorHex = selectedColor?.hex || selectedColor || '#000000';
    const size = selectedSize || 'M';

    const existingIndex = cartItems.findIndex(
      item => item.id === product.id && item.selectedSize === size && item.selectedColorName === colorName
    );

    if (existingIndex > -1) {
      setCartItems(prev => prev.map((item, idx) =>
        idx === existingIndex ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
      ));
    } else {
      setCartItems(prev => [
        ...prev,
        {
          ...product,
          selectedSize: size,
          selectedColorName: colorName,
          selectedColorHex: colorHex,
          cartQuantity: 1,
        }
      ]);
    }

    showToast(product.name);
  };

  const removeFromCart = (productId, selectedSize, selectedColorName) => {
    setCartItems(prev =>
      prev.filter(item =>
        !(item.id === productId && item.selectedSize === selectedSize && item.selectedColorName === selectedColorName)
      )
    );
  };

  const updateQuantity = (productId, selectedSize, selectedColorName, delta) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === productId && item.selectedSize === selectedSize && item.selectedColorName === selectedColorName
            ? { ...item, cartQuantity: item.cartQuantity + delta }
            : item
        )
        .filter(item => item.cartQuantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, cartCount, subtotal,
      addToCart, removeFromCart, updateQuantity, clearCart,
      isCartOpen, setIsCartOpen,
      cartStep, setCartStep,
      toast, setToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);