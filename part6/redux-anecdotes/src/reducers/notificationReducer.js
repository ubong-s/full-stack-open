import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
   name: 'notification',
   initialState,
   reducers: {
      setNotification: (state, action) => {
         return action.payload;
      },
      clearNotification: (state, action) => {
         return '';
      },
   },
});

export const newNotification = (message, time) => {
   let timeout;

   return async (dispatch) => {
      dispatch(setNotification(message));

      clearTimeout(timeout);

      timeout = setTimeout(() => {
         dispatch(clearNotification());
      }, time * 1000);
   };
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
