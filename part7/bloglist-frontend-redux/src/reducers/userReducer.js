import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import userService from '../services/users';
import blogService from '../services/blogs';
import { newNotification } from './notificationReducer';

const initialState = { currentUser: null, allUsers: [] };

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         return { ...state, currentUser: action.payload };
      },
      allUsers: (state, action) => {
         return { ...state, allUsers: action.payload };
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

export const getAllUsersAsync = () => {
   return async (dispatch) => {
      try {
         const users = await userService.getAllUsers();

         dispatch(allUsers(users));
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
export const { setUser, allUsers } = userSlice.actions;

export default userSlice.reducer;
