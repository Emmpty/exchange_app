<template>
    <view>
        <button class="login_btn noborder margin_top"
                @click="loginOut()"
                hover-class="primary-hover"
                type="primary">安全退出</button>
    </view>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        loginOut() {
            uni.clearStorageSync()
            uni.reLaunch({
                url: '/pages/login/login'
            });
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/common.scss";
.margin_top {
    margin-top: 500upx;
}
.login_btn {
    width: 90%;
    height: 80upx;
    line-height: 80upx;
    border-radius: 40upx;
    text-align: center;
    font-size: 30upx;
}
</style>
