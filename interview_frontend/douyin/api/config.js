var request = require('../utils/request.js');

var CONST = {
  environment: 'uat',
  domain: 'https://fribble186.cn/api/'
};
if (CONST.environment == 'dev') CONST.domain = 'http://127.0.0.1:8000/api/';
export { CONST };