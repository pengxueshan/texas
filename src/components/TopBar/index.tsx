import React, { Component } from 'react';
import Session from '../Session';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreType } from '../../store/reducer';
import { setShowSession } from '../../store/action';
import './top-bar.scss';

interface Props {
  isAuthenticated: boolean;
  setShowSession: Function;
}

class TopBar extends Component<Props> {
  handleSigninClick = () => {
    this.props.setShowSession(true);
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="top-bar">
        <nav>
          <ul>
            <li>
              <Link to="/">排行榜</Link>
            </li>
          </ul>
        </nav>
        <div className="user-section">
          {!isAuthenticated ? (
            <span className="link-style" onClick={this.handleSigninClick}>
              登录
            </span>
          ) : (
            <span>芝麻开门了</span>
          )}
          <Session />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = {
  setShowSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
