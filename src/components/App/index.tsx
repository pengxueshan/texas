import React, { Component, lazy, Suspense } from 'react';
import TopBar from '../TopBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { Spin } from 'antd';
import { connect } from 'react-redux';

import { RoundDetails } from '../../utils/types';
import { getPlayers } from '../../api/player';
import { getRankList, getRounds, getRoundDetails } from '../../api/round';
import {
  setPlayers,
  setRounds,
  setRoundDetails,
  setWinTimes,
  setIsMobile,
} from '../../store/action';
import formatWinTimes from '../../utils/win-times';
import './app.scss';
import 'antd/dist/antd.css';

// const Message = lazy(() => import('../../pages/Message'));
// const Profile = lazy(() => import('../../pages/Profile'));
// const Auth = lazy(() => import('../../pages/Auth'));
const Home = lazy(() => import('../../pages/Home'));
// const Photo = lazy(() => import('../../pages/Photo'));
const Encrypt = lazy(() => import('../../pages/Encrypt'));

interface State {
  list: [];
}

interface Props {
  setPlayers: Function;
  setRounds: Function;
  setRoundDetails: Function;
  setWinTimes: Function;
  setIsMobile: Function;
}

class App extends Component<Props> {
  state: State = {
    list: [],
  };

  getPlayers = async () => {
    const players = await getPlayers();
    this.props.setPlayers(players);
  };

  getRounds = async () => {
    const rounds = await getRounds();
    this.props.setRounds(rounds);
  };

  getRoundDetails = async () => {
    const rounds: [RoundDetails] = await getRoundDetails();
    this.props.setRoundDetails(rounds);
    const times = formatWinTimes(rounds);
    this.props.setWinTimes(times);
  };

  componentDidMount() {
    this.getPlayers();
    this.getRounds();
    this.getRankList();
    this.handleResize();
  }

  getRankList = () => {
    getRankList().then((res) => {
      this.setState({
        list: res,
      });
    });
  };

  handleAddDone = () => {
    this.getRankList();
    this.getRounds();
    this.getRoundDetails();
  };

  handleResize = () => {
    if (document.documentElement.clientWidth < 500) {
      this.props.setIsMobile(true);
    } else {
      this.props.setIsMobile(false);
    }
  };

  render() {
    let { list } = this.state;
    const isDev = process.env.NODE_ENV === 'development';
    return (
      <div className="app">
        <Router>
          <TopBar />
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Spin />
              </div>
            }
          >
            <Switch>
              {/* <PrivateRoute path="/photo">
                  <Photo />
                </PrivateRoute>
                <PrivateRoute path="/message">
                  <Message />
                </PrivateRoute>
                <PrivateRoute path="/profile">
                  <Profile />
                </PrivateRoute> */}
              <Route path="/encrypt">
                <Encrypt />
              </Route>
              {/* <Route path="/auth">
                  <Auth />
                </Route> */}
              {/* <PrivateRoute path="/">
                  <Home list={list} onAddDone={this.handleAddDone} />
                </PrivateRoute> */}
              <Route path="/">
                <Home list={list} onAddDone={this.handleAddDone} />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  setPlayers,
  setRounds,
  setRoundDetails,
  setWinTimes,
  setIsMobile,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
