// pages/index/ai.js
const {regeneratorRuntime} = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      keyword:'笑话',
      timeout:10,
    },
    msg:'',
    isCache:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  input(e){
    let key = getApp().attr(e,'key');
    let form=this.data.form;
    form[key]=getApp().val(e)
    this.setData({
      form:form,
    })
  },
  request(){
    getApp().request({
      url:'http://api.qingyunke.com/api.php?',
      data:{
        key:'free',
        appid:0,
        msg:this.data.form.keyword
      },
      timeout:this.data.form.timeout,
      loading:true,
    }).then(res=>{
      //console.log(res);
      this.setData({
        msg:res.content.replace(/\{br\}/g,"\n"),
        isCache:res.isCache==true
      })
    })
  },
})