import React, { Component } from 'react';
import { Table } from 'antd';
import AppContext from '../store/context';
import AV from 'leancloud-storage';

export default class List extends Component {
  static contextType = AppContext;
  state = {
    list: [],
    columns: [
      { title: '排名', key: 'rank', dataIndex: 'rank' },
      { title: '选手', key: 'username', dataIndex: 'username' },
      { title: '参赛次数', key: 'rank', dataIndex: 'count' },
      { title: '单次最大盈利', key: 'rank', dataIndex: 'onceWin' },
      { title: '单次最大亏损', key: 'rank', dataIndex: 'onceLose' },
      { title: '累计筹码盈亏', key: 'rank', dataIndex: 'total' },
      { title: '累计盈亏金额', key: 'rank', dataIndex: 'totalBalance' },
      { title: '当前赔率', key: 'rank', dataIndex: 'current' },
      { title: '操作', key: 'rank', dataIndex: 'opt' },
    ],
  };
  componentDidMount() {
    console.log('userList:', this.context.users);
    this.addUsers();
  }
  getList = () => {}
  addUsers = () => {
    // const Player = AV.Object.extend('Player');
    // const player = new Player();
    // player.set('name', '何秀玲');
    // player.save().then(player => {
    //   console.log(`succ, ${player.id}`);
    // });
  }
  render() {
    let { list, columns } = this.state;
    return (
      <div className>
        <Table dataSource={list} columns={columns} />
      </div>
    );
  }
}
