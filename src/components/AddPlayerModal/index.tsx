import React, { useState, ChangeEvent, useContext } from 'react';
import { Modal, Input, message } from 'antd';
import { addPlayer } from '../../api/player';
import AppContext from '../../store/context';

interface Props {
  visible: boolean;
  onOk: Function;
  onCancel: Function;
}

export default function AddPlayerModal({ visible, onOk, onCancel }: Props) {
  const context = useContext(AppContext);
  
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState('');

  function handleOk() {
    if (!name) {
      return message.error('请输入姓名');
    }
    setConfirmLoading(true);
    addPlayer({
      name,
    })
      .then(() => {
        setConfirmLoading(false);
        context.getPlayers();
        if (onOk) {
          onOk();
        }
      })
      .catch((error) => {
        setConfirmLoading(false);
        error && message.error(error.message);
      });
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  return (
    <Modal
      title="添加选手"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
    >
      <div className="session">
        <div className="form-row">
          <Input placeholder="姓名" value={name} onChange={handleNameChange} />
        </div>
      </div>
    </Modal>
  );
}
