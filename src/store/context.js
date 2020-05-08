import React from 'react';

export const defaultContext = {
  users: [],
  rounds: [],
  roundUserInfo: [],
  setUsers: () => {},
  setRounds: () => {},
  setRoundUserInfo: () => {},
};

export default React.createContext(defaultContext);
