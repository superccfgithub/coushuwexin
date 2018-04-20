//index.js
//获取应用实例
var cha = [];
var total = 0;
var pp = [];
var app = getApp();

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

// 引入配置
var config = require('../../config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

Page({
  data: {
    sum: null,
    array: [],
    num: null,
    perfect: [],
    tried: false,
    addInputFocus: false,
    loginUrl: config.service.loginUrl,
    requestUrl: config.service.requestUrl,
    tunnelUrl: config.service.tunnelUrl,
    tunnelStatus: 'closed',
    tunnelStatusText: {
      closed: '已关闭',
      connecting: '正在连接...',
      connected: '已连接'
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //change sum
  changeSum: function (e) {
    var value = e.detail.value
    // if (value == "") {
    //   value = 0;
    // }
    if (value) {
      this.setData({
        sum: value
      })
      total = parseFloat(value)
    }

  },
  onBlur: function (e) {
    var value = e.detail.value
    if (value != null) {

    }
    // if (e.target.id == "sum") {
    //   this.setData({
    //     num: null
    //   })
    // }
  },
  //on input
  onInput: function (e) {
    var value = e.detail.value
    // if(value==""){
    //   value = 0;
    // }
    if (value == "") {
      value = null
    }
    this.setData({
      num: value
    })
  },
  //add number
  addNumber: function (e) {
    // if (this.data.num == null || this.data.num == "") {
    //   this.setData({
    //     num: 0
    //   })
    // }
    // if (this.data.mum == null) {
    //   return
    // }
    if (this.data.array.length >= 15) {
      wx.showToast({
        title: '不能超过15个数',
        icon: 'warn',
        duration: 1000
      })
    } else {
      this.data.array.push(parseFloat(this.data.num))
    }
    this.setData({
      array: this.data.array,
      addInputFocus: true,
      num: null
    })
  },
  //delete last number
  deleteNumber: function (e) {
    if (this.data.array.length > 0) {
      this.data.array.pop()
      this.setData({
        array: this.data.array,
        num: null
      })
    }
  },
  //clear number
  clearNumber: function (e) {
    total = null
    pp = []
    cha = []
    this.setData({
      array: [],
      sum: null,
      num: null,
      perfect: [],
      tried: false,
      cha: []
    })
  },
  //coushu
  coushu: function () {
    // wx.showLoading({
    //   title: '计算中...',
    //   mask: true
    // })
    total = parseFloat(this.data.sum)
    pp = []
    cha = []
    var arr = this.data.array;
    var k = arr.length;
    for (var i = 1; i < k + 1; i++) {
      var re = new Array();
      zuhe(k, i, arr, re);
    }
    console.log("total=" + total)
    console.log("coushu:" + cha)
    this.setData({
      perfect: pp,
      tried: true,
      cha: cha
    })
    resetInput()
    // wx.hideLoading()
  },
  resetInput: function () {
    this.setData({
      array: [],
      sum: null,
      num: num
    })
  },
  /**
     * 点击「请求」按钮，测试带会话请求的功能
     */
  doRequest() {
    // showBusy('正在请求');
    console.log(config.service.loginUrl);
    qcloud.setLoginUrl(config.service.loginUrl);
    // qcloud.request() 方法和 wx.request() 方法使用是一致的，不过如果用户已经登录的情况下，会把用户的会话信息带给服务器，服务器可以跟踪用户
    qcloud.request({
      // 要请求的地址
      url: this.data.requestUrl,

      // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
      login: true,

      success(result) {
        showSuccess('请求成功完成');
        console.log('request success', result);
      },

      fail(error) {
        showModel('请求失败', error);
        console.log('request fail', error);
      },

      complete() {
        console.log('request complete');
      }
    });
  },
})

function zuhe(n, m, a, re) {
  // System.out.println("从" + n + "个数中取" + m);
  var i;
  for (i = n - 1; i >= m - 1; i--) {
    re[m - 1] = a[i];; /* m个数组合的最后一个数可以选择m ... n之间的任意一个 */
    if (m > 1) {
      zuhe(n - 1, m - 1, a, re);
      n--;
    } /* 从i-1个数中选取m-1个数的组合 */
    else {
      var sum = 0;
      for (var j = 0; j < re.length; j++) {
        console.log("re:" + re);
        sum = parseFloat(sum) + parseFloat(re[j]);
      }
      console.log("sum=" + sum)
      if (total > sum) {
        cha.push(total - sum);
      }
      if (total == sum) {
        console.log("找到一个完美方案：");
        console.log("re:" + re);
        // pp[ppl]=re;

        pp.push(re.slice(0))
        // console.log("ppl="+ppl+" pp[ppl]="+pp[ppl]);
        console.log("pp:" + pp);
        // ppl++;
      }
    }
  }
}