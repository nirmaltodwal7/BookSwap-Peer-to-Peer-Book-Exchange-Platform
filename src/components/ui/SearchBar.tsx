import React, { useState } from 'react';
import { Search } from 'lucide-react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search by title, author, or genre...',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex items-center ${className}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 text-gray-700 bg-[#F5F5DC] border border-[#E8DDCB] rounded-full focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:border-transparent transition-all"
      />
      <Search
        size={18}
        className="absolute left-3 text-gray-500"
      />
      <button
        type="submit"
        className="absolute right-3 text-[#722F37] hover:text-[#5a2329] focus:outline-none"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;