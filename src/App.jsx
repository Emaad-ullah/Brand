import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import SpecialCollection from './pages/SpecialCollection';
import Favourites from './pages/Favourites';
import Login from './pages/Login';
import ScrollToTop from './components/ScrollToTop';
import { FavouritesProvider } from './context/FavouritesContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavouritesProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/men" element={<CategoryPage category="men" />} />
              <Route path="/women" element={<CategoryPage category="women" />} />
              <Route path="/junior" element={<CategoryPage category="junior" />} />
              <Route path="/new-arrivals" element={<SpecialCollection type="new-arrivals" />} />
              <Route path="/sale" element={<SpecialCollection type="sale" />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
        </FavouritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
