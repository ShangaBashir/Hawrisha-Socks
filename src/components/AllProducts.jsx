import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, ArrowLeft, X, Plus, Minus, Check } from 'lucide-react';

const getColorStyle = (colorClass) => {
  if (!colorClass) return {};
  if (colorClass.startsWith('bg-[#') && colorClass.endsWith(']')) {
    return { backgroundColor: colorClass.slice(4, -1) };
  }
  if (colorClass.startsWith('#')) {
    return { backgroundColor: colorClass };
  }
  return {};
};

const productsData = [
  {
    id: 1,
    name: 'Pet Lovers',
    price: 6250,
    category: 'Animals',
    colorFamily: 'slate',
    colors: ['bg-[#36454F]', 'bg-[#F5F5DC]', 'bg-[#60A5FA]', 'bg-[#B2AC88]'],
    colorNames: ['Charcoal Slate', 'Classic Beige', 'Soft Sky Blue', 'Sage Green'],
    extraColors: '+15',
    image: '/categories/cat1.jpg',
    badge: 'Bestseller',
    desc: 'Express your passion for pets in cozy fashion. Knit with durable premium combed cotton, these socks deliver all-day comfort and a breathable stretch ideal for everyday walks.'
  },
  {
    id: 2,
    name: 'Tabby Cat',
    price: 6250,
    category: 'Animals',
    colorFamily: 'orange',
    colors: ['bg-orange-500', 'bg-[#36454F]', 'bg-[#F5F5DC]', 'bg-[#60A5FA]'],
    colorNames: ['Citrus Orange', 'Charcoal Slate', 'Classic Beige', 'Soft Sky Blue'],
    extraColors: '+15',
    image: '/categories/cat2.jpg',
    badge: 'New',
    desc: 'Brighten your day with these lovable tabby kitten designs. Perfect for cat enthusiasts, utilizing soft combed cotton for a premium lightweight and sweat-wicking texture.'
  },
  {
    id: 3,
    name: 'Kangaroo Crew',
    price: 5000,
    category: 'Animals',
    colorFamily: 'beige',
    colors: ['bg-[#F5F5DC]', 'bg-[#36454F]', 'bg-[#60A5FA]'],
    colorNames: ['Classic Beige', 'Charcoal Slate', 'Soft Sky Blue'],
    extraColors: '+15',
    image: '/categories/cat3.jpg',
    badge: 'Sale',
    desc: 'Jump into premium comfort with our dynamic Kangaroo socks. Double-looped heel cushion supports high impact steps, keeping your feet padded and comfortable.'
  },
  {
    id: 4,
    name: 'Sweet Ribbons',
    price: 6250,
    category: 'Patterns',
    colorFamily: 'sage',
    colors: ['bg-[#B2AC88]', 'bg-[#36454F]', 'bg-[#F5F5DC]', 'bg-[#60A5FA]'],
    colorNames: ['Sage Green', 'Charcoal Slate', 'Classic Beige', 'Soft Sky Blue'],
    extraColors: '+12',
    image: '/categories/cat4.jpg',
    badge: '',
    desc: 'Delicate pattern styling that adds a sweet touch to any aesthetic. Designed with standard rib arches to sit comfortably around the calf without binding.'
  },
  {
    id: 5,
    name: 'Abstract Faces',
    price: 6250,
    category: 'Patterns',
    colorFamily: 'rose',
    colors: ['bg-[#B2AC88]', 'bg-[#36454F]', 'bg-[#B2AC88]'],
    colorNames: ['Dusk Rose', 'Charcoal Slate', 'Sage Green'],
    extraColors: '+8',
    image: '/bestsellers/bs1.jpg',
    badge: 'Bestseller',
    desc: 'Make a bold statement with artist-inspired abstract faces. Knitted with combed yarns for high detailed resolution and rich, long-lasting wash durability.'
  },
  {
    id: 6,
    name: 'Cat Patterns',
    price: 6250,
    category: 'Animals',
    colorFamily: 'beige',
    colors: ['bg-[#F5F5DC]', 'bg-[#B2AC88]', 'bg-[#36454F]'],
    colorNames: ['Classic Beige', 'Dusk Rose', 'Charcoal Slate'],
    extraColors: '+10',
    image: '/bestsellers/bs2.jpg',
    badge: 'New',
    desc: 'A delightful assortment of repeating kitten patterns. Standard crew length looks fantastic paired with casual sneakers or boots.'
  },
  {
    id: 7,
    name: 'Tropical Flamingo',
    price: 7000,
    category: 'Patterns',
    colorFamily: 'rose',
    colors: ['bg-[#B2AC88]', 'bg-[#B2AC88]', 'bg-sky-400'],
    colorNames: ['Dusk Rose', 'Sage Green', 'Sky Blue'],
    extraColors: '+18',
    image: '/carousel/slide3.jpg',
    badge: 'Bestseller',
    desc: 'Evoke year-round vacation vibes with our tropical flamingo graphics. Offers supportive seamless toes and high elastic ankle bands.'
  },
  {
    id: 8,
    name: 'Sunny Lemon',
    price: 5500,
    category: 'Fruits',
    colorFamily: 'yellow',
    colors: ['bg-yellow-400', 'bg-[#36454F]', 'bg-[#F5F5DC]'],
    colorNames: ['Lemon Yellow', 'Charcoal Slate', 'Classic Beige'],
    extraColors: '+6',
    image: '',
    bgFallback: 'bg-yellow-100/60',
    badge: 'Sale',
    desc: 'A splash of sunshine for your wardrobe! Designed with seamless toe closures to eliminate pressure seams and keep active steps cheerful.'
  },
  {
    id: 9,
    name: 'Comfy Lavender',
    price: 4500,
    category: 'Cozy Crew',
    colorFamily: 'purple',
    colors: ['bg-purple-400', 'bg-violet-600', 'bg-gray-100'],
    colorNames: ['Soft Lavender', 'Deep Violet', 'Cloud Gray'],
    extraColors: '+4',
    image: '',
    bgFallback: 'bg-purple-100/60',
    badge: '',
    desc: 'Sink into luxurious relaxation with our extra-cushion lavender collection. Designed with organic wool blending to provide breathable warming wraps.'
  },
  {
    id: 10,
    name: 'Winter Snowflake',
    price: 8000,
    category: 'Cozy Crew',
    colorFamily: 'sky',
    colors: ['bg-sky-100', 'bg-blue-600', 'bg-white'],
    colorNames: ['Snow Sky Blue', 'Royal Blue', 'Pure White'],
    extraColors: '+14',
    image: '',
    bgFallback: 'bg-sky-200/60',
    badge: 'New',
    desc: 'Stay warm even in sub-zero climates with extra brushed-nap loops. Excellent thermoregulatory layers featuring festive holiday patterns.'
  },
  {
    id: 11,
    name: 'Retro Stripes',
    price: 6000,
    category: 'Patterns',
    colorFamily: 'red',
    colors: ['bg-red-400', 'bg-amber-400', 'bg-[#36454F]'],
    colorNames: ['Coral Red', 'Amber Yellow', 'Charcoal Slate'],
    extraColors: '+20',
    image: '',
    bgFallback: 'bg-amber-100/60',
    badge: '',
    desc: 'Vintage varsity stripes that pair beautifully with athleisure wear. Offers medium arch compressions to reduce foot fatigue.'
  },
  {
    id: 12,
    name: 'Avocado Smile',
    price: 5500,
    category: 'Fruits',
    colorFamily: 'green',
    colors: ['bg-emerald-600', 'bg-yellow-300', 'bg-[#36454F]'],
    colorNames: ['Avocado Green', 'Lemon Yellow', 'Charcoal Slate'],
    extraColors: '+8',
    image: '',
    bgFallback: 'bg-emerald-100/60',
    badge: 'New',
    desc: 'Start your mornings with positive, smiling avocado prints. Made with breathable mesh panels to keep sweat low and comfort exceptionally high.'
  }
];


