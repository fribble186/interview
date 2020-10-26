import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'
import eAPI from '@/api/enterprise'

class TestBoxDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      testBoxDetail: {
        tb_data: {},
        pb_data: []
      }
    };
  }

  async componentDidMount() {
    this.htmlParam = {};
    this.props.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => this.htmlParam[k] = v);
    let {test_box_id} = this.htmlParam
    this.test_box_id= test_box_id
    let response = await eAPI.get_test_box({tb_id: test_box_id})
    this.setState({testBoxDetail: response.data})
  }

  async onConfirm(values) {
    let request = {
      tb_id:this.test_box_id,
      scores:[]
    }
    for (let key in values) {
      if (key === "bonus") request['bonus'] = values[key]?true:false
      else if (key === "desc") request['desc'] = values[key]
      else request.scores.push({id: key, score: values[key]})
    }
    await eAPI.test_box(request)
    wx.navigateBack({page: this})
  }

  render() {
    return renderView(this)
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(TestBoxDetail)
