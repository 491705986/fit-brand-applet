import Taro from '@tarojs/taro';
import { produce } from 'immer';
import {
  getPhone,
  sendSms,
  register,
  login,
  getH5UserById
} from '../../api/login';
import { appletType, setToken, getUserId, setUserId } from '../../utils/auth';

const defaultState = {
  userInfo: {}
};

//constants
const CHANGE_USER_INFO = 'login/CHANGE_USER_INFO';

//actions
// 用户注册
const handleUserRegister = data => {
  return new Promise((resolve, reject) => {
    Taro.login().then(wechatLoginRes => {
      const { code: jsCode } = wechatLoginRes;
      const params = {
        appletType,
        jsCode,
        ...data
      };
      register(params)
        .then(res => {
          const { result } = res;
          resolve(result);
        })
        .catch(err => {
          if (err.code === 10104) {
            return resolve(err.result);
          }
          reject(err);
        });
    });
  });
};

// 用户登录
const handleUserLogin = async () => {
  try {
    const { code: jsCode } = await Taro.login();
    const params = {
      appletType,
      jsCode
    };
    const { result } = await login(params);
    return result;
  } catch (e) {
    return e;
  }
};

// 改变userInfo
const changeUserInfo = data => ({
  type: CHANGE_USER_INFO,
  data
});

// 获取用户微信手机号码
const handleGetUserPhone = data => {
  return new Promise(((resolve, reject) => {
    Taro.login().then(wechatLoginRes => {
      const { code: jsCode } = wechatLoginRes;
      const params = {
        appletType,
        jsCode,
        ...data
      };
      getPhone(params)
        .then(res => {
          const { result } = res;
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }))
};

// 获取短信验证码
export const handleSendSms = data => sendSms(data);

// 页面注册登录完整流程
export const handleLogin = (data, decodeData) => dispatch => {
  return new Promise(async (resolve, reject) => {
    await Taro.showLoading({
      title: '登录中...',
      mask: true
    });
    try {
      // 1:微信授权注册 2：手机号注册
      if (data.registerType === 1) {
        const { phone, openid } = await handleGetUserPhone(decodeData);
        Object.assign(data, {
          phone,
          openid
        });
      }
      await handleUserRegister(data);
      const { token, userInfo } = await handleUserLogin();
      setUserId(userInfo.id);
      setToken(token);
      dispatch(changeUserInfo(userInfo));
      Taro.hideLoading();
      resolve();
    } catch (e) {
      console.log('登录失败====>>>');
      console.log(e);
      Taro.hideLoading();
      reject(e);
    }
  });
};

// 获取用户信息
export const handleGetUserInfo = () => dispatch => {
  return new Promise(async (resolve, reject) => {
    await Taro.showLoading({
      title: '加载中...',
      mask: true
    });
    const userId = getUserId();
    if (!userId) {
      return Taro.hideLoading();
    }
    try {
      const { result } = await getH5UserById({ userId });
      dispatch(changeUserInfo(result));
      Taro.hideLoading();
    } catch (e) {
      Taro.hideLoading();
      reject(e);
    }
  });
};

//reducer
const reducer = (state = defaultState, action) =>
  produce(state, draft => {
    const { type, data } = action;
    switch (type) {
      case CHANGE_USER_INFO:
        draft.userInfo = data;
        return draft;
      default:
        return state;
    }
  });

export { reducer };
