import React, { useEffect, useState, ChangeEvent, KeyboardEvent, useRef } from 'react';
import { Input, Button, Spin } from 'antd';
import AV from 'leancloud-storage';
import {
  Realtime,
  IMClient,
  PresistentConversation,
  Event,
  TextMessage,
  ChatRoom,
} from 'leancloud-realtime';
import moment from 'moment';
import './message.scss';

export default function IM() {
  const [room, setRoom] = useState<ChatRoom>();
  const [textMessage, setTextMessage] = useState('');
  const [messageList, setMessageList] = useState<TextMessage[]>([]);
  const [isJoining, setIsJoining] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = AV.User.current();
    if (user) {
      setIsJoining(true);
      new Realtime({
        appId: 'xfKlG0D6VO6MgwOUTzQ31f7W-gzGzoHsz',
        appKey: 'k9TuwPqFQmsMqj3HYa83WCFs',
        server: 'https://xfklg0d6.lc-cn-n1-shared.com',
      })
        .createIMClient(user)
        .then((messageUser) => {
          var query = messageUser.getQuery().equalTo('tr', true); // 聊天室对象
          query
            .find()
            .then(function (conversations) {
              listenMessage(messageUser);
              if (conversations.length < 1) {
                createRoom(messageUser);
              } else {
                joinRoom(conversations[0]);
              }
            })
            .catch(console.error);
        });
    }
  }, []);

  function createRoom(client: IMClient) {
    client.createChatRoom({ name: '深挖洞，广积粮，不称王' }).then((r) => {
      setRoom(r);
      setIsJoining(false);
    });
  }

  function joinRoom(r: PresistentConversation) {
    r.join().then(() => {
      setRoom(r);
      setIsJoining(false);
    });
  }

  function handleTextMessageChange(e: ChangeEvent<HTMLInputElement>) {
    setTextMessage(e.target.value);
  }

  function handleTextMessageEnterChange(e: KeyboardEvent<HTMLInputElement>) {
    setTextMessage(e.currentTarget.value);
    handleSend();
  }

  function listenMessage(client: IMClient) {
    // 当前用户被添加至某个对话
    client.on(Event.INVITED, (payload, conversation) => {
      // console.log(payload.invitedBy, conversation.id);
    });

    // 当前用户收到了某一条消息，可以通过响应 Event.MESSAGE 这一事件来处理。
    client.on(Event.MESSAGE, (message: TextMessage, conversation) => {
      console.log('收到新消息：' + message);
      updateMessageList(message);
    });
  }

  function handleSend() {
    if (!textMessage) return;
    const m = new TextMessage(textMessage);
    console.log('messgae:', m);
    if (room) {
      room.send(m);
      updateMessageList(m);
      setTextMessage('');
    }
  }

  function updateMessageList(m: TextMessage) {
    setMessageList(messageList.concat(m));
    setTimeout(() => {
      let current = scrollRef.current;
      if (current) {
        current.scrollTo(0, current.scrollHeight);
      }
    }, 100);
  }

  if (isJoining) {
    return (
      <div className="message-wrap">
        <Spin tip="正在加入聊天室..."></Spin>
      </div>
    );
  }

  return (
    <div className="message-wrap">
      <div className="messages" ref={scrollRef}>
        {messageList.map((m) => {
          return (
            <div className="message-item" key={m.id}>
              <div>
                <span className="username">{m.from}</span>
                <span className="message-time">
                  {moment(m.timestamp).format('YYYY/MM/DD HH:mm:ss')}
                </span>
              </div>
              <div className="message-content">{m.text}</div>
            </div>
          );
        })}
      </div>
      <div className="send-wrap">
        <Input
          value={textMessage}
          onChange={handleTextMessageChange}
          onPressEnter={handleTextMessageEnterChange}
        />
        <Button size="large" onClick={handleSend}>
          发送
        </Button>
      </div>
    </div>
  );
}
