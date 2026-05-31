import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fallbackBestSellers = [
  {
    id: 1,
    name: 'Abstract Faces',
    price: '6,250 IQD',
    image: '/bestsellers/bs1.jpg'
  },
  {
    id: 2,
    name: 'Cat Patterns',
    price: '6,250 IQD',
    image: '/bestsellers/bs2.jpg'
  },
  {
    id: 3,
    name: 'Pet Lovers',
    price: '6,250 IQD',
    image: '/categories/cat1.jpg'
  },
  {
    id: 4,
    name: 'Kangaroo Crew',
    price: '5,000 IQD',
    image: '/categories/cat3.jpg'
  }
];

export default function BestSeller({ onViewAll, onAddToCart }) {
  const [bestSellersList, setBestSellersList] = useState([]);

  useEffect(() => {
    let active = true;
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (active) {
          const filtered = data.filter(p => p.badge?.toLowerCase() === 'bestseller');
          if (filtered.length > 0) {
            setBestSellersList(filtered.slice(0, 4));
          } else {
            setBestSellersList(data.slice(0, 4));
          }
        }
      })
      .catch(() => {
        if (active) {
          setBestSellersList(fallbackBestSellers);
        }
      });
    return () => { active = false; };
  }, []);

  const getProductImage = (imgUrl) => {
    if (!imgUrl) return '/categories/cat1.jpg';
    if (imgUrl.startsWith('data:') || imgUrl.startsWith('/')) {
      return imgUrl;
    }
    return `/uploads/${imgUrl}`;
  };

  const getProductPrice = (price) => {
    if (typeof price === 'number') {
      return `${price.toLocaleString()} IQD`;
    }
    return price;
  };

  return (
    <section className="container mx-auto px-4 lg:px-16 xl:px-32 py-16">
      {/* Title with lines */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center mb-10"
      >
        <div className="h-px bg-gray-200 flex-grow max-w-[300px]"></div>
        <h2 className="text-xl md:text-2xl font-bold text-[#1a365d] mx-6 uppercase tracking-wider">Best Seller</h2>
        <div className="h-px bg-gray-200 flex-grow max-w-[300px]"></div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellersList.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={(e) => {
              e.stopPropagation();
              let numericPrice = product.price;
              if (typeof numericPrice === 'string') {
                numericPrice = parseFloat(numericPrice.replace(/[^0-9.]/g, '')) || 0;
              }
              onAddToCart({ ...product, price: numericPrice });
            }}
            className="group cursor-pointer flex flex-col"
          >
            <div className="w-full aspect-square bg-gray-100 mb-4 overflow-hidden relative rounded-md shadow-sm">
               <img 
                 src={getProductImage(product.image || product.image_url)} 
                 alt={product.name} 
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
               />
            </div>
            <h3 className="text-[15px] text-brand-charcoal">{product.name}</h3>
            <p className="text-[15px] text-gray-500 mt-0.5">{getProductPrice(product.price)}</p>
          </motion.div>
        ))}
      </div>

      {/* Pagination Dots */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex items-center justify-center space-x-2.5 mt-10"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#C08081]"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full border border-[#C08081]"></div>
        ))}
      </motion.div>

      {/* View All Button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center mt-8"
      >
        <button 
          onClick={onViewAll}
          className="px-10 py-2 border border-[#C08081] text-[#C08081] text-sm font-medium rounded-full hover:bg-[#36454F] hover:border-[#36454F] hover:text-white transition-all duration-300 cursor-pointer"
        >
          View all
        </button>
      </motion.div>
    </section>
  );
}
