// components/nav/nav.js
import {vk,regeneratorRuntime} from './index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundColor:{
      type:String,
        value:'#ffffff'
    },
      color:{
          type:String,
          value:'#000000'
      },
    hasHome:{
        type:Boolean,
          value:false
      },
    home:{
      type:String,
      value:'',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    disHome:false,
      disBack:false,
  },

    attached(){
    console.log(vk);
        this.init();
    },
  /**
   * 组件的方法列表
   */
  methods: {
    back(){
      wx.navigateBack()
    },
      home(){
        if(!this.data.disHome) return;
        //this.triggerEvent('home');
        wx.reLaunch({
          url:this.data.home
        });
      },
      async init(){
        let disBack = false;
        let disHome = false;
        let pages=getCurrentPages();

        if (pages.length > 1) {
            disBack = true;
        }
        if (this.data.home) {
          disHome = true;
          if(this.data.home.indexOf(pages[pages.length-1].route)>-1){
            disBack = false;
            disHome = false;
          }
        }
        //导航栏自适应
        let systemInfo = wx.getSystemInfoSync();
        let reg = /ios/i;
        let pt = 20;//导航状态栏上内边距
        let h = 44;//导航状态栏高度
        if(reg.test(systemInfo.system)){
          pt = systemInfo.statusBarHeight;
          h = 44;
        }else{
          pt = systemInfo.statusBarHeight;
          h = 48;
        }
        this.setData({
          statusBarHeight: pt,
          disHome: disHome,
          disBack: disBack,
          statusBarHeightFull: pt + h,
          titleBarHeight:h,
        })
        console.log('this.setData',this.data);
      },
  }
})
