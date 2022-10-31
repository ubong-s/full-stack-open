export const Notification = ({ notification }) => {
   if (!notification) {
      return null;
   }

   return <p>{notification}</p>;
};
