import Interactive from '../utils/interactive';
const common = {
    version: '1.0.2',
    // apiurl: 'http://192.168.110.10:8013',
    apiurl: 'http://exapp.zgstlkj.com/yhl',
    // 参数： url:请求地址  param：请求参数  way：请求方式 callBack：回调函数
    urlRequest: function (url, params, methods, callback, spacialHandle, noticeHandle) {
        Interactive.interactive.showLoading('加载中')
        // uni.showLoading({
        //     title: '加载中',
        //     mask: true
        // });
        uni.request({
            url: this.apiurl + url,
            method: methods,
            data: params,
            dataType: "json",
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token')
            },
            success: (res) => {
                if (res.data.code === 0) {
                    callback(res.data)
                } else if (res.data.code === 401 || res.data.code === 1001) {
                    uni.setStorageSync('isLogin', false)
                    uni.showModal({
                        title: '提示',
                        content: '请重新登陆',
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                uni.reLaunch({
                                    url: '/pages/login/login'
                                });
                            } else if (res.cancel) { }
                        }
                    });

                } else {
                    Interactive.interactive.toast(res.data.msg && res.data.msg || '网络异常');
                    // callback(res.data)
                }
            },
            fail: (e) => {
                // callback(e)
                Interactive.interactive.toast('服务异常，请稍后再试')
                uni.reLaunch({
                    url: '/pages/login/login'
                });
            },
            complete() {
                Interactive.interactive.hideLoading();
                // uni.hideLoading()
                uni.stopPullDownRefresh()
            }
        })
    },
    // js sort方法根据数组中对象的某一个属性值进行排序
    compare: function (attr, rule) {
        return function (a, b) {
            var val1 = a[attr];
            var val2 = b[attr];
            if (rule == 1) {
                // 降序排列
                return val2 - val1;
            } else {
                // 升序排序
                return val1 - val2;
            }
        }
    },

}

export default {
    common
}