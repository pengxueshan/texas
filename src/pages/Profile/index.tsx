import React from 'react';
import { Select, Button, message, Upload, Avatar } from 'antd';
import AV from 'leancloud-storage';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import AppContext from '../../store/context';
import './profile.scss';

interface State {
  isEdit: boolean;
  relativePlayer: string;
  isSaving: boolean;
}

export default class Profile extends React.Component {
  static contextType = AppContext;

  state: State = {
    isEdit: false,
    relativePlayer: '',
    isSaving: false,
  };

  getRelativePlayer() {
    const user = AV.User.current();
    let player = user.get('player');
    if (!player) {
      return '--';
    }
    let p = this.context.users.find(
      (u: AV.Object) => u.get('objectId') === player.get('objectId')
    );
    return (p && p.get('name')) || '--';
  }

  handleEditClick = () => {
    this.setState({
      isEdit: true,
    });
  };

  handleRelativePlayer = () => {
    if (this.state.isSaving) return;
    const player = AV.Object.createWithoutData(
      'Player',
      this.state.relativePlayer
    );
    const user = AV.User.current();
    player.set('user', user);
    user.set('player', player);
    this.setState({
      isSaving: true,
    });
    Promise.all([player.save(), user.save()]).then(
      () => {
        this.setState({
          isEdit: false,
          isSaving: false,
        });
      },
      (err) => {
        message.error(err.message);
        this.setState({
          isSaving: false,
        });
      }
    );
  };

  handlePlayerSelectChange = (v: string) => {
    this.setState({
      relativePlayer: v,
    });
  };

  renderPlayer() {
    let { users } = this.context;
    if (this.state.isEdit) {
      const currentUser = AV.User.current();
      let defaultSelect = currentUser.get('player');
      defaultSelect = (defaultSelect && defaultSelect.get('objectId')) || '';
      return (
        <>
          <Select
            style={{ width: 120 }}
            placeholder="请选择选手"
            onChange={this.handlePlayerSelectChange}
            defaultValue={defaultSelect}
          >
            {users.map((player: AV.Object) => {
              let id = player.get('objectId');
              return (
                <Select.Option value={id} key={id}>
                  {player.get('name')}
                </Select.Option>
              );
            })}
          </Select>
          <Button type="link" onClick={this.handleRelativePlayer}>
            保存
          </Button>
          <Button
            type="link"
            onClick={() => {
              this.setState({
                isEdit: false,
              });
            }}
          >
            取消
          </Button>
          <span>未找到选手？请联系管理员添加</span>
        </>
      );
    } else {
      return (
        <>
          {this.getRelativePlayer()}
          <div className="edit-wrap" onClick={this.handleEditClick}>
            <EditOutlined />
          </div>
        </>
      );
    }
  }

  handleUploadAvatar = (file: File) => {
    let avFile = new AV.File(file.name, file);
    avFile.metaData('type', 1); // 1: avatar
    const user = AV.User.current();
    user.set('avatar', avFile);
    let player;
    if (user.get('player')) {
      player = user.get('player').get('objectId');
      player = AV.Object.createWithoutData('Player', player);
      player.set('avatar', avFile);
    }
    let req: any[] = [user.save()];
    if (player) {
      req.push(player.save());
    }
    Promise.all(req)
      .then(() => {
        message.success('上传成功');
      })
      .catch((err) => {
        message.error(err.message);
      });
    return false;
  };

  renderAvatar() {
    const user = AV.User.current();
    const avatar = user.get('avatar');
    return (
      <>
        <div className="avatar-wrap">
          {avatar ? (
            <Avatar size={64} src={avatar.get('url')} />
          ) : (
            <Avatar size={64} icon={<UserOutlined />} />
          )}
        </div>
        <Upload beforeUpload={this.handleUploadAvatar} showUploadList={false}>
          <Button>上传</Button>
        </Upload>
      </>
    );
  }

  render() {
    return (
      <div className="page profile">
        <div className="row">
          <span className="label">关联选手</span>
          <div className="content">{this.renderPlayer()}</div>
        </div>
        <div className="row">
          <span className="label">头像</span>
          <div className="content">{this.renderAvatar()}</div>
        </div>
      </div>
    );
  }
}
