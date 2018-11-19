export default {
    //__开始为私有属性，不会暴露给getApp
    '__HOST':'http://api.qingyunke.com/',

    //示例，JS接口名，和服务端接口名称保持一致
    'ApiOneTwo':{
      method:'GET',
        alias:'api.php',//真实接口地址,
        silence:false,       //静默，不带loading;         默认 true 不带loading
        cachetime:5,          //缓存 0无,-1永久,86400秒;    默认 0 不缓存
        host:''             //默认空,使用HOST，可填写为其它host
    },

    //预定信息详情
    'App.Reserve.Detail':{
        cachetime:60,
    },

    //建立预定关系
    'App.Reserve.SetRelaOpenid':{
        cachetime:-1,
    },

    //增加顾客信息
    'App.Reserve.AddUser':{
        cachetime:-1,
    },

    //邀请详情页面----设置分享信息
    'App.Reserve.SetTopicFromShare':null,

    //列表----我的日程
    'App.Reserve.GetListFromScheAndRes':{
        cachetime:30,
    },

    //订座详情页面----我愿意
    'App.Reserve.SetRelaSuccess':null,

    //定个座儿 获取商户信息
    'App.Reserve.SellerInfo':{
        cachetime:3600,
    },

    //设置客户经理
    'App.Reserve.SetReserveCusman':null,

    //发送短信
    'App.SendSMS.Message':{
        silence:false,
    },
    //手机号搜索
    'App.Reserve.GetReserveUser':null,

    //预定列表
    'App.Reserve.GetReserveList':{
      silence:false,
    },

    //商家列表
    'App.Reserve.SellerList':null,

    //桌位列表
    'App.Tables.GetTableListsBySellerId':{
      cachetime:60,
    },

    // 修改当前预定状态 0：待确认，1：已定座，2：确认到店，3：用餐完成
    'App.Reserve.SetReserveStatus':{
      silence:false,
    },

    //修改当前桌子是否启用 0：未启用，1：启用
    'App.Reserve.SetSwitchStatus':{
      silence:false,
    },

    //进行商户判断
    'App.Reserve.SellerForOpenid':null,

    //商户端账号表增加订座儿openid
    'App.Reserve.UpdateSellerUser':{
      cachetime:86400,
    },

    //导出
    'App.Reserve.ExportReserve':null,

    //查询短信剩余及套餐
    'App.Reserve.SmsInfo':{
      alias:'App.SendSMS.SmsInfo',
      cachetime:60,
    },

    //生成支付签名接口
    'App.Reserve.SmsBuy':null,

}