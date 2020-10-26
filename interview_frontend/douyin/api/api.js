var config = require('config.js');

var request = require('../utils/request.js');

var domain = config.CONST.domain;

var user_login = data => request.request_post(domain + 'wx_login/', { ...data
}).then(data => data);

var get_tests_no_auth = data => request.request_get(domain + 'tests_no_auth/').then(data => data);

var get_tests = data => request.request_get(domain + 'tests/').then(data => data);

var get_test = t_id => request.request_get(domain + 'tests/', {
  t_id
}).then(data => data);

var problem_box = data => request.request_post(domain + 'problem_box/', data).then(data => data);

var get_problem_box = () => request.request_get(domain + 'problem_box/').then(data => data);

var get_job_fairs = () => request.request_get(domain + 'job_fairs/').then(data => data);

var binding = data => request.request_post(domain + 'binding/', data).then(data => data);

export { user_login, get_tests_no_auth, get_tests, get_test, problem_box, get_problem_box, get_job_fairs, binding };