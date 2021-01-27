import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import Taro, { useDidShow } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { handleLogin } from '../../store/login';
import { isLogin } from '../../utils/auth';
import style from './index.module.scss';
import closeIcon from '../../assets/images/close-icon.png';

const LoginModal = props => {
  const { bindHandleLogin } = props;

  const [status, setStatus] = useState(true); // 弹窗状态是否出现

  // 判断是否已经登录 没有登录则设置status出现登录框
  useDidShow(() => {
    setStatus(!isLogin());
  });

  // 跳转登录
  const routerLogin = () => {
    Taro.NavigateTo({
      url: '/pages/login/index'
    });
  };

  // 获取手机号登录
  const handleGetPhoneNumber = e => {
    const { encryptedData, iv, errMsg } = e.detail;
    if (!encryptedData || !iv) {
      console.log('获取手机号失败' + errMsg);
      return false;
    }
    const params = { registerType: 1 };
    const decodeData = { encryptedData, iv };
    bindHandleLogin(params, decodeData).then(() => {
      setStatus(false);
      Taro.showToast({
        icon: 'success',
        title: '登录成功'
      });
    });
  };

  return (
    <>
      {status && (
        <View className={style.container}>
          <View className={style.modal}>
            <View className={style.header}>
              <Image
                className={style.closeIcon}
                src={closeIcon}
                onClick={() => setStatus(false)}
              />
            </View>
            <Text className={style.title}>登录/注册</Text>
            <Text className={style.tips}>请先登录后使用相应小程序功能</Text>
            <View className={style.btnGroup}>
              <AtButton
                className={style.btn}
                circle
                openType="getPhoneNumber"
                onGetPhoneNumber={handleGetPhoneNumber}
              >
                微信登录
              </AtButton>
              <AtButton className={style.btn} circle onClick={routerLogin}>
                手机号登录
              </AtButton>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

// 映射dispatch到props上
const mapDispatchToProps = dispatch => ({
  bindHandleLogin: (data, decodeData) => dispatch(handleLogin(data, decodeData))
});

export default connect(null, mapDispatchToProps)(memo(LoginModal));
