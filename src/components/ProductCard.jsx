import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavourites } from '../context/FavouritesContext';
import { useCart } from '../context/CartContext';
import { deleteProduct } from '../services/api';

const colorMap = {
  "#000000": "black", "#0000CD": "blue", "#FFFFFF": "white", "#808080": "grey", 
  "#FF0000": "red", "#008000": "green", "#F5F5DC": "beige", "#E6E6FA": "lavender"
};

const getProductEdits = (id) => {
  const saved = localStorage.getItem(`valore_edits_${id}`);
  return saved ? JSON.parse(saved) : null;
};

const ProductCard = ({ product }) => {
  const isWomen = product.category === 'women';

  // Load Persistence Data
  const edits = getProductEdits(product.id);
  const activeEdits = edits?.colors || [];

  // Combine native colors with user overrides for the selector
  const displayColors = product.colorDetails || (product.colors || ['#000000', '#0000CD']).map(hex => ({ hex }));
  activeEdits.forEach(ae => {
    if (!displayColors.some(dc => dc.hex.toLowerCase() === ae.hex.toLowerCase())) {
      displayColors.push({ ...ae });
    }
  });

  const showColorSwatches = displayColors.length >= 1;

  const [selectedColor, setSelectedColor] = useState(displayColors[0]);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const { addToFavourites, isFavourite } = useFavourites();
  const { addToCart } = useCart();

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await deleteProduct(product.id);
        if (res.ok) {
          window.location.reload();
        } else {
          alert('Failed to delete product');
        }
      } catch (err) {
        console.error(err);
        alert('Error deleting product');
      }
    }
  };

  const finalColorName = selectedColor?.name?.toLowerCase() || colorMap[selectedColor?.hex?.toUpperCase()] || colorMap[selectedColor?.hex?.toLowerCase()] || 'black';

  const customColor = activeEdits.find(c => c.hex.toLowerCase() === selectedColor?.hex?.toLowerCase());

  const displayImage = customColor?.mainImage || edits?.defaultMain || 
    product.images?.[finalColorName]?.front || 
    product.frontImage || 
    product.image ||
    (isWomen 
      ? `/images/Women/outfiters/women-${product.subCategory?.toLowerCase()}/${product.id}-${finalColorName}-front.jpg`
      : null);

  const hoverImage = customColor?.pairImage || edits?.defaultPair || 
    product.images?.[finalColorName]?.close || 
    product.closeImage ||
    (isWomen
      ? `/images/Women/outfiters/women-${product.subCategory?.toLowerCase()}/${product.id}-${finalColorName}-close.jpg`
      : null);

  return (
    <div className="group relative flex flex-col w-full transition-all duration-300">
      {/* ── Image ── */}
      <div
        className="relative overflow-hidden mb-3"
        style={{ aspectRatio: '3/4' }}
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={isImageHovered && hoverImage ? hoverImage : displayImage}
            onError={(e) => { e.target.src = product.image || product.frontImage; }}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </Link>

        {/* ── Badges ── */}
        <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
          {product.tags && product.tags.includes('Sale') && (
            <span className="bg-brand-gold text-white text-[12px] md:text-[14px] font-black px-4 py-2 uppercase tracking-[2px] shadow-xl">
              30% OFF
            </span>
          )}
          {product.tags && product.tags.includes('New Arrival') && !product.tags.includes('Sale') && (
            <span className="bg-brand-navy text-white text-[12px] md:text-[14px] font-black px-4 py-2 uppercase tracking-[2px] shadow-xl">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); addToFavourites(product); }}
          className="absolute top-4 right-4 z-30 bg-white/80 p-1.5 rounded-full shadow-sm hover:bg-white transition-all duration-300"
        >
          <FiHeart
            size={12}
            className={isFavourite(product.id) ? 'text-red-500 fill-red-500' : 'text-brand-navy'}
          />
        </button>

        {/* Delete Button (Admin) - Commented Out */}
        {/* <button
          onClick={handleDelete}
          className="absolute top-14 right-4 z-30 bg-red-500/80 p-1.5 rounded-full shadow-sm hover:bg-red-500 transition-all duration-300"
          title="Delete Product"
        >
          <FiTrash2
            size={12}
            className="text-white"
          />
        </button> */}

        {/* ── Add to Cart Overlay ── */}
        <div className="absolute inset-x-0 bottom-0 z-30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out p-3">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, product.sizes?.[0] || 'M', selectedColor);
            }}
            className="w-full bg-brand-navy/90 text-white py-4 text-[16px] font-bold tracking-widest uppercase hover:bg-brand-gold transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ── Info Section (Plane style) ── */}
      <div className="flex flex-col space-y-1">
        <Link to={`/product/${product.id}`} className="block group/text">
          <h3 className="font-serif text-[17px] md:text-[20px] text-brand-navy group-hover/text:text-brand-gold transition-colors duration-300 leading-tight truncate">
            {product.name}
          </h3>
          <p className="font-sans text-brand-navy text-[16px] md:text-[18px] font-black mt-1">
            Rs. {product.price.toLocaleString()}
          </p>
        </Link>

        {/* Colors Swatches */}
        <div className="h-5 flex items-center mt-1">
          {showColorSwatches && (
            <div className="flex items-center gap-1.5">
              {displayColors.map((color, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColor(color);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-300
                    ${selectedColor?.hex === color.hex
                      ? 'border-brand-navy scale-[1.3] ring-2 ring-brand-navy/20'
                      : 'border-brand-lightNavy hover:scale-110'}`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
