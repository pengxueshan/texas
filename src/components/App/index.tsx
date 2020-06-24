import React, { Component, lazy, Suspense } from 'react';
import AppContext, { ContextType } from '../../store/context';
import TopBar from '../TopBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { Spin } from 'antd';

import { Player, Round, RankListData, RoundDetails } from '../../utils/types';
import { getPlayers } from '../../api/player';
import { getRankList, getRounds, getRoundDetails } from '../../api/round';

import './app.scss';
import 'antd/dist/antd.css';

// const Message = lazy(() => import('../../pages/Message'));
// const Profile = lazy(() => import('../../pages/Profile'));
// const Auth = lazy(() => import('../../pages/Auth'));
const Home = lazy(() => import('../../pages/Home'));
// const Photo = lazy(() => import('../../pages/Photo'));
const Encrypt = lazy(() => import('../../pages/Encrypt'));

interface State extends ContextType {
  list: [];
}

interface Map {
  [key: string]: RankListData;
}

export default class App extends Component {
  setPlayers = (list: Player[]) => {
    this.setState({
      players: list,
    });
  };

  setRounds = (list: Round[]) => {
    this.setState({
      rounds: list,
    });
  };

  setShowSession = (isShow?: boolean) => {
    this.setState({
      showSession: !!isShow,
    });
  };

  setIsAuthenticated = (isAuth: boolean) => {
    this.setState({
      isAuthenticated: isAuth,
    });
  };

  getPlayers = async () => {
    const players = await getPlayers();
    this.setPlayers(players);
  };

  getRounds = async () => {
    const rounds = await getRounds();
    this.setRounds(rounds);
  };

  getRoundDetails = async () => {
    const rounds = await getRoundDetails();
    this.setRoundDetails(rounds);
  };

  setRoundDetails = (list: RoundDetails) => {
    this.setState({
      roundDetails: list,
    });
  };

  state: State = {
    players: [],
    rounds: [],
    roundDetails: [],
    showSession: false,
    isAuthenticated: false,
    setPlayers: this.setPlayers,
    setRounds: this.setRounds,
    setRoundDetails: this.setRoundDetails,
    setShowSession: this.setShowSession,
    setIsAuthenticated: this.setIsAuthenticated,
    getPlayers: this.getPlayers,
    getRounds: this.getRounds,

    list: [],
  };

  componentDidMount() {
    this.getPlayers();
    this.getRounds();
    this.getRankList();
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

  render() {
    let {
      players,
      rounds,
      roundDetails,
      showSession,
      setPlayers,
      setRounds,
      setRoundDetails,
      setShowSession,
      list,
      isAuthenticated,
      setIsAuthenticated,
      getPlayers,
      getRounds,
    } = this.state;
    const isDev = process.env.NODE_ENV === 'development';
    return (
      <div className="app">
        <AppContext.Provider
          value={{
            players,
            rounds,
            roundDetails,
            showSession,
            setPlayers,
            setRounds,
            setRoundDetails,
            setShowSession,
            isAuthenticated,
            setIsAuthenticated,
            getPlayers,
            getRounds,
          }}
        >
          <Router>
            {/* {isAuthenticated || isDev ? <TopBar /> : null} */}
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
        </AppContext.Provider>
      </div>
    );
  }
}
