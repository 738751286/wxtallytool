//index.js
const app = getApp();
const db = wx.cloud.database();
var util = require('../../utils/utils.js');  

Page({
  data: {
   isActive:0,
   isChoose:'',
  //  id:'oML4c5LFQzYG0yI79GJGzxjxYAn0 ',
    time: '2016-09-01',
    msg:'',
    money:'',
    icons: [
      [
        {
          icon: '../../images/work1.png', 
          icon2:'../../images/work.png',
          title: "办公" },
        {
          icon: '../../images/lottery1.png',
          icon2: '../../images/lottery.png',
          title: "彩票"},
        {
          icon: '../../images/canyin1.png',
          icon2: '../../images/canyin.png',
          title: "餐饮"},
        {
          icon: '../../images/cw1.png',
          icon2: '../../images/cw.png',
          title: "宠物"},
        {
          icon: '../../images/cx1.png',
          icon2: '../../images/cx.png',
          title: "出行"},
        {
          icon: '../../images/dj1.png',
          icon2: '../../images/dj.png',
          title: "度假"},
        {
          icon: '../../images/fushi1.png',
          icon2: '../../images/fushi.png',
          title: "服饰"},
        {
          icon: '../../images/gouwu1.png',
          icon2: '../../images/gouwu.png',
          title: "购物"}
      ],
      [
        {
          icon: '../../images/haizi1.png',
          icon2: '../../images/haizi.png',
          title: "孩子"},
        {
          icon: '../../images/jiaju1.png',
          icon2: '../../images/jiaju.png',
          title: "家居"},
        {
          icon: '../../images/juanzeng1.png',
          icon2: '../../images/juanzeng.png',
          title: "捐赠"},
        {
          icon: '../../images/lijin1.png',
          icon2: '../../images/lijin.png',
          title: "礼金"},
        {
          icon: '../../images/liwu1.png',
          icon2: '../../images/liwu.png',
          title: "礼物"},
        {
          icon: '../../images/linshi1.png',
          icon2: '../../images/linshi.png',
          title: "零食"},
        {
          icon: '../../images/meirong1.png',
          icon2: '../../images/meirong.png',
          title: "美容"},
        {
          icon: '../../images/qipai1.png',
          icon2: '../../images/qipai.png',
          title: "棋牌"}
      ],
      [
        {
          icon: '../../images/shejiao1.png',
          icon2: '../../images/shejiao.png',
          title: "社交"},
        {
          icon: '../../images/shuji1.png',
          icon2: '../../images/shuji.png',
          title: "书籍"},
        {
          icon: '../../images/tongxun1.png',
          icon2: '../../images/tongxun.png',
          title: "通讯" },
        {
          icon: '../../images/weixiu1.png',
          icon2: '../../images/weixiu.png',
          title: "维修"},
        {
          icon: '../../images/xiaofei1.png',
          icon2: '../../images/xiaofei.png',
          title: "消费"},
        {
          icon: '../../images/xuexi1.png',
          icon2: '../../images/xuexi.png',
          title: "学习"
        },
        {
          icon: '../../images/yiliao1.png',
          icon2: '../../images/yiliao.png',
          title: "医疗"
        },
        {
          icon: '../../images/yule1.png',
          icon2: '../../images/yule.png',
          title: "娱乐"
        }
      ],
      [
        {
          icon: '../../images/yundong1.png',
          icon2: '../../images/yundong.png',
          title: "运动"},
        {
          icon: '../../images/zhangbei1.png',
          icon2: '../../images/zhangbei.png',
          title: "长辈"},
        {
          icon: '../../images/zhufang1.png',
          icon2: '../../images/zhufang.png',
          title: "住房"},
        {
          icon: '../../images/qita1.png',
          icon2: '../../images/qita.png',
          title: "其他"
        }]],
    icons2: [
      [
        {
          icon: '../../images/gongzi1.png',
          icon2: '../../images/gongzi.png',
          title: "工资"
        },
        {
          icon: '../../images/jianzhi1.png',
          icon2: '../../images/jianzhi.png',
          title: "兼职"
        },
        {
          icon: '../../images/lottery1.png',
          icon2: '../../images/lottery.png',
          title: "彩票"
        },
        {
          icon: '../../images/zujin1.png',
          icon2: '../../images/zujin.png',
          title: "租金"
        },
        {
          icon: '../../images/licai1.png',
          icon2: '../../images/licai.png',
          title: "理财"
        },
        {
          icon: '../../images/qipai1.png',
          icon2: '../../images/qipai.png',
          title: "棋牌"
        },
        {
          icon: '../../images/lijin1.png',
          icon2: '../../images/lijin.png',
          title: "礼金"
        },
        {
          icon: '../../images/fenhong1.png',
          icon2: '../../images/fenhong.png',
          title: "分红"
        }
      ], [
        {
          icon: '../../images/honbao1.png',
          icon2: '../../images/honbao.png',
          title: "红包"
        },
        {
          icon: '../../images/qita1.png',
          icon2: '../../images/qita.png',
          title: "其他"
        }]]
  },
  inputChange(ev) {
    // 输入金额改变
    // console.log(ev.detail.value)
    this.setData({
      money: ev.detail.value
    })
  },
  btn2Change(ev){
    //输入备注改变
    // console.log(ev.detail.value)
    this.setData({
      msg: ev.detail.value
    })
  },
  //获取当前时间与星期几
  getTime(){
    var time = util.formatTime(new Date());
    // var week = new Date().getDay();
    var arr = time.split(' ');
    // var weekDay = '星期' + '日一二三四五六'.charAt(week);
    return {time:arr[0]};
  },
  //通过日期获取 星期几
  getWeekDay(dateString){
    var date;
    var dateArray = dateString.split("-");
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    return "星期" + "日一二三四五六".charAt(date.getDay());
  },
  add(){
    //记账类型
    if (this.data.isChoose.trim()==''){
      wx.showToast({
        title: '请选择记账类型',
        icon:'none',
        duration: 2000
      })
      return
    }
    //支付金额
    if (this.data.money.trim() == '' || this.data.money.trim()==0){
      wx.showToast({
        title: '金额不能为0',
        icon: 'none',
        duration: 2000
      })
      return
    }
    //icon+title 的位置
    var arr=this.data.isChoose.split('');
    var i=parseInt(arr[0]);
    var j=parseInt(arr[1]);
    var iconPath;
    var title;
    var json = this.getTime();//日期 与 星期 ---用于复原
    var weekDay = this.getWeekDay(this.data.time);
    if (this.data.isActive == 0){
        //支出 0
      // console.log(this.data.icons[i][j].icon, this.data.icons[i][j].title)
      iconPath = this.data.icons[i][j].icon;
      title = this.data.icons[i][j].title;
    }else{
        //收入 1
      iconPath = this.data.icons2[i][j].icon;
      title = this.data.icons2[i][j].title;
    }
    var arr2 = this.data.time.split('-');
    var reID = getApp().globalData.reMakeID;
    var that = this;
    if (reID != null) {
      db.collection('Content').doc(reID).update({
        data: {
            type: this.data.isActive,//支出、收入
            iconPath: iconPath,//icon 路径
            title: title,//类型
            msg: this.data.msg,//备注
            money: this.data.money,
            weekDay: weekDay,
            data: this.data.time,
            month: arr2[1],
            year: arr2[0],
            day: arr2[2],
            isChoose: this.data.isChoose,
            location: new db.Geo.Point(113, 23),
            done: false
        }
      }).then((res)=>{
        console.log(res,'ok');
        getApp().globalData.reMakeID = null;
        wx.showToast({
          title: '修改成功',
          duration: 2000
        });
        this.setData({
          isChoose: '',
          money: '',
          msg: '',
          time: json.time
        })
      })
      return;
    }


    db.collection('Content').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        type: this.data.isActive,//支出、收入
        iconPath: iconPath,//icon 路径
        title: title,//类型
        msg:this.data.msg,//备注
        money:this.data.money,
        weekDay: weekDay,
        data:this.data.time,
        month: arr2[1],
        year: arr2[0],
        day:arr2[2],
        isChoose: this.data.isChoose,
        location: new db.Geo.Point(113, 23),
        done: false
      }
    })
      .then(res => {
        wx.showToast({
          title: '成功',
          duration: 2000
        });
        this.setData({
          isChoose:'',
          money:'',
          msg:'',
          time: json.time
        })
      })
  },
  changeList(ev){
    // 获取点击的支出类别
    // console.log(ev.target.dataset.info,ev);
    var i = ev.target.dataset.index;
    var j = ev.target.dataset.index2;
    var s = i + '' + j;
      this.setData({
      isChoose:s
    })
    // console.log(s, this.data.isChoose)
  },
  bindDateChange(ev) {
    //修改日期
    console.log('picker发送选择改变，携带值为', ev.detail.value)
    this.setData({
      time: ev.detail.value
    })
  },

  onLoad: function() {
    var json = this.getTime();//日期 与 星期
    this.setData({
      time:json.time
    })
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  changeBtn(ev) {
    // console.log(ev.currentTarget.dataset.index)
    this.setData({
      isActive: ev.currentTarget.dataset.index
    })
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  //  console.log(getApp().globalData.reMakeID)
    var reID = getApp().globalData.reMakeID;
    var that=this;
    if (reID != null){
      db.collection('Content').where({
        _id: reID,
        done: false
      }).get({
        success:function(res){
          console.log(res.data)
          that.setData({
            msg:res.data[0].msg,
            money: res.data[0].money,
            time: res.data[0].data,
            isActive: res.data[0].type,
            // isChoose: res.data[0].isChoose
            // isChoose: '01'
          })
          //isChoose 显示问题 ，swiper页面显示问题
        }
      })
    }
  },
})
