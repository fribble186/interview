// pages/me/me.js
var app = getApp()
var API = require('../../api/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_toast_show: false,
    login_status: null,
  },

  go2answer: function() {
    if (app.globalData.userInfo.token==="") {
      app.showLoginToast()
      return
    }
    wx.navigateTo({
      url: '../answerList/answerList'
    })
  },

  go2jobfair: function() {
    if (app.globalData.userInfo.token==="") {
      app.showLoginToast()
      return
    }
    wx.navigateTo({
      url: '../jobFairs/jobFairs'
    })
  },

  handleMultiLogin: function() {
    if(!app.globalData.userInfo.type) {
      app.showLoginToast()
      return
    }
    else if(app.globalData.userInfo.type === "school") {
      wx.login({
        success: (res) => {
          console.log("success in wxlogin", res)
          let data = { auth_code: res.code, binding: "wx" }
          API.binding(data).then((data) => {
            if (!data.error) {
              app.globalData.userInfo.isBinding = true
              this.setData({isBinding: true})
              wx.showToast({
                title: '绑定成功',
              })
            }
            else wx.showToast({
              title: '绑定失败，请用微信账号登录后重试',
            })
          })
        },
        fail: (res) => reject(res)
      })
     
      return
    }
    else if(app.globalData.userInfo.type === "wx") {
      return
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({login_status: app.globalData.userInfo.type, isBinding: app.globalData.userInfo.isBinding})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({login_status: app.globalData.userInfo.type, isBinding: app.globalData.userInfo.isBinding})
    this.setData({login_toast_show: false,})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})