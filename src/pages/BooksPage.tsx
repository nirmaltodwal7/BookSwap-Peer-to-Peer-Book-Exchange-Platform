import React, { useState, useEffect } from 'react';
import { Book, BookCondition } from '../types';
import SearchBar from '../components/ui/SearchBar';
import BookGrid from '../components/books/BookGrid';
import BookDetailView from '../components/books/BookDetailView';
import Button from '../components/ui/Button';
import { BookConditionBadge } from '../components/books/BookConditionBadge';
import { Filter, Plus, X } from 'lucide-react';
import { mockBooks } from '../utils/mockData';

type BooksPageProps = {
  onNavigate: (path: string) => void;
  onContactOwner: (book: Book) => void;
};

const BooksPage: React.FC<BooksPageProps> = ({ onNavigate, onContactOwner }) => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(mockBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<BookCondition[]>([]);
  
  // Get unique genres from all books
  const allGenres = Array.from(
    new Set(
      mockBooks.flatMap(book => book.genre)
    )
  ).sort();
  
  const conditions = Object.values(BookCondition);
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedGenres, selectedConditions);
  };
  
  // Toggle genre filter
  const toggleGenre = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    setSelectedGenres(updatedGenres);
    applyFilters(searchQuery, updatedGenres, selectedConditions);
  };
  
  // Toggle condition filter
  const toggleCondition = (condition: BookCondition) => {
    const updatedConditions = selectedConditions.includes(condition)
      ? selectedConditions.filter(c => c !== condition)
      : [...selectedConditions, condition];
    
    setSelectedConditions(updatedConditions);
    applyFilters(searchQuery, selectedGenres, updatedConditions);
  };
  
  // Apply all filters
  const applyFilters = (query: string, genres: string[], conditions: BookCondition[]) => {
    let result = books;
    
    // Apply search query
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(lowercaseQuery) ||
        book.author.toLowerCase().includes(lowercaseQuery) ||
        book.genre.some(g => g.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    // Apply genre filter
    if (genres.length > 0) {
      result = result.filter(book => 
        book.genre.some(g => genres.includes(g))
      );
    }
    
    // Apply condition filter
    if (conditions.length > 0) {
      result = result.filter(book => 
        conditions.includes(book.condition)
      );
    }
    
    setFilteredBooks(result);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedConditions([]);
    setFilteredBooks(books);
  };
  
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };
  
  const handleCloseDetail = () => {
    setSelectedBook(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-[#722F37] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Browse Books</h1>
          <p className="mb-6">Find your next great read from our community</p>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search by title, author, or genre"
                className="w-full"
              />
            </div>
            
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#722F37]"
              onClick={() => setShowFilters(!showFilters)}
              icon={<Filter size={18} />}
            >
              Filters
            </Button>
            
            <Button
              onClick={() => onNavigate('/add-book')}
              icon={<Plus size={18} />}
            >
              Add Book
            </Button>
          </div>
          
          {/* Active filters display */}
          {(selectedGenres.length > 0 || selectedConditions.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm">Active filters:</span>
              
              {selectedGenres.map(genre => (
                <span 
                  key={genre} 
                  className="bg-white/20 text-white text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {genre}
                  <button onClick={() => toggleGenre(genre)} className="ml-1">
                    <X size={14} />
                  </button>
                </span>
              ))}
              
              {selectedConditions.map(condition => (
                <span 
                  key={condition} 
                  className="bg-white/20 text-white text-xs px-2 py-1 rounded-full flex items-center"
                >
                  {condition}
                  <button onClick={() => toggleCondition(condition)} className="ml-1">
                    <X size={14} />
                  </button>
                </span>
              ))}
              
              <button 
                onClick={clearFilters}
                className="text-xs underline hover:text-white/80"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-6">
        {/* Filters sidebar - hidden by default on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Filters</h3>
                <button 
                  className="lg:hidden text-gray-500"
                  onClick={() => setShowFilters(false)}
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Genre filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Genres</h4>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {allGenres.map(genre => (
                    <label key={genre} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(genre)}
                        onChange={() => toggleGenre(genre)}
                        className="mr-2"
                      />
                      <span className="text-gray-600 text-sm">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Condition filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Condition</h4>
                <div className="space-y-2">
                  {conditions.map(condition => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(condition)}
                        onChange={() => toggleCondition(condition)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Book grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'Book' : 'Books'} Available
              </h2>
            </div>
            
            <BookGrid
              books={filteredBooks}
              onBookClick={handleBookClick}
            />
          </div>
        </div>
      </div>
      
      {/* Book detail view */}
      {selectedBook && (
        <BookDetailView
          book={selectedBook}
          onClose={handleCloseDetail}
          onContactOwner={() => onContactOwner(selectedBook)}
          onAddToWishlist={() => {
            alert('Added to wishlist!');
          }}
          onShare={() => {
            alert('Sharing functionality would go here');
          }}
        />
      )}
    </div>
  );
};

export default BooksPage;