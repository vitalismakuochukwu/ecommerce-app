import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import filterIcon from '../assets/ter.png';
import rightArrow from '../assets/het.png';
import chevronUp from '../assets/tes.png';
import checkMark from '../assets/mark.png';
import starFull from '../assets/star1.png';
import starHalf from '../assets/star4.png';

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [selectedColor, setSelectedColor] = useState('#063AF5');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 });

  const [appliedFilters, setAppliedFilters] = useState({
    size: 'Large',
    color: '#063AF5',
    minPrice: 0,
    maxPrice: 3000,
  });
  const [dropdowns, setDropdowns] = useState({
    categories: true,
    price: true,
    colors: true,
    size: true,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
  const colors = [
    '#00C12B', '#F50606', '#F5DD06', '#F57906', '#06CAF5', 
    '#063AF5', '#7D06F5', '#F506A4', '#FFFFFF', '#000000'
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/categories');
        const data = await res.json();
        const formattedCategories = data.map(cat => 
          typeof cat === 'object' && cat !== null ? (cat.slug || cat.name) : cat
        );
         setCategories(formattedCategories);  } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
 fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = 'https://dummyjson.com/products'; 
        if (searchQuery) {
          const isCategoryRoute = categories.includes(searchQuery);
          if (isCategoryRoute) {
            url = `https://dummyjson.com/products/category/${searchQuery}`;
          } else {
            url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`;
            }  }
        const res = await fetch(url);
        const data = await res.json();
        let fetchedProducts = data.products || [];
        fetchedProducts = fetchedProducts.filter((product) => {
          const calculatedPrice = product.price - (product.price * (product.discountPercentage || 10)) / 100;
          return calculatedPrice >= appliedFilters.minPrice && calculatedPrice <= appliedFilters.maxPrice;
        });

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
  if (categories.length > 0 || !searchQuery) {
      fetchProducts();
    }
  }, [searchQuery, categories, appliedFilters]);


  const handleApplyFilter = () => {
    setAppliedFilters({
      size: selectedSize,
      color: selectedColor,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-6 font-['Satoshi',sans-serif] bg-white">
      <nav className="flex items-center gap-2 mb-6 text-[16px] leading-[100%]">
        <span className="text-[#00000099] font-normal cursor-pointer hover:text-black transition-colors" onClick={() => navigate('/')}>Home</span>
        <img src={rightArrow} alt=">" className="w-4 h-4 object-contain opacity-60" />
        <span className="text-black font-normal capitalize">{searchQuery ? searchQuery.replace('-', ' ') : 'Products'}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
   
        <aside className="hidden lg:block w-[295px] flex-shrink-0 border border-[#0000001A] rounded-[20px] px-6 py-5 max-h-[850px] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[20px] leading-[100%] text-black">Filters</h2>
            <img src={filterIcon} alt="Filter" className="w-6 h-6 object-contain opacity-60" />
          </div>

          <div className="w-full border-b border-[#0000001A] mb-6" />
          <div className="mb-6">
            <div  className="flex items-center justify-between mb-4 cursor-pointer select-none" onClick={() => toggleDropdown('categories')}  >
              <h3 className="font-bold text-[20px] leading-[100%] text-black">Categories</h3>
              <img  src={chevronUp}   alt="v"   className={`w-[14px] h-[14px] object-contain transition-transform duration-300 ${dropdowns.categories ? '' : 'rotate-180'}`}  />
            </div>
            {dropdowns.categories && (
              <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto pr-2">
                {categories.length === 0 ? (
                  <div className="text-sm text-gray-400">Loading categories...</div>
                ) : (
                  categories.map((cat) => (
                    <div  key={cat} 
                      onClick={() => navigate(`/search?q=${encodeURIComponent(cat)}`)} className="flex items-center justify-between cursor-pointer group" >
                      <span className={`text-[15px] font-normal capitalize leading-[100%] transition-colors ${
                        searchQuery === cat ? 'text-black font-bold' : 'text-[#00000099] group-hover:text-black' }`}>
                        {cat.replace('-', ' ')}
                      </span>
                      <img src={rightArrow} alt=">" className="w-4 h-4 object-contain opacity-60" />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="w-full border-b border-[#0000001A] mb-6" />
          <div className="mb-6">
            <div  className="flex items-center justify-between mb-4 cursor-pointer select-none" onClick={() => toggleDropdown('price')} >
              <h3 className="font-bold text-[20px] leading-[100%] text-black">Price</h3>
              <img src={chevronUp} alt="v"   className={`w-[14px] h-[14px] object-contain transition-transform duration-300 ${dropdowns.price ? '' : 'rotate-180'}`} />
            </div>
            {dropdowns.price && (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-[12px] text-[#00000099] mb-1">Min ($)</span>
                    <input     type="number"   min="0"  max={priceRange.max} value={priceRange.min} onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}  className="w-24 border border-[#0000001A] rounded-[8px] px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-black"  />
                  </div>
                  <span className="text-gray-400 mt-5">-</span>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-[#00000099] mb-1">Max ($)</span>
                    <input  type="number"   min={priceRange.min}  value={priceRange.max}  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}  className="w-24 border border-[#0000001A] rounded-[8px] px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-black" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full border-b border-[#0000001A] mb-6" />
          <div className="mb-6">
            <div  className="flex items-center justify-between mb-4 cursor-pointer select-none" onClick={() => toggleDropdown('colors')} >
              <h3 className="font-bold text-[20px] leading-[100%] text-black">Colors</h3>
              <img   src={chevronUp}   alt="v"   className={`w-[14px] h-[14px] object-contain transition-transform duration-300 ${dropdowns.colors ? '' : 'rotate-180'}`}  />
            </div>
            {dropdowns.colors && (
              <div className="grid grid-cols-5 gap-y-3 gap-x-2">
                {colors.map((color) => (
                  <button key={color}  onClick={() => setSelectedColor(color)}  style={{ backgroundColor: color }} className={`w-[37px] h-[37px] rounded-full flex items-center justify-center transition-transform hover:scale-110 ${   color === '#FFFFFF' ? 'border-2 border-[#00000033]' : 'border border-transparent'  }`}  >
                    {selectedColor === color && (
                      <img src={checkMark} alt="Selected" className={`w-4 h-4 object-contain ${color === '#FFFFFF' ? 'opacity-100' : 'brightness-0 invert'}`} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-full border-b border-[#0000001A] mb-6" />
          <div className="mb-6">
            <div    className="flex items-center justify-between mb-4 cursor-pointer select-none"   onClick={() => toggleDropdown('size')}  >
              <h3 className="font-bold text-[20px] leading-[100%] text-black">Size</h3>
              <img  src={chevronUp}  alt="v"   className={`w-[14px] h-[14px] object-contain transition-transform duration-300 ${dropdowns.size ? '' : 'rotate-180'}`}  />
            </div>
            {dropdowns.size && (
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)}  className={`px-[18px] py-[8px] rounded-[62px] text-[14px] leading-[100%] font-normal transition-colors ${   selectedSize === size ? 'bg-black text-white' : 'bg-[#F0EEED] text-[#00000099] hover:bg-gray-200'  }`} >{size} </button>
                ))}
              </div>
            )}
          </div>
          <button   onClick={handleApplyFilter}   className="w-full h-[48px] bg-black text-white rounded-[62px] text-[14px] font-medium hover:bg-black/80 transition-colors cursor-pointer" >  Apply Filter</button>
        </aside>

        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-bold text-[32px] text-black leading-[100%] capitalize">  {searchQuery ? searchQuery.replace('-', ' ') : 'Products'}</h1>
            <span className="text-[16px] text-[#00000099] font-normal">   Showing {products.length} Products </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-3">
                  <div className="w-full aspect-[4/5] bg-[#F0EEED] rounded-[20px]" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="w-full h-[40vh] flex items-center justify-center text-lg text-gray-500 font-medium">   No products found matching your filter criteria.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
              {products.map((product) => {
                const ratingFull = Math.floor(product.rating || 0);
                const hasHalfStar = (product.rating % 1) >= 0.5;
                const discountedPrice = (product.price - (product.price * (product.discountPercentage || 10)) / 100).toFixed(0);

                return (
                  <div  key={product.id}   className="flex flex-col cursor-pointer group"   onClick={() => navigate(`/product/${product.id}`)} >
                    <div className="w-full aspect-[4/5] bg-[#F0EEED] rounded-[20px] flex items-center justify-center p-4 mb-4 overflow-hidden">
                      <img  src={product.thumbnail}   alt={product.title}   className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"   />
                    </div>
                    <h3 className="font-bold text-[16px] md:text-[20px] text-black truncate mb-1 leading-[120%]">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(ratingFull)].map((_, i) => (
                          <img key={i} src={starFull} alt="Star" className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] object-contain" />
                        ))}
                        {hasHalfStar && <img src={starHalf} alt="Half Star" className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] object-contain" />}
                      </div>
                      <span className="text-[12px] md:text-[14px] text-black font-normal mt-0.5">
                        {product.rating}/<span className="text-[#00000099]">5</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-[20px] md:text-[24px] font-bold text-black leading-[100%]">${discountedPrice}</span>
                      <span className="text-[20px] md:text-[24px] font-bold text-[#0000004D] line-through leading-[100%]">${Math.round(product.price)}</span>
                      <span className="bg-[#FF33331A] text-[#FF3333] text-[10px] md:text-[12px] font-medium px-2 py-1 md:px-3 md:py-[6px] rounded-[62px]">
                        -{Math.round(product.discountPercentage || 10)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;