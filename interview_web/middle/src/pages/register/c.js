import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'
import userAPI from '@/api/user'

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      accountType: 'enterprise'  // college
    };
  }

  async componentDidMount() {
    
  }

  changeSwitch(tag) {
    this.setState({accountType: tag})
  }

  async onConfirm(type, values) {
    console.log(type, values)
    let params = values
    params['manager_type'] = type
    let response = await userAPI.middle_register(params)
    let result = response.result
    if (result.indexOf('wrong') > -1) 
      wx.showToast({
        title: '已有重复的邮箱注册',
        duration: 3
      })
    else {
      wx.showToast({
        title: '注册成功，请等待审核通过',
        duration: 3
      })
      wx.navigateBack({page:this})
    }
  }

  render() {
    return renderView(this)
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(Home)
