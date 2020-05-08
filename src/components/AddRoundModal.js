import React, { Component } from 'react';
import { Modal, InputNumber, DatePicker, Table } from 'antd';
import AppContext from '../store/context';
import AV from 'leancloud-storage';

export default class AddRoundModal extends Component {
  static contextType = AppContext;

  state = {
    loading: false,
    list: [{ roundNO: 1 }],
    dateTime: '',
    leverage: 0.1,
    userAmount: {},
  };

  handleOk = () => {
    let { dateTime, leverage, userAmount } = this.state;
    const Round = AV.Object.extend('Round');
    const round = new Round();
    round.set('dateTime', dateTime);
    round.set('leverage', leverage);
    const RoundUserInfo = AV.Object.extend('RoundUserInfo');
    let allRoundUserInfos = [];
    Object.keys(userAmount).forEach((userId) => {
      const roundUserInfo = new RoundUserInfo();
      const user = this.context.users.find(
        (item) => item.get('objectId') === userId
      );
      roundUserInfo.set('round', round);
      roundUserInfo.set('player', user);
      roundUserInfo.set('amount', userAmount[userId]);
      allRoundUserInfos.push(roundUserInfo);
    });
    AV.Object.saveAll(allRoundUserInfos).then(() => {
      if (this.props.onOk) {
        this.props.onOk();
      }
    });
  };

  handleDateTimeChange = (v) => {
    this.setState({
      dateTime: v.format('YYYY/MM/DD'),
    });
  };

  handleLeverageChange = (v) => {
    this.setState({
      leverage: v,
    });
  };

  handleAmountChange = (v, user) => {
    console.log('user:', user.get('objectId'));
    let userAmount = this.state.userAmount;
    userAmount[user.get('objectId')] = v;
    this.setState({
      userAmount,
    });
  };

  getTableColumns() {
    let ret = [
      { title: '场次', key: 'roundNO', dataIndex: 'roundNO', ellipsis: true },
      {
        title: '日期',
        key: 'dateTime',
        ellipsis: true,
        render: () => {
          return (
            <div style={{width: '150px'}}>
              <DatePicker
                onChange={this.handleDateTimeChange}
                format="YYYY/MM/DD"
              />
            </div>
          );
        },
      },
      {
        title: '杠杆比例',
        key: 'leverage',
        ellipsis: true,
        render: () => {
          return <InputNumber onChange={this.handleLeverageChange} />;
        },
      },
    ];
    let { users } = this.context;
    return ret.concat(
      users.map((user) => {
        return {
          title: user.get('name'),
          key: user.get('objectId'),
          ellipsis: true,
          render: (text, record) => {
            return (
              <InputNumber onChange={(v) => this.handleAmountChange(v, user)} />
            );
          },
        };
      })
    );
  }

  getAllRounds = () => {
    const rounds = new AV.Query('Round');
    rounds.count().then((res) => {
      this.setState({
        list: [{ roundNO: res + 1 }],
      });
    });
  };

  componentDidMount() {
    this.getAllRounds();
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.handleOk}
        confirmLoading={this.state.loading}
        width={800}
      >
        <div className="add-round-wrap">
          <Table
            dataSource={this.state.list}
            columns={this.getTableColumns()}
            pagination={false}
            scroll={{ x: true }}
          />
        </div>
      </Modal>
    );
  }
}
