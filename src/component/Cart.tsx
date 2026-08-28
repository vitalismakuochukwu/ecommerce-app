import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

import hetIcon from '../assets/het.png';
import deleteIcon from '../assets/delete.png';
import tagIcon from '../assets/mre.png';
import arrowIcon from '../assets/per.png';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.2; 
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center font-['Satoshi',sans-serif] px-4 bg-white">
        <h2 className="text-2xl font-bold mb-4 text-black">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/')} 
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/80 transition-colors font-medium text-[16px]"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] pt-6 md:pt-10 pb-32 lg:pb-48 font-['Satoshi',sans-serif] bg-white">
      
      <nav className="flex items-center gap-1 md:gap-3 mb-6 font-['Satoshi',sans-serif] text-[14px] md:text-[16px] leading-[100%]">
        <span className="text-[#00000099] font-normal cursor-pointer hover:text-black transition-colors" onClick={() => navigate('/')}>Home</span>
        <img src={hetIcon} alt="Arrow" className="w-4 h-4 object-contain" />
        <span className="text-black font-normal">Cart</span>
      </nav>

      <h1 className="font-['Integral_CF',sans-serif] font-bold text-3xl md:text-[40px] leading-[100%] uppercase mb-6 md:mb-8 text-black">
        YOUR CART
      </h1>

      <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
        
        <div className="flex-1 border border-[#0000001A] rounded-[20px] p-4 md:p-6 flex flex-col gap-6">
          {cartItems.map((item, index) => (
            <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex gap-4 border-b border-[#0000001A] pb-6 last:border-b-0 last:pb-0">
              <div className="w-[100px] h-[100px] md:w-[124px] md:h-[124px] bg-[#F0EEED] rounded-[8.6px] flex-shrink-0 flex items-center justify-center overflow-hidden p-2">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[16px] md:text-[20px] leading-[100%] text-black mb-1 md:mb-2 truncate max-w-[150px] md:max-w-[300px]">
                      {item.title}
                    </h3>
                    <p className="text-[12px] md:text-[14px] leading-[100%] text-black mt-1.5">
                      Size: <span className="text-[#00000099]">{item.size}</span>
                    </p>
                    <div className="text-[12px] md:text-[14px] leading-[100%] text-black flex items-center gap-1 mt-1.5">
                      Color: <span className="text-[#00000099] capitalize">{item.color}</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.size, item.color)} className="p-1 transition-opacity hover:opacity-70" aria-label="Remove item">
                    <img src={deleteIcon} alt="Delete" className="w-6 h-6 object-contain" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-[20px] md:text-[24px] leading-[100%] text-black">
                    ${item.price.toFixed(0)}
                  </span>
                  
                  <div className="flex items-center justify-between w-[100px] md:w-[126px] h-[36px] md:h-[44px] bg-[#F0EEED] rounded-[62px] px-3 md:px-4">
                    <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="text-lg md:text-xl font-medium text-black hover:opacity-70">−</button>
                    <span className="text-[14px] md:text-[16px] font-medium text-black">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="text-lg md:text-xl font-medium text-black hover:opacity-70">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-[505px] border border-[#0000001A] rounded-[20px] p-5 md:p-6 h-fit">
          <h2 className="font-bold text-[20px] md:text-[24px] leading-[100%] text-black mb-6">
            Order Summary
          </h2>
          
          <div className="flex flex-col gap-4 md:gap-5 border-b border-[#0000001A] pb-6">
            <div className="flex justify-between items-center">
              <span className="text-[16px] md:text-[20px] text-[#00000099] leading-[100%] font-normal">Subtotal</span>
              <span className="font-bold text-[16px] md:text-[20px] text-black leading-[100%]">${subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[16px] md:text-[20px] text-[#00000099] leading-[100%] font-normal">Discount (-20%)</span>
              <span className="font-bold text-[16px] md:text-[20px] text-[#FF3333] leading-[100%]">-${discount.toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[16px] md:text-[20px] text-[#00000099] leading-[100%] font-normal">Delivery Fee</span>
              <span className="font-bold text-[16px] md:text-[20px] text-black leading-[100%]">${deliveryFee}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-5 mb-6">
            <span className="text-[16px] md:text-[20px] text-black leading-[100%] font-normal">Total</span>
            <span className="font-bold text-[20px] md:text-[24px] text-black leading-[100%]">${total.toFixed(0)}</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 flex items-center bg-[#F0F0F0] rounded-[62px] px-4 py-3 gap-3 h-[48px]">
              <img src={tagIcon} alt="Tag" className="w-6 h-6 object-contain opacity-40 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Add promo code" 
                className="bg-transparent w-full h-full outline-none text-[16px] text-black placeholder:text-[#00000066] font-normal leading-[100%]" 
              />
            </div>
            <button className="bg-black text-white px-6 md:px-8 h-[48px] rounded-[62px] text-[16px] font-medium leading-[100%] hover:bg-black/80 transition-colors flex-shrink-0">
              Apply
            </button>
          </div>
          <button className="w-full h-[54px] md:h-[60px] bg-black text-white rounded-[62px] text-[16px] font-medium leading-[100%] hover:bg-black/80 transition-colors flex items-center justify-center gap-3">
            Go to Checkout 
            <img src={arrowIcon} alt="Arrow" className="w-6 h-6 object-contain" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;