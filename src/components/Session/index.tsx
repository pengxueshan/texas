import React, { useState, ChangeEvent, useContext } from 'react';
import { Modal, Input, Button, message } from 'antd';
import './session.scss';
import AV from 'leancloud-storage';
import AppContext from '../../store/context';
import { MD5 } from 'crypto-js';

interface Props {
  visible: boolean;
}

export default function Session({ visible }: Props) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyCount, setVerifyCount] = useState(0);
  const [inviteCode, setInviteCodeChange] = useState('');
  const context = useContext(AppContext);

  function handleOk() {
    if (!mobile) {
      return message.error('请输入手机号');
    }
    if (!verifyCode) {
      return message.error('请输入验证码');
    }
    if (!inviteCode) {
      return message.error('请输入邀请码');
    }
    if (MD5(inviteCode).toString() !== '41b9df4a217bb3c10b1c339358111b0d') {
      return message.error('邀请码错误');
    }
    setConfirmLoading(true);
    AV.User.signUpOrlogInWithMobilePhone(`+86${mobile}`, verifyCode).then(
      (user) => {
        setConfirmLoading(false);
        context.setShowSession(false);
      },
      (error) => {
        setConfirmLoading(false);
        message.error(error.message);
      }
    );
  }

  function handleCancel() {
    context.setShowSession(false);
  }

  function handleMobileChange(e: ChangeEvent<HTMLInputElement>) {
    setMobile(e.target.value);
  }

  function handleVerifyCodeChange(e: ChangeEvent<HTMLInputElement>) {
    setVerifyCode(e.target.value);
  }

  function getButtonText() {
    if (verifyCount <= 0) {
      return '获取验证码';
    } else {
      return `${verifyCount}s`;
    }
  }

  function handleVerifyClick() {
    if (verifyCount > 0 || !mobile) return;
    AV.Cloud.requestSmsCode(`+86${mobile}`).then(() => {
      setVerifyCount(60);
      startCount();
    });
  }

  function startCount() {
    if (verifyCount > 0) return;
    countDown();
  }

  function countDown() {
    if (verifyCount <= 0) return;
    setVerifyCount(verifyCount - 1);
    setTimeout(countDown, 1000);
  }

  function handleInviteChange(e: ChangeEvent<HTMLInputElement>) {
    setInviteCodeChange(e.target.value);
  }

  return (
    <Modal
      title="登录或注册"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <div className="session">
        <div className="form-row">
          <Input
            placeholder="手机号码"
            value={mobile}
            onChange={handleMobileChange}
          />
        </div>
        <div className="form-row">
          <Input
            placeholder="验证码"
            value={verifyCode}
            onChange={handleVerifyCodeChange}
          />
          <Button disabled={verifyCount > 0} onClick={handleVerifyClick}>
            {getButtonText()}
          </Button>
        </div>
        <div className="form-row">
          <Input
            placeholder="邀请码"
            value={inviteCode}
            onChange={handleInviteChange}
          />
        </div>
      </div>
    </Modal>
  );
}
