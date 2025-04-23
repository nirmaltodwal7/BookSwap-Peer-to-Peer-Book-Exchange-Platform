import { Book, BookCondition, ChatMessage, Conversation, User, WishlistItem } from '../types';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'bookworm42',
    email: 'bookworm@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    joinedDate: new Date('2023-01-15')
  },
  {
    id: '2',
    username: 'readingqueen',
    email: 'reader@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    joinedDate: new Date('2023-03-22')
  },
  {
    id: '3',
    username: 'literarylion',
    email: 'literary@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    joinedDate: new Date('2022-11-05')
  }
];

// Current user (for demo purposes)
export const currentUser = mockUsers[0];

// Mock books
export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: ['Classic', 'Fiction'],
    condition: BookCondition.VERY_GOOD,
    description: 'A classic novel about the American dream, featuring Jay Gatsby and his pursuit of Daisy Buchanan.',
    imageUrl: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=600',
    ownerId: '2',
    ownerName: 'readingqueen',
    listingDate: new Date('2023-10-15'),
    status: 'available'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: ['Classic', 'Fiction'],
    condition: BookCondition.GOOD,
    description: 'A powerful story of racial injustice and moral growth as seen through the eyes of a young girl in the American South.',
    imageUrl: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=600',
    ownerId: '3',
    ownerName: 'literarylion',
    listingDate: new Date('2023-11-20'),
    status: 'available'
  },
  {
    id: '3',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: ['Fantasy', 'Adventure'],
    condition: BookCondition.LIKE_NEW,
    description: 'A fantasy novel about the adventures of hobbit Bilbo Baggins as he journeys to the Lonely Mountain.',
    imageUrl: 'https://images.pexels.com/photos/1887609/pexels-photo-1887609.jpeg?auto=compress&cs=tinysrgb&w=600',
    ownerId: '2',
    ownerName: 'readingqueen',
    listingDate: new Date('2023-12-05'),
    status: 'available'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: ['Classic', 'Romance'],
    condition: BookCondition.GOOD,
    description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet.',
    imageUrl: 'https://images.pexels.com/photos/3747506/pexels-photo-3747506.jpeg?auto=compress&cs=tinysrgb&w=600',
    ownerId: '3',
    ownerName: 'literarylion',
    listingDate: new Date('2024-01-12'),
    status: 'available'
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: ['Fiction', 'Coming-of-age'],
    condition: BookCondition.ACCEPTABLE,
    description: 'A novel that follows the experiences of Holden Caulfield in New York City.',
    imageUrl: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=600',
    ownerId: '1',
    ownerName: 'bookworm42',
    listingDate: new Date('2023-09-30'),
    status: 'available'
  },
  {
    id: '6',
    title: '1984',
    author: 'George Orwell',
    genre: ['Dystopian', 'Science Fiction'],
    condition: BookCondition.VERY_GOOD,
    description: 'A dystopian novel set in a totalitarian society where independent thinking is a crime.',
    imageUrl: 'https://images.pexels.com/photos/4132936/pexels-photo-4132936.jpeg?auto=compress&cs=tinysrgb&w=600',
    ownerId: '1',
    ownerName: 'bookworm42',
    listingDate: new Date('2023-10-22'),
    status: 'available'
  }
];

// Mock chat messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'bookworm42',
    receiverId: '2',
    content: 'Hi, I\'m interested in The Great Gatsby. Is it still available?',
    timestamp: new Date('2024-03-15T14:30:00'),
    read: true
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'readingqueen',
    receiverId: '1',
    content: 'Yes, it\'s still available! Are you looking to exchange or just take it?',
    timestamp: new Date('2024-03-15T14:35:00'),
    read: true
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'bookworm42',
    receiverId: '2',
    content: 'I\'d love to exchange. I have a copy of "Little Women" in very good condition if you\'re interested?',
    timestamp: new Date('2024-03-15T14:40:00'),
    read: true
  }
];

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: ['1', '2'],
    lastMessage: mockChatMessages[2],
    bookId: '1'
  }
];

// Mock wishlist items
export const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    userId: '1',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: ['Science Fiction', 'Fantasy']
  },
  {
    id: '2',
    userId: '1',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: ['Fantasy', 'Adventure']
  }
];