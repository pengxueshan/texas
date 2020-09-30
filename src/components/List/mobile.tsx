import React, { Component } from 'react';
import { RankListData, WinTimes, Player } from '../../utils/types';
import './mobile-list.scss';

interface Props {
  list: Array<RankListData>;
  winTimes: WinTimes;
}

class MobileList extends Component<Props> {
  renderList() {
    return this.props.list.map((data, index) => {
      const player: Player = data.player;
      const num = data.playNum;
      const winRate = this.getWinRate(player.id, num);
      return (
        <div className="list-row">
          <div className="list-cell rank">{index + 1}</div>
          <div className="list-cell name">{data.player.name}</div>
          <div className="list-cell balance">{data.totalBalance}</div>
          <div className="list-cell win-rate">{winRate}</div>
        </div>
      );
    });
  }

  getWinRate(playerId: number, num: number) {
    if (!this.props.winTimes[playerId] || !num) return 0;
    return (this.props.winTimes[playerId] / num).toFixed(2);
  }

  render() {
    return (
      <div className="mobile-list">
        <div className="list-row list-header">
          <div className="list-cell header-cell rank">排名</div>
          <div className="list-cell header-cell name">姓名</div>
          <div className="list-cell header-cell balance">盈亏</div>
          <div className="list-cell header-cell win-rate">胜率</div>
        </div>
        <div className="list-body">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

export default MobileList;
