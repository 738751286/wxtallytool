//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // this.Promise = ;
    this.getInfo(this);
    // this.globalData = {}
  },
  // Promise:null,
  getInfo(thisObj) {
    var that = thisObj;
    // var promise = new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wx249f76662043a795',
              secret: 'e645497b663b05561f3053dbe81d7353',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (res) {
              // console.info("openId：" + res.data.openid);
              that.globalData.openid = res.data.openid
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    })
    // })
    // return promise;
  },
  globalData: {
    openid: null,
    reMakeID:null,
    logged: false,
  }
})
