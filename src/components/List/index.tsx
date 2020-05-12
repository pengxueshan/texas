import React, { useContext } from 'react';
import { Table } from 'antd';
import AppContext from '../../store/context';
import AV from 'leancloud-storage';

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
        return getUserName(record.player.get('objectId'));
      },
    },
    { title: '参赛次数', key: 'count', dataIndex: 'count' },
    { title: '单次最大盈利', key: 'max', dataIndex: 'max' },
    { title: '单次最大亏损', key: 'min', dataIndex: 'min' },
    { title: '累计筹码盈亏', key: 'total', dataIndex: 'total' },
    { title: '累计盈亏金额', key: 'totalBalance', dataIndex: 'totalBalance' },
    { title: '当前赔率', key: 'currentLeverage', dataIndex: 'currentLeverage' },
    { title: '操作', key: 'opt', dataIndex: 'opt' },
  ];

  function getUserName(playerId: string) {
    let users: AV.Object[] = context.users;
    let user = users.find((item: AV.Object) => item.get('objectId') === playerId);
    if (user) {
      return user.get('name');
    }
    return '';
  }

  return (
    <div>
      <Table dataSource={list} columns={columns} />
    </div>
  );
}
