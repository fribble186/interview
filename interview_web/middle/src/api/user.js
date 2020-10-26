import request from '../common/request'
import Config from '../common/config'

var URL = Config.URL
export default {
  middle_register(params) {
    console.log(params)
    let url = URL + `middle_register/`
    return request.post(url, params).then(data => data)
  },
  middle_login(params) {
    console.log(params)
    let url = URL + `middle_login/`
    return request.post(url, params).then(data => data)
  },
}