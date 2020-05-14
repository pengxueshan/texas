import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import AV from 'leancloud-storage';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

AV.init({
  appId: 'xfKlG0D6VO6MgwOUTzQ31f7W-gzGzoHsz',
  appKey: 'k9TuwPqFQmsMqj3HYa83WCFs',
  serverURL: 'https://xfklg0d6.lc-cn-n1-shared.com',
});

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
