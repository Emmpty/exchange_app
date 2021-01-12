import Common from '@/common/api/common.js'
const lib = {
    Login: Login, //提交登录
    SendCode: SendCode, //短信验证码
    SumbitReg: SumbitReg, //提交注册
    GetUserInfo: GetUserInfo,
    GetPrice: GetPrice,
    getMerchantAccountList: getMerchantAccountList,
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

// 获取商户列表
function getMerchantAccountList(data, CallBack) {
    Common.common.urlRequest('/user/getMerchantAccountList', data, 'post', CallBack)
}

export default {
    lib
}