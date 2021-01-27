import { axios } from 'taro-axios';
import Taro from '@tarojs/taro';
import { tokenKey, isLogin, getToken, expiredCallBack } from './auth';

const AXIOS_DEFAULT_CONFIG = {
  baseURL: process.env.SERVER_HOST,
  timeout: 60000,
  withCredentials: false
};

const request = axios.create(AXIOS_DEFAULT_CONFIG);
const successCode = [0, 200]; // 登录成功
const expiredCode = [1130]; // 登录超时

request.interceptors.request.use(
  config => {
    // 如果忽略token则直接返回配置
    if (config.ignoreToken) return config;

    // 请求拦截器更新头部信息
    if (isLogin()) {
      config.headers[tokenKey] = getToken();
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    const res = response.data;
    const config = response.config;

    const { code, message } = res;
    const { errorCodeIgnore } = config;

    console.log('请求返回报文 ===>');
    console.log(res);
    console.log('请求配置选项 ===>');
    console.log(config);

    // 请求成功
    if (successCode.includes(+code)) {
      return Promise.resolve(res);
    }

    // 请求失败 异常状态码
    if (
      errorCodeIgnore !== true &&
      !(Array.isArray(errorCodeIgnore) && errorCodeIgnore.includes(+code))
    ) {
      Taro.showToast({
        icon: 'none',
        title: message || '请求失败',
        duration: 5000
      });
    }

    // 登录超时
    if (expiredCode.includes(+code)) {
      expiredCallBack(code, message);
    }

    return Promise.reject(res);
  },
  error => {
    console.log('失败返回报文 ===>');
    console.log(error);
    console.log(error.response.data);

    const code = error.response.data.code;
    const message = error.response.data.message;
    // 登录超时
    if (expiredCode.includes(+code)) {
      expiredCallBack(code, message);
    } else {
      Taro.showToast({
        icon: 'none',
        title: error.message || message,
        duration: 5000
      });
    }

    return Promise.reject(error.response.data);
  }
);

export default request;
