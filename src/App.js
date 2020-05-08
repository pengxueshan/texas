import React, { Component } from 'react';
import Header from './components/Header';
import List from './components/List';
import './App.css';
import 'antd/dist/antd.css';
import AppContext from './store/context';
import AV from 'leancloud-storage';
import { Button } from 'antd';
import AddRoundModal from './components/AddRoundModal';
import DetailsModal from './components/DetailsModal';
import _ from 'lodash';

export default class App extends Component {
  state = {
    users: [],
    rounds: [],
    roundUserInfo: [],
    setUsers: this.setUsers,
    setRounds: this.setRounds,
    setRoundUserInfo: this.setRoundUserInfo,

    list: [],

    showModal: false,
    addLoading: false,
    showDetailsModal: false,
  };
  componentDidMount() {
    this.getUsers();
    this.getAllRounds();
  }
  getUsers = () => {
    const query = new AV.Query('Player');
    query.find().then((players) => {
      this.setUsers(players);
    });
  };
  setUsers = (list) => {
    this.setState({
      users: list,
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
  setRounds = (list) => {
    this.setState({
      rounds: list,
    });
  };
  getRoundInfo = (round) => {
    const query = new AV.Query('RoundUserInfo');
    query.equalTo('round', round);
    return query.find();
  };
  setRoundUserInfo = (list) => {
    this.setState({
      roundUserInfo: list,
    }, this.calcList);
  };
  handleAddClick = () => {
    this.setState({
      showModal: true,
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
    let tmp = {};
    let lastRound = rounds[rounds.length - 1];
    let currentLeverage = 0;
    if (lastRound) {
      currentLeverage = lastRound.get('leverage');
    }
    roundUserInfo.forEach((round, index) => {
      let leverage = rounds[index].get('leverage');
      round.forEach((info) => {
        let player = info.get('player');
        let amount = info.get('amount');
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
        userRoundInfo.total += amount;
        userRoundInfo.totalBalance += amount * leverage;
        userRoundInfo.count++;
        tmp[playerId] = userRoundInfo;
      });
    });
    let list = _.values(tmp);
    list.sort((a, b) => {
      return b.totalBalance - a.totalBalance;
    });
    this.setState({
      list
    });
  }
  render() {
    let {
      users,
      rounds,
      roundUserInfo,
      setUsers,
      setRounds,
      setRoundUserInfo,
      list
    } = this.state;
    return (
      <div className="App">
        <AppContext.Provider
          value={{
            users,
            rounds,
            roundUserInfo,
            setUsers,
            setRounds,
            setRoundUserInfo,
          }}
        >
          <Header />
          <List list={list} />
          <div className="btn-wrap">
            <Button type="primary" onClick={this.handleDetailsClick}>
              明细
            </Button>
            <Button type="primary" onClick={this.handleAddClick}>
              增加记录
            </Button>
          </div>
          <AddRoundModal
            visible={this.state.showModal}
            onOk={this.handleModalConfirm}
            onCancel={this.handleModalCancel}
          ></AddRoundModal>
          <DetailsModal
            visible={this.state.showDetailsModal}
            onOk={this.handleDetailsConfirm}
            onCancel={this.handleDetailsCancel}
          />
        </AppContext.Provider>
      </div>
    );
  }
}
