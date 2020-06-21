import React, { useContext } from 'react';
import { Modal, Table } from 'antd';
import AppContext from '../../store/context';
import {Player, Round} from '../../utils/types';

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
        render: (text: string, record: Round, index: number) => {
          return index + 1;
        },
      },
      {
        title: '日期',
        key: 'dateTime',
        ellipsis: true,
        render: (text: string, record: Round) => {
          return record.date;
        },
      },
      {
        title: '杠杆比例',
        key: 'leverage',
        ellipsis: true,
        render: (text: string, record: Round) => {
          return record.leverage;
        },
      },
    ];
    let players = context.players;
    ret = ret.concat(
      players.map((player) => {
        return {
          title: player.name,
          key: player.id,
          ellipsis: true,
          render: (text: string, record: Round, index: number) => {
            return getRoundInfo(player.id, index);
          },
        };
      })
    );
    const currentUser = false;
    if (currentUser) {
      ret = ret.concat({
        title: '操作',
        key: 'opt',
        render: (text: string, record: Round, index: number) => {
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

  function getRoundInfo(playerId: number, index: number) {
    return '';
  }

  let rounds = context.rounds;
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
