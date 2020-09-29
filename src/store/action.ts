const SET_USER_INFO = 'SET_USER_INFO';
const SET_PLAYERS = 'SET_PLAYERS';
const SET_ROUNDS = 'SET_ROUNDS';
const SET_SHOW_SESSION = 'SET_SHOW_SESSION';
const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
const SET_ROUND_DETAILS = 'SET_ROUND_DETAILS';
const SET_WIN_TIMES = 'SET_WIN_TIMES';

export interface UserInfo {
  id: number
}

export function setUserInfo(userInfo: UserInfo) {
  return {
    type: SET_USER_INFO,
    payload: {
      userInfo,
    },
  };
}

export function setPlayers(players: []) {
  return {
    type: SET_PLAYERS,
    payload: {
      players,
    },
  };
}

export function setRounds(rounds: []) {
  return {
    type: SET_ROUNDS,
    payload: {
      rounds,
    },
  };
}

export function setRoundDetails(roundDetails: object) {
  return {
    type: SET_ROUND_DETAILS,
    payload: {
      roundDetails,
    },
  };
}

export function setWinTimes(winTimes: object) {
  return {
    type: SET_WIN_TIMES,
    payload: {
      winTimes,
    },
  };
}

export function setShowSession(showSession: boolean) {
  return {
    type: SET_SHOW_SESSION,
    payload: {
      showSession,
    },
  };
}

export function setIsAuthenticated(isAuthenticated: boolean) {
  return {
    type: SET_IS_AUTHENTICATED,
    payload: {
      isAuthenticated,
    },
  };
}

export const types = {
  SET_USER_INFO,
  SET_PLAYERS,
  SET_ROUNDS,
  SET_SHOW_SESSION,
  SET_IS_AUTHENTICATED,
  SET_ROUND_DETAILS,
  SET_WIN_TIMES
};
