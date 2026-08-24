import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import star1 from "../assets/star1.png";
import star4 from "../assets/star4.png";
import goodIcon from "../assets/good.png";
import mainArrow from "../assets/main.png";
import verifyPng from "../assets/vrerify.png"; 
import dotPng from "../assets/dot.png"; 
import filterPng from "../assets/filter.png"; 
import arrowDownPng from "../assets/arrowdown.png"; 

interface Review {
  id: number;
  rating: number;
  comment?: string;
  date?: string;
  reviewerName?: string;
  reviewerEmail?: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  images: string[];
  reviews?: Review[];
}

const reviewsData = [
  { id: 1, name: 'Samantha D.', text: '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable..."', date: 'August 14, 2023', rating: 4.5 },
  { id: 2, name: 'Alex M.', text: '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch..."', date: 'August 15, 2023', rating: 5 },
  { id: 3, name: 'Ethan R.', text: '"This t-shirt is a must-have for anyone who appreciates good design..."', date: 'August 16, 2023', rating: 4.5 },
  { id: 4, name: 'Olivia P.', text: '"As a UI/UX enthusiast, I value simplicity and functionality..."', date: 'August 17, 2023', rating: 5 },
];

const ProductDetails = () => {
  const { id = "1" } = useParams(); 
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // 2. Apply the Product interface type to state
  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [activeThumb, setActiveThumb] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('Large');
  const [quantity, setQuantity] = useState<number>(1);

  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loadingRecs, setLoadingRecs] = useState<boolean>(true);

  const colors = [
    { id: 0, hex: '#4F4631' },
    { id: 1, hex: '#314F4A' },
    { id: 2, hex: '#31344F' },
  ];
  const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoadingProduct(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data: Product = await res.json();
        
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]); 
          setActiveThumb(0);
        }
        
        fetchRecommendations(data.category);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]); 

  const fetchRecommendations = async (category: string) => {
    try {
      setLoadingRecs(true);
      const res = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await res.json();
      
      const filteredRecs = (data.products || []).filter((p: Product) => p.id !== parseInt(id)).slice(0, 4);
      setRecommendations(filteredRecs);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoadingRecs(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const colorHex = colors.find((c) => c.id === selectedColor)?.hex;
    const discountedPrice = Number(
      (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
    );

    addToCart({
      id: product.id,
      title: product.title,
      price: discountedPrice,
      image: selectedImage,
      size: selectedSize,
      color: colorHex || '#4F4631',
      quantity: quantity
    });

    alert("Product added to cart!");
  };

  if (loadingProduct) {
    return <div className="w-full h-screen flex items-center justify-center font-bold text-xl">Loading product details...</div>;
  }

  if (!product) {
    return <div className="w-full h-screen flex items-center justify-center font-bold text-xl text-red-500">Product not found.</div>;
  }

  const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
  const fullStarsCount = Math.floor(product.rating || 0);
  const hasHalfStar = (product.rating % 1) >= 0.5;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-4 md:py-6 font-['Satoshi',sans-serif] bg-white text-black overflow-hidden">
      
      <nav className="flex items-center gap-1 md:gap-3 mb-5 md:mb-9 text-sm md:text-base leading-none capitalize">
        <span className="text-[#00000099] font-normal cursor-pointer" onClick={() => navigate('/')}>Home</span>
        <img src={mainArrow} alt=">" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain" />
        <span className="text-[#00000099] font-normal cursor-pointer">Shop</span>
        <img src={mainArrow} alt=">" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain" />
        <span className="text-[#00000099] font-normal cursor-pointer">{product.category}</span>
        <img src={mainArrow} alt=">" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain" />
        <span className="text-black font-normal truncate max-w-[150px] sm:max-w-none">{product.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-3.5 w-full lg:w-auto">
          <div className="flex flex-row md:flex-col justify-between md:justify-start gap-3 md:gap-3.5 w-full md:w-auto overflow-x-auto hide-scrollbar">
            {product.images?.map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedImage(thumb);
                  setActiveThumb(idx);
                }}
                className={`flex-1 md:flex-none h-[106px] sm:h-[150px] min-w-[106px] md:w-[152px] md:h-[167px] rounded-[14px] md:rounded-[20px] overflow-hidden bg-[#F0EEED] flex items-center justify-center border-2 transition-all ${
                  activeThumb === idx ? 'border-black' : 'border-transparent hover:border-black/30'
                }`}
              >
                <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-[80%] h-[80%] object-contain mix-blend-multiply" />
              </button>
            ))}
          </div>
          <div className="w-full h-[290px] sm:h-[400px] md:w-[444px] md:h-[530px] rounded-[14px] md:rounded-[20px] bg-[#F0EEED] overflow-hidden flex items-center justify-center p-6">
            <img src={selectedImage} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
          </div>
        </div>

        <div className="w-full max-w-[600px] flex flex-col">
          <h1 className="font-['Integral_CF',sans-serif] font-bold text-2xl md:text-[40px] leading-[28px] md:leading-[100%] tracking-[0%] text-black mb-3 md:mb-3 uppercase">
            {product.title}
          </h1>
          <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-3.5">
            <div className="flex items-center gap-1">
              {[...Array(fullStarsCount)].map((_, i) => (
                <img key={i} src={star4} alt="star" className="w-[18px] h-[18px] md:w-[24.7px] md:h-[24.7px] object-contain" />
              ))}
              {hasHalfStar && (
                <img src={star1} alt="half star" className="w-[18px] h-[18px] md:w-[24.7px] md:h-[24.7px] object-contain" />
              )}
            </div>
            <span className="text-[14px] md:text-[16px] leading-[100%] text-black font-normal mt-1">
              {product.rating} / <span className="text-[#00000099]">5</span>
            </span>
          </div>
          
          <div className="flex items-center gap-3 mb-4 md:mb-3.5">
            <span className="text-2xl md:text-[32px] font-bold leading-[100%] text-black">${discountedPrice}</span>
            <span className="text-2xl md:text-[32px] font-bold leading-[100%] text-[#0000004D] line-through">${product.price}</span>
            <span className="inline-flex items-center justify-center h-[28px] md:h-[34px] px-3 md:px-[14px] rounded-[62px] bg-[#FF33331A] text-[#FF3333] text-xs md:text-sm font-medium">
              -{Math.round(product.discountPercentage)}%
            </span>
          </div>

          <p className="w-full max-w-[590px] text-sm md:text-[16px] leading-[20px] md:leading-[22px] text-[#00000099] font-normal mb-5 md:mb-[18px]">
            {product.description}
          </p>

          <div className="w-full max-w-[590px] border-b border-[#0000001A] mb-5 md:mb-[24px]" />

          <div className="mb-5 md:mb-[24px]">
            <span className="block text-sm md:text-[16px] leading-[100%] text-[#00000099] font-normal mb-3 md:mb-4">Select Colors</span>
            <div className="flex items-center gap-3 md:gap-4">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  style={{ backgroundColor: color.hex }}
                  className="relative w-9 h-9 md:w-[37px] md:h-[37px] rounded-full flex items-center justify-center transition-transform hover:scale-105"
                >
                  {selectedColor === color.id && <img src={goodIcon} alt="Selected" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain" />}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-[590px] border-b border-[#0000001A] mb-5 md:mb-[24px]" />

          <div className="mb-5 md:mb-[24px]">
            <span className="block text-sm md:text-[16px] leading-[100%] text-[#00000099] font-normal mb-3 md:mb-4">Choose Size</span>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2 md:px-6 md:py-3 rounded-[62px] text-sm md:text-base font-normal transition-colors ${
                    selectedSize === size ? 'bg-black text-white' : 'bg-[#F0EEED] text-[#00000099] hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-[590px] border-b border-[#0000001A] mb-5 md:mb-[24px]" />

          <div className="flex items-center gap-3 md:gap-5 w-full max-w-[590px]">
            <div className="flex items-center justify-between w-[110px] md:w-[170px] h-[44px] md:h-[52px] bg-[#F0EEED] rounded-[62px] px-4 md:px-5">
              <button onClick={() => setQuantity((count) => Math.max(1, count - 1))} className="text-xl md:text-2xl text-black font-medium">−</button>
              <span className="text-sm md:text-base font-medium text-black">{quantity}</span>
              <button onClick={() => setQuantity((count) => count + 1)} className="text-xl md:text-2xl text-black font-medium">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 h-[44px] md:h-[52px] bg-black text-white rounded-[62px] text-sm md:text-base font-medium hover:bg-black/80 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="w-full mt-10 md:mt-20">
        <div className="flex items-center justify-between border-b border-[#0000001A]">
          <button className="flex-1 pb-4 text-[#00000099] text-sm md:text-xl font-normal text-center transition-colors hover:text-black">Product Details</button>
          <button className="flex-1 pb-4 text-black text-sm md:text-xl font-medium text-center border-b-[2px] border-black">Rating & Reviews</button>
          <button className="flex-1 pb-4 text-[#00000099] text-sm md:text-xl font-normal text-center transition-colors hover:text-black">FAQs</button>
        </div>

        <div className="flex items-center justify-between mt-5 md:mt-6">
          <div className="flex items-baseline gap-1 md:gap-2">
            <h3 className="text-lg sm:text-xl md:text-[24px] font-bold text-black">All Reviews</h3>
            <span className="text-xs sm:text-sm md:text-base text-[#00000099] font-normal">({product.reviews?.length || 451})</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="w-10 h-10 md:w-12 md:h-12 bg-[#F0EEED] rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <img src={filterPng} alt="Filter" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            </button>
            <button className="hidden md:flex items-center justify-between gap-3 bg-[#F0EEED] px-5 h-12 rounded-[62px] hover:bg-gray-200 transition-colors">
              <span className="text-base font-medium text-black">Latest</span>
              <img src={arrowDownPng} alt="Dropdown" className="w-4 h-4 object-contain" />
            </button>
            <button className="bg-black text-white px-4 md:px-6 h-10 md:h-12 rounded-[62px] text-xs md:text-base font-medium hover:bg-black/80 transition-colors">
              Write a Review
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-5 md:mt-6">
          {reviewsData.map((review, index) => {
            const revStars = Math.floor(review.rating);
            const revHalf = review.rating % 1 !== 0;

            return (
              <div key={review.id} className={`w-full border border-[#0000001A] rounded-[20px] p-5 md:p-7 flex-col justify-between bg-white transition-shadow hover:shadow-sm ${index >= 3 ? 'hidden md:flex' : 'flex'}`}>
                <div>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(revStars)].map((_, i) => (
                        <img key={i} src={star4} alt="Star" className="w-[18px] h-[18px] md:w-[22.5px] md:h-[22.5px] object-contain" />
                      ))}
                      {revHalf && <img src={star1} alt="Half Star" className="w-[18px] h-[18px] md:w-[22.5px] md:h-[22.5px] object-contain" />}
                    </div>
                    <button className="hidden md:flex w-6 h-6 items-center justify-center opacity-60 hover:opacity-100">
                      <img src={dotPng} alt="Options" className="w-6 h-6 object-contain" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2 md:mb-3">
                    <h3 className="font-bold text-base md:text-xl text-black">{review.name}</h3>
                    <img src={verifyPng} alt="Verified" className="w-4 h-4 md:w-5 md:h-5 object-contain" />
                  </div>
                  <p className="text-[#00000099] text-xs sm:text-sm md:text-base leading-relaxed md:leading-normal font-normal">{review.text}</p>
                </div>
                <span className="text-[#00000099] text-xs sm:text-sm md:text-base font-medium mt-4 md:mt-6 block">Posted on {review.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full mt-12 md:mt-20">
        <h2 className="text-center font-['Integral_CF',sans-serif] font-bold text-[36px] md:text-[48px] leading-tight text-black mb-8 md:mb-12 uppercase">
          You Might Also Like
        </h2>

        {loadingRecs ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse flex flex-col gap-3">
                <div className="w-full h-[200px] md:h-[298px] rounded-[20px] bg-gray-200" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 md:gap-5 pb-4 hide-scrollbar w-full">
            {recommendations.map((item) => {
              const recStars = Math.floor(item.rating);
              const recHalf = item.rating % 1 !== 0;

              return (
                <div 
                  key={item.id} 
                  className="flex-shrink-0 w-[200px] md:w-auto flex flex-col items-start cursor-pointer group"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="w-full h-[200px] md:h-[298px] rounded-[20px] bg-[#F0EEED] mb-4 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-sm md:text-[20px] leading-[120%] text-black mb-1 md:mb-2 truncate w-full">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 md:gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(recStars)].map((_, i) => (
                        <img key={i} src={star4} alt="Star" className="w-3.5 h-3.5 md:w-[18.5px] md:h-[18.5px] object-contain" />
                      ))}
                      {recHalf && (
                        <img src={star1} alt="Half Star" className="w-3.5 h-3.5 md:w-[18.5px] md:h-[18.5px] object-contain" />
                      )}
                    </div>
                    <span className="text-xs md:text-[14px] text-black font-normal mt-0.5">
                      {item.rating}/<span className="text-[#00000099]">5</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-lg md:text-[24px] font-bold text-black leading-[100%]">
                      ${item.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;