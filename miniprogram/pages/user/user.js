// pages/user/user.js
const db = wx.cloud.database();
var wxCharts = require("../../utils/wxcharts.js");
var lineChart = null;
var windowW = 0;
Page({
  data: {
    payForm: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    yearForm: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    incomeForm: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    date: '2019',//年份
    pay:55,//总支出
    avegPay:'66',//平均支出
    income:55,//总收入
    avegIncome:'55',//平均收入
    arr:[],
    id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var id = getApp().globalData.openid;
    // console.log(id);
    this.init(id, this);
    this.setData({
      id:id
    })
  },
  init(id, that) {
    db.collection('Content').where({
      _openid: id,
      year: this.data.date,
      done: false
    })
      .get({
        success(res) {
          var Pay = 0;
          var avegPay = 0;
          var avegIncome = 0;
          var Income = 0;
          var PayForm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var IncomeForm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var arr = [];
          var arr2=[]; //存 重复的下标；
          // console.log(res.data);
          if (res.data.length != 0){
            //算支出 收入
            res.data.forEach((v, i) => {
              if (v.type == 0) {
                //支出
                Pay = parseInt(v.money) + Pay;
                PayForm.splice(parseInt(v.month), 1, parseInt(v.money));
                arr.push({
                  month: parseInt(v.month),
                  pay: -parseInt(v.money),
                  income: 0,
                })
              } else {
                //收入
                Income = parseInt(v.money) + Income;
                IncomeForm.splice(parseInt(v.month), 1, parseInt(v.money));
                arr.push({
                  month: parseInt(v.month),
                  pay: 0,
                  income: parseInt(v.money),
                })
              }
            })
            arr.sort((a, b) => {
              return a.month - b.month
            })
            // console.log(arr);
            // return;
            
            arr.forEach(function (v, i) {
              if (i + 1 < arr.length) {// 2  3 
                if (arr[i].month == arr[i + 1].month) {
                  // console.log(arr[i].month, arr[i + 1].month);
                  arr[i + 1].pay = parseInt(arr[i + 1].pay) + parseInt(arr[i].pay);
                  arr[i + 1].income = parseInt(arr[i + 1].income) + parseInt(arr[i].income);
                  // arr.splice(i,1)
                  arr2.push(i)

                  // console.log(arr)
                }
              }
            })

          }
          
          arr2.sort((a, b) => {
            return b - a
          })
          console.log(arr2)
          arr2.forEach((v,i)=>{
            arr.splice(v,1)
          })
          console.log(arr);
          that.setData({
            arr: res.data,
            pay: Pay,
            income: Income,
            avegPay: Math.round(Pay / 12),
            avegIncome: Math.round(Income/12),
            payForm: PayForm,
            incomeForm: IncomeForm,
            arr:arr
          })
          that.init2();
        }
      })
  },
  init2(){
    lineChart = new wxCharts({
      canvasId: 'lineCanvas', type: 'line',
      categories: this.data.yearForm,
      series: [{ name: '支出', data: this.data.payForm, format: function (val, name) { return val.toFixed(1); } },
      { name: '收入', data: this.data.incomeForm, format: function (val, name) { return val.toFixed(1); } }],
      xAxis: {   //是否隐藏x轴分割线
        disableGrid: true,
      },
      dataLabel: false,  //是否在图表上直接显示数据
      dataPointShape: true,//是否在图标上显示数据点标志
      width: 375, height: 200,
      extra: {
        lineStyle: 'curve'  //曲线
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

 
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    // this.getInfo(this);
    // this.init2();
    this.init(this.data.id, this);
  },
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
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