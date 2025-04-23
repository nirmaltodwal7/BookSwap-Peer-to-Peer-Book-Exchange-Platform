import React from 'react';
import { Book } from '../../types';
import BookCard from './BookCard';

type BookGridProps = {
  books: Book[];
  onBookClick: (book: Book) => void;
};

const BookGrid: React.FC<BookGridProps> = ({ books, onBookClick }) => {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => onBookClick(book)}
        />
      ))}
    </div>
  );
};

export default BookGrid;