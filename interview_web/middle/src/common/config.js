let Config = {
  URL: 'https://fribble186.cn/api/',
  dev: true,
  env: 'uat', //后台域名 dev | uat
  TIMEOUT: 60000,
  UATVERSION: "1.0.0",
  PRODUCT_ID: "middle",
  PRODUCT_SOURCE: "web",
  REQUEST_LIMIT: 100,
}
var location = window.location
let url = location.href;

//线上
if (url.indexOf('https://fribble186.cn') > -1) {
  Config.dev = false
  Config.env = "uat"
}


if (Config.env === 'dev') {
  Config.URL = 'http://127.0.0.1:8000/api/'
} else {
  Config.URL = 'https://fribble186.cn/api/'
}

Config = {
  ...Config,
}
var html = document.documentElement;
var cliWidth = html.clientWidth;
var cliHeight = html.clientHeight;
if (cliWidth > 750) {
  cliWidth = 750;
}
Config.SYSTEM = {
  SCALE: cliWidth / 750,
  WIDTH: cliWidth,
  HEIGHT: cliHeight
}

console.log('sys-config', Config)
export default Config
