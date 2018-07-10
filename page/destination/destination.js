// page/destination/destination.js
const app = getApp();
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   headerInfo:null,
   poiInfo:[],
    scrWidth:app.systemInfo.screenWidth
  },
  // ajax
  getPlaceInfo(type, id){
    var that = this;
    api.getPlaceInfoByID({
      query:{type,id},
      success(res){
        that.setData({
          headerInfo:res.data
        });
      },
      complete(res){
        that.getPoiInfo(type, id, 'all');
      }
    })
  },
  getPoiInfo(type,id,poiType){
    var that = this;
    api.getPlacePOIByID({
      query:{type,id,poiType},
      success(res){
        that.setData({
          poiInfo:res.data.items
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: options.name
    })
    wx.showLoading({
      title: 'loading'
    })
    that.getPlaceInfo(options.type,options.id);
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
  viewPOIList(e){
    wx.navigateTo({
      url: '../trip_list/trip_list?name=' + this.data.headerInfo.name + '&id=' + this.data.headerInfo.id + '&type=' + this.data.headerInfo.type
    })
  },
  viewTripList(e){
    wx.navigateTo({
      url: '../poi_list/poi_list?name=' + this.data.headerInfo.name + '&id=' + this.data.headerInfo.id + '&type=' + this.data.headerInfo.type
    })
  }
})