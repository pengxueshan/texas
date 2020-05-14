import React, { Component } from 'react';
import Header from '../Header';
import List from '../List';
import './app.scss';
import 'antd/dist/antd.css';
import AppContext, { ContextType } from '../../store/context';
import AV from 'leancloud-storage';
import { Button } from 'antd';
import AddRoundModal from '../AddRoundModal';
import DetailsModal from '../DetailsModal';
import _ from 'lodash';
import Big from 'big.js';
import { ListItem } from '../List';
import TopBar from '../TopBar';

interface State extends ContextType {
  list: [];

  showModal: boolean;
  addLoading: boolean;
  showDetailsModal: boolean;

  modifyIndex: number;
  isModify: boolean;
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

  state: State = {
    users: [],
    rounds: [],
    roundUserInfo: [],
    showSession: false,
    setUsers: this.setUsers,
    setRounds: this.setRounds,
    setRoundUserInfo: this.setRoundUserInfo,
    setShowSession: this.setShowSession,

    list: [],

    showModal: false,
    addLoading: false,
    showDetailsModal: false,

    modifyIndex: -1,
    isModify: false,
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
  handleAddClick = () => {
    this.setState({
      showModal: true,
      isModify: false,
    });
  };
  handleDetailsClick = () => {
    this.setState({
      showDetailsModal: true,
    });
  };
  handleModalCancel = () => {
    this.setState({
      showModal: false,
    });
  };
  handleModalConfirm = () => {
    this.setState({
      showModal: false,
    });
    this.getAllRounds();
  };
  handleDetailsConfirm = () => {
    this.setState({
      showDetailsModal: false,
    });
  };
  handleDetailsCancel = () => {
    this.setState({
      showDetailsModal: false,
    });
  };
  calcList() {
    let { roundUserInfo, rounds } = this.state;
    let tmp: Map = {};
    let lastRound: AV.Object = rounds[rounds.length - 1];
    let currentLeverage = 0;
    if (lastRound) {
      currentLeverage = lastRound.get('leverage');
    }
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
            currentLeverage,
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
  handleModify = (index: number) => {
    this.setState({
      modifyIndex: index,
      isModify: true,
      showDetailsModal: false,
      showModal: true,
    });
  };
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
    } = this.state;
    const currentUser = AV.User.current();
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
          }}
        >
          <TopBar />
          <Header />
          <List list={list} />
          <div className="btn-wrap">
            <Button type="primary" onClick={this.handleDetailsClick}>
              明细
            </Button>
            {currentUser ? (
              <Button type="primary" onClick={this.handleAddClick}>
                增加记录
              </Button>
            ) : null}
          </div>
          <AddRoundModal
            visible={this.state.showModal}
            onOk={this.handleModalConfirm}
            onCancel={this.handleModalCancel}
            isModify={this.state.isModify}
            roundIndex={this.state.modifyIndex}
          ></AddRoundModal>
          <DetailsModal
            visible={this.state.showDetailsModal}
            onOk={this.handleDetailsConfirm}
            onCancel={this.handleDetailsCancel}
            onModify={this.handleModify}
          />
        </AppContext.Provider>
      </div>
    );
  }
}
