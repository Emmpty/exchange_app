import Vue from 'vue'
import App from './App'
import api from './common/api/api.js'
import utils from './common/utils/utils.js';
import interactive from './common/utils/interactive.js';


Vue.prototype.$EventBus = new Vue(); //注册全局事件对象
Vue.prototype.$version = '1.0.1'
Vue.prototype.$api = api.lib
Vue.prototype.$utils = utils.utils
Vue.prototype.$interactive = interactive.interactive;

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
