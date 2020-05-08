import React, { Component } from 'react';
import { Modal, Table } from 'antd';
import AppContext from '../store/context';

export default class DetailsModal extends Component {
  static contextType = AppContext;

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
    let { roundUserInfo } = this.context;
    let list = roundUserInfo[index];
    if (list) {
      let info = list.find((item) => {
        return item.get('player').get('objectId') === userId;
      });
      return (info && info.get('amount')) || '';
    }
    return '';
  };

  render() {
    let { rounds } = this.context;
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
        width={800}
      >
        <div className="details-round-wrap">
          <Table
            dataSource={rounds}
            columns={this.getTableColumns()}
            pagination={false}
            scroll={{ x: true }}
          />
        </div>
      </Modal>
    );
  }
}
