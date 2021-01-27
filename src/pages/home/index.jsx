import React, { memo } from 'react';
import { View, Image } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import NavBar from '../../components/NavBar';
import LoginModal from '../../components/LoginModal';
import homeImage from '../../assets/images/home/home-image.png';
import style from './index.module.scss';

const Home = () => {
  return (
    <View className={style.container}>
      <NavBar title="南大菲特FIT" />
      <Image src={homeImage} mode="widthFix" />
      <View className={style.btnGroup}>
        <AtButton className={style.btn} circle>
          肥胖评估
        </AtButton>
        <AtButton className={style.btn} circle>
          咨询
        </AtButton>
      </View>
      <LoginModal />
    </View>
  );
};

export default memo(Home);
