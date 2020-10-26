import {message} from 'antd';
import React from 'react';

function showLoading(content) {
  var title
  if (typeof content === 'string') title = content
  else title = content.title
  message.loading(title, 0);
}

function showToast(content) {
  var title = content.title
  var duration = content.duration || 1
  message.info(title, duration);
}

function hideLoading() {
  message.destroy()
}

function getStorage(key) {
  var data = window.localStorage.getItem(key)
  data = JSON.parse(data)
  return data
}

function setStorage(dict) {
  var {key, data} = dict
  data = JSON.stringify(data)
  window.localStorage.setItem(key, data)
}

function clearStorage() {
  window.localStorage.clear()
}

function relaunchTo(options) {
  var {page, url, query} = options
  if (query) {
    page.props.history.replace({pathname: url})
  } else {
  }
  page.props.history.replace(url)

}

function navigateTo(options) {
  var {page, url, query} = options
  // /pages/details/stock-info/stock-info?stockcode=002515
  var _url = url
  var param = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => param[k] = v);
  console.log(url)
  if (query) {
    page.props.history.push({pathname: _url, query})
  } else {
    page.props.history.push(_url)
  }
}

function navigateBack(options) {
  var {page} = options
  page.props.history.goBack()
}

function navigateGoTo(options) {
  var {page, num} = options
  page.props.history.go(num)
}

function pageScrollTo(options) {
  var {scrollTop} = options
  document.documentElement.scrollTop = scrollTop;
}

function request(option) {
  console.log('request', option)
  return new Promise(((resolve, reject) => {
    let url = option.url
    let body
    if (option.method === 'GET') {
      if (JSON.stringify(option.data) != JSON.stringify({})) {
        url += '?'
        for (let key in option.data) {
          url += key + '=' + option.data[key] + '&'
        }
        if (url) {
          let lastIndex = url.lastIndexOf('&')
          url = url.slice(0, lastIndex)
        }
      }
      body = null
    } else {
      body = JSON.stringify(option.data || {})
    }
    var header = {
      'content-type': 'application/json', // 默认值,
    }
    option.header = option.header || header
    window.fetch(url || '', {
      body: body,
      method: option.method || 'GET',
      headers: option.header
    }).then(function (res) {
      try {
        return res.json()
      } catch (e) {
        reject(e)
      }
    }).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  }))
}

export default {
  showLoading,
  showToast,
  hideLoading,
  getStorage,
  setStorage,
  clearStorage,
  relaunchTo,
  navigateTo,
  navigateBack,
  navigateGoTo,
  pageScrollTo,
  request
};