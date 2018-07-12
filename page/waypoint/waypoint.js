// page/waypoint/waypoint.js
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
    itemInfo:null,
      comments:[],
	  recommenders:[],
    commentText:''
  },
  // 请求事件
  getWayPointInfo(waypointId,tripId){
    var that = this;
    api.getWaypointInfoByID({
      query: { waypointId: waypointId, tripId: tripId},
      success(res){
        var keyDate = res.data.poi;
        that.setData({
          itemInfo:res.data
        });
        wx.setNavigationBarTitle({
          title: res.data.trip_name
        });

        if (keyDate){
          keyDate.cover_img = res.data.photo_w640;
          wx.setStorage({
            key: 'poiInfo',
            data: JSON.stringify(keyDate),
          })
        }

        if (that.data.itemInfo.comments > 0 || that.data.itemInfo.recommendations > 0){
          that.getWaypointReplies(tripId,waypointId);
        }
      }
    })
  },

  getWaypointReplies(tripId,waypointId){
    var that = this;
    api.getWaypointReplyByID({
      query:{tripId,waypointId},
      success(res){
        res.data.comments.map(e => {
          e.date_added = formatTime.formatTime(e.date_added, 2);
        });

        that.setData({
            comments:res.data.comments,
            recommenders:res.data.recommenders
        });
        
         
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWayPointInfo(options.waypointId, options.tripId);
    
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
  gotoUser(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../user/user?id=' + id
    })
  },
  preViewImage(e){
    var url = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [url]
    })
  },
  viewBasie(){
    wx.navigateTo({
      url: '../basicInfo/basicInfo',
    })
  },
  //评论事件
  setComment(e){
    var value = e.detail.value;
      this.setData({
        commentText:value
      })
  },
  getComment(e){
    var value = this.data.commentText;
    if(value !==''){
     this.commentMsg();
     this.data.commentText="";
    }else{
      wx.showToast({
        title: '评论不能为空',
        icon:'none'
      })
    }
  },
  commentMsg(){
    var userItem = {}, userMsg = App.userInfo,comments = this.data.comments;
    var date = (new Date()).valueOf();
    userItem.comment = this.data.commentText;
    userItem.user = { name:userMsg.nickName, avatar_l:userMsg.avatarUrl};
    userItem.date_added = formatTime.formatTime(date/1000, 2);
    comments.push(userItem);
   
    this.setData({
      comments
    })
  }
})