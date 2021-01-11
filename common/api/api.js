import Common from '@/common/api/common.js'
const lib = {
    Login: Login, //提交登录
    SendCode: SendCode, //短信验证码
    SumbitReg: SumbitReg, //提交注册
    GetUserInfo: GetUserInfo,
}
function addParams(data) {
    data = data ? data : {}
    return data
}
// 提交登录
function Login(data, CallBack) {
    data = addParams(data)
    Common.common.urlRequest('/user/safety/login', data, 'post', CallBack)
}
//提交注册
function SumbitReg(data, CallBack) {
    data = addParams(data)
    Common.common.urlRequest('/user/register', data, 'post', CallBack)
}
// 短信验证码
function SendCode(data, CallBack) {
    data = addParams(data)
    Common.common.urlRequest('/code/send', data, 'post', CallBack)
}
// 用户信息
function GetUserInfo(data, CallBack) {
    data = addParams(data)
    Common.common.urlRequest('/user/info', data, 'post', CallBack)
}
export default {
    lib
}