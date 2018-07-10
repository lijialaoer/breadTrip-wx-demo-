// page/explore/explore.js
const App = getApp();
const api = require("../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      explore:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    api.getExplorePlaceList({
      success(res){
        that.setData({
          explore:res.data.elements
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: 'loading'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  
  },
  // other event
  viewPoi(e){
    var item = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../destination/destination?id='+item.id + '&name=' + item.name + '&type=' + item.type
    })
  }

})