import React, { useState } from 'react';
import { Book, MessageSquare, Heart, User, Menu, X } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import { User as UserType } from '../../types';

type HeaderProps = {
  currentUser: UserType | null;
  onSearch: (query: string) => void;
  onNavigate: (path: string) => void;
};

const Header: React.FC<HeaderProps> = ({ currentUser, onSearch, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('/')}
          >
            <Book size={28} className="text-[#722F37]" />
            <h1 className="text-xl font-bold text-[#722F37]">BookSwap</h1>
          </div>
          
          {/* Search - hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-lg mx-6">
            <SearchBar onSearch={onSearch} />
          </div>
          
          {/* Navigation - desktop */}
          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onNavigate('/books')}
              className="flex flex-col items-center text-gray-600 hover:text-[#722F37] transition-colors"
            >
              <Book size={20} />
              <span className="text-xs">Books</span>
            </button>
            
            <button
              onClick={() => onNavigate('/messages')}
              className="flex flex-col items-center text-gray-600 hover:text-[#722F37] transition-colors"
            >
              <MessageSquare size={20} />
              <span className="text-xs">Messages</span>
            </button>
            
            <button
              onClick={() => onNavigate('/wishlist')}
              className="flex flex-col items-center text-gray-600 hover:text-[#722F37] transition-colors"
            >
              <Heart size={20} />
              <span className="text-xs">Wishlist</span>
            </button>
            
            <button
              onClick={() => onNavigate('/profile')}
              className="flex flex-col items-center text-gray-600 hover:text-[#722F37] transition-colors"
            >
              {currentUser ? (
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img
                    src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.username}`}
                    alt={currentUser.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <User size={20} />
              )}
              <span className="text-xs">Profile</span>
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#722F37]"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile search - only visible on mobile */}
        <div className="md:hidden py-2">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <nav className="grid grid-cols-4 py-3">
            <button
              onClick={() => {
                onNavigate('/books');
                setMobileMenuOpen(false);
              }}
              className="flex flex-col items-center text-gray-600"
            >
              <Book size={20} />
              <span className="text-xs mt-1">Books</span>
            </button>
            
            <button
              onClick={() => {
                onNavigate('/messages');
                setMobileMenuOpen(false);
              }}
              className="flex flex-col items-center text-gray-600"
            >
              <MessageSquare size={20} />
              <span className="text-xs mt-1">Messages</span>
            </button>
            
            <button
              onClick={() => {
                onNavigate('/wishlist');
                setMobileMenuOpen(false);
              }}
              className="flex flex-col items-center text-gray-600"
            >
              <Heart size={20} />
              <span className="text-xs mt-1">Wishlist</span>
            </button>
            
            <button
              onClick={() => {
                onNavigate('/profile');
                setMobileMenuOpen(false);
              }}
              className="flex flex-col items-center text-gray-600"
            >
              {currentUser ? (
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img
                    src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.username}`}
                    alt={currentUser.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <User size={20} />
              )}
              <span className="text-xs mt-1">Profile</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;