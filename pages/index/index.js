//index.js
//获取应用实例
var coushu = []
var total = 0
var pp=[]
var app = getApp()
Page({
  data: {
    sum: 0,
    array: [],
    num: 0,
    perfect:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //change sum
  changeSum: function(e) {
    var value = e.detail.value
    if (value == "") {
      value = 0;
    }
    this.setData({
      sum: value
    })
    total = value
  },
  //on input
  onInput: function(e) {
    // var value = e.detail.value
    // if(value==""){
    //   value = 0;
    // }
    this.setData({
      num: e.detail.value
    })
  },
  //add number
  addNumber: function(e) {
    if (this.data.num == null || this.data.num == "") {
      this.setData({
        num: 0
      })
    }
    this.data.array.push(this.data.num)
    this.setData({
      array: this.data.array
    })
  },
  //delete last number
  deleteNumber: function(e) {
    if (this.data.array.length > 0) {
      this.data.array.pop()
      this.setData({
        array: this.data.array
      })
    }
  },
  //clear number
  clearNumber: function(e) {
    this.setData({
      array: [],
      num: 0
    })
  },
  //coushu
  coushu: function() {
    var arr = this.data.array;
    var k = arr.length;
    for (var i = 1; i < k + 1; i++) {
      var re = [];
      zuhe(k, i, arr, re);
    }
    console.log("total="+total)
    console.log("coushu:"+coushu)
    this.setData({
      perfect:pp
    })
  }
})

function zuhe(n, m, a, re) {
  // System.out.println("从" + n + "个数中取" + m);
  var i;
  for (i = n - 1; i >= m - 1; i--) {
    re.unshift(a[i]); /* m个数组合的最后一个数可以选择m ... n之间的任意一个 */
    if (m > 1) {
      zuhe(n - 1, m - 1, a, re);
      n--;
    } /* 从i-1个数中选取m-1个数的组合 */
    else {
      var sum = 0;
      for (var j = 0; j < re.length; j++) {
        console.log("re:"+re);
        sum = parseFloat(sum) + parseFloat(re[j]);
      }
      console.log("sum="+sum)
      //				System.out.println("sum=" + sum);
      //				System.out.println("需要凑的额度=" + (total - sum));
      if (total >= sum) {
        coushu.push(total - sum);
      }
      if (total == sum) {
        console.log("找到一个完美方案：");
        console.log(re);
        pp = re;
      }
    }
  }
}