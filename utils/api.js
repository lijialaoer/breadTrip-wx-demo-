const apiUrl = 'http://api.breadtrip.com';
const wxRequest = (parmas,url) =>{
  wx.request({
    url,
    data:parmas.data || {},
    header:{
      'content-type':'application/json'
    },
    method:parmas.method || 'GET',
    success(res){
      if(parmas.success){
        parmas.success(res);
      }
    },
    fail(res){
      if(parmas.fail){
        parmas.fail(res);
      }else{
        wx.showToast({
          title: '请求出错',
          icon:'none',
        })
      }
    },
    complete(res){
      if(parmas.complete){
        parmas.complete(res);
      }else{
        wx.hideLoading();
      }
    }
  })
};
const getHotTripList = (parmas) =>{
    wxRequest(parmas,`${apiUrl}/v2/index/`);
};
const getTripInfoByID = (params) => {
  wxRequest(params, `${apiUrl}/trips/${params.query.tripId}/waypoints/`);
};
const getUserInfoByID = (params) => {
  wxRequest(params, `${apiUrl}/users/${params.query.userId}/v2`);
};
const getWaypointInfoByID = (params) => {
  wxRequest(params, `${apiUrl}/trips/${params.query.tripId}/waypoints/${params.query.waypointId}/`);
};
const getWaypointReplyByID = (params) => {
  wxRequest(params, `${apiUrl}/trips/${params.query.tripId}/waypoints/${params.query.waypointId}/replies/`);
};

const getExplorePlaceList = (params) => {
  wxRequest(params, `${apiUrl}/destination/v3/`);
};
const getPlaceInfoByID = (params) => {
  wxRequest(params, `${apiUrl}/destination/place/${params.query.type}/${params.query.id}/`);
};
const getPlacePOIByID = (params) => {
  wxRequest(params, `${apiUrl}/destination/place/${params.query.type}/${params.query.id}/pois/${params.query.poiType}/`);
};
const getPlaceTripByID = (params) => {
  wxRequest(params, `${apiUrl}/destination/place/${params.query.type}/${params.query.id}/trips/`);
};


module.exports = {
  getHotTripList,
  getTripInfoByID,
  getUserInfoByID,
  getWaypointInfoByID,
  getWaypointReplyByID,
  getExplorePlaceList,
  getPlaceInfoByID,
  getPlacePOIByID,
  getPlaceTripByID
}