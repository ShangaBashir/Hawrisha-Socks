export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-beige py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-serif text-2xl mb-4 italic text-brand-rose">HAWRISHA</h4>
          <p className="text-sm opacity-80">
             Premium socks for every occasion. Experience comfort and style with our carefully crafted collections.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#" className="hover:text-brand-rose transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-brand-rose transition-colors">Christmas Socks</a></li>
            <li><a href="#" className="hover:text-brand-rose transition-colors">Packs</a></li>
            <li><a href="#" className="hover:text-brand-rose transition-colors">New Arrivals</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Customer Care</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#" className="hover:text-brand-rose transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-brand-rose transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-brand-rose transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-brand-rose transition-colors">Size Guide</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Newsletter</h4>
          <p className="text-sm opacity-80 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-2 bg-white/10 text-white placeholder:text-white/50 rounded focus:outline-none focus:ring-1 focus:ring-brand-rose border border-white/20"
            />
            <button className="w-full px-4 py-2 bg-brand-rose text-white font-bold rounded hover:bg-brand-rose/90 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-sm opacity-60">
        <p>&copy; {new Date().getFullYear()} HAVANA. All rights reserved.</p>
      </div>
    </footer>
  );
}
