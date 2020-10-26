import React from 'react'
import './view.scss'
import renderView from './view'
import {connect} from 'react-redux'
import wx from '@/common/wx'
import eAPI from '@/api/enterprise'

class TestPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
  }

  async onConfirm(values) {
    console.log("onconfirm", values)
    let {name, jobDescribe, desc, bonus, selection, answer} = values
    let params = {name, jobDescribe, desc, bonus}
    let problems = []
    let obj = {}
    if (!selection || !answer) {
      wx.showToast({
        title: '请至少每个类目添加一道题目'
      })
      return
    }
    for (let item of selection) {
      let {A,B,C,D,AS,BS,CS,DS,question} = item
      let max = AS
      for (let s of [AS,BS,CS,DS]) {
        if (s > max) max = s
      }
      obj = {
        contents: question,
        type: "selection",
        score: max,
        selection: [
          {
            sequence: 0,
            contents: A,
            score: AS
          },
          {
            sequence: 1,
            contents: B,
            score: BS
          },
          {
            sequence: 2,
            contents: C,
            score: CS
          },
          {
            sequence: 3,
            contents: D,
            score: DS
          }
        ]
      }
      problems.push(obj)
    }
    for (let item of answer) {
      let {question, questionS} = item
      obj = {
        contents: question,
        type: "answer",
        score: questionS,
      }
      problems.push(obj)
    }
    params["problems"] = problems
    await eAPI.tests(params)
    wx.navigateTo({
      page: this,
      url: "/enterprise/management/testList"
    })
  }

  render() {
    return renderView(this)
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(TestPost)
