// pages/testDetail/testDetail.js
var API = require('../../api/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    API.get_test_box(options.tb_id).then(data => this.response2test(data.data))
    this.setData({tb_id: options.tb_id})
  },

  response2test(data) {
    let pb_data = data.pb_data
    let tb_data = data.tb_data
    this.setData({pb_data, tb_data})
    console.log(raw_questions)
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