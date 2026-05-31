import { motion } from 'framer-motion';
import { Search, User, Heart, ShoppingCart, ChevronDown } from 'lucide-react';

const HawrishaH = ({ size = 28, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M 4 2 h 5 v 20 H 3 a 2 2 0 0 1 -2 -2 a 2 2 0 0 1 2 -2 h 1 V 2 Z M 15 2 h 5 v 20 H 14 a 2 2 0 0 1 -2 -2 a 2 2 0 0 1 2 -2 h 1 V 2 Z M 9 10 h 6 v 3 H 9 Z" />
  </svg>
);

export default function Header({ currentView, onViewChange, cartCount, wishlistCount, onCartClick, onWishlistClick }) {
  return (
    <header className="bg-white/80 backdrop-blur-md text-brand-charcoal border-b border-brand-sage/10 sticky top-0 z-50 shadow-sm transition-all duration-300">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Left: Language */}
        <div className="flex items-center space-x-1 cursor-pointer text-sm font-medium hover:text-brand-rose transition-colors select-none">
          <span>English</span>
          <ChevronDown size={14} className="hover:rotate-180 transition-transform duration-300" />
        </div>

        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <button 
            onClick={() => onViewChange('home')}
            className="flex items-center gap-0 cursor-pointer hover:opacity-90 select-none active:scale-[0.98] transition-all text-[#1a365d]"
          >
            <HawrishaH size={38} className="text-[#1a365d] shrink-0" />
            <div className="flex flex-col items-start leading-[0.9] text-left -ml-1">
              <span className="text-[21px] font-black tracking-[0.06em] uppercase font-sans">AWRISHA</span>
              <span className="text-[9px] font-extrabold tracking-[0.35em] uppercase font-sans text-[#B2AC88] mt-1">SOCKS</span>
            </div>
          </button>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-5">
          <button className="hover:text-brand-rose transition-colors cursor-pointer active:scale-90">
            <Search size={22} />
          </button>
          <button className="hover:text-brand-rose transition-colors cursor-pointer active:scale-90">
            <User size={22} />
          </button>
          <button 
            onClick={onWishlistClick}
            className="hover:text-brand-rose transition-colors relative cursor-pointer active:scale-90"
          >
            <Heart size={22} />
            <motion.span 
              key={wishlistCount}
              initial={{ scale: 0.6 }}
              animate={{ scale: [1, 1.3, 1] }}
              className="absolute -top-1.5 -right-2 bg-brand-charcoal text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
            >
              {wishlistCount}
            </motion.span>
          </button>
          <button 
            onClick={onCartClick}
            className="hover:text-brand-rose transition-colors relative cursor-pointer active:scale-90"
          >
            <ShoppingCart size={22} />
            <motion.span 
              key={cartCount}
              initial={{ scale: 0.6 }}
              animate={{ scale: [1, 1.45, 1] }}
              transition={{ type: "spring", stiffness: 450, damping: 12 }}
              className="absolute -top-1.5 -right-2 bg-[#B2AC88] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs select-none"
            >
              {cartCount}
            </motion.span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-4 pb-4">
        <ul className="flex justify-center space-x-8 text-sm font-medium select-none">
          <li className="relative py-1">
            <button 
              onClick={() => onViewChange('home')}
              className={`hover:text-brand-rose cursor-pointer transition-colors pb-1.5 relative ${
                currentView === 'home' ? 'text-brand-rose font-semibold' : 'text-brand-charcoal'
              }`}
            >
              Home
            </button>
          </li>
          <li 
            onClick={() => onViewChange('home')}
            className="flex items-center space-x-1 hover:text-brand-rose transition-colors cursor-pointer py-1 pb-1.5 relative"
          >
            <span>Categories</span>
            <ChevronDown size={14} />
          </li>
          <li className="relative py-1">
            <button 
              onClick={() => onViewChange('all_products')}
              className={`hover:text-brand-rose cursor-pointer transition-colors pb-1.5 relative ${
                currentView === 'all_products' ? 'text-brand-rose font-semibold' : 'text-brand-charcoal'
              }`}
            >
              All Products
            </button>
          </li>
          <li className="relative py-1">
            <button 
              onClick={() => {}}
              className="hover:text-brand-rose cursor-pointer transition-colors pb-1.5 text-brand-charcoal"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
