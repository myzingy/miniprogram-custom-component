import {vk,regeneratorRuntime} from 'components/wxk/index'
App({
  ...vk,
  regeneratorRuntime:regeneratorRuntime,
  onLaunch: function () {
    this.config({
      requst:{
        ret:'code',
        code:0,
      }
    })
  },
  onHide(){
    this.cache_clear()
  }
})
