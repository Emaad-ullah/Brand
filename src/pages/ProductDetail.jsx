import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import SizeGuideModal from '../components/SizeGuideModal';
import AlertPopup from '../components/AlertPopup';
import { FiChevronRight, FiHeart, FiMinus, FiPlus, FiChevronDown, FiEdit3, FiPlusCircle, FiTrash2, FiX, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';

const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div className="border-b border-gray-100 last:border-0">
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between group transition-all"
    >
      <span className={`font-sans text-xs uppercase tracking-[3px] font-bold ${isOpen ? 'text-brand-navy' : 'text-brand-grey group-hover:text-brand-navy'}`}>
        {title}
      </span>
      <FiChevronDown className={`text-brand-gold transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} size={16} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const AdminEditModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [edits, setEdits] = useState(initialData || { colors: [], defaultMain: null, defaultPair: null });

  useEffect(() => {
    if (initialData) setEdits(initialData);
  }, [initialData]);

  const handleGlobalUpload = (type, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setEdits({ ...edits, [type]: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (colorIndex, type, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedColors = [...edits.colors];
      updatedColors[colorIndex] = {
        ...updatedColors[colorIndex],
        [type]: e.target.result
      };
      setEdits({ ...edits, colors: updatedColors });
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl rounded-none border border-brand-gold/20"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-gray-50">
            <div>
              <h2 className="font-serif text-2xl text-brand-navy tracking-tight">Product Administration</h2>
              <p className="text-[11px] uppercase tracking-[2px] text-brand-gold font-bold mt-1">Image & Color Management</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FiX size={24} className="text-brand-navy" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* Global Visuals */}
            <div className="mb-12 pb-12 border-b border-gray-100">
              <h3 className="font-sans text-xs uppercase tracking-[3px] text-brand-grey mb-6">Default Product Visuals (Global)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[2px] font-bold text-brand-grey">Global Main Image</span>
                  <div className="relative h-64 bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group">
                    {edits.defaultMain ? (
                      <img src={edits.defaultMain} alt="Default Main" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <FiPlus size={32} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Upload Default Main</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGlobalUpload('defaultMain', e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[2px] font-bold text-brand-grey">Global Pair Image</span>
                  <div className="relative h-64 bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group">
                    {edits.defaultPair ? (
                      <img src={edits.defaultPair} alt="Default Pair" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <FiPlus size={32} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">Upload Default Pair</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGlobalUpload('defaultPair', e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Existing Color Management */}
            <div className="space-y-8">
              <h3 className="font-sans text-xs uppercase tracking-[3px] text-brand-grey mb-6">Manage Variant Visuals (Black & Blue Only)</h3>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { hex: '#000000', label: 'Black' },
                  { hex: '#0000CD', label: 'Blue' }
                ].map((colorItem) => {
                  const colorIdx = edits.colors.findIndex(c => c.hex.toLowerCase() === colorItem.hex.toLowerCase());
                  const colorData = colorIdx >= 0 ? edits.colors[colorIdx] : { hex: colorItem.hex, mainImage: null, pairImage: null };

                  // Ensure color exists in state for editing
                  if (colorIdx === -1) {
                    edits.colors.push(colorData);
                  }

                  const actualIdx = edits.colors.findIndex(c => c.hex.toLowerCase() === colorItem.hex.toLowerCase());

                  return (
                    <div key={colorItem.hex} className="group relative border border-gray-100 p-6 hover:border-brand-gold/30 transition-all bg-white shadow-sm hover:shadow-md">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-32 flex flex-col items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-4 border-gray-100 shadow-inner mb-3" style={{ backgroundColor: colorItem.hex }} />
                          <span className="text-[12px] font-sans font-bold uppercase tracking-[2px] text-brand-navy">{colorItem.label}</span>
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <span className="text-[10px] uppercase tracking-[2px] font-bold text-brand-grey">Main Image ({colorItem.label})</span>
                            <div className="relative h-48 bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group/img">
                              {colorData.mainImage ? (
                                <img src={colorData.mainImage} alt="Main" className="w-full h-full object-cover" />
                              ) : (
                                <div className="text-center p-4">
                                  <FiPlus size={24} className="mx-auto mb-2 text-gray-300" />
                                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Upload Main</p>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(actualIdx, 'mainImage', e.target.files[0])}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <span className="text-[10px] uppercase tracking-[2px] font-bold text-brand-grey">Pair Image ({colorItem.label})</span>
                            <div className="relative h-48 bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group/img">
                              {colorData.pairImage ? (
                                <img src={colorData.pairImage} alt="Pair" className="w-full h-full object-cover" />
                              ) : (
                                <div className="text-center p-4">
                                  <FiPlus size={24} className="mx-auto mb-2 text-gray-300" />
                                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Upload Pair</p>
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(actualIdx, 'pairImage', e.target.files[0])}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-gray-100 flex justify-end gap-4 bg-gray-50">
            <button
              onClick={onClose}
              className="px-8 py-3 uppercase tracking-[2px] text-[12px] font-bold text-brand-navy border border-gray-200 hover:bg-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(edits)}
              className="px-10 py-3 bg-brand-navy text-white uppercase tracking-[2px] text-[12px] font-bold hover:bg-brand-gold transition-colors flex items-center gap-2 shadow-xl"
            >
              <FiCheck /> Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id)) || products[0];
  const isWomen = product.category === 'women';

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [productEdits, setProductEdits] = useState(() => {
    const saved = localStorage.getItem(`valore_edits_${id}`);
    return saved ? JSON.parse(saved) : { colors: [] };
  });

  const saveEdits = (newEdits) => {
    setProductEdits(newEdits);
    localStorage.setItem(`valore_edits_${id}`, JSON.stringify(newEdits));
    setIsAdminMode(false);
    if (newEdits.colors.length > 0) {
      setActiveColor(newEdits.colors[0].hex);
    }
  };

  const colorMap = useMemo(() => ({
    "#000000": "black", "#0000CD": "blue", "#FFFFFF": "white", "#808080": "grey",
    "#FF0000": "red", "#008000": "green", "#F5F5DC": "beige", "#E6E6FA": "lavender"
  }), []);

  const activeEdits = productEdits.colors;
  const displayColors = useMemo(() => {
    return product.colorDetails || (product.colors && product.colors.length > 0 ? product.colors : ['#000000']).map(c => typeof c === 'string' ? { hex: c } : c);
  }, [product]);

  const [activeColor, setActiveColor] = useState(displayColors[0]?.hex || '#000000');

  useEffect(() => {
    if (displayColors.length > 0) {
      setActiveColor(displayColors[0].hex);
    }
  }, [id, displayColors]);

  const { mainImage, pairImage } = useMemo(() => {
    const customColor = activeEdits.find(c => c.hex.toLowerCase() === activeColor.toLowerCase());

    // 1. Check Custom Edits/Uploads
    if (customColor && (customColor.mainImage || customColor.pairImage)) {
      return {
        mainImage: customColor.mainImage || productEdits.defaultMain || product.image || product.frontImage,
        pairImage: customColor.pairImage || productEdits.defaultPair
      };
    }
    if (productEdits.defaultMain || productEdits.defaultPair) {
      return {
        mainImage: productEdits.defaultMain || product.image || product.frontImage,
        pairImage: productEdits.defaultPair
      };
    }

    // 2. Resolve Color Name for Image Lookup
    const colorObj = displayColors.find(c => c.hex.toLowerCase() === activeColor.toLowerCase());
    const colorName = colorObj?.name?.toLowerCase() || colorMap[activeColor.toUpperCase()] || colorMap[activeColor.toLowerCase()] || 'black';

    // 3. Check Product Images Object
    if (product.images && colorName && product.images[colorName]) {
      return {
        mainImage: product.images[colorName].front || product.frontImage || product.image,
        pairImage: product.images[colorName].close || product.closeImage
      };
    }

    // 4. Check Women Category Legacy Path
    if (isWomen) {
      const generatedMain = `/images/Women/outfiters/women-${product.subCategory?.toLowerCase()}/${product.id}-${colorName}-front.jpg`;
      const generatedPair = `/images/Women/outfiters/women-${product.subCategory?.toLowerCase()}/${product.id}-${colorName}-close.jpg`;

      // We still prefer explicit frontImage/closeImage if they exist (for uploads)
      return {
        mainImage: product.frontImage || product.image || generatedMain,
        pairImage: product.closeImage || generatedPair
      };
    }

    // 5. Final Fallback
    return {
      mainImage: product.frontImage || product.image,
      pairImage: product.closeImage
    };
  }, [activeColor, activeEdits, product, colorMap, productEdits.defaultMain, productEdits.defaultPair, displayColors, isWomen]);

  const [activeGalleryImage, setActiveGalleryImage] = useState(mainImage);
  const [activeSize, setActiveSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('details');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ isOpen: false, message: '' });

  const { addToCart } = useCart();
  const { addToFavourites, isFavourite } = useFavourites();

  useEffect(() => {
    setActiveGalleryImage(mainImage);
  }, [mainImage]);

  const productSizes = product.sizes || ['S', 'M', 'L'];

  const thumbnails = useMemo(() => {
    const thumbs = [mainImage];
    if (pairImage) thumbs.push(pairImage);
    return thumbs;
  }, [mainImage, pairImage]);

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleQtyChange = (type) => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="w-full pt-[48px] md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AdminEditModal
          isOpen={isAdminMode}
          onClose={() => setIsAdminMode(false)}
          onSave={saveEdits}
          initialData={productEdits}
        />

        {/* Breadcrumb */}
        <div className="flex items-center text-[10px] md:text-[11px] uppercase tracking-[2px] text-brand-grey mb-8 md:mb-12">
          <Link to="/" className="hover:text-brand-navy transition-colors">Home</Link>
          <FiChevronRight className="mx-2" />
          <Link to={`/${product.category}`} className="hover:text-brand-navy transition-colors">{product.category}</Link>
          <FiChevronRight className="mx-2" />
          <span className="text-brand-navy truncate max-w-[200px] font-bold">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 mb-24">

          {/* Left Side - Images */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 h-auto md:h-[700px] lg:h-[800px]">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 flex-shrink-0 pb-2 md:pb-0 scrollbar-hide">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={`${activeColor}-${idx}`}
                  onClick={() => setActiveGalleryImage(thumb)}
                  className={`flex-shrink-0 w-20 md:w-full aspect-[3/4] border-2 transition-all duration-300 ${activeGalleryImage === thumb ? 'border-brand-navy scale-95' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={thumb} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 bg-brand-lightNavy/30 relative aspect-[3/4] md:aspect-auto overflow-hidden group">
              <motion.img
                key={activeGalleryImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeIn" }}
                src={activeGalleryImage}
                onError={(e) => { e.target.src = product.image || product.frontImage; }}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />

              {/* Admin Edit Overlay - Commented Out */}
              {/* <button 
                onClick={() => setIsAdminMode(true)}
                className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md px-4 py-3 shadow-2xl border border-brand-gold/20 flex items-center gap-3 text-brand-navy uppercase tracking-[2px] text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-brand-navy hover:text-white transform translate-y-4 group-hover:translate-y-0"
              >
                <FiEdit3 size={14} className="text-brand-gold" />
                Edit Visuals
              </button> */}

              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg md:hidden">
                <FiHeart className="text-brand-navy" size={20} />
              </div>
            </div>
          </div>

          {/* Right Side - Info */}
          <div className="lg:col-span-5 flex flex-col pt-4 lg:pt-0">

            {/* Mobile Tag */}
            {product.tags && product.tags.length > 0 && (
              <span className="text-brand-gold text-xs uppercase tracking-[3px] font-bold mb-4 block">
                {product.category} • {product.tags[0]}
              </span>
            )}

            {/* Title & Price */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-navy mb-6 leading-tight">{product.name}</h1>
            <div className="flex items-center justify-between mb-10">
              <p className="font-serif text-3xl text-brand-navy mb-8">Rs. {product.price.toLocaleString()}</p>
              <div className="hidden md:block">
                <FiHeart
                  onClick={() => addToFavourites(product)}
                  className={`cursor-pointer hover:text-brand-gold transition-colors ${isFavourite(product.id) ? 'text-red-500 fill-red-500' : 'text-brand-navy'}`}
                  size={24}
                />
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-10">
              <span className="font-sans text-xs uppercase tracking-[2px] text-brand-grey mb-4 block">Select Color</span>
              <div className="flex items-center gap-6">
                {displayColors.map(color => (
                  <button
                    key={color.hex}
                    onClick={() => setActiveColor(color.hex)}
                    className={`rounded-full border-2 transition-all shadow-sm ${activeColor.toLowerCase() === color.hex.toLowerCase()
                      ? 'border-brand-navy w-14 h-14 scale-110 ring-4 ring-brand-navy/10'
                      : 'border-gray-100 w-10 h-10 hover:border-gray-300 hover:scale-105'}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select color ${color.hex}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <span className="font-sans text-xs uppercase tracking-[2px] text-brand-grey">Select Size</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-brand-gold text-xs uppercase tracking-[1px] underline font-bold hover:text-brand-navy transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {productSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`w-14 h-14 border flex items-center justify-center text-sm font-bold transition-all ${activeSize === size
                      ? 'border-brand-navy bg-brand-navy text-white shadow-lg shadow-brand-navy/10'
                      : 'border-gray-200 hover:border-brand-navy text-brand-navy hover:bg-gray-50'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-12">
              <span className="font-sans text-xs uppercase tracking-[2px] text-brand-grey mb-4 block">Quantity</span>
              <div className="flex items-center border border-gray-200 w-36 h-14 bg-white shadow-sm">
                <button onClick={() => handleQtyChange('dec')} className="flex-1 h-full flex items-center justify-center text-brand-grey hover:text-brand-navy transition-colors touch-target"><FiMinus /></button>
                <span className="flex-1 text-center font-bold text-brand-navy">{quantity}</span>
                <button onClick={() => handleQtyChange('inc')} className="flex-1 h-full flex items-center justify-center text-brand-grey hover:text-brand-navy transition-colors touch-target"><FiPlus /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-4 mb-16">
              <button
                onClick={() => {
                  if (!activeSize) {
                    setAlertInfo({ isOpen: true, message: 'Please select a size before adding to your bag.' });
                    return;
                  }
                  for (let i = 0; i < quantity; i++) {
                    addToCart(product, activeSize, { name: colorMap[activeColor] || 'default', hex: activeColor || '#000000' });
                  }
                }}
                className="w-full bg-brand-navy text-white py-5 uppercase tracking-[2px] text-sm font-bold hover:bg-opacity-90 transition-all shadow-xl hover:shadow-brand-navy/20"
              >
                Add to Shopping Bag
              </button>
              <button
                onClick={() => {
                  const sizeToUse = activeSize || productSizes[0] || 'M';
                  for (let i = 0; i < quantity; i++) {
                    addToCart(product, sizeToUse, { name: colorMap[activeColor] || 'default', hex: activeColor || '#000000' });
                  }
                }}
                className="w-full border border-brand-gold text-brand-gold py-5 uppercase tracking-[2px] text-sm font-bold hover:bg-brand-gold hover:text-white transition-all"
              >
                Buy It Now
              </button>
              <button
                onClick={() => addToFavourites(product)}
                className="w-full border border-brand-navy text-brand-navy py-5 uppercase tracking-[3px] text-xs font-bold hover:bg-brand-navy hover:text-white transition-all flex items-center justify-center"
              >
                <FiHeart className={`mr-3 ${isFavourite(product.id) ? 'text-red-500 fill-red-500' : ''}`} size={16} />
                {isFavourite(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-100">
              <AccordionItem
                title="Product Details"
                isOpen={openAccordion === 'details'}
                onClick={() => toggleAccordion('details')}
              >
                <div className="pb-6">
                  <p className="text-brand-grey text-base font-light leading-relaxed mb-6">
                    Meticulously crafted from premium materials, this piece embodies the essence of our SS 2025 collection. Designed with a timeless silhouette, it offers both unparalleled comfort and effortless elegance.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-light text-brand-grey">
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-3"></span> Regular fit</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-3"></span> Premium stitching</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-3"></span> Made in Italy</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-3"></span> SS 2026 Release</li>
                  </ul>
                </div>
              </AccordionItem>
              <AccordionItem
                title="Fabric & Care"
                isOpen={openAccordion === 'fabric'}
                onClick={() => toggleAccordion('fabric')}
              >
                <div className="pb-6 text-base font-light text-brand-grey leading-relaxed">
                  <p>100% Premium Organic Cotton.</p>
                  <p className="mt-4">Dry clean only to maintain fabric integrity. Iron on low heat if necessary. Do not tumble dry.</p>
                </div>
              </AccordionItem>
              <AccordionItem
                title="Shipping & Returns"
                isOpen={openAccordion === 'shipping'}
                onClick={() => toggleAccordion('shipping')}
              >
                <div className="pb-6 text-base font-light text-brand-grey leading-relaxed">
                  <p>Complimentary standard shipping on all orders over Rs. 5,000.</p>
                  <p className="mt-4">Returns are accepted within 14 days of delivery. <Link to="/shipping" className="text-brand-gold font-bold underline ml-1">View our full policy</Link>.</p>
                </div>
              </AccordionItem>
            </div>

          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-brand-navy mb-4 tracking-tight">You May Also Like</h2>
              <div className="w-16 h-[1px] bg-brand-gold mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      {/* Custom Alert Popup */}
      <AlertPopup
        isOpen={alertInfo.isOpen}
        onClose={() => setAlertInfo({ ...alertInfo, isOpen: false })}
        message={alertInfo.message}
      />
    </div>
  );
};

export default ProductDetail;
