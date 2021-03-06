# vktool

使用小程序组件方式提供快捷开发方式，提高开发效率；虽然只是组件，但提供框架级服务。

微信小程序原生开发越来越方便，部分框架更新慢，很难满足快速变化的小程序；

**所以以组件方式切入，提供辅助函数及常用组件；**

~~（之前有以小程序插件方式切入的方式，但由于插件本身wx接口不能完全开放，所以放弃了）~~

以下功能都可在 tools/demo 中看到

## 接口功能

接口 | 描述 
---------------- | --------------

date_format | 将时间戳（整型10位）格式化为format中定义的格式
---------------- | --------------

strtotime | 时间串转为时间戳
---------------- | --------------

time | 时间串转为时间戳
---------------- | --------------

toast | wx.showToast 的封装 
---------------- | --------------

cache | 带有过期时间的异步存储
---------------- | --------------

val | 获取 input/textarea 值，e必须是bind事件传入的event 
---------------- | --------------

attr | 获取 dom 上自定义的data-key="value" 的值
---------------- | --------------

http_build_query | 将 param 键值对拼接成 url 参数，如 key1=val1&key2=val2
---------------- | --------------

promise | 微信 api 简单 promise化，可以使用 then 或 await 进行处理
---------------- | --------------

request | 网络请求的封装，实现了自动缓存，缓存未失效时，直接使用缓存数据等
---------------- | --------------

refresh | 刷新当前页面
---------------- | --------------

cache_clear | 清理过期缓存
---------------- | --------------

config | 全局配置参数
---------------- | --------------

PubSub | 页面间通信
---------------- | --------------

## 组件功能

名称 | 描述 
---------------- | --------------

nav | 自定义顶部导航 
---------------- | --------------

line | 一条带有文字的分割线 
---------------- | --------------

formids | 自动收集formid 放入本地存储中 
---------------- | --------------

## 安装
1. ` npm install vktool --production `
2. 微信开发工具  工具-》构建npm
## 基本使用：推荐使用方式 1
### 使用方式 1，直接注入 app.js 中
直接注入到app.js 中，之后通过 app 方式调用；
#### 第一步 在 app.js 引入
````
// app.js
import {vk,regeneratorRuntime,PubSub} from 'vktool'
App({
  ...vk,
  PubSub:PubSub,
  regeneratorRuntime:regeneratorRuntime,
  onLaunch: function () {
    this.config({
      request:{
        responseKey:'Response', //Response 则使用网络请求状态判断，其它值则使用res.StatusKey 进行判断
        responseCode:200,   //正常返回结果 StatusKey的值 == StatusCode 视为正常结果

        responseKeyData:'content',   //错误信息的key
        responseKeyMsg:'msg',   //错误信息的key
      }
    })
  },
  onHide(){
    this.cache_clear()
  }
})
````
#### 第二步 在页面中调用
````
// pages/order/list.js
const app= getApp()
const {regeneratorRuntime} = app
Page({
  onLoad: async function() {
    console.log(getApp());
    app.cache('cache.over','默认是永久缓存');
    app.cache('cache.timeout.5min',{tip:'第三参数是过期时间，单位秒，5分钟就传300'},300);
    let data= await app.cache('cache.over');
    console.log('data',data);
    app.requst({
        url:'https://www.test.com/?s=App.Reserve.SellerInfo',
        data:{
            seller_id:1,
            seller_openid:'o9pcQ0cbjRKnRWczcOJaaSRGP1lE',
            manager_id:500
        }
    })
  }
})
````

### 使用方式 2，只在具体页面中单独使用
在单个 Page 中引入使用，如 /pages/order/list.js中 
````
// pages/order/list.js
import {vk,regeneratorRuntime,PubSub} from 'vktool'
Page({
  onLoad: async function() {
    console.log(vk);
    vk.cache('cache.over','默认是永久缓存');
    vk.cache('cache.timeout.5min',{tip:'第三参数是过期时间，单位秒，5分钟就传300'},300);
    let data= await vk.cache('cache.over');
    console.log('data',data);
    vk.requst({
        url:'https://www.test.com/?s=App.Reserve.SellerInfo',
        data:{
            seller_id:1,
            seller_openid:'o9pcQ0cbjRKnRWczcOJaaSRGP1lE',
            manager_id:500
        }
    })
  }
})
````

