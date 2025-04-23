import React, { useState } from 'react';
import Button from '../components/ui/Button';
import BookGrid from '../components/books/BookGrid';
import { Book } from '../types';
import { Search, BookOpen, MessageSquare, Star } from 'lucide-react';
import { mockBooks } from '../utils/mockData';

type HomePageProps = {
  onNavigate: (path: string) => void;
  onBookSelect: (book: Book) => void;
};

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onBookSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#722F37] to-[#8B4513] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Share Books, <span className="text-[#DAA520]">Connect</span> With Readers
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join our community of book lovers to exchange your favorite reads, discover new stories, and connect with fellow readers.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate('/books')}
            >
              Browse Books
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#722F37]"
              onClick={() => onNavigate('/add-book')}
            >
              Share Your Books
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#F5F5DC]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#722F37]">
            How BookSwap Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
              <div className="w-16 h-16 mx-auto bg-[#722F37]/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-[#722F37]" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#722F37]">List Your Books</h3>
              <p className="text-gray-600">
                Photograph and list books you're willing to give away or exchange with other readers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
              <div className="w-16 h-16 mx-auto bg-[#722F37]/10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="text-[#722F37]" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#722F37]">Connect & Chat</h3>
              <p className="text-gray-600">
                Find books you're interested in and chat directly with the owner to arrange an exchange.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105">
              <div className="w-16 h-16 mx-auto bg-[#722F37]/10 rounded-full flex items-center justify-center mb-4">
                <Star className="text-[#722F37]" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#722F37]">Rate & Review</h3>
              <p className="text-gray-600">
                After exchanging books, rate the condition and share your experience with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#722F37]">
              Recently Added Books
            </h2>
            <Button
              variant="outline"
              onClick={() => onNavigate('/books')}
            >
              View All
            </Button>
          </div>
          
          <BookGrid 
            books={mockBooks.slice(0, 4)} 
            onBookClick={onBookSelect} 
          />
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-16 bg-[#E8DDCB]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#722F37]">
            Join Our Community of Book Lovers
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
            Create an account to start sharing and exchanging books with readers in your area. It's free and takes just a minute!
          </p>
          <Button 
            size="lg"
            onClick={() => onNavigate('/signup')}
          >
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;