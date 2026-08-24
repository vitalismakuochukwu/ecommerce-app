import React from "react";
import twitterIcon from "../assets/twitter.png";
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/histagram.png";
import githubIcon from "../assets/tome.png";
import visaIcon from "../assets/visa.png";
import mastercardIcon from "../assets/mon.png";
import paypalIcon from "../assets/paypal.png";
import applePayIcon from "../assets/opay.png";
import googlePayIcon from "../assets/gpay.png";

// Email icon for input
import emailIcon from "../assets/mess.png";

const Footer = () => {
  return (
    <footer className="relative bg-[#F0F0F0] mt-24 md:mt-32 pb-12 px-4 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="transform -translate-y-1/2 bg-black text-white rounded-[20px] md:rounded-[20px] px-6 py-8 md:px-16 md:py-9 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-12">
          <h2 className="font-integral-cf font-bold text-[32px] md:text-[40px] leading-[35px] md:leading-[45px] max-w-xl text-left tracking-normal uppercase w-full lg:w-auto">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <form className="w-full lg:w-[349px] flex flex-col gap-3">
            <div className="relative bg-white rounded-full h-[48px] px-4 flex items-center gap-3 w-full">
              <img src={emailIcon} alt="email" className="w-5 h-5 object-contain" />
              <input   type="email"   placeholder="Enter your email address"  className="w-full bg-transparent outline-none text-black font-satoshi text-sm placeholder:text-black/40" />
            </div>
            <button   type="submit"  className="w-full h-[48px] bg-white text-black font-satoshi font-medium text-sm rounded-full hover:bg-gray-100 transition-colors"  >   Subscribe to Newsletter </button>
          </form>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between gap-y-10 md:gap-x-8 pb-12 border-b border-black/10 -mt-4 md:-mt-2">
          <div className="flex flex-col gap-6 md:w-[248px]">
            <h2 className="font-integral-cf font-bold text-[33.45px] leading-[100%] text-[#000000] tracking-[0%] m-0 uppercase">   SHOP.CO    </h2>
            
            <p className="w-[248px] h-[66px] font-satoshi font-normal text-[14px] leading-[22px] text-[#00000099] m-0">  We have clothes that suits your style and which you’re proud to wear. From women to men. </p>
            
            <div className="flex items-center gap-3">
              <a href="#" className="w-[28px] h-[28px] rounded-full border-[1px] border-[#00000033] bg-white flex items-center justify-center hover:bg-black group transition-colors">
                <img  src={twitterIcon}  alt="Twitter"  className="w-[14px] h-[14px] object-contain" />
              </a>
              <a href="#" className="w-[28px] h-[28px] rounded-full bg-[#000000] flex items-center justify-center hover:opacity-80 transition-opacity">
                <img   src={facebookIcon}   alt="Facebook"   className="w-[14px] h-[14px] object-contain"  /></a>
              <a href="#" className="w-[28px] h-[28px] rounded-full border-[1px] border-[#00000033] bg-white flex items-center justify-center hover:bg-black group transition-colors">
                <img   src={instagramIcon}  alt="Instagram"  className="w-[14px] h-[14px] object-contain group-hover:brightness-0 group-hover:invert"  />
              </a>
              <a href="#" className="w-[28px] h-[28px] rounded-full border-[1px] border-[#00000033] bg-white flex items-center justify-center hover:bg-black group transition-colors">
                <img  src={githubIcon}  alt="Github"  className="w-[14px] h-[14px] object-contain group-hover:brightness-0 group-hover:invert" />
              </a>
            </div>
          </div>

          {/* Columns 2-5: Link Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-x-8 md:justify-items-center">
            
            {/* COMPANY */}
            <div className="flex flex-col gap-4">
              <h3 className="w-[98px] h-[18px] font-satoshi font-medium text-[16px] leading-[18px] tracking-[3px] text-[#000000] uppercase">
                Company
              </h3>
              <ul className="flex flex-col gap-4 w-[104px] font-satoshi font-normal text-[16px] leading-[19px] text-[#00000099]">
                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Works</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Career</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="w-[98px] h-[18px] font-satoshi font-medium text-[16px] leading-[18px] tracking-[3px] text-[#000000] uppercase">  Help </h3>
              <ul className="flex flex-col gap-4 w-[140px] font-satoshi font-normal text-[16px] leading-[19px] text-[#00000099]">
                <li><a href="#" className="hover:text-black transition-colors">Customer Support</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Delivery Details</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="w-[98px] h-[18px] font-satoshi font-medium text-[16px] leading-[18px] tracking-[3px] text-[#000000] uppercase">FAQ  </h3>
              <ul className="flex flex-col gap-4 w-[140px] font-satoshi font-normal text-[16px] leading-[19px] text-[#00000099]">
                <li><a href="#" className="hover:text-black transition-colors">Account</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Manage Deliveries</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Orders</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Payments</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="h-[18px] font-satoshi font-medium text-[16px] leading-[18px] tracking-[3px] text-[#000000] uppercase"> Resources </h3>
              <ul className="flex flex-col gap-4 w-[140px] font-satoshi font-normal text-[16px] leading-[19px] text-[#00000099]">
                <li><a href="#" className="hover:text-black transition-colors">Free eBooks</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Development Tutorial</a></li>
                <li><a href="#" className="hover:text-black transition-colors">How to - Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Youtube Playlist</a></li>
              </ul>
            </div>
           </div>
        </div>
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-satoshi font-normal text-[14px] leading-[19px] text-[#00000099] text-center md:text-left m-0">  Shop.co © 2000-2023, All Rights Reserved </p>
          s
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="w-[46.61px] h-[30.03px] border-[0.22px] border-black/10 rounded-[5.38px] bg-[#FFFFFF] flex items-center justify-center">
              <img src={visaIcon} alt="Visa" className="w-[34px] h-[20px] object-contain" />
            </div>
            <div className="w-[46.61px] h-[30.03px] border-[0.22px] border-black/10 rounded-[5.38px] bg-[#FFFFFF] flex items-center justify-center">
              <img src={mastercardIcon} alt="Mastercard" className="w-[34px] h-[20px] object-contain" />
            </div>
            <div className="w-[46.61px] h-[30.03px] border-[0.22px] border-black/10 rounded-[5.38px] bg-[#FFFFFF] flex items-center justify-center">
              <img src={paypalIcon} alt="PayPal" className="w-[34px] h-[20px] object-contain" />
            </div>
            <div className="w-[46.61px] h-[30.03px] border-[0.22px] border-black/10 rounded-[5.38px] bg-[#FFFFFF] flex items-center justify-center">
              <img src={applePayIcon} alt="Apple Pay" className="w-[34px] h-[20px] object-contain" />
            </div>
            <div className="w-[46.61px] h-[30.03px] border-[0.22px] border-black/10 rounded-[5.38px] bg-[#FFFFFF] flex items-center justify-center">
              <img src={googlePayIcon} alt="Google Pay" className="w-[34px] h-[20px] object-contain" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;