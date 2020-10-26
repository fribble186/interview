import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'
import {setUser} from "../user/login/actions";
import {SET_USER} from "../user/login/actionTypes";
import config from '@/common/config'


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
  }

  go2login() {
    wx.navigateTo({
      page: this,
      url: "/login"
    })
  }
  go2register() {
    wx.navigateTo({
      page: this,
      url: "/register"
    })
  }
  go2management() {
    if (this.props.user.user_type==="enterprise")
      wx.navigateTo({
        page: this,
        url: "/enterprise/management/testPost"
      })
    else
      wx.navigateTo({
        page: this,
        url: "/college/management/jobFairPost"
      })
  }
  logout() {
    this.props.setUser({type: SET_USER})
    wx.setStorage({
      key: config.env + '_MuserInfo',
      data: {}
    })
  }

  render() {
    return renderView(this)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {setUser})(Home)
