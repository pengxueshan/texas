import React, { Component, ChangeEvent } from 'react';
import { Modal, Input, message } from 'antd';
import { addPlayer, getPlayers } from '../../api/player';
import { connect } from 'react-redux';
import { setPlayers } from '../../store/action';

interface Props {
  visible: boolean;
  onOk: Function;
  onCancel: Function;
  setPlayers: Function;
}

class AddPlayerModal extends Component<Props> {
  state = {
    confirmLoading: false,
    playerName: '',
  };

  getPlayers = async () => {
    const players = await getPlayers();
    this.props.setPlayers(players);
  };

  handleOk = () => {
    if (!this.state.playerName) {
      return message.error('请输入姓名');
    }
    this.setState({
      confirmLoading: true,
    });
    addPlayer({
      name: this.state.playerName,
    })
      .then(() => {
        this.setState({
          confirmLoading: false,
        });
        this.getPlayers();
        if (this.props.onOk) {
          this.props.onOk();
        }
      })
      .catch((error) => {
        this.setState({
          confirmLoading: false,
        });
        error && message.error(error.message);
      });
  };

  handleCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      playerName: e.target.value,
    });
  };

  render() {
    return (
      <Modal
        title="添加选手"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={this.state.confirmLoading}
      >
        <div className="session">
          <div className="form-row">
            <Input
              placeholder="姓名"
              value={this.state.playerName}
              onChange={this.handleNameChange}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  setPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayerModal);
