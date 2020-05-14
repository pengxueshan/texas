import React, { useContext } from 'react';
import './top-bar.scss';
import Session from '../Session';
import AppContext from '../../store/context';
import AV from 'leancloud-storage';

export default function TopBar() {
  const context = useContext(AppContext);

  function handleSigninClick() {
    context.setShowSession(true);
  }

  const currentUser = AV.User.current();

  return (
    <div className="top-bar">
      {!currentUser ? (
        <span className="link-style" onClick={handleSigninClick}>
          登录
        </span>
      ) : (
        <span>{currentUser.getUsername()}</span>
      )}
      <Session visible={context.showSession} />
    </div>
  );
}
