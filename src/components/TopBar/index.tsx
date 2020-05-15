import React, { useContext } from 'react';
import './top-bar.scss';
import Session from '../Session';
import AppContext from '../../store/context';
import AV from 'leancloud-storage';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';

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
      },
    });
  }

  const currentUser = AV.User.current();

  return (
    <div className="top-bar">
      <nav>
        <ul>
          <li>
            <Link to="/">排行榜</Link>
          </li>
          <li>
            <Link to="/photo">精彩瞬间</Link>
          </li>
          <li>
            <Link to="/message">聊天室</Link>
          </li>
        </ul>
      </nav>
      <div className="user-section">
        {!currentUser ? (
          <span className="link-style" onClick={handleSigninClick}>
            登录
          </span>
        ) : (
          [
            <span key="user-name">{currentUser.getUsername()}</span>,
            <span key="logout" className="link-style" onClick={handleSignoutClick}>
              退出登录
            </span>,
          ]
        )}
        <Session visible={context.showSession} />
      </div>
    </div>
  );
}
