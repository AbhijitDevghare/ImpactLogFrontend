import React, { useState, useEffect } from 'react';
import "./ChatPage.css";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import { useSocket } from '../hooks/useSocket';
import MainLayout from '../layout/MainLayout';
import { selectChat, createConversation } from '../redux/slices/ChatSlice';

const ChatPage = () => {
  const { selectedChat, chats } = useSelector((state) => state.chat);
  const { data: authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { conversationId } = useParams();
  const socket = useSocket();

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [followerSearchTerm, setFollowerSearchTerm] = useState('');
  const [showChatWindow, setShowChatWindow] = useState(false);

  useEffect(() => {
    if (conversationId && chats.length > 0) {
      const chat = chats.find(c => c.conversationId === conversationId);
      if (chat) {
        dispatch(selectChat(chat));
        setShowChatWindow(true);
      }
    }
  }, [conversationId, chats, dispatch]);

  const handleFollowerClick = async (follower) => {
    const existingChat = chats.find(chat => chat.counterpartId === follower.id);

    if (existingChat) {
      dispatch(selectChat(existingChat));
      navigate(`/chat/${existingChat.conversationId}`);
      setShowChatWindow(true);
    } else {
      const newChat = await dispatch(createConversation(follower.id)).unwrap();
      dispatch(selectChat(newChat));
      navigate(`/chat/${newChat.conversationId}`);
      setShowChatWindow(true);
    }

    setShowNewMessageModal(false);
  };

  const filteredFollowers =
    authData?.followers?.followers?.filter(f =>
      f.name?.toLowerCase().includes(followerSearchTerm.toLowerCase()) ||
      f.username?.toLowerCase().includes(followerSearchTerm.toLowerCase())
    ) || [];

  return (
    <MainLayout>
      <div className="chatpage flex h-full">

        {/* Chat List */}
        <div className={`chatlist w-full md:w-1/3 border-r border-gray-700 
          ${showChatWindow ? 'hidden md:block' : 'block'}`}>

          <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
            <h2 className="text-white font-medium">Chats</h2>
            <button
              onClick={() => setShowNewMessageModal(true)}
              className="bg-purple-600 text-white rounded-full p-2"
            >
              +
            </button>
          </div>

          {showNewMessageModal ? (
            <>
              <div className="flex items-center p-4 bg-gray-800 border-b border-gray-700">
                <button onClick={() => setShowNewMessageModal(false)} className="mr-3">
                  ←
                </button>
                <h2 className="text-white">New Message</h2>
              </div>

              <div className="p-4">
                <input
                  value={followerSearchTerm}
                  onChange={(e) => setFollowerSearchTerm(e.target.value)}
                  placeholder="Search followers"
                  className="w-full p-2 bg-gray-700 text-white rounded"
                />
              </div>

              <div className="p-4 space-y-2 overflow-y-auto">
                {filteredFollowers.map(f => (
                  <div
                    key={f.id}
                    onClick={() => handleFollowerClick(f)}
                    className="flex items-center p-3 bg-gray-700 rounded cursor-pointer"
                  >
                    <img
                      src={f.avatarUrl || 'https://via.placeholder.com/40'}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="text-white">{f.name}</div>
                      <div className="text-gray-400 text-sm">@{f.username}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <ChatList
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onChatSelect={() => setShowChatWindow(true)}
            />
          )}
        </div>

        {/* Chat Window */}
        <div className={`chatwindow w-full md:w-2/3 
          ${showChatWindow ? 'block' : 'hidden md:block'}`}>

          {selectedChat ? (
            <ChatWindow
              conversationId={selectedChat.conversationId}
              socket={socket}
              searchTerm={searchTerm}
              onBack={() => setShowChatWindow(false)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a chat
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
};

export default ChatPage;
