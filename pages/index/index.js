//index.js
const APP_ID = "28591";
const APP_KEY = "75a0f34454064097bb728f431c2e5195";
const APP_URL = "http://route.showapi.com/255-1";
// type=10 图片 
// type=29 段子 
// type=31 声音 
// type=41 视频
// 846e2f112e6e428ca7ac8eb42ce13e42
//  27530 

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    now:0,
    arr:[
      {
        "name":"图片",
        "page":1,
         "typeId":10
      },
      {
        "name":"段子",
        "page":1,
        "typeId":29
      },
      {
        "name":"视频",
        "page":1,
        "typeId":41
      },
    ],
    imgList: [],
    vidwoList: [],
   pargramList: []
  
  },
  
  onLoad: function () {    
      var count=1;    
         
      //请求图片数据
      this.getData(10, count, 'imgList');
    
      this.getData(41,count,'vidwoList');
 
      this.getData(29,count,'pargramList');


  },
  getData(typeId, page, dist ){
     var that = this;
    wx.request({
        url: APP_URL,
        data: {
          type: typeId,
          page: page,
          showapi_appid: APP_ID,
          showapi_sign: APP_KEY
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
         console.log(res.data.showapi_res_body.pagebean);
         that.data[dist].push(...res.data.showapi_res_body.pagebean.contentlist)
          that.setData({
            [dist]: that.data[dist]
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
  changeNav(e){
    console.log(e.target.dataset.index);
    this.setData({
      now: e.target.dataset.index
    })
  },
  //图片预览
  preview(e){
    wx.previewImage({
      urls: [e.target.dataset.img]
    })
  },
onReachBottom(){
    console.log('ddddddddddddddddd')
    let id = this.data.arr[this.data.now].typeId;
    let num = ++this.data.arr[this.data.now].page;
    let dist = '';
    if(id == 10){
        dist = "imgList"
    }else if(id == 41){
        dist = "vidwoList"
    }else{
        dist = "pargramList"
    };
    this.getData(id,num,dist);
  }
  


})
