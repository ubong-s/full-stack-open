import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { newNotification } from './notificationReducer';

const initialState = null;

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         return action.payload;
      },
   },
});

export const loginUserAsync = (payload) => {
   return async (dispatch) => {
      try {
         const user = await loginService.login(payload);

         window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
         blogService.setToken(user.token);

         dispatch(setUser(user));
      } catch (error) {
         dispatch(
            newNotification(
               {
                  type: 'error',
                  text: error.message,
               },
               5
            )
         );
      }
   };
};

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
