import React, { Component } from 'react';
import { Modal, InputNumber, DatePicker, Table, message } from 'antd';
import moment from 'moment';
import { Player, RoundDetails } from '../../utils/types';
import { addRound, updateRound } from '../../api/round';
import { connect } from 'react-redux';
import { StoreType } from '../../store/reducer';

export interface Props {
  isModify?: boolean;
  roundIndex?: number;
  onOk: Function;
  visible: boolean;
  onCancel: Function;
  rounds: [];
  roundDetails: [RoundDetails];
  players: [Player];
}

interface AmountMap {
  [key: string]: any;
  [index: number]: any;
}

class AddRoundModal extends Component<Props> {
  state: AmountMap = {
    list: [
      {
        roundNO:
          this.props.roundIndex && this.props.roundIndex > -1
            ? this.props.roundIndex
            : this.props.rounds.length + 1,
      },
    ],
    dateTime: '',
    leverage: 0.1,
    userAmount: {},
  };

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.isModify === this.props.isModify &&
      prevProps.roundIndex === this.props.roundIndex
    )
      return;
    if (this.props.isModify && this.props.roundIndex !== undefined) {
      const modifyData = this.props.roundDetails[this.props.roundIndex];
      const tmp: AmountMap = {};
      modifyData.players.forEach((player) => {
        tmp[player.playerId] = player.amount;
      });
      this.setState({
        userAmount: tmp,
        list: [{ roundNO: this.props.roundIndex + 1 }],
        leverage: modifyData.leverage,
        dateTime: modifyData.date,
      });
    }
  }

  handleOk = () => {
    if (this.props.isModify && this.props.roundIndex !== undefined) {
      const info = this.props.roundDetails[this.props.roundIndex];
      const updateDatas = {
        id: info.id,
        date: this.state.dateTime,
        leverage: this.state.leverage,
        players: Object.keys(this.state.userAmount).map((playerId) => {
          return {
            amount: this.state.userAmount[playerId],
            playerId,
          };
        }),
      };
      updateRound(updateDatas)
        .then(() => {
          if (this.props.onOk) {
            this.props.onOk();
          }
        })
        .catch((e) => {
          message.error(e.message);
        });
    } else {
      const datas = Object.keys(this.state.userAmount).map((playerId) => {
        return {
          id: playerId,
          amount: this.state.userAmount[playerId],
        };
      });
      const params = {
        date: this.state.dateTime,
        leverage: this.state.leverage,
        playerInfo: datas,
      };
      addRound(params)
        .then(() => {
          if (this.props.onOk) {
            this.props.onOk();
          }
        })
        .catch((e) => {
          message.error(e.message);
        });
    }
  };

  handleDateTimeChange = (v: moment.Moment | null) => {
    if (v) {
      this.setState({
        dateTime: v.format('YYYY/MM/DD'),
      });
    } else {
      this.setState({
        dateTime: '',
      });
    }
  };

  handleLeverageChange(v: number | undefined) {
    this.setState({
      leverage: v || 0.1,
    });
  }

  handleAmountChange(v: number | undefined, player: Player) {
    v = v ? +v : 0;
    let tmp = {
      ...this.state.userAmount,
    };
    tmp[player.id] = v;
    this.setState({
      userAmount: tmp,
    });
  }

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
                value={
                  (this.state.dateTime &&
                    moment(this.state.dateTime, 'YYYY/MM/DD')) ||
                  undefined
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
            <InputNumber
              onChange={this.handleLeverageChange}
              value={this.state.leverage}
            />
          );
        },
      },
    ];
    return ret.concat(
      this.props.players.map((player: Player) => {
        return {
          title: player.name,
          key: `${player.id}`,
          ellipsis: true,
          render: () => {
            return (
              <InputNumber
                onChange={(v) => this.handleAmountChange(v, player)}
                value={this.state.userAmount[player.id]}
              />
            );
          },
        };
      })
    );
  }

  handleCancel = () => {
    this.setState({
      list: [{ roundNO: this.props.rounds.length + 1 }],
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
        width={1200}
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

const mapStateToProps = (store: StoreType) => {
  return {
    rounds: store.rounds,
    roundDetails: store.roundDetails,
    players: store.players,
  };
};

export default connect(mapStateToProps)(AddRoundModal);
