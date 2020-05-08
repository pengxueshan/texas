import React, { Component } from 'react';
import { Modal, Table } from 'antd';
import AppContext from '../store/context';
import AV from 'leancloud-storage';

export default class DetailsModal extends Component {
  static contextType = AppContext;

  state = {
    list: [],
    roundInfos: [],
  };

  getTableColumns() {
    let ret = [
      {
        title: '场次',
        key: 'roundNO',
        ellipsis: true,
        render: (text, record, index) => {
          return index + 1;
        },
      },
      {
        title: '日期',
        key: 'dateTime',
        ellipsis: true,
        render: (text, record) => {
          return record.get('dateTime');
        },
      },
      {
        title: '杠杆比例',
        key: 'leverage',
        ellipsis: true,
        render: (text, record) => {
          return record.get('leverage');
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
          render: (text, record, index) => {
            return this.getUserRoundInfo(user.get('objectId'), index);
          },
        };
      })
    );
  }

  getUserRoundInfo = (userId, index) => {
    let list = this.state.roundInfos[index];
    if (list) {
      let info = list.find((item) => {
        return item.get('player').get('objectId') === userId;
      });
      return (info && info.get('amount')) || '';
    }
    return '';
  };

  getAllRounds = () => {
    const rounds = new AV.Query('Round');
    rounds.find().then((res) => {
      Promise.all(
        res.map((round) => {
          return this.getRoundInfo(round);
        })
      ).then((roundInfos) => {
        this.setState({
          list: res,
          roundInfos,
        });
      });
    });
  };

  getRoundInfo = (round) => {
    const query = new AV.Query('RoundUserInfo');
    query.equalTo('round', round);
    return query.find();
  };

  componentDidMount() {
    console.log('did mount');
    this.getAllRounds();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible && this.props.visible) {
      this.getAllRounds();
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
        width={800}
      >
        <div className="details-round-wrap">
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
