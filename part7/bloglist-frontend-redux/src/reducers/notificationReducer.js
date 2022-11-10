import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
   name: 'notification',
   initialState: { type: '', text: '' },
   reducers: {
      setNotification: (state, action) => {
         return action.payload;
      },
      clearNotification: (state, action) => {
         return { type: '', text: '' };
      },
   },
});

export const newNotification = (message, time) => {
   let timeout;

   return async (dispatch) => {
      dispatch(setNotification(message));

      timeout && clearTimeout(timeout);

      timeout = setTimeout(() => {
         dispatch(clearNotification());
      }, time * 1000);
   };
};

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
