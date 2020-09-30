import React, { Component, ChangeEvent } from 'react';
import { Modal, Input, Button, message } from 'antd';
import './session.scss';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import { StoreType } from '../../store/reducer';
import { setShowSession, setIsAuthenticated } from '../../store/action';

interface Props {
  visible: boolean;
  setShowSession: Function;
  setIsAuthenticated: Function;
}

const AUTH_NAMES = ['hexiuling'];
const AUTH_PASSWORD = 'black sheep on the wall';

class Session extends Component<Props> {
  state = {
    name: '',
    password: '',
  };

  handleOk = () => {
    const { name, password } = this.state;
    if (!name) {
      return message.error('请输入壮士姓名');
    }
    if (!password) {
      return message.error('请输入暗号');
    }
    if (!AUTH_NAMES.includes(name) || password !== AUTH_PASSWORD) {
      return message.error('子非鱼焉知鱼之乐');
    }
    this.props.setIsAuthenticated(true);
    this.props.setShowSession(false);
  };

  handleCancel = () => {
    this.props.setShowSession(false);
  };

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value,
    });
  };

  handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    const { visible } = this.props;
    const { name, password } = this.state;
    return (
      <Modal
        title="登录"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <div className="session">
          <div className="form-row">
            <Input
              placeholder="敢问壮士姓名"
              value={name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-row">
            <Input
              placeholder="请对暗号"
              value={password}
              onChange={this.handlePasswordChange}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  return {
    visible: state.showSession,
  };
};

const mapDispatchToProps = {
  setShowSession,
  setIsAuthenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(Session);
