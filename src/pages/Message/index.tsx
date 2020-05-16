import React, { ChangeEvent, KeyboardEvent, Component, createRef } from 'react';
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

const HISTORY_MESSAGES_KEY = 'texasMessages';

interface AttrMap extends Object {
  [key: string]: any;
}

interface State {
  text: string;
  messageList: TextMessage[];
  isJoining: boolean;
}

export default class IM extends Component {
  state: State = {
    text: '',
    messageList: [],
    isJoining: false,
  };

  private client: IMClient | null = null;
  private room: ChatRoom | null = null;
  private scrollRef = createRef<HTMLDivElement>();
  private user = AV.User.current();

  componentDidMount() {
    if (this.user) {
      new Realtime({
        appId: 'xfKlG0D6VO6MgwOUTzQ31f7W-gzGzoHsz',
        appKey: 'k9TuwPqFQmsMqj3HYa83WCFs',
        server: 'https://xfklg0d6.lc-cn-n1-shared.com',
      })
        .createIMClient(this.user)
        .then((client) => {
          this.client = client;
          var query = client.getQuery().equalTo('tr', true); // 聊天室对象
          query
            .find()
            .then((conversations) => {
              if (conversations.length < 1) {
                this.createRoom();
              } else {
                this.joinRoom(conversations[0]);
              }
            })
            .then(() => {
              this.listenMessage();
            })
            .catch(console.error);
        });
    }
  }

  createRoom() {
    if (this.client) {
      this.client
        .createChatRoom({ name: '深挖洞，广积粮，不称王' })
        .then((r) => {
          this.room = r;
          this.setState({
            isJoining: false,
          });
          this.loadLocalMessages();
        });
    }
  }

  loadLocalMessages() {
    let messages = localStorage.getItem(HISTORY_MESSAGES_KEY);
    if (messages) {
      messages = JSON.parse(messages);
      this.setState({
        messageList: messages
      });
    }
  }

  joinRoom(r: PresistentConversation) {
    r.join().then(() => {
      this.room = r;
      this.setState({
        isJoining: false,
      });
      this.loadLocalMessages();
    });
  }

  handleTextMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleTextMessageEnterChange = (e: KeyboardEvent<HTMLInputElement>) => {
    this.setState({
      text: e.currentTarget.value,
    });
    this.handleSend();
  };

  listenMessage() {
    if (this.client) {
      // 当前用户被添加至某个对话
      this.client.on(Event.INVITED, (payload, conversation) => {
        // console.log(payload.invitedBy, conversation.id);
      });

      // 当前用户收到了某一条消息，可以通过响应 Event.MESSAGE 这一事件来处理。
      this.client.on(Event.MESSAGE, (message: TextMessage, conversation) => {
        console.log('收到新消息：' + message);
        this.updateMessageList(message);
      });
    }
  }

  handleSend = () => {
    if (!this.state.text) return;
    const m = new TextMessage(this.state.text);
    m.setAttributes({ senderName: this.user.getUsername() });
    if (this.room) {
      this.room.send(m);
      this.updateMessageList(m);
      this.setState({
        text: '',
      });
    }
  };

  updateMessageList(m: TextMessage) {
    this.setState(
      {
        messageList: this.state.messageList.concat(m),
      },
      () => {
        localStorage.setItem(
          HISTORY_MESSAGES_KEY,
          JSON.stringify(this.state.messageList.slice(0, 100))
        );
      }
    );
    setTimeout(() => {
      let current = this.scrollRef.current;
      if (current) {
        current.scrollTo(0, current.scrollHeight);
      }
    }, 100);
  }

  getSenderName(m: TextMessage) {
    let attrs: AttrMap = m.attributes;
    return attrs['senderName'];
  }

  render() {
    if (!this.user) {
      return (
        <div className="message-wrap">
          <div>请先登录</div>
        </div>
      );
    }

    if (this.state.isJoining) {
      return (
        <div className="message-wrap">
          <Spin tip="正在加入聊天室..."></Spin>
        </div>
      );
    }

    return (
      <div className="message-wrap">
        <div className="messages" ref={this.scrollRef}>
          {this.state.messageList.map((m) => {
            return (
              <div className="message-item" key={m.id}>
                <div>
                  <span className="username">{this.getSenderName(m)}</span>
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
            value={this.state.text}
            onChange={this.handleTextMessageChange}
            onPressEnter={this.handleTextMessageEnterChange}
          />
          <Button size="large" onClick={this.handleSend}>
            发送
          </Button>
        </div>
      </div>
    );
  }
}
