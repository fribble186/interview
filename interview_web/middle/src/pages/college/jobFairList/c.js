import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'
import cAPI from '@/api/college'

class JobFairList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    let response = await cAPI.get_job_fairs({email: this.props.user.email})
    this.setState({jobFairsList: response.data})
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

export default connect(mapStateToProps, {})(JobFairList)
