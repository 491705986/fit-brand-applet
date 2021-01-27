/**
 * 整合路由携带传参
 * @param { object } params
 */
export function handleParams(params = {}) {
  return Object.entries(params).reduce((result, [key, value], index) => {
    return (result += `${index === 0 ? '' : '&'}${key}=${value}`);
  }, '');
}
