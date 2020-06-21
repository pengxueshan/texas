import React from 'react';
import { Player, Round } from '../utils/types';

export interface ContextType {
  players: Player[];
  rounds: Round[];
  showSession: boolean;
  setPlayers: Function;
  setRounds: Function;
  setShowSession: Function;
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
  getPlayers: Function;
  getRounds: Function;
}

export const defaultContext: ContextType = {
  players: [],
  rounds: [],
  showSession: false,
  setPlayers: () => {},
  setRounds: () => {},
  setShowSession: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  getPlayers: () => {},
  getRounds: () => {},
};

export default React.createContext(defaultContext);
