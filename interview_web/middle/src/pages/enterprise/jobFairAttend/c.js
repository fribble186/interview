import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'
import eAPI from '@/api/enterprise'

class JobFairAttend extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    let response = await eAPI.get_job_fairs()
    this.setState({jobFairsList: response.data})
  }

  async attend(id) {
    await eAPI.attend_job_fair({jf_id: id})
    wx.showToast({title: "参加成功"})
  }

  render() {
    return renderView(this)
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(JobFairAttend)
