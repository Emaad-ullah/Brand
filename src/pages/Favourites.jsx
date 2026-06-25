import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useFavourites } from '../context/FavouritesContext';
import ProductCard from '../components/ProductCard';

const Favourites = () => {
  const { favourites } = useFavourites();

  if (favourites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <FiHeart size={48} className="text-brand-gold mb-6 opacity-40" />
        <h2 className="font-serif text-[36px] md:text-[42px] text-brand-navy mb-4 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">No Favourites Yet</h2>
        <p className="font-sans text-brand-grey text-[20px] mb-12 tracking-wide text-center max-w-md drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          Items you love will appear here. Start building your personal collection today.
        </p>
        <Link 
          to="/men" 
          className="border border-brand-gold text-brand-gold px-12 py-4 uppercase tracking-[2px] text-[16px] font-bold hover:bg-brand-gold hover:text-white transition-all duration-500 shadow-md"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      {/* Top Banner */}
      <div className="text-center mb-20 px-4">
        <span className="text-brand-gold font-sans uppercase tracking-[4px] text-[16px] md:text-[18px] font-bold mb-4 block drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          Your Collection
        </span>
        <h1 className="font-serif text-[42px] md:text-[66px] text-brand-navy tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]">My Favourites</h1>
        <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-8" />
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {favourites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
