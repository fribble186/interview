// components/navBar.js
var app = getApp();
Component({
  properties: {
    testDetail: {
      type: Object,
      value: null
    }
  },
  data: {},

  ready() {
    console.log(this.data);
  },

  methods: {
    go2detail: function (e) {
      console.log("go2detail", e);

      if (app.globalData.userInfo.token === "") {
        app.showLoginToast();
        return;
      }

      tt.navigateTo({
        url: '/pages/testDetail/testDetail?t_id=' + e.currentTarget.dataset.id
      });
    } // navigateBack:function(){
    //   wx.navigateBack({
    //     fail:()=>wx.reLaunch({url: '../laucher/laucher'})
    //   })
    // }

  }
});