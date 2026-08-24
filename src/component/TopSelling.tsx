import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import star1Img from "../assets/star1.png"; 
import star4Img from "../assets/star4.png"; 

interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
}

interface StarRatingProps {
  rating?: number;
}

const StarRating = ({ rating = 0 }: StarRatingProps) => {
  const stars: React.ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <img key={i} src={star1Img} alt="full star" className="h-3.5 sm:h-4 w-auto object-contain" />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <img key={i} src={star4Img} alt="half star" className="h-3.5 sm:h-4 w-auto object-contain" />
      );
    } else {
      stars.push(
        <img key={i} src={star1Img} alt="empty star" className="h-3.5 sm:h-4 w-auto object-contain opacity-25 grayscale" />
      );
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>;
};

const TopSelling = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://dummyjson.com/products");
        
        if (!response.ok) {
          throw new Error("Failed to fetch top selling products.");
        }
        
        const data = await response.json();
        setProducts(data.products);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load products. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <section className="py-8 sm:py-12 px-4 md:px-16 lg:px-24 max-w-7xl mx-auto border-t border-black/10">
      <h2 className="font-integral-cf font-bold text-3xl md:text-[48px] leading-none text-center mb-8 sm:mb-10 md:mb-14 text-black"> 
        TOP SELLING  
      </h2>
      
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <p className="text-lg font-medium text-black/60">Loading products...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="flex justify-center items-center py-10">
          <p className="text-lg font-medium text-red-500">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 md:gap-8">
          {displayedProducts.map((product) => {
            const discountedPrice = (
              product.price * (1 - product.discountPercentage / 100)
            ).toFixed(2);

            return (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id} 
                className="flex flex-col cursor-pointer group"
              >
                <div className="rounded-[14px] sm:rounded-[20px] bg-[#F0EEED] aspect-square w-full flex items-center justify-center overflow-hidden mb-2.5 sm:mb-4 p-3 sm:p-4">
                  <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                
                <h3 className="font-bold text-sm sm:text-base md:text-lg text-black truncate mb-1"> 
                  {product.title}
                </h3>
                
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <StarRating rating={product.rating} />
                  <span className="text-xs sm:text-sm font-normal text-black/60">
                    {product.rating ? product.rating.toFixed(1) : "0.0"}/<span className="text-black/40">5</span>
                  </span>
                </div>
                
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-base sm:text-xl md:text-2xl font-bold text-black"> 
                    ${discountedPrice}
                  </span>

                  <span className="text-sm sm:text-lg md:text-xl font-bold text-black/40 line-through">
                    ${product.price}
                  </span>

                  {product.discountPercentage > 0 && (
                    <span className="text-[10px] sm:text-xs font-medium text-[#FF3333] bg-[#FF3333]/10 px-2 py-0.5 rounded-full">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {!isLoading && !error && products.length > 4 && (
        <div className="mt-8 sm:mt-12 flex justify-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-full sm:w-[218px] py-3.5 sm:py-4 rounded-full border border-black/10 text-black font-medium text-sm sm:text-base hover:bg-black hover:text-white transition-all duration-300"
          > 
            {showAll ? "View Less" : "View All"}
          </button>
        </div>
      )}
    </section>
  );
};

export default TopSelling;