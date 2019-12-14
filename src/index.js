import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
// 支持https协议服务器,在没有网络的时候也可以使用
import * as serviceWorker from './serviceWorker';
ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
