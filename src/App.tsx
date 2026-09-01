// src/App.tsx
import { Routes, Route } from 'react-router-dom'; 
import { CartProvider } from './context/CartContext';

import Navbar from './component/Navbar';
import Hero from './component/Hero';
import NewArrivals from './component/NewArrivals';
import TopSelling from './component/TopSelling'; 
import DressStyle from './component/DressStyle';
import HappyCustomers from './component/Happy';
import Footer from './component/Footer';
import ProductDetails from './component/ProductDetails';
import SearchResults from './component/SearchResults'; 
import Cart from './component/Cart';

import Signup from './component/Signup';
import Login from './component/Login';
import Dashboard from './component/Dashboard';


export default function App(){
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
                  <HappyCustomers />
                </>
              } 
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} /> 
            
            {/* Auth and Dashboard Routes */}
            <Route path="/login" element={<Login/>} /> 
            <Route path="/signup" element={<Signup/>} /> 
            <Route path="/dashboard" element={<Dashboard/>} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}