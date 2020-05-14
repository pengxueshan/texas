import React, { useContext } from 'react';
import { Modal, Table } from 'antd';
import AppContext from '../../store/context';
import AV from 'leancloud-storage';

interface Props {
  onModify: OnModifyFunc;
  visible: boolean;
  onOk: EmptyFunc;
  onCancel: EmptyFunc;
}

interface OnModifyFunc {
  (index: number): void;
}

interface EmptyFunc {
  (): void;
}

export default function DetailsModal({
  visible,
  onModify,
  onOk,
  onCancel,
}: Props) {
  const context = useContext(AppContext);

  function getTableColumns() {
    let ret: object[] = [
      {
        title: '场次',
        key: 'roundNO',
        ellipsis: true,
        render: (text: string, record: AV.Object, index: number) => {
          return index + 1;
        },
      },
      {
        title: '日期',
        key: 'dateTime',
        ellipsis: true,
        render: (text: string, record: AV.Object) => {
          return record.get('dateTime');
        },
      },
      {
        title: '杠杆比例',
        key: 'leverage',
        ellipsis: true,
        render: (text: string, record: AV.Object) => {
          return record.get('leverage');
        },
      },
    ];
    let users: AV.Object[] = context.users;
    ret = ret.concat(
      users.map((user: AV.Object) => {
        return {
          title: user.get('name'),
          key: user.get('objectId'),
          ellipsis: true,
          render: (text: string, record: AV.Object, index: number) => {
            return getUserRoundInfo(user.get('objectId'), index);
          },
        };
      })
    );
    const currentUser = AV.User.current();
    if (currentUser) {
      ret = ret.concat({
        title: '操作',
        key: 'opt',
        render: (text: string, record: AV.Object, index: number) => {
          return (
            <div className="details-opt">
              <span onClick={() => handleModifyClick(index)}>修改</span>
            </div>
          );
        },
      });
    }
    return ret;
  }

  function handleModifyClick(index: number) {
    onModify(index);
  }

  function getUserRoundInfo(userId: string, index: number) {
    let { roundUserInfo } = context;
    let list: AV.Object[] = roundUserInfo[index];
    if (list) {
      let info = list.find((item: AV.Object) => {
        return item.get('player').get('objectId') === userId;
      });
      return (info && info.get('amount')) || '';
    }
    return '';
  }

  let rounds: AV.Object[] = context.rounds;
  return (
    <Modal visible={visible} onCancel={onCancel} onOk={onOk} width={1200}>
      <div className="details-round-wrap">
        <Table
          dataSource={rounds}
          columns={getTableColumns()}
          pagination={false}
          scroll={{ x: true }}
        />
      </div>
    </Modal>
  );
}
