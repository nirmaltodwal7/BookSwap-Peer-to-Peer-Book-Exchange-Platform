import React from 'react';
import { Book } from '../../types';
import Card, { CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { BookConditionBadge } from './BookConditionBadge';
import { formatDistanceToNow } from '../../utils/dateUtils';

type BookCardProps = {
  book: Book;
  onClick?: () => void;
};

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <Card 
      onClick={onClick} 
      className="h-full cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <BookConditionBadge condition={book.condition} />
        </div>
      </div>
      
      <CardContent className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-[#722F37] line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">by {book.author}</p>
        
        <div className="flex flex-wrap gap-1 mt-1">
          {book.genre.slice(0, 2).map((g, index) => (
            <Badge key={index} text={g} size="sm" />
          ))}
          {book.genre.length > 2 && (
            <Badge text={`+${book.genre.length - 2}`} size="sm" variant="default" />
          )}
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{book.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
            <img
              src={`https://ui-avatars.com/api/?name=${book.ownerName}&background=random`}
              alt={book.ownerName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-gray-600">{book.ownerName}</span>
        </div>
        <span className="text-xs text-gray-500">{formatDistanceToNow(book.listingDate)}</span>
      </CardFooter>
    </Card>
  );
};

export default BookCard;