import React, { useState, useEffect } from 'react';
import { Upload, Button, message, Spin } from 'antd';
import AV from 'leancloud-storage';
import './photo.scss';

export default function Photo() {
  const [pics, setPics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPics();
  }, []);

  const user = AV.User.current();

  function handleBeforeUpload(file: File, files: File[]): boolean {
    files.forEach((f) => {
      let avFile = new AV.File(f.name, f);
      avFile.metaData('type', 0); // 0: game pic
      const GamePic = AV.Object.extend('GamePic');
      const pic = new GamePic();
      pic.set('file', avFile);
      pic.set('uploader', AV.User.current());
      pic.save({ keepFileName: true }).then(() => {
        message.success('上传成功');
        getPics();
      });
    });
    return false;
  }

  function getPics() {
    const query = new AV.Query('GamePic');
    query.limit(5);
    query.skip(pics.length);
    setIsLoading(true);
    query.find().then((gamePics) => {
      setPics(pics.concat(gamePics as []));
      setIsLoading(false);
    });
  }

  return (
    <div className="page photo">
      {user ? (
        <div className="upload-wrap">
          <Upload
            beforeUpload={handleBeforeUpload}
            showUploadList={false}
            multiple={true}
          >
            <Button>上传图片</Button>
          </Upload>
        </div>
      ) : null}

      <div className="pics">
        {pics.map((gamePic: AV.Object) => {
          return (
            <img
              key={gamePic.get('objectId')}
              src={gamePic.get('file').get('url')}
              alt=""
            />
          );
        })}
      </div>
      <div className="spin-wrap">
        {isLoading ? (
          <Spin />
        ) : (
          <span className="link-style" onClick={getPics}>
            加载更多
          </span>
        )}
      </div>
    </div>
  );
}
