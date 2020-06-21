import React, { useState } from 'react';
import { Button } from 'antd';
import List from '../components/List';
import AddRoundModal from '../components/AddRoundModal';
import DetailsModal from '../components/DetailsModal';
import AddPlayerModal from '../components/AddPlayerModal';

interface AddDoneFunc {
  (): void;
}

interface Props {
  onAddDone: AddDoneFunc;
  list: [];
}

export default function Home({ onAddDone, list }: Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [modifyIndex, setModifyIndex] = useState(-1);

  const currentUser = false;
  return (
    <div className="page home">
      <List list={list} />
      <div className="btn-wrap">
        <Button
          type="primary"
          onClick={() => {
            setShowAddPlayerModal(true);
          }}
        >
          添加选手
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setIsModify(false);
            setShowDetailsModal(true);
          }}
        >
          明细
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          增加记录
        </Button>
      </div>
      <AddRoundModal
        visible={showAddModal}
        onOk={() => {
          setShowAddModal(false);
          onAddDone();
        }}
        onCancel={() => {
          setShowAddModal(false);
        }}
        isModify={isModify}
        roundIndex={modifyIndex}
      ></AddRoundModal>
      <DetailsModal
        visible={showDetailsModal}
        onOk={() => {
          setShowDetailsModal(false);
        }}
        onCancel={() => {
          setShowDetailsModal(false);
        }}
        onModify={(index) => {
          setModifyIndex(index);
          setIsModify(true);
          setShowDetailsModal(false);
          setShowAddModal(true);
        }}
      />
      <AddPlayerModal
        visible={showAddPlayerModal}
        onOk={() => {
          setShowAddPlayerModal(false);
        }}
        onCancel={() => {
          setShowAddPlayerModal(false);
        }}
      />
    </div>
  );
}
