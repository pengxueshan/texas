import React, { Component } from 'react';
import { Button } from 'antd';
import List from '../components/List';
import MobileList from '../components/List/mobile';
import AddRoundModal from '../components/AddRoundModal';
import DetailsModal from '../components/DetailsModal';
import AddPlayerModal from '../components/AddPlayerModal';
import { connect } from 'react-redux';
import { StoreType } from '../store/reducer';
import { WinTimes } from '../utils/types';

interface AddDoneFunc {
  (): void;
}

interface Props {
  onAddDone: AddDoneFunc;
  list: [];
  winTimes: WinTimes;
  isAuthenticated: boolean;
  isMobile: boolean;
}

class Home extends Component<Props> {
  state = {
    showAddModal: false,
    isModify: false,
    showDetailsModal: false,
    showAddPlayerModal: false,
    modifyIndex: -1,
  };

  renderButtons() {
    if (!this.props.isAuthenticated) {
      return;
    } else {
      return (
        <div className="btn-wrap">
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                showAddPlayerModal: true,
              });
            }}
          >
            添加选手
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                isModify: false,
                showDetailsModal: true,
              });
            }}
          >
            明细
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                showAddModal: true,
              });
            }}
          >
            增加记录
          </Button>
        </div>
      );
    }
  }

  renderList() {
    if (this.props.isMobile) {
      return (
        <MobileList list={this.props.list} winTimes={this.props.winTimes} />
      );
    } else {
      return <List list={this.props.list} winTimes={this.props.winTimes} />;
    }
  }

  render() {
    return (
      <div className="page home">
        {this.renderList()}
        {this.renderButtons()}
        <AddRoundModal
          visible={this.state.showAddModal}
          onOk={() => {
            this.setState({
              showAddModal: false,
            });
            this.props.onAddDone();
          }}
          onCancel={() => {
            this.setState({
              showAddModal: false,
            });
          }}
          isModify={this.state.isModify}
          roundIndex={this.state.modifyIndex}
        ></AddRoundModal>
        <DetailsModal
          visible={this.state.showDetailsModal}
          onOk={() => {
            this.setState({
              showDetailsModal: false,
            });
          }}
          onCancel={() => {
            this.setState({
              showDetailsModal: false,
            });
          }}
          onModify={(index) => {
            this.setState({
              modifyIndex: index,
              isModify: true,
              showDetailsModal: false,
              showAddModal: true,
            });
          }}
        />
        <AddPlayerModal
          visible={this.state.showAddPlayerModal}
          onOk={() => {
            this.setState({
              showAddPlayerModal: false,
            });
          }}
          onCancel={() => {
            this.setState({
              showAddPlayerModal: false,
            });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  return {
    winTimes: state.winTimes,
    isAuthenticated: state.isAuthenticated,
    isMobile: state.isMobile,
  };
};

export default connect(mapStateToProps)(Home);
