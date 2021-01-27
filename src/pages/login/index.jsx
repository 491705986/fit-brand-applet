import React, { useState, memo } from 'react';
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import { View, Text, Image } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui';
import { handleSendSms, handleLogin } from '../../store/login';
import NavBar from '../../components/NavBar';
import loginBottom from '../../assets/images/login-bottom.png';
import logo from '../../assets/images/logo.png';
import style from './index.module.scss';

const Login = props => {
  const { bindHandleLogin } = props;

  const [phone, setPhone] = useState('');
  const [validCode, setValidCode] = useState('');
  const [countDown, setCountDown] = useState('获取验证码');

  // 获取验证码
  const getValidCode = () => {
    if (countDown !== '获取验证码') return;
    if (!phone || phone.length !== 11) {
      Taro.showToast({
        icon: 'none',
        title: '手机号码格式不正确'
      });
      return false;
    }
    handleSendSms({
      mobile: phone,
      smsmode: 3 // 手机号模式 0 .登录模板、1.注册模板、2.忘记密码模板 3.通用模板
    }).then(() => {
      let count = 61;
      let timer = setInterval(() => {
        if (count <= 1) {
          setCountDown('获取验证码');
          clearInterval(timer);
          return;
        }
        count--;
        setCountDown(`${count} 秒`);
      }, 1000);
    });
  };

  // 提交表单
  const handleSubmit = () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({
        icon: 'none',
        title: '手机号码格式不正确'
      });
      return false;
    }
    if (!validCode) {
      Taro.showToast({
        icon: 'none',
        title: '请输入验证码'
      });
      return false;
    }
    const params = { phone, smscode: validCode, registerType: 2 };
    bindHandleLogin(params).then(() => {
      Taro.SwitchTab({
        url: '/pages/home/index'
      }).then(() => {
        Taro.showToast({
          icon: 'success',
          title: '登录成功'
        });
      });
    });
  };

  // 跳转隐私协议
  const routerPrivacyAgreement = () => {
    Taro.NavigateTo({
      url: '/pages/privacy-agreement/index'
    });
  };

  // 跳转注册协议
  const routerRegisterAgreement = () => {
    Taro.NavigateTo({
      url: '/pages/register-agreement/index'
    });
  };

  return (
    <>
      <NavBar title="南大菲特FIT" back />
      <Image className={style.bottomImage} src={loginBottom} />
      <View className={style.login}>
        <Image className={style.logoImage} src={logo} />
        <AtForm className={style.form}>
          <AtInput
            name="phone"
            title="手机号"
            maxLength={11}
            placeholder="请输入你的手机号"
            placeholderClass={style.placeholderClass}
            type="phone"
            value={phone}
            onChange={val => setPhone(val)}
          />
          <AtInput
            name="validCode"
            title="验证码"
            maxLength={6}
            placeholder="请输入你的验证码"
            placeholderClass={style.placeholderClass}
            type="text"
            value={validCode}
            onChange={val => setValidCode(val)}
          >
            <AtButton
              className={style.validateCode}
              circle
              onClick={getValidCode}
            >
              {countDown}
            </AtButton>
          </AtInput>
          <AtButton className={style.submitBtn} circle onClick={handleSubmit}>
            登录
          </AtButton>
          <View className={style.tips}>
            注册即代表同意
            <Text className={style.link} onClick={routerRegisterAgreement}>
              《医学体重管理 注册协议》
            </Text>
            和
            <Text className={style.link} onClick={routerPrivacyAgreement}>
              《医学体重管理隐私保护条款》
            </Text>
          </View>
        </AtForm>
      </View>
    </>
  );
};

// 映射dispatch到props上
const mapDispatchToProps = dispatch => ({
  bindHandleLogin: data => dispatch(handleLogin(data))
});

export default connect(null, mapDispatchToProps)(memo(Login));
