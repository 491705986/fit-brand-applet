import React, { memo } from 'react';
import { View } from '@tarojs/components';
import NavBar from '../../components/NavBar';
import LoginModal from '../../components/LoginModal';
import style from './index.module.scss';

const Brand = () => {
  return (
    <View className={style.container}>
      <NavBar title="我的" />
      <LoginModal />
    </View>
  );
};

export default memo(Brand);
