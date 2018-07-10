const App = getApp();
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrWidth: App.systemInfo.screenWidth,
   options:null,
   trip:{}
  },
  // 请求数据
  getTripInfo(){
    var that = this;
    api.getTripInfoByID({
      query:{tripId:that.data.options.id},
      success(res){
        that.setData({
          trip:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     wx.setNavigationBarTitle({
       title: options.name,
     })
     this.setData({
       options
     });
     this.getTripInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    wx.showLoading({
      title: 'loading'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onshow")
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
  /**other event **/
  viewWaypoint(e){
    var waypointId = e.currentTarget.dataset.waypoint,tripId = e.currentTarget.dataset.tripid;
    wx.navigateTo({
      url: `../waypoint/waypoint?waypointId=${waypointId}&tripId=${tripId}`
    })
  },
	gotoUser(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../user/user?id='+id
      })
    }
})