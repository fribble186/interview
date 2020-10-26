//index.js
//获取应用实例
const app = getApp();

var API = require('../../api/api.js');

Page({
  data: {
    // motto: 'Hello World',
    testsList: [],
    login_toast_show: false // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo.token === "") API.get_tests_no_auth().then(data => this.setData({
      testsList: data.data
    }));else API.get_tests().then(data => this.setData({
      testsList: data.data
    }));
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target);
    }

    return {
      title: '魔面',
      path: '/pages/index/index'
    };
  }
});