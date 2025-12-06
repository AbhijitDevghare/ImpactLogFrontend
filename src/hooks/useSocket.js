import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/slices/ChatSlice';
import io from 'socket.io-client';

export const useSocket = () => {
  
  const api = import.meta.env.VITE_CHAT_SERVICE_API_URL || 'https://api.impactlog.me/chat';


  const dispatch = useDispatch();
  const {  isLoggedIn } = useSelector(state => state.auth);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!isLoggedIn ) return; // Don't connect if not logged in

    // Initialize socket with token auth
    const newSocket = io(api, {
      transports: ['websocket'],
      withCredentials: true
    });

    // Listen for incoming messages
    newSocket.on('receiveMessage', (data) => {
      dispatch(addMessage(data.message));
    });

    // Save socket instance to state
    setSocket(newSocket);

    // Cleanup on unmount or token/logout change
    return () => {
      newSocket.disconnect();
    };
  }, [dispatch, isLoggedIn]);

  return socket;
};
