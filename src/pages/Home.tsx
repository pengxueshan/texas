import React, { useState } from 'react';
import { Button } from 'antd';
import List from '../components/List';
import AddRoundModal from '../components/AddRoundModal';
import DetailsModal from '../components/DetailsModal';
import AV from 'leancloud-storage';

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
  const [modifyIndex, setModifyIndex] = useState(-1);

  const currentUser = AV.User.current();
  return (
    <div className="page home">
      <List list={list} />
      <div className="btn-wrap">
        <Button
          type="primary"
          onClick={() => {
            setIsModify(false);
            setShowDetailsModal(true);
          }}
        >
          明细
        </Button>
        {currentUser ? (
          <Button
            type="primary"
            onClick={() => {
              setShowAddModal(true);
            }}
          >
            增加记录
          </Button>
        ) : null}
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
    </div>
  );
}
