import { POST, GET } from '../utils/http.js';

export function getPhone(data) {
  return POST('/sys/h5/getPhone', data);
}

export function sendSms(data) {
  return POST('/sys/h5/sms', data);
}

export function register(data) {
  return POST('/sys/h5/register', data, {
    errorCodeIgnore: [10104]
  });
}

export function login(data) {
  return POST('/sys/h5/login', data);
}

export function getH5UserById(data) {
  return GET('/sys/h5/getH5UserById', data);
}

export function updateBaseInfo(data) {
  return POST('/sys/h5/updateBaseInfo', data);
}
