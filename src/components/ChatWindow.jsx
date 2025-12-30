import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, clearMessages, addMessage } from '../redux/slices/ChatSlice';

const ChatWindow = ({ conversationId, socket, onBack }) => {
  const dispatch = useDispatch();
  const { messages, loading, error, selectedChat } = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.auth.data);

  const [text, setText] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [chatSearchTerm, setChatSearchTerm] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (conversationId) {
      dispatch(clearMessages());
      dispatch(fetchMessages(conversationId));
    }
  }, [conversationId, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit(
      'sendMessage',
      { receiverId: selectedChat?.counterpartId, text },
      (res) => {
        if (res.ok) dispatch(addMessage(res.message));
      }
    );

    setText('');
  };

  const filteredMessages =
    messages?.filter((msg) =>
      msg.text?.toLowerCase().includes(chatSearchTerm.toLowerCase())
    ) || [];

  if (loading)
    return <div className="flex items-center justify-center h-full text-gray-400">Loading...</div>;

  if (error)
    return <div className="flex items-center justify-center h-full text-red-400">{error}</div>;

  return (
    <div className="flex flex-col h-full bg-gray-900 overflow-hidden">

      {/* TOP BAR */}
      <div className="sticky top-0 z-20 bg-gray-800 border-b border-gray-700 h-16 px-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center">
          {/* BACK BUTTON (MOBILE ONLY) */}
          <button
            onClick={onBack}
            className="mr-3 md:hidden text-white text-xl"
          >
            ←
          </button>

          <img
            src={selectedChat?.counterpartInfo?.avatarUrl || 'https://via.placeholder.com/40'}
            alt="avatar"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />

          <span className="text-white font-medium">
            {selectedChat?.counterpartInfo?.name || 'Unknown'}
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-2">
          {showSearch ? (
            <>
              <input
                value={chatSearchTerm}
                onChange={(e) => setChatSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-40 p-2 rounded bg-gray-700 text-white"
              />
              <button onClick={() => setShowSearch(false)} className="text-white">
                ✕
              </button>
            </>
          ) : (
            <button onClick={() => setShowSearch(true)} className="text-white">
              🔍
            </button>
          )}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredMessages.length ? (
          filteredMessages.map((msg) => {
            const isMe = msg.senderId === currentUser?.id;
            const avatar = isMe
              ? currentUser?.avatarUrl
              : selectedChat?.counterpartInfo?.avatarUrl;

            return (
              <div
                key={msg._id}
                className={`flex mb-3 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <img src={avatar} className="w-8 h-8 rounded-full mr-2" />
                )}

                <div className={`px-4 py-2 rounded-2xl max-w-xs text-white ${isMe ? 'bg-blue-500' : 'bg-gray-700'}`}>
                  {msg.text}
                  <div className="text-xs text-gray-300 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>

                {isMe && (
                  <img src={avatar} className="w-8 h-8 rounded-full ml-2" />
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-400">No messages</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="border-t border-gray-700 p-4 bg-gray-800">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>
    </div>
  );
};

export default ChatWindow;
