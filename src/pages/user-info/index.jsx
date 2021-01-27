import React, { memo } from 'react';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import style from './index.module.scss';
import NavBar from '../../components/NavBar';

const userInfo = () => {
  return (
    <View className={style.container}>
      <NavBar title="个人信息" back />
      <AtList>
        <AtListItem title="标题文字" extraText="详细信息" />
        <AtListItem title="标题文字" extraText="详细信息" />
        <AtListItem title="标题文字" extraText="详细信息" />
        <AtListItem title="标题文字" extraText="详细信息" />
      </AtList>
    </View>
  );
};

export default memo(userInfo);
