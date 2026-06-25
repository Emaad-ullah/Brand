import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';
import { motion } from 'framer-motion';

const SpecialCollection = ({ type }) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const title = type === 'sale' ? 'The Archive Sale' : 'New Arrivals';
  const tagToFilter = type === 'sale' ? 'Sale' : 'New Arrival';

  // Filter products based on tag and horizontal category filter
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const isSaleItem = p.tags.includes('Sale');
      const isNewArrival = p.tags.includes('New Arrival') || p.tags.includes('Trending');
      
      const matchesType = type === 'sale' ? isSaleItem : (isNewArrival && !isSaleItem);
      if (!matchesType) return false;

      const matchesCategory = activeCategoryFilter === 'All' || p.subCategory === activeCategoryFilter;
      return matchesCategory;
    });
  }, [type, tagToFilter, activeCategoryFilter]);

  return (
    <div className="w-full pt-0">

      {/* Top Banner */}
      <div className="relative w-full h-[100vh] md:h-[100vh] overflow-hidden">
        {type === 'new-arrivals' ? (
          <img 
            src="/images/about-section/newarrival-2.jpg" 
            alt="New Arrivals" 
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : type === 'sale' ? (
          <img 
            src="/images/about-section/salesimage2.jpg" 
            alt="Sale" 
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-navy"></div>
        )}
        
        {/* Text Overlay — centered */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-[40px] md:text-[80px] text-white mb-3 tracking-[1px] md:tracking-[2px] drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] text-center font-light uppercase"
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
              className="text-white font-sans uppercase tracking-[2px] md:tracking-[4px] text-[11px] md:text-[14px] font-medium drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)] text-center"
            >
              Curated Selection • {filteredProducts.length} Items
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
          <div className="flex gap-6 md:gap-8 mb-10 md:mb-16 justify-center border-b border-gray-100 pb-4 overflow-x-auto">
            {['All', 'Shirts', 'Pants'].map(cat => (
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

          <div className="w-full">
            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:gap-x-6 md:gap-y-12">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-gray-50 border border-dashed border-gray-200">
                <p className="font-sans text-2xl text-brand-navy uppercase tracking-widest">No Items Found</p>
                <p className="text-brand-grey mt-4 text-xs uppercase tracking-[2px]">Try adjusting your active category.</p>
                <button 
                  onClick={() => setActiveCategoryFilter('All')} 
                  className="mt-8 inline-block text-brand-gold text-[10px] uppercase tracking-[2px] font-bold border-b border-brand-gold pb-1"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SpecialCollection;
