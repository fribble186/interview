import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'
import cAPI from '@/api/college'

class JobFairPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
  }

  async onConfrim(values) {
    await cAPI.job_fairs(values)
    wx.navigateTo({
      page: this,
      url: "/college/management/jobFairList"
    })
  }

  render() {
    return renderView(this)
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(JobFairPost)
