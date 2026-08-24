import React from "react";
import greenIcon from '../assets/green.png';
import starIcon from '../assets/star4.png';
import arrow1Icon from '../assets/arrow1.png'; 
import arrow2Icon from '../assets/arrow2.png'; 

const reviews = [
  {Rating: 1,name: "Sarah M.",text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`, },
  {Rating: 2,name: "Alex K.",text: `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."`, },
  {Rating: 3,name: "James L.",text: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."`, },
];

const HappyCustomers = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-16 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-end justify-between mb-8 md:mb-10">
        <h2 className="font-integral-cf font-bold text-3xl md:text-[48px] leading-none text-black uppercase tracking-normal">  OUR HAPPY CUSTOMERS</h2>
        <div className="hidden md:flex gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <img  src={arrow1Icon}  alt="Previous" className="w-[24px] h-[24px] object-contain"  />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <img src={arrow2Icon} alt="Next" className="w-[24px] h-[24px] object-contain"  />
          </button>
        </div>
      </div>

      <div className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
        {reviews.map((review) => (
          <div 
            key={review.Rating} 
            className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] snap-center border border-[#0000001A] rounded-[20px] p-6 md:p-8">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <img  key={i} src={starIcon}  alt="Star"  className="w-[20px] h-[20px] object-contain" />  ))}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-satoshi font-bold text-lg md:text-[20px] text-black leading-none"> {review.name} </h3>
              <img  src={greenIcon}  alt="Verified Customer" className="w-[24px] h-[24px] object-contain" /></div>
            <p className="font-satoshi font-normal text-sm md:text-base text-[#00000099] leading-[22px]"> {review.text} </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HappyCustomers;