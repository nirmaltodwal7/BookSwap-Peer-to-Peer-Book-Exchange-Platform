// Define types for the application

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  rating: number;
  joinedDate: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string[];
  condition: BookCondition;
  description: string;
  imageUrl: string;
  ownerId: string;
  ownerName: string;
  listingDate: Date;
  status: 'available' | 'reserved' | 'exchanged';
}

export enum BookCondition {
  NEW = "New",
  LIKE_NEW = "Like New",
  VERY_GOOD = "Very Good",
  GOOD = "Good",
  ACCEPTABLE = "Acceptable",
  POOR = "Poor"
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: ChatMessage;
  bookId: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  title: string;
  author: string;
  genre?: string[];
}