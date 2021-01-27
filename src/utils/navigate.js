import Taro from '@tarojs/taro';
import { handleParams } from './tools';

/**
 * 统一管理路由跳转回调函数
 * @param { object } params
 * @prop { string } params.url - 目标页面地址
 * @prop { object } params.data - 携带参数
 * @param { string } type
 */
function toPageFn({ url, data = {} }, type = 'navigateTo') {
  const paramsStr = handleParams(data);
  paramsStr && (url += '?');
  const fullUrl = (url += paramsStr);
  return Taro[type]({
    url: fullUrl
  });
}

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param { object } params
 * @prop { string } params.url - 目标页面地址
 * @prop { object } params.data - 携带参数
 */
export const NavigateTo = (params = {}) => toPageFn(params);

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param { object } params
 * @prop { string } params.url - 目标页面地址
 * @prop { object } params.data - 携带参数
 */

export const RedirectTo = (params = {}) => toPageFn(params, 'redirectTo');

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param { object } params
 * @prop { string } params.url - 目标页面地址
 * @prop { object } params.data - 携带参数
 */

export const ReLaunch = (params = {}) => toPageFn(params, 'reLaunch');

/**
 * 跳转到tabBar页面
 * @param { object } params
 * @prop { string } params.url - 目标页面地址
 * @prop { object } params.data - 携带参数
 */

export const SwitchTab = (params = {}) => toPageFn(params, 'switchTab');
