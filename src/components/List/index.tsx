import React, { useContext } from 'react';
import { Table, Avatar } from 'antd';
import AppContext from '../../store/context';
import AV from 'leancloud-storage';
import { UserOutlined } from '@ant-design/icons';
import './list.scss';

interface Props {
  list: Array<ListItem>;
}

export interface ListItem {
  max: number;
  min: number;
  total: number;
  totalBalance: number;
  count: number;
  player: AV.Object;
  currentLeverage: number;
}

export default function List({ list }: Props) {
  const context = useContext(AppContext);
  const columns = [
    {
      title: '排名',
      key: 'rank',
      render: (text: string, record: ListItem, index: number) => {
        return index + 1;
      },
    },
    {
      title: '选手',
      key: 'username',
      render: (text: string, record: ListItem) => {
        let player = getPlayer(record.player.get('objectId'));
        let avatar = player?.get('avatar');
        let name = player?.get('name');
        return (
          <div className="player-wrap">
            <div className="avatar-wrap">
              {avatar ? (
                <Avatar size={24} src={avatar.get('url')} />
              ) : (
                <Avatar size={24} icon={<UserOutlined />} />
              )}
            </div>
            {name}
          </div>
        );
      },
    },
    { title: '参赛次数', key: 'count', dataIndex: 'count' },
    {
      title: '单次最大盈利',
      key: 'max',
      dataIndex: 'max',
      sorter: (a: ListItem, b: ListItem) => a.max - b.max,
    },
    {
      title: '单次最大亏损',
      key: 'min',
      dataIndex: 'min',
      sorter: (a: ListItem, b: ListItem) => a.min - b.min,
    },
    {
      title: '累计筹码盈亏',
      key: 'total',
      dataIndex: 'total',
      sorter: (a: ListItem, b: ListItem) => a.total - b.total,
    },
    {
      title: '累计盈亏金额',
      key: 'totalBalance',
      dataIndex: 'totalBalance',
      sorter: (a: ListItem, b: ListItem) => a.totalBalance - b.totalBalance,
    },
    { title: '当前赔率', key: 'currentLeverage', dataIndex: 'currentLeverage' },
    { title: '操作', key: 'opt', dataIndex: 'opt' },
  ];

  function getPlayer(playerId: string) {
    let users: AV.Object[] = context.users;
    return users.find((item: AV.Object) => item.get('objectId') === playerId);
  }

  return (
    <div className="rank-wrap">
      <Table dataSource={list} columns={columns} pagination={false} />
    </div>
  );
}
