import React, { Component } from 'react';
import { Modal, Table } from 'antd';
import { RoundDetails, Player } from '../../utils/types';
import { getRoundDetails } from '../../api/round';
import { connect } from 'react-redux';
import { setRoundDetails, setWinTimes } from '../../store/action';
import { StoreType } from '../../store/reducer';
import formatWinTimes from '../../utils/win-times';

interface Props {
  onModify: OnModifyFunc;
  visible: boolean;
  onOk: EmptyFunc;
  onCancel: EmptyFunc;
  setRoundDetails: Function;
  setWinTimes: Function;
  players: [Player];
  roundDetails: [RoundDetails];
}

interface OnModifyFunc {
  (index: number): void;
}

interface EmptyFunc {
  (): void;
}

class DetailsModal extends Component<Props> {
  componentDidMount() {
    this.getRoundDetails();
  }

  getRoundDetails = async () => {
    const rounds: [RoundDetails] = await getRoundDetails();
    this.props.setRoundDetails(rounds);
    this.props.setWinTimes(formatWinTimes(rounds));
  };

  getTableColumns() {
    let ret: object[] = [
      {
        title: '场次',
        key: 'roundNO',
        ellipsis: true,
        render: (text: string, record: RoundDetails, index: number) => {
          return index + 1;
        },
      },
      {
        title: '日期',
        key: 'dateTime',
        ellipsis: true,
        render: (text: string, record: RoundDetails) => {
          return record.date;
        },
      },
      {
        title: '杠杆比例',
        key: 'leverage',
        ellipsis: true,
        render: (text: string, record: RoundDetails) => {
          return record.leverage;
        },
      },
    ];
    let players = this.props.players;
    ret = ret.concat(
      players.map((player) => {
        return {
          title: player.name,
          key: player.id,
          ellipsis: true,
          render: (text: string, record: RoundDetails, index: number) => {
            return this.getRoundInfo(player.id, index);
          },
        };
      })
    );
    const currentUser = true;
    if (currentUser) {
      ret = ret.concat({
        title: '操作',
        key: 'opt',
        render: (text: string, record: RoundDetails, index: number) => {
          return (
            <div className="details-opt">
              <span onClick={() => this.handleModifyClick(index)}>修改</span>
            </div>
          );
        },
      });
    }
    return ret;
  }

  handleModifyClick(index: number) {
    this.props.onModify(index);
  }

  getRoundInfo(playerId: number, index: number) {
    const { players } = this.props.roundDetails[index];
    const p = players.find((info) => info.playerId === playerId);
    return (p && p.amount) || '';
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
        width={1200}
      >
        <div className="details-round-wrap">
          <Table
            dataSource={this.props.roundDetails}
            columns={this.getTableColumns()}
            pagination={false}
            scroll={{ x: true }}
          />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  return {
    roundDetails: state.roundDetails,
    players: state.players,
  };
};

const mapDispatchToProps = {
  setRoundDetails,
  setWinTimes
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal);
