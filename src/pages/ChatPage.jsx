import React, { useState } from 'react';
import "./ChatPage.css"
import { useSelector } from 'react-redux';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import { useSocket } from '../hooks/useSocket';
import MainLayout from '../layout/MainLayout';

const ChatPage = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  const socket = useSocket();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <MainLayout>
       <div class="chatpage">
        <div className='chatlist'>
          <ChatList searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>   
        <div className='chatwindow'>
 {selectedChat ? (
            <ChatWindow
              conversationId={selectedChat.conversationId}
              socket={socket}
              searchTerm={searchTerm}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 select-none">
              Select a chat
            </div>
          )}        </div>   
       </div>
    </MainLayout>
  );
};

export default ChatPage;
