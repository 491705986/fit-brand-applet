import request from './request';
import { handleParams } from './tools';

/**
 * 封装get方法
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时配置项]
 */

export function GET(url, params = {}, config = {}) {
  return request.get(url, { params, ...config });
}

/**
 * 封装post请求
 * @param {string} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 * @param {Object} config [请求时配置项]
 */

export function POST(url, data = {}, config = {}) {
  return request.post(url, data, config);
}

/**
 * 封装delete请求
 * @param {string} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 * @param {Object} config [请求时配置项]
 */

export function DELETE(url, data = {}, config = {}) {
  const paramsString = handleParams(data);
  return request.delete(url + paramsString, data, config);
}
