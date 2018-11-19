/**
 * Created by goto9 on 2018/7/19.
 */
import util from './util'
//import regeneratorRuntime from './runtime-module'


/**
 *
 * @param url
 * @param data
 * @param fouce false|true 强制请求服务器，获取最新数据；默认优先使用缓存
 * @param header    追加header
 * @param silence    loading
 * @param cachetime    缓存时间
 * @returns {Promise}
 */
function rpc(url,data={},fouce=false,req={}){
  req.url=url
  req.data=data
  req.loading=req.silence===false?true:false
  return util.request(req)
}
function __api(uri){
    //console.log('uri',uri)
    let tmpApi={
      getUrl:function(act='',host=''){
        return (host||uri.__HOST)+act
      },
    }
    for(let key in uri){
      if(key.indexOf('__')==0){
        continue;
      }
      uri[key]=uri[key]||{};
      tmpApi[key.replace(/[\.\/]/g,'')]=function(data,fouce=false,header){
        //console.log('api[key].host',api[key].host);
        let url=tmpApi.getUrl(uri[key].alias||key,uri[key].host||uri['__HOST']);
        return rpc(url,data,fouce,uri[key]);
      }
    }
    //console.log('tmpApi',tmpApi);
    return tmpApi;
}
export default __api;