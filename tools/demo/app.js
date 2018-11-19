import {vk,regeneratorRuntime} from 'components/vk/index'
import request from 'request/index'
App({
  ...vk,
  ...request,
  regeneratorRuntime:regeneratorRuntime,
  onLaunch: function () {
    this.config({
      request:{
        responseKey:'Response', //Response 则使用网络请求状态判断，其它值则使用res.responseKey 进行判断
        responseCode:200,   //正常返回结果 responseKey的值 == responseCode 视为正常结果

        responseKeyData:'content',   //错误信息的key
        responseKeyMsg:'msg',   //错误信息的key
      }
    })
  },
  onHide(){
    this.cache_clear()
  }
})
