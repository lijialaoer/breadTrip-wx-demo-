// page/trip_list/trip_list.js
const app = getApp();
const api = require("../../utils/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeId:"",
    id:"",
    poiType:'all',
    poiIndex:0,
    srcWidth:app.systemInfo.screenWidth,
    srcHeight:app.systemInfo.screenHeight,
    navlist:[{
      id:0,
      value:'all',
      name:'全部'
    },
      {
        id: 1,
        value: 'sights',
        name: '景点'
      },
      {
        id: 2,
        value: 'hotel',
        name: '住宿'
      },
      {
        id: 3,
        value: 'restaurant',
        name: '餐厅'
      },
      {
        id: 4,
        value: 'entertainment',
        name: '休闲娱乐'
      },
      {
        id: 5,
        value: 'mall',
        name: '购物'
      },],
    loading:false,
    hasMore:true,
    tripList:[],
    next_start:0
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // ajax
  getTripList(type,id,poiType){
    var that = this;
   var loading = that.data.loading,hasMore = that.data.hasMore;
   if(loading || !hasMore){
      return;
   }
   that.setData({
     loading:true
   });
   api.getPlacePOIByID({
     query:{type,id,poiType},
     success(res){
       var newList = that.data.tripList.concat(res.data.items), start = res.data.next_start;
        if(start){
          that.setData({
            next_start:start
          })
        }else{
          that.setData({
            hasMore:false
          })
        }
       that.setData({
         tripList:newList,
         loading:false
       });
     }
   })
   
  },
  loadMore(){
    this.getTripList(this.data.typeId, this.data.id, this.data.poiType);
  },
  onLoad: function (options) {
    this.setData({
      typeId:options.type,
      id:options.id
    })
    wx.setNavigationBarTitle({
      title: options.name,
    });
    this.getTripList(options.type, options.id, this.data.poiType);
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
  changeNavdot(e){
    var types = e.currentTarget.dataset.type;
    var poiIndex = e.currentTarget.dataset.id;
    this.setData({
      poiIndex,
      tripList:[],
      poiType:types,
      hasMore:true,
      loading:false
    });
    this.getTripList(this.data.typeId, this.data.id, this.data.poiType);
  }
})