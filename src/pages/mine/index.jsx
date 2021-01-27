import React, { memo } from 'react';
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtList, AtListItem, AtIcon } from 'taro-ui';
import NavBar from '../../components/NavBar';
import LoginModal from '../../components/LoginModal';
import style from './index.module.scss';
import evaluating from '../../assets/images/mine/evaluating.png';
import order from '../../assets/images/mine/order.png';
import memberService from '../../assets/images/mine/member-service.png';
import customerService from '../../assets/images/mine/customer-service.png';

const Mine = props => {
  const { userInfo } = props;

  const routerPage = url => {
    Taro.NavigateTo({
      url
    });
  };

  const menu = [
    {
      title: '我的测评',
      thumb: evaluating,
      url: ''
    },
    {
      title: '我的订单',
      thumb: order,
      url: ''
    },
    {
      title: '会员服务',
      thumb: memberService,
      url: ''
    },
    {
      title: '我是客服',
      thumb: customerService,
      url: ''
    }
  ];

  return (
    <View className={style.container}>
      <NavBar title="南大菲特FIT" />
      <View
        className={style.header}
        onClick={() => routerPage('/pages/user-info/index')}
      >
        <View className={style.leftBox}>
          <AtAvatar size="large" circle openData={{ type: 'userAvatarUrl' }} />
          <View className={style.info}>
            <Text className={style.name}>{userInfo.nickName}</Text>
            {userInfo.phone && (
              <Text className={style.phone}>{userInfo.phone}</Text>
            )}
          </View>
        </View>
        <AtIcon value="chevron-right" size="25" color="#ccc" />
      </View>
      <View className={style.main}>
        <AtList className={style.list}>
          {menu.map(item => (
            <AtListItem
              key={item.title}
              title={item.title}
              arrow="right"
              thumb={item.thumb}
              onClick={() => routerPage(item.url)}
            />
          ))}
        </AtList>
      </View>
      <LoginModal />
    </View>
  );
};

const mapStateToProps = state => ({
  userInfo: state.login.userInfo
});

export default connect(mapStateToProps)(memo(Mine));
