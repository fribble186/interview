import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'
import eAPI from '@/api/enterprise'

class TestDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      testsDetail: {basic:{}}
    };
  }

  async componentDidMount() {
    this.htmlParam = {};
    this.props.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => this.htmlParam[k] = v);
    let {id} = this.htmlParam
    let response = await eAPI.get_tests_detail({tests_id: id})
    this.setState({testsDetail: response.data})
  }

  go2test_box_detail(test_box_id) {
    wx.navigateTo({
      page: this,
      url: "/enterprise/management/testBoxDetail?test_box_id="+test_box_id
    })
    
  }

  render() {
    return renderView(this)
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(TestDetail)
