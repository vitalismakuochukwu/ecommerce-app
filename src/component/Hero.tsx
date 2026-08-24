import React from 'react';

// Hero Assets
import heroImage from '../assets/face.png'; 
import starIcon from '../assets/star.png';

// Brand Logos
import versaceLogo from '../assets/vers.png';
import zaraLogo from '../assets/zara.png';
import gucciLogo from '../assets/gucci.png';
import pradaLogo from '../assets/prada.png';
import calvinKleinLogo from '../assets/klen.png';

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      
      <section className="relative bg-[#F2F0F1] pt-6 md:pt-10 lg:pt-16 overflow-hidden">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-[100px] flex flex-col lg:flex-row items-center lg:items-stretch justify-between">
        
          <div className="w-full lg:max-w-[580px] z-10 flex flex-col items-start pt-2 lg:pt-4 pb-10 lg:pb-[80px]">
            
            <h1 className="font-extrabold text-[36px] sm:text-[48px] lg:text-[64px] leading-[1] text-black tracking-[-0.03em] mb-5 lg:mb-8 text-left uppercase">   FIND CLOTHES THAT MATCHES YOUR STYLE </h1>
            
            <p className="font-sans text-black/60 text-[14px] sm:text-base leading-[20px] lg:leading-[22px] mb-6 lg:mb-8 max-w-[545px] text-left">     Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.  </p>
            
            <a   href="#shop"   className="w-full sm:w-auto inline-flex items-center justify-center bg-black text-white font-medium text-base rounded-[62px] px-[54px] py-[16px] hover:bg-gray-800 transition-all duration-200 mb-8 lg:mb-12 shadow-sm"> Shop Now </a>
            
            <div className="w-full flex flex-wrap lg:flex-nowrap items-center justify-center sm:justify-start gap-y-4">
              
              <div className="flex flex-col text-left pr-6 sm:pr-8">
                <h3 className="font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-none text-black mb-1">  200+ </h3>
                <p className="text-[12px] sm:text-[14px] text-black/60 leading-tight">   International Brands  </p></div>
              
              <div className="w-[1px] h-[48px] lg:h-[74px] bg-black/10"></div>
                <div className="flex flex-col text-left px-6 sm:px-8">
                <h3 className="font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-none text-black mb-1">  2,000+ </h3>
                <p className="text-[12px] sm:text-[14px] text-black/60 leading-tight"> High-Quality Products </p>
              </div>

              <div className="hidden lg:block w-[1px] h-[74px] bg-black/10"></div>

              <div className="w-full lg:w-auto flex justify-center lg:justify-start lg:pl-8 mt-2 lg:mt-0">
                <div className="flex flex-col text-center lg:text-left">
                  <h3 className="font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-none text-black mb-1">
                    30,000+
                  </h3>
                  <p className="text-[12px] sm:text-[14px] text-black/60 leading-tight">
                    Happy Customers
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="relative w-full lg:w-[600px] flex justify-center lg:justify-end items-end mt-10 lg:mt-0">
            
            <img  src={heroImage}  alt="Models wearing stylish clothes" className="w-full max-w-[380px] sm:max-w-[450px] scale-125 sm:scale-[1.15] lg:max-w-none object-contain object-bottom relative z-10 block m-0 p-0"  />
          <img   src={starIcon}   alt=""  aria-hidden="true"  className="absolute left-[6%] top-[35%] lg:left-[2%] lg:top-[40%] w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] z-20 object-contain select-none pointer-events-none" />
          <img src={starIcon}    alt=""    aria-hidden="true"   className="absolute right-[5%] top-[6%] lg:right-[5%] lg:top-[10%] w-[76px] h-[76px] sm:w-[104px] sm:h-[104px] z-20 object-contain select-none pointer-events-none" /></div>

        </div>
      </section>
      <div className="w-full bg-black relative z-20 -mt-4 sm:-mt-10 lg:-mt-10">
        <div className="hidden md:flex max-w-[1440px] mx-auto px-8 lg:px-[100px] h-[100px] lg:h-[122px] items-center justify-between gap-8">
          <img src={versaceLogo} alt="Versace" className="max-h-[24px] lg:max-h-[30px] w-auto object-contain brightness-0 invert" />
          <img src={zaraLogo} alt="Zara" className="max-h-[26px] lg:max-h-[34px] w-auto object-contain brightness-0 invert" />
          <img src={gucciLogo} alt="Gucci" className="max-h-[24px] lg:max-h-[30px] w-auto object-contain brightness-0 invert" />
          <img src={pradaLogo} alt="Prada" className="max-h-[20px] lg:max-h-[26px] w-auto object-contain brightness-0 invert" />
          <img src={calvinKleinLogo} alt="Calvin Klein" className="max-h-[22px] lg:max-h-[28px] w-auto object-contain brightness-0 invert" />
        </div>
        <div className="flex md:hidden flex-col items-center justify-center py-8 px-6 gap-y-6 w-full">
          <div className="flex items-center justify-between w-full max-w-[400px]">
            <img src={versaceLogo} alt="Versace" className="max-h-[18px] sm:max-h-[22px] w-auto object-contain brightness-0 invert" />
            <img src={zaraLogo} alt="Zara" className="max-h-[20px] sm:max-h-[24px] w-auto object-contain brightness-0 invert" />
            <img src={gucciLogo} alt="Gucci" className="max-h-[18px] sm:max-h-[22px] w-auto object-contain brightness-0 invert" />
          </div>
          <div className="flex items-center justify-center gap-12 w-full max-w-[400px]">
            <img src={pradaLogo} alt="Prada" className="max-h-[16px] sm:max-h-[20px] w-auto object-contain brightness-0 invert" />
            <img src={calvinKleinLogo} alt="Calvin Klein" className="max-h-[18px] sm:max-h-[22px] w-auto object-contain brightness-0 invert" />
          </div>

        </div>
      </div>

    </div>
  );
};

export default Hero;