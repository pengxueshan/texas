import React, { useState, useContext, useEffect } from 'react';
import { Modal, InputNumber, DatePicker, Table, message } from 'antd';
import AppContext from '../../store/context';
import AV from 'leancloud-storage';
import moment from 'moment';

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
  let { rounds, roundUserInfo } = context;
  const [list, setList] = useState([{ roundNO: rounds.length + 1 }]);
  const [dateTime, setDateTime] = useState('');
  const [leverage, setLeverage] = useState(0.1);
  const [userAmount, setUserAmount] = useState<AmountMap>({});

  useEffect(() => {
    if (isModify) {
      let list: AV.Object[] = roundUserInfo[roundIndex];
      let round: AV.Object = rounds[roundIndex];
      let amount: AmountMap = {};
      if (list) {
        list.forEach((item: AV.Object) => {
          amount[item.get('player').get('objectId')] = item.get('amount');
        });
      }
      setList([{ roundNO: roundIndex + 1 }]);
      setLeverage(round.get('leverage'));
      setDateTime(round.get('dateTime'));
      setUserAmount(amount);
    }
  }, [isModify, roundUserInfo, roundIndex, rounds]);

  function handleOk() {
    if (isModify) {
      let round: AV.Object = context.rounds[roundIndex];
      let roundUserInfo: AV.Object[] = context.roundUserInfo[roundIndex];
      const r = AV.Object.createWithoutData('Round', round.get('objectId'));
      r.set('dateTime', dateTime);
      r.set('leverage', leverage);
      let allRoundUserInfos: any[] = [];
      Object.keys(userAmount).forEach((userId: string) => {
        let info = roundUserInfo.find((item: AV.Object) => {
          return item.get('player').get('objectId') === userId;
        });
        let findUser;
        if (info) {
          findUser = info;
        } else {
          const user = context.users.find(
            (item: AV.Object) => item.get('objectId') === userId
          );
          const RoundUserInfo = AV.Object.extend('RoundUserInfo');
          findUser = new RoundUserInfo();
          findUser.set('round', r);
          findUser.set('player', user);
        }
        findUser.set('amount', userAmount[userId]);
        allRoundUserInfos.push(findUser);
      });
      return Promise.all([r.save(), AV.Object.saveAll(allRoundUserInfos)]).then(() => {
        if (onOk) {
          onOk();
        }
      }).catch(e => {
        message.error(e.message);
      });
    } else {
      const Round = AV.Object.extend('Round');
      const round = new Round();
      round.set('dateTime', dateTime);
      round.set('leverage', leverage);
      const RoundUserInfo = AV.Object.extend('RoundUserInfo');
      let allRoundUserInfos: AV.Object[] = [];
      Object.keys(userAmount).forEach((userId) => {
        const roundUserInfo = new RoundUserInfo();
        const user = context.users.find(
          (item: AV.Object) => item.get('objectId') === userId
        );
        roundUserInfo.set('round', round);
        roundUserInfo.set('player', user);
        roundUserInfo.set('amount', userAmount[userId]);
        allRoundUserInfos.push(roundUserInfo);
      });
      return AV.Object.saveAll(allRoundUserInfos).then(() => {
        if (onOk) {
          onOk();
        }
      }).catch(e => {
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

  function handleAmountChange(v: number | undefined, user: AV.Object) {
    v = v ? +v : 0;
    let tmp = {
      ...userAmount,
    };
    tmp[user.get('objectId')] = v;
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
                value={moment(dateTime, 'YYYY/MM/DD')}
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
      context.users.map((user: AV.Object) => {
        return {
          title: user.get('name'),
          key: user.get('objectId'),
          ellipsis: true,
          render: () => {
            return (
              <InputNumber
                onChange={(v) => handleAmountChange(v, user)}
                value={userAmount[user.get('objectId')]}
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
