//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    sum:0,
    array:[],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //change sum
  changeSum: function(e){
    var value = e.detail.value
    this.setData({sum:value})
  },
  //on input
  onInput: function(e){
    this.setData({
     num:e.detail.value
    })
  },
  //add number
  addNumber: function(e){
    this.data.array.push(this.data.num)
    this.setData({
      array:this.data.array
    })
  }
})
