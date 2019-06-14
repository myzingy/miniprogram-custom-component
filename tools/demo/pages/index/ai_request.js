// pages/index/ai.js
const app= getApp()
const {regeneratorRuntime,PubSub} = app
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
    console.log('app',app);
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
    let key = app.attr(e,'key');
    let form=this.data.form;
    form[key]=app.val(e)
    this.setData({
      form:form,
    })
  },
  request(){
    app.ApiOneTwo({key:'free',
      appid:0,
      msg:this.data.form.keyword
    }).then(res=>{
      this.setData({
        msg:res.content.replace(/\{br\}/g,"\n"),
        isCache:res.isCache==true
      })
      PubSub.emit('requestFast',res);
    });
  },
})