import React from 'react';
import AV from 'leancloud-storage';

interface ContextType {
  users: AV.Object[],
  rounds: AV.Object[],
  roundUserInfo: AV.Object[][],
  setUsers: Function,
  setRounds: Function,
  setRoundUserInfo: Function,
}

export const defaultContext: ContextType = {
  users: [],
  rounds: [],
  roundUserInfo: [],
  setUsers: () => { },
  setRounds: () => { },
  setRoundUserInfo: () => { },
};

export default React.createContext(defaultContext);
