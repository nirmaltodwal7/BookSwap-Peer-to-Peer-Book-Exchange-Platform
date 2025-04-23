import React, { useState } from 'react';
import { ChatMessage, User } from '../../types';
import { Send } from 'lucide-react';
import { formatTime } from '../../utils/dateUtils';

type ChatInterfaceProps = {
  messages: ChatMessage[];
  currentUser: User;
  recipient: User;
  bookTitle: string;
  onSendMessage: (content: string) => void;
  onClose: () => void;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  currentUser,
  recipient,
  bookTitle,
  onSendMessage,
  onClose,
}) => {
  const [newMessage, setNewMessage] = useState('');
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="border-b px-4 py-3 flex items-center justify-between bg-[#722F37] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
              <img
                src={recipient.avatar || `https://ui-avatars.com/api/?name=${recipient.username}`}
                alt={recipient.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{recipient.username}</h3>
              <p className="text-xs text-white/70">Discussing: {bookTitle}</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-[#5a2329]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#F5F5DC]/30">
          <div className="space-y-3">
            {messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser.id;
              
              return (
                <div 
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${isCurrentUser ? 'bg-[#722F37] text-white' : 'bg-white'} p-3 rounded-lg shadow`}>
                    <p>{message.content}</p>
                    <div className={`text-xs mt-1 ${isCurrentUser ? 'text-white/70' : 'text-gray-500'} text-right`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSend} className="border-t p-3 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-[#722F37] text-white p-2 rounded-full disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;