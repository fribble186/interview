import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
  }

  render() {
    return renderView(this)
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(Home)
