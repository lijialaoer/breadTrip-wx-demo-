// page/poi_list/poi_list.js
const app = getApp();
const api = require("../../utils/api.js");
const formatTime = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */

  data: {
    scrWidth: app.systemInfo.screenWidth,
    scrHeight: app.systemInfo.screenHeight,
    loading:false,
    hasMore:true,
    poiList:[],
    start:0,
    typeId:'',
    id:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  // ajax
  getpoiList(type,id){
    var that = this;
    var loading=that.data.loading,hasMore=that.data.hasMore;
    if(loading || !hasMore){
      return;
    };
    that.setData({
      loading:true
    });
    api.getPlaceTripByID({
      query:{start:that.data.start,type,id},
      success(res){
        var newList = res.data.items,start=res.data.next_start;
        newList.map(e =>{
          e.date_added = formatTime.formatTime(e.date_added);
        });
        var poiList = that.data.poiList.concat(newList);
        if(start){
          that.setData({
            start
          })
        }else{
          that.setData({
            hasMore: false
          })
        }
        that.setData({
          poiList,
          loading: false
        })
      }
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    });
    this.setData({
      typeId:options.type,
      id:options.id
    })
    this.getpoiList(options.type,options.id);
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
  loadMore(e){
    this.getpoiList(this.data.typeId,this.data.id);
  },
  viewTrip(e) {
    var item = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../trip/trip?id=${item.id}&name=${item.name}`,
    })
  }
})