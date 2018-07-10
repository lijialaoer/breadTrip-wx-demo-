// page/user/user.js
const App = getApp();
const api = require("../../utils/api.js");
const formatTime = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrWidth: App.systemInfo.screenWidth,
    scrHeight: App.systemInfo.screenHeight,
    trip:[],
    user_info:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    api.getUserInfoByID({
      query: {userId:options.id},
      success(res){
        res.data.trips.map((trip) =>{
          const item = trip;
          item.date_added = formatTime.formatTime(item.date_added);
          return item;
        })
        that.setData({
          trip:res.data.trips,
          user_info:res.data.user_info
        })
        console.log(that.data.trip)
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
  // 跳转事件
   viewTrip(e) {
    var item = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../trip/trip?id=${item.id}&name=${item.name}`,
    })
  }
})