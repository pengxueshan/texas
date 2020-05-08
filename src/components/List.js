import React, { useContext } from 'react';
import { Table } from 'antd';
import AppContext from '../store/context';

export default function List({ list }) {
  const context = useContext(AppContext);
  const columns = [
    {
      title: '排名',
      key: 'rank',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: '选手',
      key: 'username',
      render: (text, record) => {
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

  function getUserName(playerId) {
    let { users } = context;
    let user = users.find((item) => item.get('objectId') === playerId);
    if (user) {
      return user.get('name');
    }
    return '';
  }

  return (
    <div className>
      <Table dataSource={list} columns={columns} />
    </div>
  );
}
