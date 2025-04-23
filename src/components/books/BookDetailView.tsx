import React from 'react';
import { Book } from '../../types';
import { BookConditionBadge } from './BookConditionBadge';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { formatDate } from '../../utils/dateUtils';
import { MessageSquare, Heart, Share2 } from 'lucide-react';

type BookDetailViewProps = {
  book: Book;
  onContactOwner: () => void;
  onAddToWishlist: () => void;
  onShare: () => void;
  onClose: () => void;
};

const BookDetailView: React.FC<BookDetailViewProps> = ({
  book,
  onContactOwner,
  onAddToWishlist,
  onShare,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-1 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 h-64 md:h-auto">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="md:w-1/2 p-6 flex flex-col overflow-auto">
            <div className="mb-4 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-[#722F37]">{book.title}</h2>
                <p className="text-gray-600">by {book.author}</p>
              </div>
              <BookConditionBadge condition={book.condition} />
            </div>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {book.genre.map((genre, index) => (
                  <Badge key={index} text={genre} />
                ))}
              </div>
              <p className="text-gray-700">{book.description}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-800 mb-1">Listed by</h3>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={`https://ui-avatars.com/api/?name=${book.ownerName}&background=random`}
                    alt={book.ownerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{book.ownerName}</p>
                  <p className="text-xs text-gray-500">Listed on {formatDate(book.listingDate)}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto grid grid-cols-3 gap-2">
              <Button
                variant="primary"
                onClick={onContactOwner}
                fullWidth
                icon={<MessageSquare size={16} />}
              >
                Contact
              </Button>
              <Button
                variant="outline"
                onClick={onAddToWishlist}
                fullWidth
                icon={<Heart size={16} />}
              >
                Wishlist
              </Button>
              <Button
                variant="ghost"
                onClick={onShare}
                fullWidth
                icon={<Share2 size={16} />}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailView;