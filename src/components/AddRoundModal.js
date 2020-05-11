import React, { Component } from 'react';
import { Modal, InputNumber, DatePicker, Table } from 'antd';
import AppContext from '../store/context';
import AV from 'leancloud-storage';
import moment from 'moment';

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
    if (this.props.isModify) {
      let { roundIndex } = this.props;
      let round = this.context.rounds[roundIndex];
      let roundUserInfo = this.context.roundUserInfo[roundIndex];
      const r = AV.Object.createWithoutData('Round', round.get('objectId'));
      r.set('dateTime', dateTime);
      r.set('leverage', leverage);
      let allRoundUserInfos = [];
      Object.keys(userAmount).forEach((userId) => {
        let info = roundUserInfo.find((item) => {
          return item.get('player').get('objectId') === userId;
        });
        let findUser;
        if (info) {
          findUser = info;
        } else {
          const user = this.context.users.find(
            (item) => item.get('objectId') === userId
          );
          const RoundUserInfo = AV.Object.extend('RoundUserInfo');
          findUser = new RoundUserInfo();
          findUser.set('round', r);
          findUser.set('player', user);
        }
        findUser.set('amount', userAmount[userId]);
        allRoundUserInfos.push(findUser);
      });
      Promise.all([r.save(), AV.Object.saveAll(allRoundUserInfos)]).then(() => {
        if (this.props.onOk) {
          this.props.onOk();
        }
      });
    } else {
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
    }
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
    let userAmount = this.state.userAmount;
    userAmount[user.get('objectId')] = +v;
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
            <div style={{ width: '150px' }}>
              <DatePicker
                onChange={this.handleDateTimeChange}
                format="YYYY/MM/DD"
                value={moment(this.state.dateTime, 'YYYY/MM/DD')}
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
          return (
            <InputNumber
              onChange={this.handleLeverageChange}
              value={this.state.leverage}
            />
          );
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
              <InputNumber
                onChange={(v) => this.handleAmountChange(v, user)}
                value={this.state.userAmount[user.get('objectId')]}
              />
            );
          },
        };
      })
    );
  }

  calcState() {
    let { rounds } = this.context;
    let { isModify, roundIndex } = this.props;
    if (isModify) {
      let { roundUserInfo } = this.context;
      let list = roundUserInfo[roundIndex];
      let round = rounds[roundIndex];
      let amount = {};
      if (list) {
        list.forEach((item) => {
          amount[item.get('player').get('objectId')] = item.get('amount');
        });
      }
      this.setState({
        list: [{ roundNO: roundIndex + 1 }],
        userAmount: amount,
        leverage: round.get('leverage'),
        dateTime: round.get('dateTime'),
      });
    } else {
      this.setState({
        list: [{ roundNO: rounds.length + 1 }],
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.calcState();
    }
  }

  handleCancel = () => {
    this.setState({
      loading: false,
      list: [{ roundNO: 1 }],
      dateTime: '',
      leverage: 0.1,
      userAmount: {},
    });
    this.props.onCancel();
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        confirmLoading={this.state.loading}
        width={1200}
        destroyOnClose
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
