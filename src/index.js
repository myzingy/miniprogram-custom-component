import util from './utils/util'
import request from './utils/request'
import regeneratorRuntime from './utils/runtime-module'
import PubSub from './utils/PubSub'
module.exports = {
    regeneratorRuntime:regeneratorRuntime,
    vk:util,
    request:request,
    PubSub:PubSub,
}