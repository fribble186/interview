// pages/testDetail/testDetail.js
var API = require('../../api/api.js');
var TIME_LOCK = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quit_time: 0,
    duration: 0,
    question: {},
    question_num: 0,
    answer: null,
    last: false,

    game: {
      questions: {},
      answers: {}
    },
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '提示',
      content: '确定要开始此次模拟面试吗',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          setInterval(()=>{
            if (TIME_LOCK) return
            let duration = this.data.duration
            duration += 1
            this.setData({duration})
          },1000)
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.navigateBack()
        }
      }
    })
    API.get_test(options.t_id).then(data => this.response2test(data.data))
    this.setData({t_id: options.t_id})
  },

  response2test(test) {
    let raw_questions = test.tests_question
    let questions = []
    let answers = []
    for (let question of raw_questions) {
      questions.push(question)
      answers.push({problem_id: question.id, answer_id: 0, answer: "", type:question.problemType})
    }
    this.start(questions, answers)
  },

  start(questions, answers) {
    let game = {questions, answers}
    this.setData({game})
    console.log(questions[0])
    this.setData({question: questions[0], question_num: 0, question_legth: questions.length})
  },
  nextProblem() {
    if (this.data.answer) {
      let question_num = this.data.question_num
      let game = this.data.game
      if (this.data.question.problemType==="selection") game.answers[question_num].answer_id=this.data.answer
      else game.answers[question_num].answer=this.data.answer
      this.setData({game})
      this.setData({answer: null, question: this.data.game.questions[question_num + 1], question_num: question_num + 1, last: this.data.game.questions.length === question_num + 2})
    }
  },
  lastProblem() {
    let question_num = this.data.question_num
    let answer = this.data.game.answers[question_num - 1].type==="selection" ? this.data.game.answers[question_num - 1].answer_id : this.data.game.answers[question_num - 1].answer
    this.setData({answer, question_num: question_num-1, question: this.data.game.questions[question_num - 1], last:false})
  },
  submit() {
    if (this.data.answer) {
      let question_num = this.data.question_num
      let game = this.data.game
      if (this.data.question.problemType==="selection") game.answers[question_num].answer_id=this.data.answer
      else game.answers[question_num].answer=this.data.answer
      this.setData({game}, ()=>{
        API.problem_box({answers: this.data.game.answers, t_id:this.data.t_id, quit_time:this.data.quit_time, duration:this.data.duration}).then(data => 
          wx.reLaunch({
          url: '../answerList/answerList'
        }))
      })
     
    }
  },

  changeAnswer(e) {
    console.log(e)
    if (e.currentTarget.dataset.type==="selection") {
      this.setData({answer: e.currentTarget.dataset.id})
    } else {
      this.setData({answer: e.detail.value})
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    TIME_LOCK = false
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var quit_time = this.data.quit_time
    quit_time += 1
    TIME_LOCK = true
    this.setData({quit_time})
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})