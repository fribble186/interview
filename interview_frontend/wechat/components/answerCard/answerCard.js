// components/navBar.js
var app = getApp()
Component({
  properties: {
    problem_box_detail: {
      type: Object,
      value: null
    },
  },

  data: {
  },

  ready(){
    console.log(this.data.problem_box_detail)
  },

  methods: {
    go2testBoxDetail:function(e){
      wx.navigateTo({
        url: '../testBoxDetail/testBoxDetail?tb_id='+e.currentTarget.dataset.id,
      })
    },

    // navigateBack:function(){
    //   wx.navigateBack({
    //     fail:()=>wx.reLaunch({url: '../laucher/laucher'})
    //   })
    // }
  }
})
