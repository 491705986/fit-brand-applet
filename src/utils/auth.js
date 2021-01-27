import Taro from '@tarojs/taro';

// 1:fit健康 2：健康管理
export const appletType = 2;

export const tokenKey = 'X-Access-Token';

export const getToken = () => Taro.getStorageSync(tokenKey);

export const setToken = value => Taro.setStorageSync(tokenKey, value);

export const clearStorage = () => Taro.clearStorageSync();

// 判断是否登录
export const isLogin = () => !!getToken();

const userIdKey = 'userId';

export const getUserId = () => Taro.getStorageSync(userIdKey);

export const setUserId = value => Taro.setStorageSync(userIdKey, value);

/**
 * 登录超时回调
 * @param { number } code
 * @param { string } message
 */

export function expiredCallBack(code, message) {
  Taro.SwitchTab({
    url: '/pages/home/index'
  }).then(() => {
    Taro.showToast({
      icon: 'none',
      title: message || '登录超时, 请重新登录',
      duration: 5000
    });
    clearStorage();
  });
}
