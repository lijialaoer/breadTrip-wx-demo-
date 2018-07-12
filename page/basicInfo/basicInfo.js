// page/basicInfo/basicInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poiInfo:null,
    scrWidth:app.systemInfo.screenWidth,
    scrHeight: app.systemInfo.screenHeight,
    maskers:[],
    mapFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =  this;
    wx.getStorage({
      key: 'poiInfo',
      success: function(res) {
        that.setData({
          poiInfo: JSON.parse(res.data)
        })
      },
      complete(res){
        var title = that.data.poiInfo.name || that.data.poiInfo.spot_region;
        var location = that.data.poiInfo.location;
        if(title){
          wx.setNavigationBarTitle({
            title
          })
        };
        if(location){
          that.setData({
            maskers: [{ id: 0, latitude: location.lat, longitude: location.lng, label:{content: title}}],
          })
        };
        if(title && location){
          that.setData({
            mapFlag:true
          })
        }
      }
    })
    
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
  markerstap(e){
    console.log(e)
  },
  call(e){
    var tepNum = e.currentTarget.dataset.tep;
    wx.makePhoneCall({
      phoneNumber: tepNum,
    })
  },
  website(e){
    var url = e.currentTarget.dataset.website;
    wx.navigateTo({
      url: '../website/website?url='+url
    })
  }
})