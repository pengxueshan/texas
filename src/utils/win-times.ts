import { RoundDetails } from './types';

interface Times {
  [index: number]: number;
}

export default function formatWinTimes(rounds: [RoundDetails]) {
  const times: Times = {};
  rounds.forEach((round) => {
    round.players.forEach((player) => {
      if (player.amount > 0) {
        if (times[player.playerId] === undefined) {
          times[player.playerId] = 0;
        }
        times[player.playerId] += 1;
      }
    });
  });
  return times;
}