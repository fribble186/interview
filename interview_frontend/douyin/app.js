//app.js
var API = require('/api/api.js');

var CONFIG = require('/api/config.js');

App({
  globalData: {
    front_version: 'V1.0',
    device: {},
    userInfo: {
      token: '',
      name: '',
      avatar: ''
    },
    log: {}
  },
  onLaunch: function () {
    console.info('当前处于' + CONFIG.CONST.environment + '环境');
    tt.getSystemInfo({
      success: res => {
        let {
          brand,
          model,
          pixelRatio,
          windowWidth,
          windowHeight,
          language,
          statusBarHeight,
          safeArea
        } = res;
        this.globalData.device = {
          brand,
          model,
          pixelRatio,
          windowWidth,
          windowHeight,
          language,
          statusBarHeight,
          safeArea
        };
      }
    });

    this.globalData['loginPromise'] = () => new Promise((resolve, reject) => {
      if (this.globalData.userInfo.token) {
        console.info('已有token' + this.globalData.userInfo.token);
        resolve();
        return;
      }

      tt.showLoading({
        title: '登录中...'
      });
      tt.login({
        success: res => {
          console.log("success in wxlogin", res);
          let data = {
            auth_code: res.code
          };
          tt.getUserInfo({
            withCredentials: true,
            success: res => {
              data['encryptedData'] = res.encryptedData;
              data['iv'] = res.iv;
              data['login_origin'] = "dy";
              API.user_login(data).then(data => {
                if (data) {
                  console.info('获取新token' + this.globalData.userInfo.token);
                  this.globalData.userInfo.token = data.token;
                  this.globalData.userInfo.name = data.name;
                  this.globalData.userInfo.avatar = data.avatar;
                  this.globalData.userInfo.isBinding = data.isBinding;
                  this.globalData.userInfo.type = "dy";
                  tt.hideLoading();
                  resolve(data);
                } else reject(data);
              });
            },
            fail: res => {
              console.log("fail getUserInfo", res)
              tt.hideLoading();
              tt.showToast({
                title: '未获得权限',
                icon: 'none'
              });
              tt.openSetting()
              reject(res)
            }
          });
        },
        fail: res => {
          console.log("fail login", res)
          reject(res)
        }
      });
    });

    this.showLoginToast = () => {
      var pages = getCurrentPages();
      console.log(pages)
      var Page = pages[pages.length - 1];
      Page.setData({
        login_toast_show: true
      });
    };

    this.hideLoginToast = () => {
      var pages = getCurrentPages();
      var Page = pages[pages.length - 1];
      Page.setData({
        login_toast_show: false
      }, () => Page.onLoad());
    };
  }
});