import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';
import { FiChevronRight, FiFilter, FiPlus, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { addProduct } from '../services/api';

const CategoryPage = ({ category }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSubCategories, setActiveSubCategories] = useState([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [shuffleKey, setShuffleKey] = useState(0);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    category: category !== 'all' ? category : 'men', 
    subCategory: 'Shirts', 
    price: '', 
    image: '',
    closeImage: '',
    variants: [{ name: 'black', hex: '#000000', image: '', closeImage: '' }]
  });

  const handleImageUpload = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleAddVariant = () => {
    setNewProduct({
      ...newProduct,
      variants: [...newProduct.variants, { name: '', hex: '#000000', image: '', closeImage: '' }]
    });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[index][field] = value;
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productPayload = {
        id: Date.now(),
        name: newProduct.name,
        category: newProduct.category,
        subCategory: newProduct.subCategory,
        price: Number(newProduct.price),
        image: newProduct.image,
        closeImage: newProduct.closeImage,
        colors: newProduct.variants.map(v => v.hex),
        colorDetails: newProduct.variants.map(v => ({ name: v.name, hex: v.hex })),
        images: newProduct.variants.reduce((acc, v) => {
          acc[v.name.toLowerCase()] = { front: v.image, close: v.closeImage };
          return acc;
        }, {}),
        sizes: ["S", "M", "L"],
        tags: ["New Arrival"]
      };

      const res = await addProduct(productPayload);
      if (res.ok) {
        window.location.reload();
      } else {
        alert('Failed to add product');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  let categoryProducts = category === 'all'
    ? products.filter(p => !p.tags.includes('Sale'))
    : products.filter(p => p.category === category && !p.tags.includes('Sale'));

  if (category === 'women' || category === 'men' || category === 'junior') {
    const allOfCategory = products.filter(p => p.category.toLowerCase() === category.toLowerCase() && !p.tags.includes('Sale'));
    const pantsProducts = allOfCategory.filter(p => p.subCategory.toLowerCase() === 'pants').slice(0, 20);
    const shirtProducts = allOfCategory.filter(p => p.subCategory.toLowerCase() === 'shirts').slice(0, 20);
    const winterProducts = allOfCategory.filter(p => p.subCategory.toLowerCase() === 'winter wear').slice(0, 20);

    if (activeCategoryFilter === 'All') {
      const combined = [...shirtProducts, ...pantsProducts, ...winterProducts];
      categoryProducts = combined.length > 0 ? combined : allOfCategory;
    } else if (activeCategoryFilter === 'Shirts') {
      categoryProducts = shirtProducts;
    } else if (activeCategoryFilter === 'Pants') {
      categoryProducts = pantsProducts;
    } else if (activeCategoryFilter === 'Winter Wear') {
      categoryProducts = winterProducts;
    }
  }

  if (category !== 'women' && category !== 'men' && category !== 'junior' && activeSubCategories.length > 0) {
    categoryProducts = categoryProducts.filter(p => activeSubCategories.includes(p.subCategory));
  }

  const handleSubCategoryToggle = (subCat) => {
    setActiveSubCategories(prev =>
      prev.includes(subCat)
        ? prev.filter(c => c !== subCat)
        : [...prev, subCat]
    );
  };

  const title = category === 'all' ? 'All Collections' : `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection`;

  return (
    <div className="w-full pt-0">

      {/* Top Banner */}
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden z-0">

        {category === 'men' && (
          <img
            src="/images/Men/men-sectionbackground/men-background-images4.jpg"
            alt="Men's Background"
            className="w-full h-full object-cover object-[70%_top]"
          />
        )}
        {category === 'women' && (
          <img
            src="/images/Women/women-bakgrond/womensection3-background.jpg"
            alt="Women's Background"
            className="w-full h-full object-cover object-[60%_top]"
          />
        )}
        {category === 'junior' && (
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="/images/junior/children-section-background/background image4.webp"
            alt={`${category} collection`}
            className="w-full h-full object-cover object-center"
          />
        )}

        {/* Text Overlay — centered */}
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white mb-3 tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] text-center"
            >
              {title}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-[1.5px] bg-brand-gold mx-auto mb-4 shadow-2xl"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white font-sans uppercase tracking-[4px] md:tracking-[6px] text-[11px] md:text-[16px] font-black drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)] text-center"
            >
              {categoryProducts.length} Exceptional Pieces
            </motion.p>
          </div>
        </div>

      </div>

      {/* Main Content */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-24">

          {/* Horizontal Category Filter */}
          {(category === 'women' || category === 'men' || category === 'junior') && (
            <div className="flex gap-6 md:gap-8 mb-10 md:mb-16 justify-center border-b border-gray-100 pb-4 overflow-x-auto">
              {(category === 'junior' ? ['All', 'Shirts', 'Pants', 'Winter Wear'] : ['All', 'Shirts', 'Pants']).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`tracking-[0.2em] uppercase pb-4 transition-all duration-300 relative whitespace-nowrap ${activeCategoryFilter === cat ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <h4 className="text-[15px] md:text-[17px] font-sans font-medium">{cat}</h4>
                  {activeCategoryFilter === cat && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-black"
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Actions Bar */}
          {(category !== 'women' && category !== 'men' && category !== 'junior') && (
            <div className="flex justify-between items-center mb-8 md:mb-12 pb-6 md:pb-8 border-b border-gray-100">
              <div className="hidden sm:flex items-center text-[12px] text-brand-grey font-sans uppercase tracking-[2px]">
                <Link to="/" className="hover:text-brand-navy transition-colors">Home</Link>
                <FiChevronRight className="mx-2" />
                <span className="text-brand-navy font-bold">{category}</span>
              </div>
              <div className="flex items-center space-x-4 md:space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                <p className="text-[11px] md:text-[12px] uppercase tracking-[2px] text-brand-grey font-medium">Showing all results</p>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center space-x-2 md:space-x-3 text-brand-navy uppercase tracking-[2px] text-[11px] md:text-[12px] font-bold border border-brand-navy/20 px-4 md:px-6 py-2 md:py-3 hover:bg-brand-navy hover:text-white transition-all duration-300"
                >
                  <FiFilter size={13} />
                  <span>{isFilterOpen ? 'Close Filters' : 'Filters'}</span>
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* Sidebar Filters */}
            <AnimatePresence>
              {(category !== 'women' && category !== 'men' && category !== 'junior' && (isFilterOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024))) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`w-full lg:w-72 flex-shrink-0 space-y-10 md:space-y-12 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}
                >
                  <div>
                    <h3 className="font-serif text-lg text-brand-navy mb-4 md:mb-6 tracking-wide">Select Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {['S', 'M', 'L'].map(size => (
                        <button key={size} className="w-11 h-11 md:w-12 md:h-12 border border-gray-200 flex items-center justify-center text-[12px] font-bold hover:border-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300">
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-brand-navy mb-4 md:mb-6 tracking-wide">Product Type</h3>
                    <ul className="space-y-3 md:space-y-4">
                      {['Outwear', 'Pants', 'Shirts', 'Knitwear', 'Jackets'].map(cat => (
                        <li key={cat}>
                          <label className="flex items-center space-x-4 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={activeSubCategories.includes(cat)}
                              onChange={() => handleSubCategoryToggle(cat)}
                              className="form-checkbox h-4 w-4 text-brand-navy border-gray-300 focus:ring-brand-gold rounded-none"
                            />
                            <span className="text-[13px] uppercase tracking-[1px] text-brand-grey group-hover:text-brand-navy transition-colors">{cat}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-brand-navy mb-4 md:mb-6 tracking-wide">Price Range</h3>
                    <input type="range" min="0" max="10000" className="w-full accent-brand-gold h-1 bg-gray-100 appearance-none rounded-full" />
                    <div className="flex justify-between text-[12px] uppercase tracking-[1px] text-brand-grey mt-4 font-medium">
                      <span>Rs. 0</span>
                      <span>Rs. 10,000+</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-brand-navy mb-4 md:mb-6 tracking-wide">Palette</h3>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                      {['#1B4332', '#4A4A4A', '#0B1F3A', '#000000', '#C5A46D'].map(color => (
                        <button
                          key={color}
                          className="w-8 h-8 rounded-full border border-gray-100 shadow-sm transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold"
                          style={{ backgroundColor: color }}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif text-brand-navy">Products</h2>
                {/* <button onClick={() => setIsAddModalOpen(true)} className="flex items-center space-x-2 bg-brand-navy text-white px-4 py-2 text-sm uppercase tracking-wider font-bold hover:bg-brand-gold transition-colors">
                  <FiPlus /> <span>Add Product</span>
                </button> */}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:gap-x-6 md:gap-y-12">
                {categoryProducts.map((product, idx) => (
                  <motion.div
                    key={`${product.id}-${shuffleKey}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      onSizeSelect={() => setShuffleKey(prev => prev + 1)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 md:p-8 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-brand-grey hover:text-brand-navy"
            >
              <FiX size={24} />
            </button>
            <h2 className="font-serif text-2xl text-brand-navy mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="flex flex-col space-y-4">
              <div>
                <label className="block text-[12px] uppercase tracking-wider text-brand-grey mb-1">Product Name</label>
                <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border border-gray-300 p-2 focus:outline-none focus:border-brand-navy" />
              </div>
              {category === 'all' && (
                <div>
                  <label className="block text-[12px] uppercase tracking-wider text-brand-grey mb-1">Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full border border-gray-300 p-2 focus:outline-none focus:border-brand-navy">
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="junior">Junior</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-[12px] uppercase tracking-wider text-brand-grey mb-1">Sub-Category</label>
                <select value={newProduct.subCategory} onChange={e => setNewProduct({...newProduct, subCategory: e.target.value})} className="w-full border border-gray-300 p-2 focus:outline-none focus:border-brand-navy">
                  <option value="Shirts">Shirts</option>
                  <option value="Pants">Pants</option>
                  <option value="Winter Wear">Winter Wear</option>
                  <option value="Outwear">Outwear</option>
                  <option value="Knitwear">Knitwear</option>
                  <option value="Jackets">Jackets</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] uppercase tracking-wider text-brand-grey mb-1">Price (Rs.)</label>
                <input required type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border border-gray-300 p-2 focus:outline-none focus:border-brand-navy" />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-[12px] uppercase tracking-wider text-brand-grey mb-1">Default Image</label>
                  <input required type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files[0], base64 => setNewProduct({...newProduct, image: base64}))} className="w-full border border-gray-300 p-1.5 focus:outline-none focus:border-brand-navy text-sm" />
                </div>
                <div className="w-1/2">
                  <label className="block text-[12px] uppercase tracking-wider text-brand-grey mb-1">Default Pair Image</label>
                  <input type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files[0], base64 => setNewProduct({...newProduct, closeImage: base64}))} className="w-full border border-gray-300 p-1.5 focus:outline-none focus:border-brand-navy text-sm" />
                </div>
              </div>

              {/* Variants Section */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-brand-navy">Color Variants</label>
                  <button type="button" onClick={handleAddVariant} className="text-[11px] uppercase tracking-widest text-brand-gold font-bold hover:text-brand-navy">
                    + Add Variant
                  </button>
                </div>
                
                <div className="max-h-48 overflow-y-auto space-y-4 pr-2">
                  {newProduct.variants.map((variant, index) => (
                    <div key={index} className="bg-gray-50 p-3 border border-gray-100">
                      <div className="flex gap-3 mb-2">
                         <div className="flex-1">
                           <input type="text" placeholder="Color Name (e.g. Red)" required value={variant.name} onChange={e => handleVariantChange(index, 'name', e.target.value)} className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:border-brand-navy" />
                         </div>
                         <div className="w-12">
                           <input type="color" value={variant.hex} onChange={e => handleVariantChange(index, 'hex', e.target.value)} className="w-full h-9 cursor-pointer" />
                         </div>
                      </div>
                      <div className="flex gap-3">
                         <div className="w-1/2 relative">
                            <label className="block text-[10px] uppercase text-gray-500 absolute -top-4 left-0">Front</label>
                            <input type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files[0], base64 => handleVariantChange(index, 'image', base64))} className="w-full border border-gray-300 p-1 text-xs focus:outline-none focus:border-brand-navy" />
                         </div>
                         <div className="w-1/2 relative">
                            <label className="block text-[10px] uppercase text-gray-500 absolute -top-4 left-0">Pair</label>
                            <input type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files[0], base64 => handleVariantChange(index, 'closeImage', base64))} className="w-full border border-gray-300 p-1 text-xs focus:outline-none focus:border-brand-navy" />
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="bg-brand-navy text-white uppercase tracking-wider font-bold py-3 mt-4 hover:bg-brand-gold transition-colors">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CategoryPage;