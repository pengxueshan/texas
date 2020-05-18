import React from 'react';
import AV from 'leancloud-storage';

export interface ContextType {
  users: AV.Object[];
  rounds: AV.Object[];
  roundUserInfo: AV.Object[][];
  showSession: boolean;
  setUsers: Function;
  setRounds: Function;
  setRoundUserInfo: Function;
  setShowSession: Function;
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
}

export const defaultContext: ContextType = {
  users: [],
  rounds: [],
  roundUserInfo: [],
  showSession: false,
  setUsers: () => { },
  setRounds: () => { },
  setRoundUserInfo: () => { },
  setShowSession: () => { },
  isAuthenticated: false,
  setIsAuthenticated: () => { }
};

export default React.createContext(defaultContext);
