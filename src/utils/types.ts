export interface Player {
  name: string;
  id: number;
  userId: number;
  avatar: string;
}

export interface Round {
  id: number;
  date: string;
  leverage: number;
}

export interface RankListData {
  max: number;
  min: number;
  total: number;
  totalBalance: number;
  playNum: number;
  player: Player;
}
