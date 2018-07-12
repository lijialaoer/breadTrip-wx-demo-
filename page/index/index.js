// page/index/index.js
const App = getApp();
const api = require('../../utils/api.js');
const formatTime = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
      scrWidth:App.systemInfo.screenWidth,
      scrHeight:App.systemInfo.screenHeight,
      start:0,
      loading:false,
      hasMore:true,
      trip:[]
  },
  // 请求事件
  loadMore(e) {
    const self = this;
    const loading = self.data.loading,hasMore = self.data.hasMore;
    const data = {
      next_start: self.data.start,
    };
    if (loading && !hasMore) {
      return;
    }
    self.setData({
      loading: true,
    });
    api.getHotTripList({
      data,
      success: (res) => {
        let newList = res.data.data.elements;
        newList.map((trip) => {
          const item = trip;
          item.data[0].date_added = formatTime.formatTime(item.data[0].date_added);
          return item;
        });
       
        newList = self.data.trip.concat(newList);
        self.setData({
          trip: newList,
        });
        const nextStart = res.data.data.next_start;
        if(nextStart){
          self.setData({
            start: nextStart,
            loading: false,
          });
        }else{
          self.setData({
            hasMore:false
          })
        }
        
        wx.hideLoading();
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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
  /**其他事件**/
  viewTrip(e){
    var item = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../trip/trip?id=${item.id}&name=${item.name}`,
    })
  }
})