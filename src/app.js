import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { Provider } from 'react-redux';
import 'taro-ui/dist/style/index.scss';
import store from './store';
import { handleGetUserInfo } from './store/login';
import './app.scss';
import * as navigate from './utils/navigate';

// 合并转义路由方法
Object.assign(Taro, navigate);

class App extends Component {
  componentDidMount() {
    store.dispatch(handleGetUserInfo());
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
