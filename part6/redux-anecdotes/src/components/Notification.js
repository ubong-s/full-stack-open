import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeMessage } from '../reducers/notificationReducer';

const Notification = () => {
   const dispatch = useDispatch();
   const notification = useSelector((state) => state.notification);

   const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
   };

   useEffect(() => {
      let timeout;
      if (notification) {
         clearTimeout(timeout);

         timeout = setTimeout(() => {
            dispatch(removeMessage());
         }, 5000);
      }
   }, [notification]); // eslint-disable-line react-hooks/exhaustive-deps

   if (!notification) return;

   return <div style={style}>{notification}</div>;
};

export default Notification;
