App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  systemInfo:null,
  userInfo:null,
  onLaunch: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.systemInfo = res;
      },
    });
    wx.getUserInfo({
      success(res) {
        that.userInfo = res.userInfo;
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    // wx.showLoading({
    //   title: '正在加载',
    // })
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
