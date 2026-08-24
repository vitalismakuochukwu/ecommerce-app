import React from "react";
import casIcon from '../assets/cas.png';
import formIcon from '../assets/form.png';
import parIcon from '../assets/par.png';
import psIcon from '../assets/ps.png';

const styles = [
  { name: "Casual", image: casIcon, className: "md:col-span-2" },
  { name: "Formal", image: formIcon, className: "md:col-span-3" },
  { name: "Party", image: parIcon, className: "md:col-span-3" },
  { name: "Gym", image: psIcon, className: "md:col-span-2" },
];

const DressStyle = () => {
  return (
    <section className="py-8 sm:py-12 px-4 md:px-16 lg:px-24 max-w-7xl mx-auto">
      <div className="bg-[#F0F0F0] rounded-[24px] md:rounded-[40px] px-6 py-10 md:p-16">
        <h2 className="font-integral-cf font-bold text-3xl md:text-[48px] leading-none tracking-normal text-center mb-8 md:mb-14 text-black uppercase">  BROWSE BY DRESS STYLE </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
          {styles.map((style, index) => (
            <div key={index} className={`relative bg-white rounded-[20px] overflow-hidden group h-[190px] md:h-[289px] ${style.className}`} >
              <h3 className="absolute top-4 left-5 md:top-[25px] md:left-[36px] font-satoshi font-bold text-[24px] md:text-[36px] leading-none text-black z-10">  {style.name} </h3>
          <img src={style.image} alt={style.name}  className="w-full h-full object-cover object-right-top transition-transform duration-300 group-hover:scale-105"/>
            </div>  ))}
        </div>
      </div>
    </section>
  );
};

export default DressStyle;