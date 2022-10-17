import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef(({ children, buttonLabel }, refs) => {
   const [visible, setVisible] = useState(false);

   const toggleVisibility = () => {
      setVisible(!visible);
   };

   useImperativeHandle(refs, () => {
      return { toggleVisibility };
   });

   return (
      <div>
         <div style={{ display: visible ? 'none' : '' }}>
            <button onClick={toggleVisibility}>{buttonLabel}</button>
         </div>
         <div style={{ display: visible ? '' : 'none' }}>
            {children}
            <button onClick={toggleVisibility}>cancel</button>
         </div>
      </div>
   );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
   children: PropTypes.element.isRequired,
};

export default Togglable;
