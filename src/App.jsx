import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import BestSeller from './components/BestSeller';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import AllProducts from './components/AllProducts';
import AdminDashboard from './components/AdminDashboard';
import Wishlist from './components/Wishlist';

function App() {
  const [currentView, setCurrentView] = useState(() => {
    // Check if the route is /admin
    if (window.location.pathname === '/admin') {
      return 'admin';
    }
    return 'home';
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Automatically scroll to the top of the screen when switching pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleAddToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleUpdateCartQuantity = (productId, delta) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const handleToggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const isAdminView = currentView === 'admin';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-beige">
      {!isAdminView && (
        <Header 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          cartCount={cartCount} 
          wishlistCount={wishlistCount}
          onCartClick={() => setIsCartOpen(true)}
          onWishlistClick={() => {
            setCurrentView('wishlist');
          }}
        />
      )}
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <HeroCarousel />
            <BestSeller 
              onViewAll={() => {
                setSelectedCategory('All');
                setCurrentView('all_products');
              }} 
              onAddToCart={handleAddToCart}
            />
            <ProductGrid 
              onCategorySelect={(catName) => {
                setSelectedCategory(catName);
                setCurrentView('all_products');
              }} 
            />
          </>
        )}
        
        {currentView === 'all_products' && (
          <AllProducts 
            onAddToCart={handleAddToCart}
            onBackToHome={() => {
              setSelectedCategory('All');
              setCurrentView('home');
            }}
            initialCategory={selectedCategory}
            likedProducts={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentView === 'wishlist' && (
          <Wishlist 
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onExplore={() => {
              setSelectedCategory('All');
              setCurrentView('all_products');
            }}
            onBackToHome={() => {
              setCurrentView('home');
            }}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard />
        )}
      </main>
      {!isAdminView && <Footer />}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white border-l border-gray-100 shadow-2xl z-50 flex flex-col font-sans text-brand-charcoal"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag size={20} className="text-[#36454F]" />
                  <h3 className="text-lg font-bold text-[#36454F] uppercase tracking-wider">Shopping Bag</h3>
                  <span className="bg-[#B2AC88]/10 text-[#B2AC88] text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#36454F] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      <ShoppingBag className="text-gray-300" size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#36454F] uppercase tracking-wider">Your bag is empty</h4>
                      <p className="text-xs text-gray-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                        Add some of our premium character socks to get started!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCurrentView('all_products');
                      }}
                      className="px-6 py-2.5 bg-[#B2AC88] hover:bg-[#36454F] text-white text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                    >
                      Shop Products
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const imgUrl = item.image || item.image_url;
                    const finalImg = !imgUrl
                      ? '/categories/cat1.jpg'
                      : (imgUrl.startsWith('data:') || imgUrl.startsWith('/') ? imgUrl : `/uploads/${imgUrl}`);
                    
                    return (
                      <div key={item.id} className="flex space-x-4 border border-gray-100 rounded-2xl p-3 bg-white hover:shadow-xs transition-shadow">
                        {/* Thumbnail */}
                        <div className="w-16 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 flex items-center justify-center">
                          <img src={finalImg} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <h4 className="text-xs font-bold text-[#36454F]">{item.name}</h4>
                            <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                              {item.price.toLocaleString()} IQD
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2.5 border border-gray-150 rounded-full px-2 py-0.5 bg-gray-50/50">
                              <button
                                onClick={() => handleUpdateCartQuantity(item.id, -1)}
                                className="text-gray-400 hover:text-[#36454F] active:scale-75 transition-transform"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="text-xs font-bold text-[#36454F] select-none min-w-[12px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateCartQuantity(item.id, 1)}
                                className="text-gray-400 hover:text-[#36454F] active:scale-75 transition-transform"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                            {/* Remove Icon */}
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50/50">
                  {/* Shipping goal */}
                  {(() => {
                    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                    const freeShippingLimit = 45000;
                    const needed = freeShippingLimit - subtotal;
                    
                    return (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          {needed > 0 ? (
                            <span>Add <span className="text-[#36454F]">{needed.toLocaleString()} IQD</span> for Free Shipping</span>
                          ) : (
                            <span className="text-green-600 font-bold">You qualify for FREE shipping!</span>
                          )}
                          <span>Goal: {freeShippingLimit.toLocaleString()} IQD</span>
                        </div>
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#B2AC88] transition-all duration-500" 
                            style={{ width: `${Math.min(100, (subtotal / freeShippingLimit) * 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  <div className="h-px bg-gray-150 w-full" />

                  {/* Summary Rows */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-gray-500">
                      <span>Subtotal</span>
                      <span>
                        {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()} IQD
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-gray-500">
                      <span>Shipping</span>
                      {(() => {
                        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                        return subtotal >= 45000 ? (
                          <span className="text-green-600 font-bold">FREE</span>
                        ) : (
                          <span>4,000 IQD</span>
                        );
                      })()}
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#36454F] pt-1">
                      <span>Total</span>
                      <span>
                        {(() => {
                          const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                          const shipping = subtotal >= 45000 ? 0 : 4000;
                          return (subtotal + shipping).toLocaleString();
                        })()} IQD
                      </span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <button className="w-full py-3.5 bg-[#36454F] hover:bg-[#B2AC88] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-colors cursor-pointer select-none text-center">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
