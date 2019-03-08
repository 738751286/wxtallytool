// pages/Detailed/Detailed.js
const db = wx.cloud.database();
var util = require('../../utils/utils.js');  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:'2019',
    month:'02',
    time:'',
    income:0,//月收入
    pay:0,//月支出
    arr:[],
    id:null,
    delBtnWidth:180,
    startX: ""
  },
  aaa() {
    return true;
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
      // console.log(e.touches[0].clientX);
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      // console.log(disX);
      if (disX <= 0) {//如果移动距离小于等于0，说明向右滑动，文本层位置不变
       
        txtStyle = "left: " + Math.abs(disX) + "px";
        if (Math.abs(disX) >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:" + delBtnWidth + "px";
        }
      
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
     
      var index = e.currentTarget.dataset.index;
      var list = this.data.arr;

      // return;
      // console.log(index)
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        arr: list
      });
      // console.log(list[1].txtStyle,list[1])
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      // console.log(endX)
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      if(disX >= 0 ){
        var txtStyle = disX > delBtnWidth * 2 / 3 ? "left:-" + delBtnWidth + "px" : "left:0px";
      }else{
        var txtStyle = Math.abs(disX) > delBtnWidth * 2 / 3 ? "left:" + delBtnWidth + "px" : "left:0px";
      }
     
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.arr;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        arr: list
      });
    }
  },
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      //以宽度750px设计稿做宽度的自适应
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  // 改变日期
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var arr = e.detail.value.split('-');
    // console.log(arr);
    this.setData({
      time: e.detail.value,
      year: arr[0],
      month: arr[1]
    });
    // 传数据库 获取数据
    this.init(this.data.id, this);
  },
  //获取当前时间
  getTime() {
    var time = util.formatTime(new Date());
    var arr = time.split(' ');
    this.setData({
      time:arr[0]
    })
  },
  //编辑
  reMake:function(e){
    var index = e.currentTarget.dataset.index;
    var list = this.data.arr;
    var that = this;

    var p1= new Promise((resolve,reject)=>{
      getApp().globalData.reMakeID = list[index]._id;
      console.log('ID:' + getApp().globalData.reMakeID);
      resolve();
    })
    p1.then((res)=>{
      wx.switchTab({
        url: '../index/index',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径
        success: function () {
          that.init(that.data.id, that)
        },     //成功后的回调；
        fail: function () { },         //失败后的回调；
        complete: function () { },    //结束后的回调(成功，失败都会执行)
      })
    })
   
  },
  //删除
  delItem: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.arr;
    var that = this;
 
    console.log(index);
    wx.showModal({
      title: '提示',
      content: '确定要删除吗?',
      success(res) {
        if (res.confirm) {
          db.collection('Content').doc(list[index]._id).remove()
            .then(wx.showToast({
              title: '删除成功',
              duration: 2000
            })
            ).then(
            that.init(that.data.id, that)
            )
            .catch(console.error)
        } else if (res.cancel) {
        }
      }
    }) 
  },
  //页面加载 数据初始化
  init(id,that){
    db.collection('Content').where({
      _openid: id,
      year:this.data.year,
      month:this.data.month,
      done: false
    })
      .get({
        success(res) {
          var Pay = 0;
          var Income = 0;

         
          res.data.sort((b,a)=>{
            return a.day - b.day ;
          })
          // console.log(res.data);
            //算支出 收入
          if (res.data.length != 0) {
            res.data.forEach((v, i) => {
              if (v.type == 0) {
                Pay = parseInt(v.money) + Pay;
              } else {
                Income = parseInt(v.money) + Income;
              }
            })
            function resultArr(arr) {
              let result = [];
              let result2 = [];
              arr.forEach((v, i) => {
                if (result.indexOf(v.data) < 0) {
                  result.push(v.data);
                  result2.push({
                    data: v.data,
                    weekDay: v.weekDay,
                    day: parseInt(v.day)   
                  });
                }
              })
              return result2;
            }

              that.setData({
                arr: res.data,
                pay: Pay,
                income: Income,
                arrLength: resultArr(res.data)//生成一个数组
              })
          }else{
            that.setData({
              arr: res.data,
              pay: Pay,
              income: Income,
              arrLength: []
            })
          }
        }
      })
  },
  touchMsg(e){
    var index = e.currentTarget.dataset.index;
    var list = this.data.arr;
    var that = this;
    that.alert(list[index].msg)
   
    console.log(list[index].msg)
  },
  alert(str){
    wx.showModal({
      title: '',
      content: str,
      showCancel	:false,
      confirmColor: '#67C23A'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    this.getTime();
    this.initEleWidth();
    var id = getApp().globalData.openid;

    
    this.setData({
      id:id
    });
    this.init(this.data.id, this);
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
    this.init(this.data.id, this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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