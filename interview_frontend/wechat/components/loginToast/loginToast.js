// components/navBar.js
var app = getApp()
var API = require('../../api/api.js');

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },

  data: {
    showAccountFrom: false
  },

  ready(){
  },

  methods: {
    hideLogin: function() {
      app.hideLoginToast()
    },

    loginByWx: function () {
      app.globalData.loginPromise().then(data => {
        app.hideLoginToast()
      })
    },

    showLoginFrom: function() {
      this.setData({showAccountFrom: true})
    },
    hideLoginFrom: function() {
      this.setData({showAccountFrom: false})
    },
    catch: function() {
      return
    },
    handleChangeCode: function(e) {
      this.setData({study_code: e.detail.value})
    },
    handleChangePassword: function(e) {
      this.setData({password: e.detail.value})
    },
    loginBySchool: function() {
      let data = {
        study_code: this.data.study_code,
        password: this.data.password,
        login_origin: "school"
      }
      wx.showLoading({title: '登录中...'})
      API.user_login(data).then((data) => {
        if (data) {
          console.info('获取新token' + app.globalData.userInfo.token)
          app.globalData.userInfo.token = data.token
          app.globalData.userInfo.name = data.name
          app.globalData.userInfo.type = "school"
          app.globalData.userInfo.isBinding = data.isBinding
          wx.hideLoading()
          app.hideLoginToast()
        }
        else {
          wx.hideLoading()
          wx.showToast({title: '登录失败'})
        } 
      })
    }
  }
})
