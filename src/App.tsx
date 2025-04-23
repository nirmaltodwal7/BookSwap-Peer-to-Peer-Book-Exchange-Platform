import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import MessagesPage from './pages/MessagesPage';
import { Book } from './types';
import BookDetailView from './components/books/BookDetailView';
import ChatInterface from './components/chat/ChatInterface';
import { currentUser, mockUsers, mockBooks } from './utils/mockData';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [activeChatBook, setActiveChatBook] = useState<Book | null>(null);
  
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };
  
  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
  };
  
  const handleContactOwner = (book: Book) => {
    setShowChat(true);
    setActiveChatBook(book);
    setSelectedBook(null);
  };
  
  const handleCloseChat = () => {
    setShowChat(false);
    setActiveChatBook(null);
  };
  
  const handleSendMessage = (content: string) => {
    // This would normally send a message to the database
    console.log('Sending message:', content);
    // For demo, we'd add it locally
    handleCloseChat();
    alert('Message sent successfully! The owner will be in touch soon.');
  };
  
  // Render the current page based on path
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <HomePage 
            onNavigate={handleNavigate}
            onBookSelect={handleBookSelect}
          />
        );
      case '/books':
        return (
          <BooksPage 
            onNavigate={handleNavigate}
            onContactOwner={handleContactOwner}
          />
        );
      case '/messages':
        return (
          <MessagesPage 
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#722F37] mb-4">
                Page Under Construction
              </h1>
              <p className="text-gray-600 mb-6">
                We're working on this page and it will be available soon!
              </p>
              <button
                onClick={() => handleNavigate('/')}
                className="bg-[#722F37] text-white px-4 py-2 rounded-md hover:bg-[#5a2329] transition-colors"
              >
                Return Home
              </button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        currentUser={currentUser}
        onSearch={(query) => {
          handleNavigate('/books');
          // Search functionality would be implemented here
        }}
        onNavigate={handleNavigate}
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <Footer />
      
      {/* Book detail modal */}
      {selectedBook && (
        <BookDetailView
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onContactOwner={() => handleContactOwner(selectedBook)}
          onAddToWishlist={() => {
            alert('Added to wishlist!');
            setSelectedBook(null);
          }}
          onShare={() => {
            alert('Sharing functionality would go here');
          }}
        />
      )}
      
      {/* Chat interface */}
      {showChat && activeChatBook && (
        <ChatInterface
          messages={[]}
          currentUser={currentUser}
          recipient={mockUsers.find(user => user.id === activeChatBook.ownerId) || mockUsers[0]}
          bookTitle={activeChatBook.title}
          onSendMessage={handleSendMessage}
          onClose={handleCloseChat}
        />
      )}
    </div>
  );
}

export default App;