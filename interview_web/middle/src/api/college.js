import request from './../common/request'
import Config from './../common/config'

var URL = Config.URL
export default {
  job_fairs(params) {
    let url = URL + `job_fairs/`
    return request.post(url, params).then(data => data)
  },
  get_job_fairs(params) {
    let url = URL + `job_fairs/`
    return request.get(url, params).then(data => data)
  },
  bat_upload_student(params) {
    let url = URL + `bat_upload_student/`
    return request.post(url, params).then(data => data)
  }
}