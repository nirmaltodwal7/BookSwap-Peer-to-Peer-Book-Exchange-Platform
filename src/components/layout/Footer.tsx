import React from 'react';
import { Book, Github, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#722F37] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Book size={24} />
              <h2 className="text-xl font-bold">BookSwap</h2>
            </div>
            <p className="text-sm text-white/80">
              BookSwap is a platform that connects book lovers, helping them exchange and share their favorite reads.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Browse Books</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Book Clubs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reading Challenges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="hover:text-white/80 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Github size={20} />
              </a>
            </div>
            <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-gray-800 text-sm rounded-l-md focus:outline-none flex-1"
              />
              <button
                type="submit"
                className="bg-[#DAA520] text-white px-3 py-2 text-sm rounded-r-md hover:bg-[#b08600] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-4 text-sm text-white/60 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} BookSwap. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;