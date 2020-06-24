import React, { useState, useContext, useEffect } from 'react';
import { Modal, InputNumber, DatePicker, Table, message } from 'antd';
import AppContext from '../../store/context';
import moment from 'moment';
import { Player } from '../../utils/types';
import { addRound, updateRound } from '../../api/round';

export interface Props {
  isModify?: boolean;
  roundIndex?: number;
  onOk: Function;
  visible: boolean;
  onCancel: Function;
}

interface AmountMap {
  [key: string]: any;
  [index: number]: any;
}

export default function AddRoundModal({
  isModify = false,
  roundIndex = 0,
  visible,
  onOk,
  onCancel,
}: Props) {
  const context = useContext(AppContext);
  let { rounds } = context;
  const [list, setList] = useState([{ roundNO: rounds.length + 1 }]);
  const [dateTime, setDateTime] = useState('');
  const [leverage, setLeverage] = useState(0.1);
  const [userAmount, setUserAmount] = useState<AmountMap>({});

  useEffect(() => {
    if (isModify) {
      const info = context.roundDetails[roundIndex];
      let amount: AmountMap = {};
      if (info.players) {
        info.players.forEach((item) => {
          amount[item.playerId] = item.amount;
        });
      }
      setList([{ roundNO: roundIndex + 1 }]);
      setLeverage(info.leverage);
      setDateTime(info.date);
      setUserAmount(amount);
    }
  }, [isModify, roundIndex, rounds]);

  function handleOk() {
    if (isModify) {
      const info = context.roundDetails[roundIndex];
      const updateDatas = {
        id: info.id,
        date: dateTime,
        leverage: leverage,
        players: Object.keys(userAmount).map((playerId) => {
          return {
            amount: userAmount[playerId],
            playerId,
          };
        }),
      };
      updateRound(updateDatas)
        .then(() => {
          if (onOk) {
            onOk();
          }
        })
        .catch((e) => {
          message.error(e.message);
        });
    } else {
      const datas = Object.keys(userAmount).map((playerId) => {
        return {
          id: playerId,
          amount: userAmount[playerId],
        };
      });
      const params = {
        date: dateTime,
        leverage,
        playerInfo: datas,
      };
      addRound(params)
        .then(() => {
          if (onOk) {
            onOk();
          }
        })
        .catch((e) => {
          message.error(e.message);
        });
    }
  }

  function handleDateTimeChange(v: moment.Moment | null) {
    if (v) {
      setDateTime(v.format('YYYY/MM/DD'));
    } else {
      setDateTime('');
    }
  }

  function handleLeverageChange(v: number | undefined) {
    setLeverage(v || 0.1);
  }

  function handleAmountChange(v: number | undefined, player: Player) {
    v = v ? +v : 0;
    let tmp = {
      ...userAmount,
    };
    tmp[player.id] = v;
    setUserAmount(tmp);
  }

  function getTableColumns() {
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
                onChange={handleDateTimeChange}
                format="YYYY/MM/DD"
                value={
                  (dateTime && moment(dateTime, 'YYYY/MM/DD')) || undefined
                }
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
            <InputNumber onChange={handleLeverageChange} value={leverage} />
          );
        },
      },
    ];
    return ret.concat(
      context.players.map((player: Player) => {
        return {
          title: player.name,
          key: `${player.id}`,
          ellipsis: true,
          render: () => {
            return (
              <InputNumber
                onChange={(v) => handleAmountChange(v, player)}
                value={userAmount[player.id]}
              />
            );
          },
        };
      })
    );
  }

  function handleCancel() {
    // setList([{ roundNO: 1 }]);
    // setDateTime('');
    // setLeverage(0.1);
    // setUserAmount({});
    onCancel();
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      width={1200}
    >
      <div className="add-round-wrap">
        <Table
          dataSource={list}
          columns={getTableColumns()}
          pagination={false}
          scroll={{ x: true }}
        />
      </div>
    </Modal>
  );
}
