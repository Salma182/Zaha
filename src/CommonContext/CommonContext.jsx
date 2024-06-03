import React, { createContext, useState } from 'react';

const CommonContext = createContext();

export const CommonProvider = ({ children }) => {
    const [guestToken, setGuestToken] = useState(localStorage.getItem('guestToken') || '');


return (
    <CommonContext.Provider value={{guestToken, setGuestToken }}>
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContext;