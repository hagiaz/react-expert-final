import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import commentsReducer from './comments/reducer';
import usersReducer from './users/reducer';
import sharedReducer from './shared/reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    comments: commentsReducer,
    users: usersReducer,
    shared: sharedReducer,
  },
});

export default store;
