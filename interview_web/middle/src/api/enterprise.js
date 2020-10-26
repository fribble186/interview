import request from './../common/request'
import Config from './../common/config'

var URL = Config.URL
export default {
  // fund_search(search) {
  //   let url = URL + `middle_register/`
  //   return request.get(url, {search}, false, true).then(data => data)
  // },
  tests(params) {
    let url = URL + `tests/`
    return request.post(url, params).then(data => data)
  },
  get_tests(params) {
    let url = URL + `tests/`
    console.log(params)
    return request.get(url, params).then(data => data)
  },
  get_tests_detail(params) {
    let url = URL + `problem_box/`
    console.log(params)
    return request.get(url, params).then(data => data)
  },
  get_job_fairs() {
    let url = URL + `job_fairs/`
    return request.get(url).then(data => data)
  },
  attend_job_fair(params) {
    let url = URL + `attend_job_fairs/`
    return request.post(url, params).then(data => data)
  },
  get_test_box(params) {
    let url = URL + `test_box/`
    return request.get(url, params).then(data => data)
  },
  test_box(params) {
    let url = URL + `test_box/`
    return request.post(url, params).then(data => data)
  },
}