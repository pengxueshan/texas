import React from 'react';

export const defaultContext = {
  users: [],
  setUsers: () => {}
};

export default React.createContext(defaultContext);