## 接口功能

**以下函数根据引用方式，可以通过 getApp() 或 vk 进行调用**

> ### date_format(ns,format='YYYY年MM月DD日')
> 将时间戳（整型10位）格式化为format中定义的格式

format 指令：
**YYYY年 MM月 DD日 HH时 II分 SS秒 WEEK周几 DAY(今天/明天/日期)**
 
 示例 
 
     app.date_format(1539588251,'MM-DD HH:II')  //10-15 15:24
     
     app.date_format(1539588251,'周WEEK MM-DD HH:II')  //周一 10-15 15:24 
     
     app.date_format(1539588251,'\`DAY||MM-DD\` HH:II')  //今天 15:24  
     app.date_format(1542266651,'\`DAY||MM-DD\` HH:II')  //11-15 15:24 
     
     \`DAY||MM-DD\` 会计算是不是今天或明天，如果不是，则使用MM-DD
 
> ### strtotime
> 将 日期时间串 转化为时间戳（整型10位）

    app.strtotime('2018-11-15 15:24:11') //1542266651
    app.strtotime('2018/11/15 15:24:11') //1542266651

> ### time
> 获取当前时间戳

    app.time() //1542266651

> ### toast(msg,icon='none')
> app.toast('提示信息')   //wx.showToast 的封装

> ### cache(key,value,timeout=-1)  
> 带有过期时间的异步存储，需要使用await then 方式；timeout单位是秒， 默认-1为永久存储

 保存信息： 
 
     cache('键值','数据',600)//保存10分钟，10分钟后失效
     cache('键值','数据').then(res=>{})
     await cache('键值','数据')
 
 读取信息：
 
1. 使用then
    ````
    app.cache('键值').then(data=>{
        console.log(data) //数据
    }).catch(res=>{
        //没有找到'键值'对应的数据或数据已失效
    })
    ````
2. 使用await
    ````
    try{
        let d=await app.cache('键值');
        console.log(data) //数据
    }catch(e){}
    ````
    
> ### cache_clear
> 请将此函数放在 app.js onHide 中，自动清理过期缓存，防止垃圾缓存造成系统负担
    
> ### val(e)
> 获取 input/textarea 值，e必须是bind事件传入的event 
   
> ### attr(e,key="")
> 获取 dom 上自定义的data-key="value" 的值，e必须是bind事件传入的event，key 就是 data-key 后面的key，key为空时，返回所有自定义的 data 的键值对数据；
    
> ### http_build_query(param,url='')
     将 param 键值对拼接成 url 参数，如 key1=val1&key2=val2
     如果传递了 url，则会拼接 url?key1=val1&key2=val2,
     如果 url中已经有 ? 则自动变为 url&key1=val1&key2=val2
     
> ### promise(wxapi,param={})
    微信 api 简单 promise 化，可以使用 then 或 await 进行处理,param 微信api所要传递的参数
    如：网络请求
    app.promise('wx.request',{
        url:'https://www.test.com/api',
        data:{p:1}
    }).then(res=>{
        console.log(res)
    });
    
    如：获得系统信息
    let sys= await app.promise('getSystemInfo');
    console.log(sys)
   
> ### requst(param,fouce=false)   
    网络请求的封装，实现了
        自动缓存，缓存未失效时，直接使用缓存数据；
        loading 效果，可以通过 config 自定义
        全局错误处理，需要通过 config 配置
网络请求        
````
app.requst({
    url:'https://www.test.com/?s=App.Reserve.SellerInfo',
    data:{
        seller_id:1,
        seller_openid:'o9pcQ0cbjRKnRWczcOJaaSRGP1lE',
        manager_id:500
    }
    //支持 wx.requst 所有参数，以下为扩展参数
    
    loading:true,   //显示loading效果，默认不显示
    cachetime:600,    //缓存十分钟，默认不缓存，-1为永久缓存
    
}).then(res=>{
    console.log(res);
})
````
> ### config(conf={})
> 配置组件，处理数据更加灵活,conf 默认参数如下
````
{
    request:{
        method:'POST',
        dataType:'json',
        header:{
            'content-type': 'application/x-www-form-urlencoded',
        },
        hasHeaderFormids:false, //header 请求头是否携带formids,可以直接指定值作为key
        hasBodyFormids:false, //请求 body 是否携带formids，可以直接指定值作为key；优先 hasHeaderFormids
        responseKey:'Response', //Response 则使用网络请求状态判断，其它值则使用res.responseKey 进行判断
        responseCode:200,   //正常返回结果 responseKey的值 == responseCode 视为正常结果
        
        responseKeyData:'data',   //错误信息的key
        responseKeyMsg:'msg',   //错误信息的key
        responseCodeError:400,   //一般性错误 toast 提示信息，如字段必填等
        responseCodeCrash:500,  //严重错误，如登录超时
        infoFun:(res)=>{
            this.toast(res[this._config.request.responseKeyMsg])
        },
        errorFun:(res)=>{
            this.toast(res[this._config.request.responseKeyMsg])
        },
        loading:(flag=true)=>{
            if(flag){
              wx.showLoading({
                title: 'loading',
                mask:true
              })
            }else{
                wx.hideLoading()
            }
        
        }
    }
}


````       
> **需要自定义的重写掉就行，其它字段会使用默认值，如：**
````
this.config({
  request:{
    responseKey:'Response', 
    responseCode:200,   
    responseKeyData:'content',   //错误信息的key
    responseKeyMsg:'msg',   //错误信息的key
  }
})
````    
> ### 网络请求 增强版
    直接使用 app.requst 要写一个标准的 url，多个页面调用一个接口无法复用请求，
    接口很多时不方便管理，接口变更更是麻烦的修改；
    所以这个增强版是在 app.requst 基础上做个一次封装，可以对接口进行配置及统一管理
    
需要按以下流程实现：
#### 1）根目录创建 request 目录，创建2个文件

````
1. /request/uri.js
/////////////////////////////
// 封装 uri 
/////////////////////////////
export default {
    //__开始为私有属性，不会暴露给getApp
    '__HOST':'http://api.qingyunke.com/',

    //示例，JS接口名，和服务端接口名称保持一致
    'ApiOneTwo':{
      method:'GET',       //支持 wx.requst 的所有参数，在这里都可以重新制定，否则使用app.config()配置的参数；
        alias:'api.php',  //真实接口地址,外面的key和接口名不一致时可以增加这个；或者服务端改了接口名称，只需要在这里写一个alias即可
        loading:true,       //loading效果 ，默认不带loading;         为 true 时带loading
        cachetime:5,          //缓存 0无,-1永久,单位秒，一天86400秒;    默认 0 不缓存
        host:''             //默认空,使用HOST，可填写为其它host
    },

    //全部使用默认参数
    'AppReserveSmsBuy':null,

}


2. /request/index.js
/////////////////////////////
// 封装 uri 与 request
/////////////////////////////
import uri from './uri'
import {request} from 'vktool'
export default request(uri)

````
#### 2）入口 app.js 引入 本地 request 包 
````
// app.js
import {vk,regeneratorRuntime,PubSub} from 'vktool'
import request from 'request/index'
App({
  ...vk,
  ...request,
  PubSub:PubSub,
  regeneratorRuntime:regeneratorRuntime,
  onLaunch: function () {
    this.config({
      request:{
        responseKey:'Response', //Response 则使用网络请求状态判断，其它值则使用res.StatusKey 进行判断
        responseCode:200,   //正常返回结果 StatusKey的值 == StatusCode 视为正常结果

        responseKeyData:'content',   //错误信息的key
        responseKeyMsg:'msg',   //错误信息的key
      }
    })
  },
  onHide(){
    this.cache_clear()
  }
})
````
#### 3）在页面中使用
````
// uri 中定义的接口全部暴露给了app;
// 可以通过 console.log(app) 看到所有接口
// uri 接口的key中 (./) 都被替换为空了
app.ApiOneTwo({key:'free',
  appid:0,
  msg:this.data.form.keyword
}).then(res=>{
  this.setData({
    msg:res.content.replace(/\{br\}/g,"\n"),
    isCache:res.isCache==true
  })
});
```` 
> ### wx.cloud.callFunction
> 要实现云函数缓存，必须是使用上面的 网络请求 增强版
在 /request/uri.js 文件中增加云函数的配置
1. alias:'wx.cloud.callFunction' 必须
2. apiName 云函数名称    必须
````
export default {
    //__开始为私有属性，不会暴露给getApp
    '__HOST':'http://api.qingyunke.com/',

    //示例，JS接口名，和服务端接口名称保持一致
    'ApiOneTwo':{
      method:'GET',       //支持 wx.requst 的所有参数，在这里都可以重新制定，否则使用app.config()配置的参数；
        alias:'api.php',  //真实接口地址,外面的key和接口名不一致时可以增加这个；或者服务端改了接口名称，只需要在这里写一个alias即可
        loading:true,       //loading效果 ，默认不带loading;         为 true 时带loading
        cachetime:5,          //缓存 0无,-1永久,单位秒，一天86400秒;    默认 0 不缓存
        host:''             //默认空,使用HOST，可填写为其它host
    },

    //全部使用默认参数
    'AppReserveSmsBuy':null,
    
    //云函数
  'AppCloudAdd':{
    alias:'wx.cloud.callFunction', //必须
    apiName:'add',      //必须
    loading:true,       //loading效果 ，
    cachetime:5,        //缓存 0无
  },
}
````
>### request 请求，强制请求 及 删除缓存
**只有在 uri 的接口定义了cachetime，才需要考虑缓存问题；**

1.有时我们需要“强制请求”以获得最新数据；如特定页面需要最新数据
````
//接口中第二参数为 true 时，强制使用网络请求最新数据
app.AppCloudAdd({x:1,y:2},true).then();

````
2.有时我们需要“删除缓存”，下次请求会获取新的数据；如：修改某些数据后可以“删除缓存”
````
//接口中第二参数为 clear或clean 时，会清理掉此接口缓存；
//注意第一参数必须一样才能清除
app.AppCloudAdd({x:1,y:2},'clear');
````
## 组件库
在 Page json中引入组件,用那个就引用那个
````
"usingComponents": {
    "line": "/miniprogram_npm/vktool/line",
    "nav": "/miniprogram_npm/vktool/nav",
    "formids": "/miniprogram_npm/vktool/formids"
}
````
> ### line
> 分割线
````
<line>分割线</line>
````
![链接](./docs/line.jpeg)
> ### nav
````
//app.json 请将 navigationStyle 改为 custom
"window": {
    "navigationStyle": "custom"
}
````
然后在页面上添加
````
<nav bindback="goBack" hasHome 
    bindhome="goHome" 
    backgroundColor="#ff0" 
    color="#f00">VKTOOL NAV</nav>
````
![链接](./docs/nav.jpeg)
> ### formids
> **为了收集 formid，此组件在点击时会保存 formid 到本地缓存，key为formids**
    
````
<formids bindclick="navigateGo">
    <view class="link">绑定事件方式跳到 view 页面</view>
</formids>
<formids url="./view" openType="navigate">
    <view class="link">navigate view 页面</view>
</formids>
<formids url="./view" openType="redirect">
    <view class="link">redirect view 页面</view>
</formids>
````

### 请我喝茶
![链接](./docs/wxpay.jpg) | ![链接](./docs/alipay.png) 
------------- | -------------

### Todo

~~1. 请求头 header 中加 formids~~

2. 请求出错的处理逻辑实现

3. 请求结果的细化处理

~~4. request 方式支持云开发及云函数，自动缓存~~
