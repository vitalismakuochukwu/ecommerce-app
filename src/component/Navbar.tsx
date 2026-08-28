import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import closeIcon from '../assets/term.png'; 
import searchIcon from '../assets/setting.png'; 
import cartIcon from '../assets/cart.png';
import userIcon from '../assets/user.png';
import menuIcon from '../assets/ham.png'; 

const Navbar = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); 
  
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  
  const cartItemsCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setIsMobileSearchOpen(false);
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full font-sans sticky top-0 z-50 bg-white">
      {isBannerVisible && (
        <div className="w-full h-[38px] bg-black text-white flex items-center justify-center relative px-4 text-center">
          <p className="text-xs sm:text-sm font-light">
            Sign up and get 20% off to your first order.{' '}
            <a href="#" className="font-medium underline underline-offset-4 hover:text-gray-300 transition-colors">
              Sign Up Now
            </a>
          </p>
          <button 
            type="button"
            onClick={() => setIsBannerVisible(false)}
            className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
            aria-label="Close banner"
          >
            <img src={closeIcon} alt="Close banner" className="w-4 h-4 object-contain invert brightness-0" />
          </button>
        </div>
      )}

      <header className="flex items-center justify-between px-4 sm:px-8 lg:px-[100px] py-4 lg:py-5 border-b border-[#0000001A] bg-white relative z-50">
        <div className="flex items-center gap-4 lg:gap-10">
          <button 
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setIsMobileSearchOpen(false);
            }} 
            className="lg:hidden p-1 hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            <img 
              src={isMobileMenuOpen ? closeIcon : menuIcon} 
              alt="Menu" 
              className={`w-6 h-6 object-contain ${isMobileMenuOpen ? 'brightness-0' : ''}`} 
            />
          </button>

          <button onClick={() => navigate('/')} className="font-black text-[25px] lg:text-[32px] leading-none tracking-tight">
            SHOP.CO
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            <a 
              href="#shop" 
              onClick={(e) => scrollToSection(e, 'shop')} 
              className="flex items-center gap-1.5 text-base hover:text-gray-600 transition-colors"
            >
              Shop <span className="text-xs">▼</span>
            </a>
            <a 
              href="#on-sale" 
              onClick={(e) => scrollToSection(e, 'on-sale')} 
              className="text-base hover:text-gray-600 transition-colors"
            >
              On Sale
            </a>
            <a 
              href="#new-arrivals" 
              onClick={(e) => scrollToSection(e, 'new-arrivals')} 
              className="text-base hover:text-gray-600 transition-colors"
            >
              New Arrivals
            </a>
            <a 
              href="#brands" 
              onClick={(e) => scrollToSection(e, 'brands')} 
              className="text-base hover:text-gray-600 transition-colors"
            >
              Brands
            </a>
          </nav>
        </div>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-[577px] mx-8 h-[48px] items-center gap-3 bg-[#F0F0F0] rounded-full px-4 focus-within:ring-1 focus-within:ring-black/20 transition-all">
          <img src={searchIcon} alt="Search" className="w-5 h-5 opacity-40" />
          <input 
            type="text" 
            placeholder="Search for products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full bg-transparent outline-none text-base placeholder:text-[#00000066] text-black" 
          />
        </form>

        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <button 
            type="button"
            onClick={() => {
              setIsMobileSearchOpen(!isMobileSearchOpen);
              setIsMobileMenuOpen(false);
            }} 
            className="lg:hidden p-1 hover:opacity-70 transition-opacity"
            aria-label="Toggle search"
          >
            <img src={searchIcon} alt="Search" className="w-6 h-6 object-contain" />
          </button>
          
          <button onClick={() => navigate('/cart')} className="relative p-1 hover:opacity-70 transition-opacity group">
            <img src={cartIcon} alt="Cart" className="w-6 h-6 object-contain transition-transform group-hover:scale-110" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white translate-x-1 -translate-y-1">
                {cartItemsCount}
              </span>
            )}
          </button>
          
          <button className="p-1 hover:opacity-70 transition-opacity group">
            <img src={userIcon} alt="User" className="w-6 h-6 object-contain transition-transform group-hover:scale-110" />
          </button>
        </div>
      </header>
      {isMobileSearchOpen && (
        <div className="lg:hidden w-full bg-white border-b border-[#0000001A] p-4 shadow-sm relative z-40">
          <form onSubmit={handleSearch} className="flex h-[44px] items-center gap-3 bg-[#F0F0F0] rounded-full px-4 w-full">
            <img src={searchIcon} alt="Search" className="w-5 h-5 opacity-40 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full h-full bg-transparent outline-none text-base placeholder:text-[#00000066] text-black" 
            />
          </form>
        </div>
      )}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#0000001A] shadow-xl py-4 px-6 flex flex-col gap-5 z-40">
          <a 
            href="#shop" 
            onClick={(e) => scrollToSection(e, 'shop')} 
            className="text-lg font-medium text-black hover:text-gray-600 transition-colors"
          >
            Shop
          </a>
          <a 
            href="#on-sale" 
            onClick={(e) => scrollToSection(e, 'on-sale')} 
            className="text-lg font-medium text-black hover:text-gray-600 transition-colors"
          >
            On Sale
          </a>
          <a 
            href="#new-arrivals" 
            onClick={(e) => scrollToSection(e, 'new-arrivals')} 
            className="text-lg font-medium text-black hover:text-gray-600 transition-colors"
          >
            New Arrivals
          </a>
          <a 
            href="#brands" 
            onClick={(e) => scrollToSection(e, 'brands')} 
            className="text-lg font-medium text-black hover:text-gray-600 transition-colors"
          >
            Brands
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;