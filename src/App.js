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

class App extends Component {
  state = {
    users: [],
    setUsers: this.setUsers,

    showModal: false,
    addLoading: false,
    showDetailsModal: false,
  };
  componentDidMount() {
    this.getUsers();
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
  render() {
    return (
      <div className="App">
        <AppContext.Provider value={{ users: this.state.users }}>
          <Header />
          <List />
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

export default App;
