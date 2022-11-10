import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
   reducer: {
      user: userReducer,
      blogs: blogsReducer,
      notification: notificationReducer,
   },
});
