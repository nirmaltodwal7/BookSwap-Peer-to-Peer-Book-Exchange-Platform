import React from 'react';
import { Conversation, User } from '../../types';
import { formatDistanceToNow } from '../../utils/dateUtils';

type ConversationListProps = {
  conversations: Conversation[];
  currentUser: User;
  users: User[];
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId: string | null;
};

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentUser,
  users,
  onSelectConversation,
  selectedConversationId,
}) => {
  // Helper to get the other participant
  const getOtherUser = (conversation: Conversation) => {
    const otherUserId = conversation.participants.find(id => id !== currentUser.id);
    return users.find(user => user.id === otherUserId) || null;
  };
  
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center">
        <div className="text-4xl mb-2">💬</div>
        <p className="text-gray-500">No conversations yet</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y">
      {conversations.map((conversation) => {
        const otherUser = getOtherUser(conversation);
        if (!otherUser) return null;
        
        const isSelected = selectedConversationId === conversation.id;
        
        return (
          <div
            key={conversation.id}
            className={`p-3 hover:bg-[#F5F5DC]/50 cursor-pointer transition-colors ${
              isSelected ? 'bg-[#F5F5DC]' : ''
            }`}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <img
                  src={otherUser.avatar || `https://ui-avatars.com/api/?name=${otherUser.username}`}
                  alt={otherUser.username}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate">{otherUser.username}</h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {formatDistanceToNow(conversation.lastMessage.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                  {conversation.lastMessage.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;