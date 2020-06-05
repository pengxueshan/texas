import React, { Component, lazy, Suspense } from 'react';
import AppContext, { ContextType } from '../../store/context';
import AV from 'leancloud-storage';
import _ from 'lodash';
import Big from 'big.js';
import { ListItem } from '../List';
import TopBar from '../TopBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { Spin } from 'antd';

import './app.scss';
import 'antd/dist/antd.css';

const Message = lazy(() => import('../../pages/Message'));
const Profile = lazy(() => import('../../pages/Profile'));
const Auth = lazy(() => import('../../pages/Auth'));
const Home = lazy(() => import('../../pages/Home'));
const Photo = lazy(() => import('../../pages/Photo'));
const Encrypt = lazy(() => import('../../pages/Encrypt'));

interface State extends ContextType {
  list: [];
}

interface Map {
  [key: string]: ListItem;
}

export default class App extends Component {
  setUsers = (list: AV.Queriable[]) => {
    this.setState({
      users: list,
    });
  };

  setRounds = (list: AV.Queriable[]) => {
    this.setState({
      rounds: list,
    });
  };

  setRoundUserInfo = (list: AV.Queriable[][]) => {
    this.setState(
      {
        roundUserInfo: list,
      },
      this.calcList
    );
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

  state: State = {
    users: [],
    rounds: [],
    roundUserInfo: [],
    showSession: false,
    isAuthenticated: false,
    setUsers: this.setUsers,
    setRounds: this.setRounds,
    setRoundUserInfo: this.setRoundUserInfo,
    setShowSession: this.setShowSession,
    setIsAuthenticated: this.setIsAuthenticated,

    list: [],
  };

  componentDidMount() {
    this.getUsers();
    this.getAllRounds();
  }

  getUsers = () => {
    const query = new AV.Query('Player');
    query.find().then((players: AV.Queriable[]) => {
      this.setUsers(players);
    });
  };

  getAllRounds = () => {
    const rounds = new AV.Query('Round');
    rounds.find().then((res) => {
      Promise.all(
        res.map((round) => {
          return this.getRoundInfo(round);
        })
      ).then((roundInfos) => {
        this.setRounds(res);
        this.setRoundUserInfo(roundInfos);
      });
    });
  };

  getRoundInfo = (round: AV.Queriable) => {
    const query = new AV.Query('RoundUserInfo');
    query.equalTo('round', round);
    return query.find();
  };

  handleAddDone = () => {
    this.getAllRounds();
  };

  calcList() {
    let { roundUserInfo, rounds } = this.state;
    let tmp: Map = {};
    roundUserInfo.forEach((round: AV.Object[], index) => {
      let leverage = rounds[index].get('leverage');
      round.forEach((info) => {
        let player = info.get('player');
        let amount = info.get('amount');
        amount = +amount;
        let playerId = player.get('objectId');
        let userRoundInfo = tmp[playerId];
        if (!userRoundInfo) {
          userRoundInfo = {
            max: 0,
            min: 0,
            total: 0,
            totalBalance: 0,
            count: 0,
            player,
            currentLeverage: 0,
          };
        }
        if (amount > userRoundInfo.max) {
          userRoundInfo.max = amount;
        }
        if (amount < userRoundInfo.min) {
          userRoundInfo.min = amount;
        }
        userRoundInfo.total = +new Big(userRoundInfo.total)
          .plus(amount)
          .valueOf();
        userRoundInfo.totalBalance = +new Big(userRoundInfo.totalBalance)
          .plus(new Big(amount).times(leverage))
          .valueOf();
        if (amount !== 0) {
          userRoundInfo.count++;
        }
        tmp[playerId] = userRoundInfo;
      });
    });
    let list = _.values(tmp);
    list.sort((a: ListItem, b: ListItem) => {
      return b.totalBalance - a.totalBalance;
    });
    this.setState({
      list,
    });
  }

  render() {
    let {
      users,
      rounds,
      roundUserInfo,
      showSession,
      setUsers,
      setRounds,
      setRoundUserInfo,
      setShowSession,
      list,
      isAuthenticated,
      setIsAuthenticated,
    } = this.state;
    const isDev = process.env.NODE_ENV === 'development';
    return (
      <div className="app">
        <AppContext.Provider
          value={{
            users,
            rounds,
            roundUserInfo,
            showSession,
            setUsers,
            setRounds,
            setRoundUserInfo,
            setShowSession,
            isAuthenticated,
            setIsAuthenticated,
          }}
        >
          <Router>
            {isAuthenticated || isDev ? <TopBar /> : null}
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
                <PrivateRoute path="/photo">
                  <Photo />
                </PrivateRoute>
                <PrivateRoute path="/message">
                  <Message />
                </PrivateRoute>
                <PrivateRoute path="/profile">
                  <Profile />
                </PrivateRoute>
                <Route path="/encrypt">
                  <Encrypt />
                </Route>
                <Route path="/auth">
                  <Auth />
                </Route>
                <PrivateRoute path="/">
                  <Home list={list} onAddDone={this.handleAddDone} />
                </PrivateRoute>
              </Switch>
            </Suspense>
          </Router>
        </AppContext.Provider>
      </div>
    );
  }
}
