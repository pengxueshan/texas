import React, { useState, useContext } from 'react';
import { Input, Button, message } from 'antd';
import AppContext from '../../store/context';
import { MD5 } from 'crypto-js';
import { useHistory } from 'react-router-dom';
import './auth.scss';

export default function Auth() {
  const [text, setText] = useState('');
  const { setIsAuthenticated } = useContext(AppContext);
  let history = useHistory();
  let { from } = { from: { pathname: '/' } };
  return (
    <div className="auth-wrap">
      <Input onChange={(e) => setText(e.target.value)} placeholder="暗号" />
      <Button
        onClick={() => {
          if (MD5(text).toString() === '41b9df4a217bb3c10b1c339358111b0d') {
            setIsAuthenticated(true);
            history.replace(from);
          } else {
            message.error('请重试');
          }
        }}
      >
        Auth
      </Button>
    </div>
  );
}
