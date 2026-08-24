import { Routes, Route } from 'react-router-dom'; 
import { CartProvider } from './context/CartContext';

import Navbar from './component/Navbar';
import Hero from './component/Hero';
import NewArrivals from './component/NewArrivals';
import TopSelling from './component/TopSelling'; 
import DressStyle from './component/DressStyle';
import HappyCustomers from './component/Happy';
// import Newsletter from './component/Newsletter';
import Footer from './component/Footer';
import ProductDetails from './component/ProductDetails';
import SearchResults from './component/SearchResults'; 
import Cart from './component/Cart';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Hero />
                  <NewArrivals />
                  <TopSelling />
                  <DressStyle />
                  <HappyCustomers/>
                </>
              } 
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}