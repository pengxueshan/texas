import React, { useContext } from 'react';
import './top-bar.scss';
import Session from '../Session';
import AppContext from '../../store/context';
import { Modal, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

export default function TopBar() {
  const context = useContext(AppContext);

  function handleSigninClick() {
    context.setShowSession(true);
  }

  function handleSignoutClick() {
    Modal.confirm({
      title: '确定退出登录吗？',
      onOk() {
        // return AV.User.logOut().then(() => {
        //   window.location.href = '/';
        // });
      },
    });
  }

  let avatar = '';
  let currentUser = '';

  const renderAvatar = () => {
    return (
      <Link key="setting" to="/profile">
        {avatar ? (
          <Avatar size={32} src={avatar} />
        ) : (
          <Avatar size={32} icon={<UserOutlined />} />
        )}
      </Link>
    );
  };

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
            renderAvatar(),
            <span
              key="logout"
              className="link-style"
              onClick={handleSignoutClick}
            >
              退出登录
            </span>,
          ]
        )}
        <Session visible={context.showSession} />
      </div>
    </div>
  );
}
