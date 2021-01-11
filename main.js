import Vue from 'vue'
import App from './App'
import Api from './common/api/api.js'

Vue.prototype.$api = Api.lib

uni.getSystemInfo({
    success: function (res) {
        Vue.prototype.$systemInfo = res
    }
});


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