const colorFilters = [
  { name: 'rose', class: 'bg-[#B2AC88]' },
  { name: 'sage', class: 'bg-[#B2AC88]' },
  { name: 'beige', class: 'bg-[#F5F5DC]' },
  { name: 'slate', class: 'bg-[#36454F]' },
  { name: 'yellow', class: 'bg-yellow-400' },
  { name: 'green', class: 'bg-emerald-600' },
  { name: 'purple', class: 'bg-purple-400' },
  { name: 'orange', class: 'bg-orange-500' }
];

export default function AllProducts({ onAddToCart, onBackToHome, initialCategory = 'All', likedProducts = [], onToggleWishlist }) {
  // Navigation & Filtering States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingProduct, setViewingProduct] = useState(null);
  
  // Fetch products from database
  useEffect(() => {
    let active = true;
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('API server offline');
        return res.json();
      })
      .then((data) => {
        if (active) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Backend API server offline, falling back to static catalog productsData', err);
        if (active) {
          setProducts(productsData);
          setLoading(false);
        }
      });
    return () => { active = false; };
  }, []);

  // Fetch categories from settings
  useEffect(() => {
    let active = true;
    fetch('/api/settings/categories')
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (active) {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch categories, using default fallback', err);
        if (active) {
          setCategories([
            { id: 'animals', name: 'Animals' },
            { id: 'fruits', name: 'Fruits' },
            { id: 'patterns', name: 'Patterns' },
            { id: 'cozy_crew', name: 'Cozy Crew' }
          ]);
        }
      });
    return () => { active = false; };
  }, []);

  // Memoized category counts calculated dynamically
  const categoryCounts = useMemo(() => {
    const counts = { All: products.length };
    if (likedProducts.length > 0) {
      counts['Wishlist'] = likedProducts.length;
    }
    categories.forEach(cat => {
      counts[cat.name] = products.filter(p => p.category === cat.name).length;
    });
    return counts;
  }, [products, categories, likedProducts]);

  // Scroll to top when entering or leaving product detail view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [viewingProduct]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [prevInitialCategory, setPrevInitialCategory] = useState(initialCategory);

  if (initialCategory !== prevInitialCategory) {
    setPrevInitialCategory(initialCategory);
    setSelectedCategory(initialCategory);
  }
  
  const [showFilters, setShowFilters] = useState(true);
  const [maxPriceFilter, setMaxPriceFilter] = useState(15000);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState('Bestseller');
  
  const [toastMessage, setToastMessage] = useState('');

  // Product Detail Page configurations
  const [detailColorIndex, setDetailColorIndex] = useState(0);
  const [detailSize, setDetailSize] = useState('Standard Pair');
  const [detailQuantity, setDetailQuantity] = useState(1);

  // Handle Toast notification for cart additions
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleAddToCartClick = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    showToast(`Added ${product.name} to shopping bag!`);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setMaxPriceFilter(15000);
    setSelectedColors([]);
    setSortBy('Bestseller');
  };

  // Memoized Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || (selectedCategory === 'Wishlist' ? likedProducts.includes(product.id) : product.category === selectedCategory);
        const matchesPrice = product.price <= maxPriceFilter;
        const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.colorFamily);

        return matchesSearch && matchesCategory && matchesPrice && matchesColor;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low to High') {
          return a.price - b.price;
        }
        if (sortBy === 'Price: High to Low') {
          return b.price - a.price;
        }
        if (sortBy === 'Bestseller') {
          const isBestsellerA = a.badge === 'Bestseller' ? 1 : 0;
          const isBestsellerB = b.badge === 'Bestseller' ? 1 : 0;
          return isBestsellerB - isBestsellerA;
        }
        return 0;
      });
  }, [products, searchTerm, selectedCategory, maxPriceFilter, selectedColors, sortBy, likedProducts]);

  const hasActiveFilters = selectedCategory !== 'All' || maxPriceFilter < 15000 || selectedColors.length > 0 || searchTerm !== '';

  // Trigger entering product detail state
  const handleCardClick = (product) => {
    setViewingProduct(product);
    setDetailColorIndex(0);
    setDetailSize('Standard Pair');
    setDetailQuantity(1);
  };

  // Perform multiple dynamic additions to shopping bag
  const handleDetailAdd = () => {
    onAddToCart(viewingProduct, detailQuantity);
    const colorLabel = viewingProduct.colorNames ? viewingProduct.colorNames[detailColorIndex] : 'selected color';
    showToast(`Added ${detailQuantity}x ${viewingProduct.name} (${colorLabel}) to bag!`);
  };

  return (
    <div className="bg-gradient-to-b from-[#F5F5DC]/40 via-white/50 to-[#F5F5DC]/30 min-h-screen py-10 px-4 lg:px-16 xl:px-24 relative select-none">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="fixed bottom-8 right-8 z-50 bg-[#36454F] text-white px-6 py-3.5 rounded-xl shadow-xl flex items-center space-x-3 border border-white/10"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#B2AC88] animate-ping" />
            <span className="font-semibold text-sm tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto">
        <AnimatePresence mode="wait">
          {!viewingProduct ? (
            /* Catalog Page view */
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {/* Luxury Banner Header */}
              {/* Clean Header & Filters Bar */}
              <div className="mb-10">
                {/* Title Row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div>
                    <button 
                      onClick={onBackToHome}
                      className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-widest text-[#B2AC88] hover:text-[#36454F] transition-colors mb-2 cursor-pointer"
                    >
                      <ArrowLeft size={10} />
                      <span>Back to Home</span>
                    </button>
                    <h1 className="text-5xl font-black text-[#36454F] tracking-tight uppercase leading-none">Products</h1>
                  </div>

                  {/* Search input - clean minimal style */}
                  <div className="relative w-full md:w-80">
                    <input
                      type="text"
                      placeholder="Search complete catalog..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 focus:border-[#B2AC88] rounded-full focus:outline-none focus:ring-2 focus:ring-[#B2AC88]/15 text-sm text-[#36454F] transition-all placeholder:text-gray-400 shadow-xs font-semibold"
                    />
                    <Search className="absolute left-3.5 top-3.5 text-gray-400" size={14} />
                  </div>
                </div>

                {/* Filters Controls Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-gray-100 py-3.5">
                  <div className="flex items-center space-x-4">
                    {/* Hide Filters Button */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="px-5 py-2 border border-gray-200 hover:border-gray-300 text-[10px] font-bold uppercase tracking-wider rounded-full hover:bg-gray-50 transition-all cursor-pointer shadow-xs text-[#36454F] bg-white"
                    >
                      {showFilters ? 'Hide filters' : 'Show filters'}
                    </button>

                  </div>

                  {/* Active filter badges / pills */}
                  <div className="flex flex-wrap gap-2 items-center">
                    {selectedCategory !== 'All' && (
                      <span className="flex items-center space-x-1.5 px-3 py-1 bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold rounded-full">
                        <span>{selectedCategory}</span>
                        <X size={10} className="cursor-pointer text-gray-400 hover:text-gray-600" onClick={() => setSelectedCategory('All')} />
                      </span>
                    )}
                    {maxPriceFilter < 15000 && (
                      <span className="flex items-center space-x-1.5 px-3 py-1 bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold rounded-full">
                        <span>Under {maxPriceFilter.toLocaleString()} IQD</span>
                        <X size={10} className="cursor-pointer text-gray-400 hover:text-gray-600" onClick={() => setMaxPriceFilter(15000)} />
                      </span>
                    )}
                    {selectedColors.length > 0 && (
                      <span className="flex items-center space-x-1.5 px-3 py-1 bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold rounded-full">
                        <span>Colors ({selectedColors.length})</span>
                        <X size={10} className="cursor-pointer text-gray-400 hover:text-gray-600" onClick={() => setSelectedColors([])} />
                      </span>
                    )}
                    {searchTerm !== '' && (
                      <span className="flex items-center space-x-1.5 px-3 py-1 bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold rounded-full">
                        <span>Search: "{searchTerm}"</span>
                        <X size={10} className="cursor-pointer text-gray-400 hover:text-gray-600" onClick={() => setSearchTerm('')} />
                      </span>
                    )}
                    {hasActiveFilters && (
                      <button 
                        onClick={handleResetFilters}
                        className="text-[10px] font-bold uppercase tracking-wider text-[#B2AC88] hover:text-[#36454F] cursor-pointer ml-1.5"
                      >
                        Clear All
                      </button>
                    )}
                    
                    <div className="flex items-center space-x-2 px-4 py-2 border border-gray-200 hover:border-gray-300 rounded-full hover:bg-gray-50 transition-all cursor-pointer shadow-xs text-[#36454F] bg-white ml-2">
                      <span className="shrink-0 text-gray-400 text-[10px] uppercase font-bold tracking-wider select-none">Sort By:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent border-0 py-0 pr-6 text-xs font-bold text-[#36454F] focus:outline-none cursor-pointer"
                      >
                        <option>Bestseller</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar + Grid Layout */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Sticky Filter Panel */}
                <AnimatePresence initial={false}>
                  {showFilters && (
                    <motion.aside 
                      initial={{ opacity: 0, width: 0, marginRight: 0 }}
                      animate={{ opacity: 1, width: 256, marginRight: 32 }}
                      exit={{ opacity: 0, width: 0, marginRight: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-full lg:w-64 shrink-0 self-start lg:sticky lg:top-28 z-20 overflow-hidden"
                    >
                      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs flex flex-col space-y-6">
                        {/* Categories Section */}
                        <div className="space-y-3">
                          <h4 className="text-[11px] font-bold text-[#36454F] uppercase tracking-widest">Categories</h4>
                          <div className="flex flex-col space-y-1">
                            {Object.entries(categoryCounts).map(([cat, count]) => (
                              <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex items-center justify-between text-xs font-semibold py-2 px-2 rounded-lg transition-colors cursor-pointer text-left ${
                                  selectedCategory === cat
                                    ? 'bg-[#B2AC88]/10 text-[#B2AC88] font-bold'
                                    : 'text-[#36454F] hover:bg-gray-50'
                                }`}
                              >
                                <span>{cat}</span>
                                <span className={`text-[10px] font-bold ${
                                  selectedCategory === cat ? 'text-[#B2AC88]' : 'text-gray-400'
                                }`}>{count}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price Range Slider Section */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-bold text-[#36454F] uppercase tracking-widest">Price</h4>
                            {maxPriceFilter < 15000 && (
                              <button 
                                onClick={() => setMaxPriceFilter(15000)}
                                className="text-[10px] font-bold uppercase tracking-wider text-[#B2AC88] hover:text-[#36454F]"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                          <div className="space-y-2">
                            <input 
                              type="range" 
                              min="250" 
                              max="15000" 
                              step="250"
                              value={maxPriceFilter}
                              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B2AC88]"
                            />
                            <div className="flex justify-between text-[10px] font-bold text-gray-400">
                              <span>250 IQD</span>
                              <span className="text-[#36454F] font-bold bg-[#B2AC88]/10 px-2 py-0.5 rounded-md">{maxPriceFilter.toLocaleString()} IQD</span>
                            </div>
                          </div>
                        </div>

                        {/* Checkbox Color Filters Section */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-bold text-[#36454F] uppercase tracking-widest">Colour</h4>
                            {selectedColors.length > 0 && (
                              <button 
                                onClick={() => setSelectedColors([])}
                                className="text-[10px] font-bold uppercase tracking-wider text-[#B2AC88] hover:text-[#36454F]"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                          <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto pr-1">
                            {colorFilters.map((color) => (
                              <label key={color.name} className="flex items-center space-x-2.5 text-xs font-semibold text-[#36454F] py-0.5 cursor-pointer select-none">
                                <input 
                                  type="checkbox" 
                                  checked={selectedColors.includes(color.name)}
                                  onChange={() => {
                                    if (selectedColors.includes(color.name)) {
                                      setSelectedColors(selectedColors.filter(c => c !== color.name));
                                    } else {
                                      setSelectedColors([...selectedColors, color.name]);
                                    }
                                  }}
                                  className="w-4 h-4 rounded border-gray-300 text-[#B2AC88] focus:ring-[#B2AC88]" 
                                />
                                <span 
                                  className={`w-3 h-3 rounded-full border border-gray-200/50 ${color.class}`} 
                                  style={getColorStyle(color.class)}
                                />
                                <span className="capitalize">{color.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                      </div>
                    </motion.aside>
                  )}
                </AnimatePresence>

                {/* Right Area - Grid Content */}
                <div className="flex-1 flex flex-col space-y-6">
                  {loading ? (
                    <div className="py-24 text-center">
                      <div className="w-8 h-8 border-4 border-[#B2AC88] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-sm text-gray-500 font-semibold">Loading product catalog...</p>
                    </div>
                  ) : (
                    <>
                      <motion.div 
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                      >
                        <AnimatePresence mode="popLayout">
                          {filteredProducts.map((product) => {
                            return (
                              <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                onClick={() => handleCardClick(product)}
                                className="group cursor-pointer flex flex-col bg-white border border-gray-100 p-3 rounded-3xl hover:shadow-md transition-all duration-300 relative overflow-hidden"
                              >
                                {/* Product Corner Badges */}
                                {product.badge && (
                                  <div className={`absolute top-5 left-5 z-10 text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs ${
                                    product.badge === 'New' ? 'bg-[#B2AC88] text-white' :
                                    product.badge === 'Bestseller' ? 'bg-[#36454F] text-white' : 'bg-red-500 text-white'
                                  }`}>
                                    {product.badge}
                                  </div>
                                )}

                                {/* Action Buttons always visible top-right */}
                                <div className="absolute top-5 right-5 z-10 flex flex-col space-y-2">
                                  <button 
                                    onClick={(e) => { 
                                      e.stopPropagation(); 
                                      onToggleWishlist(product.id);
                                    }}
                                    className="w-8 h-8 bg-white hover:scale-105 transition-all cursor-pointer rounded-full flex items-center justify-center shadow-xs border border-gray-50"
                                  >
                                    <Heart 
                                      size={13} 
                                      className={likedProducts.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"} 
                                    />
                                  </button>
                                  <button 
                                    onClick={(e) => handleAddToCartClick(product, e)}
                                    className="w-8 h-8 bg-white hover:text-[#B2AC88] text-gray-400 rounded-full flex items-center justify-center shadow-xs border border-gray-50 hover:scale-105 transition-all cursor-pointer"
                                  >
                                    <ShoppingBag size={13} />
                                  </button>
                                </div>

                                {/* Product Image Box */}
                                <div className="w-full aspect-[3/4] rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center transition-all bg-[#f9fafb] border border-gray-100/50">
                                  {(product.image || product.image_url) ? (
                                    <img 
                                      src={product.image || product.image_url} 
                                      alt={product.name} 
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                                    />
                                  ) : (
                                    <span className="text-gray-300 font-serif text-md tracking-widest uppercase rotate-[-25deg] select-none opacity-80 font-bold">
                                      {product.category}
                                    </span>
                                  )}
                                </div>

                                {/* Product Details Centered */}
                                <div className="space-y-1 text-center pb-2">
                                  <h3 className="font-bold text-[#36454F] text-[15px] group-hover:text-[#B2AC88] transition-colors">
                                    {product.name}
                                  </h3>
                                  <p className="text-xs font-semibold text-gray-400">
                                    {product.price.toLocaleString()} IQD
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </motion.div>

                      {/* Empty Search State */}
                      {filteredProducts.length === 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center justify-center py-24 text-center bg-white/60 backdrop-blur-md rounded-3xl border border-gray-100"
                        >
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xs border border-gray-100 mb-4">
                             <Search className="text-gray-400" size={24} />
                          </div>
                          <h3 className="text-md font-bold text-[#36454F] uppercase tracking-wider">No products found</h3>
                          <p className="text-xs text-gray-500 mt-1 max-w-xs leading-relaxed">
                            We couldn't find any socks matching your search criteria. Try modifying your filters or clear all values.
                          </p>
                          <button 
                            onClick={handleResetFilters}
                            className="mt-6 px-6 py-2.5 bg-[#B2AC88] hover:bg-[#36454F] text-white text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer shadow-sm active:scale-95"
                          >
                            Clear All Filters
                          </button>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Premium Animated Product Detail Screen */
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 md:p-12 shadow-md relative overflow-hidden font-sans text-brand-charcoal"
            >
              
              {/* Top back navigation */}
              <button
                onClick={() => setViewingProduct(null)}
                className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#B2AC88] hover:text-[#36454F] transition-colors mb-8 cursor-pointer group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Catalog</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Side: Dynamic Image Gallery */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <motion.div 
                    layoutId={`img-box-${viewingProduct.id}`}
                    className={`w-full aspect-[3/4] rounded-2xl relative shadow-md flex items-center justify-center border border-gray-50 overflow-hidden ${
                      (viewingProduct.image || viewingProduct.image_url) ? 'bg-gray-50' : (viewingProduct.bgFallback || 'bg-brand-beige')
                    }`}
                  >
                    {/* Glowing highlight ring based on selected active color */}
                    <div className="absolute inset-0 border-[6px] border-white/95 rounded-2xl pointer-events-none z-10" />

                    {(viewingProduct.image || viewingProduct.image_url) ? (
                      <img 
                        src={viewingProduct.image || viewingProduct.image_url} 
                        alt={viewingProduct.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    ) : (
                      <span className="text-[#36454F]/20 font-serif text-3xl font-bold tracking-widest uppercase rotate-[-20deg]">
                        {viewingProduct.category}
                      </span>
                    )}

                    {viewingProduct.badge && (
                      <span className="absolute top-4 left-4 z-10 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 bg-[#36454F] text-white rounded-full">
                        {viewingProduct.badge}
                      </span>
                    )}
                  </motion.div>

                  {/* Thumbnail Previews */}
                  <div className="flex space-x-3 mt-4 w-full">
                    {[...Array(3)].map((_, index) => (
                      <div 
                        key={index}
                        className={`w-1/3 aspect-[4/3] rounded-lg border-2 flex items-center justify-center overflow-hidden cursor-pointer bg-gray-50 ${
                          index === 0 ? 'border-[#B2AC88]' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {(viewingProduct.image || viewingProduct.image_url) ? (
                          <img src={viewingProduct.image || viewingProduct.image_url} alt="" className="w-full h-full object-cover opacity-80" />
                        ) : (
                          <span className="text-[10px] font-bold text-gray-300">Angle {index+1}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Product Details & Purchase Form */}
                <div className="lg:col-span-7 flex flex-col">
                  
                  {/* Category & Product Name */}
                  <span className="text-xs font-bold text-[#B2AC88] uppercase tracking-widest mb-1.5">{viewingProduct.category} socks</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a365d] italic leading-tight mb-2">
                    {viewingProduct.name}
                  </h2>

                  {/* Localized Price */}
                  <span className="text-2xl font-bold text-[#36454F] mb-6">
                    {viewingProduct.price.toLocaleString()} IQD
                  </span>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xl mb-6">
                    {viewingProduct.description || viewingProduct.desc || ''}
                  </p>

                  <div className="h-px bg-gray-100 w-full mb-6" />

                  {/* Form fields */}
                  <div className="space-y-6">
                    
                    {/* Swatch Selector */}
                    <div>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2.5">
                        <span className="text-gray-400">Select Color Family</span>
                        <span className="text-[#36454F] font-semibold">
                          {viewingProduct.colorNames ? viewingProduct.colorNames[detailColorIndex] : `Color option ${detailColorIndex + 1}`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3.5">
                        {viewingProduct.colors.map((colorClass, idx) => (
                          <button
                            key={idx}
                            onClick={() => setDetailColorIndex(idx)}
                            style={getColorStyle(colorClass)}
                            className={`w-8 h-8 rounded-full border cursor-pointer hover:scale-110 active:scale-90 transition-transform relative flex items-center justify-center ${colorClass.startsWith('#') ? '' : colorClass} ${
                              detailColorIndex === idx 
                                ? 'ring-2 ring-offset-2 ring-[#B2AC88] border-transparent' 
                                : 'border-gray-200'
                            }`}
                          >
                            {detailColorIndex === idx && <Check size={14} className="text-white mix-blend-difference" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2.5">
                        <span className="text-gray-400">Choose Size / Length</span>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {['Standard Pair', 'Pack of 3 (+50%)', 'Crew Length'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setDetailSize(size)}
                            className={`px-4 py-2 border rounded-full text-xs font-semibold cursor-pointer active:scale-95 transition-all ${
                              detailSize === size
                                ? 'border-[#B2AC88] bg-[#B2AC88]/5 text-[#B2AC88] shadow-2xs font-bold'
                                : 'border-gray-200 text-[#36454F] hover:border-gray-300 bg-white'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity & CTA Addition */}
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
                      
                      {/* Quantity counter */}
                      <div className="flex items-center justify-between border border-gray-200 rounded-full w-32 p-1 shrink-0 bg-white">
                        <button
                          onClick={() => setDetailQuantity(prev => Math.max(1, prev - 1))}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors active:scale-90"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-sm text-[#36454F] select-none min-w-[20px] text-center">
                          {detailQuantity}
                        </span>
                        <button
                          onClick={() => setDetailQuantity(prev => Math.min(10, prev + 1))}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Add to Bag CTA Button */}
                      <motion.button
                        onClick={handleDetailAdd}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-grow py-3 px-8 bg-[#36454F] hover:bg-[#B2AC88] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md flex items-center justify-center space-x-2.5 cursor-pointer transition-all duration-300"
                      >
                        <ShoppingBag size={16} />
                        <span>Add to Shopping Bag</span>
                      </motion.button>

                      {/* Toggle Wishlist Heart Button */}
                      <button
                        onClick={() => onToggleWishlist(viewingProduct.id)}
                        className="w-12 h-12 rounded-full border border-gray-250 hover:border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all cursor-pointer shrink-0"
                      >
                        <Heart 
                          size={18} 
                          className={likedProducts.includes(viewingProduct.id) ? "fill-red-500 text-red-500" : "text-gray-450"}
                        />
                      </button>
                    </div>

                  </div>



                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
