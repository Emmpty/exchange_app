import Common from '@/common/api/common.js'
const lib = {
    Login: Login, //提交登录
    SendCode: SendCode, //短信验证码
    SumbitReg: SumbitReg, //提交注册
    GetUserInfo: GetUserInfo,
    GetPrice: GetPrice,
    GetMerchantAccountList: GetMerchantAccountList,
    GetMerchantAccountInfo: GetMerchantAccountInfo,
    SubOrder: SubOrder,
    ConfirmPayOrder: ConfirmPayOrder,
    GetOrderList: GetOrderList,
}
// 提交登录
function Login(data, CallBack) {
    Common.common.urlRequest('/user/safety/login', data, 'post', CallBack)
}
//提交注册
function SumbitReg(data, CallBack) {
    Common.common.urlRequest('/user/register', data, 'post', CallBack)
}
// 短信验证码
function SendCode(data, CallBack) {
    Common.common.urlRequest('/code/send', data, 'post', CallBack)
}
// 用户信息
function GetUserInfo(data, CallBack) {
    Common.common.urlRequest('/user/info', data, 'post', CallBack)
}
// 获取币价格，手续费
function GetPrice(data, CallBack) {
    Common.common.urlRequest('/user/getPrice', data, 'post', CallBack)
}

// 获取商户钱包列表
function GetMerchantAccountList(data, CallBack) {
    Common.common.urlRequest('/user/getMerchantAccountList', data, 'GET', CallBack)
}
// 获取商户钱包详情
function GetMerchantAccountInfo(data, CallBack) {
    Common.common.urlRequest('/user/getMerchantAccountInfo', data, 'GET', CallBack)
}

// 提交订单
function SubOrder(data, CallBack) {
    Common.common.urlRequest('/order/create', data, 'post', CallBack)
}
// 支付订单
function ConfirmPayOrder(data, CallBack) {
    Common.common.urlRequest('/order/buyconfirm', data, 'post', CallBack)
}
// 订单列表
function GetOrderList(data, CallBack) {
    Common.common.urlRequest('/order/list', data, 'post', CallBack)
}

export default {
    lib
}