import React from 'react';
import { Player, Round, RoundDetails } from '../utils/types';

export interface ContextType {
  players: Player[];
  rounds: Round[];
  roundDetails: RoundDetails[];
  showSession: boolean;
  setPlayers: Function;
  setRounds: Function;
  setShowSession: Function;
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
  getPlayers: Function;
  getRounds: Function;
  setRoundDetails: Function;
}

export const defaultContext: ContextType = {
  players: [],
  rounds: [],
  roundDetails: [],
  showSession: false,
  setPlayers: () => {},
  setRounds: () => {},
  setShowSession: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  getPlayers: () => {},
  getRounds: () => {},
  setRoundDetails: () => {},
};

export default React.createContext(defaultContext);
