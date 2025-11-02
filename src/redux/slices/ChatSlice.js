import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChats = createAsyncThunk('chat/fetchChats', async () => {
  const res = await fetch('http://localhost:5000/chat/chats', {
    credentials: 'include',
    redirect: 'follow'
  });
  const data = await res.json();
  console.log(data);
  return data.data;
});

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (conversationId) => {
  const res = await fetch(`http://localhost:5000/chat/conversations/${conversationId}/messages`, {
    credentials: 'include',
    redirect: 'follow'
  });

  const data = await res.json();
    console.log("RESPONSE FETCHMESSAGES",data)

  return data.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    messages: [],
    selectedChat: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => { state.loading = true; })
      .addCase(fetchChats.fulfilled, (state, action) => { state.loading = false; state.chats = action.payload; })
      .addCase(fetchChats.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(fetchMessages.pending, (state) => { state.loading = true; })
      .addCase(fetchMessages.fulfilled, (state, action) => { state.loading = false; state.messages = action.payload; })
      .addCase(fetchMessages.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export const { selectChat, addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
