import React, { useState } from 'react';
import { Conversation, User, Book, ChatMessage } from '../types';
import ConversationList from '../components/chat/ConversationList';
import ChatInterface from '../components/chat/ChatInterface';
import { mockUsers, mockConversations, mockChatMessages, mockBooks, currentUser } from '../utils/mockData';

type MessagesPageProps = {
  onNavigate: (path: string) => void;
};

const MessagesPage: React.FC<MessagesPageProps> = ({ onNavigate }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  
  // Get the other user in the conversation
  const getRecipient = (conversation: Conversation): User => {
    const otherUserId = conversation.participants.find(id => id !== currentUser.id);
    return mockUsers.find(user => user.id === otherUserId) || mockUsers[0];
  };
  
  // Get the book associated with a conversation
  const getBook = (conversation: Conversation): Book => {
    return mockBooks.find(book => book.id === conversation.bookId) || mockBooks[0];
  };
  
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };
  
  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.username,
      receiverId: getRecipient(selectedConversation).id,
      content,
      timestamp: new Date(),
      read: false
    };
    
    // Add the message to the messages list
    setMessages([...messages, newMessage]);
    
    // Update the lastMessage in the conversation
    const updatedConversations = conversations.map(conv => 
      conv.id === selectedConversation.id
        ? { ...conv, lastMessage: newMessage }
        : conv
    );
    
    setConversations(updatedConversations);
  };
  
  const handleCloseChat = () => {
    setSelectedConversation(null);
  };
  
  // Filter messages for the selected conversation
  const conversationMessages = selectedConversation 
    ? messages.filter(msg => 
        selectedConversation.participants.includes(msg.senderId) && 
        selectedConversation.participants.includes(msg.receiverId)
      )
    : [];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-[#722F37] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Messages</h1>
          <p>Connect with fellow book enthusiasts</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Conversations list - always visible on desktop, hidden when chat is open on mobile */}
            <div className={`${selectedConversation ? 'hidden md:block' : ''} border-r border-gray-200`}>
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800">Your Conversations</h2>
              </div>
              
              <ConversationList
                conversations={conversations}
                currentUser={currentUser}
                users={mockUsers}
                onSelectConversation={handleSelectConversation}
                selectedConversationId={selectedConversation?.id || null}
              />
            </div>
            
            {/* Chat area or empty state */}
            <div className="md:col-span-2">
              {selectedConversation ? (
                <div className="md:hidden">
                  <ChatInterface
                    messages={conversationMessages}
                    currentUser={currentUser}
                    recipient={getRecipient(selectedConversation)}
                    bookTitle={getBook(selectedConversation).title}
                    onSendMessage={handleSendMessage}
                    onClose={handleCloseChat}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a conversation</h3>
                  <p className="text-gray-500 max-w-md">
                    Choose a conversation from the list to start chatting, or browse books to find new reading buddies.
                  </p>
                </div>
              )}
              
              {/* Desktop chat view */}
              <div className="hidden md:block h-full">
                {selectedConversation ? (
                  <div className="h-[calc(100vh-12rem)]">
                    <div className="border-b px-4 py-3 flex items-center justify-between bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src={getRecipient(selectedConversation).avatar || `https://ui-avatars.com/api/?name=${getRecipient(selectedConversation).username}`}
                            alt={getRecipient(selectedConversation).username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{getRecipient(selectedConversation).username}</h3>
                          <p className="text-xs text-gray-500">Discussing: {getBook(selectedConversation).title}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Messages area */}
                    <div className="h-[calc(100%-7rem)] overflow-y-auto p-4 bg-[#F5F5DC]/30">
                      <div className="space-y-3">
                        {conversationMessages.map((message) => {
                          const isCurrentUser = message.senderId === currentUser.id;
                          
                          return (
                            <div 
                              key={message.id}
                              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-[70%] ${isCurrentUser ? 'bg-[#722F37] text-white' : 'bg-white'} p-3 rounded-lg shadow`}>
                                <p>{message.content}</p>
                                <div className={`text-xs mt-1 ${isCurrentUser ? 'text-white/70' : 'text-gray-500'} text-right`}>
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Message input */}
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
                        if (input.value.trim()) {
                          handleSendMessage(input.value.trim());
                          input.value = '';
                        }
                      }} 
                      className="border-t p-3 flex gap-2"
                    >
                      <input
                        type="text"
                        name="message"
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="bg-[#722F37] text-white p-2 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
                    <div className="text-5xl mb-4">💬</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a conversation</h3>
                    <p className="text-gray-500 max-w-md">
                      Choose a conversation from the list to start chatting, or browse books to find new reading buddies.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;