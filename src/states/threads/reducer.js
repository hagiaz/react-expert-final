import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  threads: [],
  threadDetail: null,
  categories: [],
  selectedCategory: '',
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload;

      const categories = new Set();
      action.payload.forEach((thread) => {
        if (thread.category) {
          categories.add(thread.category);
        }
      });
      state.categories = Array.from(categories);
    },
    setThreadDetail: (state, action) => {
      state.threadDetail = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    addThread: (state, action) => {
      state.threads.unshift(action.payload);
    },
    addComment: (state, action) => {
      if (state.threadDetail && state.threadDetail.id === action.payload.threadId) {
        state.threadDetail.comments.push(action.payload.comment);
      }
    },
  },
});

export const {
  setThreads,
  setThreadDetail,
  setSelectedCategory,
  addThread,
  addComment,
} = threadsSlice.actions;
export default threadsSlice.reducer;
