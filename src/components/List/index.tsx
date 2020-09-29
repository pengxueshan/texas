import React from 'react';
import { Table, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { RankListData, Player, WinTimes } from '../../utils/types';
import './list.scss';

interface Props {
  list: Array<RankListData>;
  winTimes: WinTimes;
}

export default function List({ list, winTimes }: Props) {
  const columns = [
    {
      title: '排名',
      key: 'rank',
      render: (text: string, record: RankListData, index: number) => {
        return index + 1;
      },
    },
    {
      title: '选手',
      key: 'username',
      render: (text: string, record: RankListData) => {
        let player = record.player;
        let avatar = player.avatar;
        let name = player.name;
        return (
          <div className="player-wrap">
            <div className="avatar-wrap">
              {avatar ? (
                <Avatar size={24} src={avatar} />
              ) : (
                <Avatar size={24} icon={<UserOutlined />} />
              )}
            </div>
            {name}
          </div>
        );
      },
    },
    { title: '参赛次数', key: 'playNum', dataIndex: 'playNum' },
    {
      title: '单次最大盈利',
      key: 'max',
      dataIndex: 'max',
      sorter: (a: RankListData, b: RankListData) => a.max - b.max,
    },
    {
      title: '单次最大亏损',
      key: 'min',
      dataIndex: 'min',
      sorter: (a: RankListData, b: RankListData) => a.min - b.min,
    },
    {
      title: '累计筹码盈亏',
      key: 'total',
      dataIndex: 'total',
      sorter: (a: RankListData, b: RankListData) => a.total - b.total,
    },
    {
      title: '累计盈亏金额',
      key: 'totalBalance',
      dataIndex: 'totalBalance',
      sorter: (a: RankListData, b: RankListData) =>
        a.totalBalance - b.totalBalance,
    },
    {
      title: '胜率',
      key: 'winRate',
      render: (text: string, record: RankListData) => {
        const player: Player = record.player;
        const num = record.playNum;
        return getWinRate(player.id, num);
      },
    },
    { title: '当前赔率', key: 'currentLeverage', dataIndex: 'currentLeverage' },
    { title: '操作', key: 'opt', dataIndex: 'opt' },
  ];

  function getWinRate(playerId: number, num: number) {
    if (!winTimes[playerId] || !num) return 0;
    return (winTimes[playerId] / num).toFixed(2);
  }

  return (
    <div className="rank-wrap">
      <Table dataSource={list} columns={columns} pagination={false} />
    </div>
  );
}
