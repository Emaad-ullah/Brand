import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { products } from '../data/mockData';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  
  const searchResults = query.length > 2 
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white z-[80] overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-end mb-8">
              <button onClick={onClose} className="text-brand-navy hover:text-brand-gold transition-colors flex items-center gap-2 uppercase tracking-widest text-xs font-semibold">
                Close <FiX size={24} />
              </button>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative border-b-2 border-brand-navy mb-12">
                <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-grey" size={24} />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="WHAT ARE YOU LOOKING FOR?"
                  className="w-full py-6 pl-12 pr-4 text-2xl font-serif text-brand-navy focus:outline-none bg-transparent placeholder-gray-300"
                  autoFocus
                />
              </div>

              {query.length > 2 && (
                <div>
                  <h3 className="font-serif text-xs uppercase tracking-widest text-brand-grey mb-6">
                    {searchResults.length} Results Found
                  </h3>
                  
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {searchResults.map(product => (
                        <Link 
                          key={product.id} 
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className="group flex gap-4"
                        >
                          <div className="w-20 h-24 bg-brand-lightNavy flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div>
                            <h4 className="font-serif text-brand-navy group-hover:text-brand-gold transition-colors">{product.name}</h4>
                            <p className="text-brand-grey text-sm mt-1">Rs. {product.price.toLocaleString()}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="font-sans text-2xl text-brand-navy">No results found for "{query}"</p>
                      <p className="text-brand-grey mt-2">Try checking your spelling or use more general terms.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
