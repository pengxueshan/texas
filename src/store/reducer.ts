import { types } from './action';
import { combineReducers } from 'redux';
import { Player, RoundDetails, WinTimes } from '../utils/types';

export interface Action {
  type: string;
  payload: any;
}

export interface StoreType {
  userInfo: object | null;
  players: [Player];
  rounds: [];
  roundDetails: [RoundDetails];
  showSession: boolean;
  isAuthenticated: boolean;
  winTimes: WinTimes;
}

function userInfo(state = null, action: Action) {
  switch (action.type) {
    case types.SET_USER_INFO:
      state = action.payload.userInfo;
      return state;
    default:
      return state;
  }
}

function players(state = [], action: Action) {
  switch (action.type) {
    case types.SET_PLAYERS:
      state = action.payload.players;
      return state;
    default:
      return state;
  }
}

function rounds(state = [], action: Action) {
  switch (action.type) {
    case types.SET_ROUNDS:
      state = action.payload.rounds;
      return state;
    default:
      return state;
  }
}

function roundDetails(state = [], action: Action) {
  switch (action.type) {
    case types.SET_ROUND_DETAILS:
      state = action.payload.roundDetails;
      return state;
    default:
      return state;
  }
}

function winTimes(state = {}, action: Action) {
  switch (action.type) {
    case types.SET_WIN_TIMES:
      state = action.payload.winTimes;
      return state;
    default:
      return state;
  }
}

function showSession(state = false, action: Action) {
  switch (action.type) {
    case types.SET_SHOW_SESSION:
      state = action.payload.showSession;
      return state;
    default:
      return state;
  }
}

function isAuthenticated(state = false, action: Action) {
  switch (action.type) {
    case types.SET_IS_AUTHENTICATED:
      state = action.payload.isAuthenticated;
      return state;
    default:
      return state;
  }
}

function isMobile(state = false, action: Action) {
  switch (action.type) {
    case types.SET_IS_MOBILE:
      state = action.payload.isMobile;
      return state;
    default:
      return state;
  }
}

export default combineReducers({ userInfo, players, rounds, roundDetails, showSession, isAuthenticated, winTimes, isMobile });
