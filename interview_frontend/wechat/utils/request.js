//promisefy weixin request

function request(method, url, data) {
  var app = getApp()
  var token = app.globalData.userInfo.token
  return new Promise((resolve, reject) => {
    wx.request({
      header: {
        'content-type': 'application/json',
        'AUTH': token ? 'Token ' + token : '',
        'USERTYPE': 'user'
      },
      url: url,
      method: method,
      data: data || '',
      success: (res) => resolve(res.data),
      fail: (res) => {
        wx.showModal({
          showCancel: false,
          title: '网络错误',
          content: '网络连接好像出现了一点问题',
          confirmText: '重新启动',
          success(res) {
            if (res.confirm) {
              console.log('request错误，用户选择重新打开小程序')
              wx.reLaunch({url: '../laucher/laucher'})
            }
          },
          complete: () => reject(res.data)
        })
      }
    })
  })
}

var request_put = (url, data) => request('PUT', url, data)

var request_post = (url, data) => request('POST', url, data)

var request_get = (url, data) => request('GET', url, data)

var request_delete = (url, data) => request('DELETE', url, data)

module.exports = {
  request: request,
  request_post: request_post,
  request_get: request_get,
  request_put: request_put,
  request_delete: request_delete
}