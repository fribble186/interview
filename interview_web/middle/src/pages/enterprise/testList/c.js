import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'
import eAPI from '@/api/enterprise'

class TestList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      testsList: []
    };
  }

  async componentDidMount() {
    let response = await eAPI.get_tests({email: this.props.user.email})
    this.setState({testsList: response.data})
  }

  go2test_detail(id) {
    wx.navigateTo({
      page: this,
      url: "/enterprise/management/testDetail?id="+id
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

export default connect(mapStateToProps, {})(TestList)
