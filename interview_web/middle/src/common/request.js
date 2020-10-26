import wx from './wx'
import Config from "./config";
import store from '@/Store'

var CODE = {
  SUCCESS: 200,
  SUCCESS2: 0,
  AUTHENTICATION_FAILED: 401,
  MEMBER_FAILED: 403
}

function request(method, url, data, third, noToken, noToast) {
  return new Promise((resolve, reject) => {
    return requestAction(method, url, data, third, noToken, noToast).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

function requestAction(method, url, data, third, noToken, noToast) {
  var option = {
    url,
    method,
    data
  }
  try {
    let user = store.getState().user
    var token = user.token
    var type = user.user_type
  } catch (e) {
    var token = null
  }
  var header = {
    'content-type': 'application/json', // 默认值,
    'AUTH': 'Token ' + token,
    "USERTYPE": type,
  }
  if (noToken) delete header.Authorization
  if (!token) delete  header.Authorization
  option.header = header

  return new Promise(function (resolve, reject) {
    return Promise.race([
      wx.request({
        url: option.url || '',
        method: option.method || 'GET',
        data: option.data,
        header: option.header
      }),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject({errMsg: 'request:fail timeout'}), Config.TIMEOUT)
      })])
      .then((res) => {
        console.log('请求成功', option.url, res)
        if (res.detail && res.detail.indexOf("认证失败") > -1) {
          wx.showToast({
            title: "用户认证失败，请重新登陆",
            duration: 3
          })
        }
        resolve(res)
      })
      .catch(res => {
        console.log('请求失败', url, res)
        reject(res)
      })
  })
}

function configRequest(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: "GET"
    }).then((data) => {
      console.log('config:', url, data)
      resolve(data)
    })
  }).then(data => {
    return data
  })
}

function put(url, data, third, noToast) {
  return request('PUT', url, data, third, noToast)
}

function post(url, data, third, token, noToast) {
  return request('POST', url, data, third, token, noToast)
}

function get(url, data, third, noToken, noToast) {
  return request('GET', url, data, third, noToken, noToast)
}

function timeOverRequest(duration, request) {
  // console.log('timeOverRequest start')
  // console.time('timeOverRequest')
  return new Promise(((resolve, reject) => {
    var done = false
    setTimeout(() => {
      if (!done) {
        // console.timeEnd('timeOverRequest')
        // console.log('timeOverRequest 超时,catch err')
        done = true
        reject('time over')
      }
    }, duration)
    request().then(data => {
      if (!done) {
        // console.timeEnd('timeOverRequest')
        // console.log('timeOverRequest request success')
        done = true
        resolve(data)
      }
    }).catch(err => {
      if (!done) {
        // console.timeEnd('timeOverRequest')
        // console.log('timeOverRequest request fail')
        done = true
        reject(err)
      }
    })
  }))
}

const Request = {
  request: request,
  config: configRequest,
  post: post,
  get: get,
  put: put,
  timeOverRequest: timeOverRequest,
  CODE: CODE
}
export default Request