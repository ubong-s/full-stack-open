import { useSelector } from 'react-redux';

const Notification = () => {
   const message = useSelector(({ notification }) => {
      return notification;
   });

   if (message.text === null) {
      return null;
   }

   return <div className={message.type}>{message.text}</div>;
};

export default Notification;
