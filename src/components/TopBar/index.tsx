import React, { useContext } from 'react';
import './top-bar.scss';
import Session from '../Session';
import AppContext from '../../store/context';
import AV from 'leancloud-storage';
import { Modal } from 'antd';

export default function TopBar() {
  const context = useContext(AppContext);

  function handleSigninClick() {
    context.setShowSession(true);
  }

  function handleSignoutClick() {
    Modal.confirm({
      title: '确定退出登录吗？',
      onOk() {
        return AV.User.logOut().then(() => {
          window.location.reload();
        });
      }
    });
  }

  const currentUser = AV.User.current();

  return (
    <div className="top-bar">
      {!currentUser ? (
        <span className="link-style" onClick={handleSigninClick}>
          登录
        </span>
      ) : (
        [
          <span>{currentUser.getUsername()}</span>,
          <span className="link-style" onClick={handleSignoutClick}>
            退出登录
          </span>,
        ]
      )}
      <Session visible={context.showSession} />
    </div>
  );
}
