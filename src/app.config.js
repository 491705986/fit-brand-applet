export default {
  pages: [
    'pages/home/index',
    'pages/brand/index',
    'pages/mine/index',
    'pages/login/index',
    'pages/register-agreement/index',
    'pages/privacy-agreement/index',
    'pages/user-info/index'
  ],
  tabBar: {
    list: [
      {
        iconPath: 'assets/images/tabbar/home.png',
        selectedIconPath: 'assets/images/tabbar/home-actived.png',
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        iconPath: 'assets/images/tabbar/brand.png',
        selectedIconPath: 'assets/images/tabbar/brand-actived.png',
        pagePath: 'pages/brand/index',
        text: '品牌'
      },
      {
        iconPath: 'assets/images/tabbar/mine.png',
        selectedIconPath: 'assets/images/tabbar/mine-actived.png',
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ],
    color: '#222222',
    selectedColor: '#6AB2D5',
    backgroundColor: '#fff',
    borderStyle: 'black'
  },
  window: {
    backgroundColor: '#f5f2f6',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '南大菲特FIT',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  }
};
