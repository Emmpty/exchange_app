<template>
    <view class="padding_box">
        <div class="container_flex column login_box wcenter">
            <div>
                <div class='login_title text_left'>认证信息</div>
            </div>
            <div class="login_title2 text_left">
                <span class="font_bold bold_color">身份认证</span>
                <span class="float_right primary_color"><i class='iconfont icon-gouxuan'></i>已认证</span>
            </div>
        </div>
        <div class="order_info_box padding_box">
            <div class="total_box">
                <span>姓名</span>
                <span class="float_right">{{ userData.realName }}</span>
            </div>
            <div>
                <span>手机号</span>
                <span class="float_right">{{ userData.mobile }}</span>
            </div>
            <div>
                <span>UID</span>
                <span class="float_right">{{ userData.userId }}</span>
            </div>
            <div>
                <span>证件号码</span>
                <span class="float_right">{{ userData.idcard }}</span>
            </div>
        </div>
    </view>
</template>

<script>
export default {
    data() {
        return {
            userData: {
            },
        }
    },
    filters: {
    },
    onLoad(option) {
        this.getVerifyInfo()

    },
    methods: {
        getVerifyInfo() {
            this.$api.GetVerifyInfo({}, res => {
                if (res.code === 0) {
                    this.userData = res.info
                    this.userData.idcard = this.userData.idcard.replace(this.userData.idcard.substring(4, 14), "*********")
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/common.scss";
.padding_box {
    padding: 0 40upx;
}
.login_box {
    margin-top: 86upx;
    padding-bottom: 40upx;
    justify-content: space-between;
    border-bottom: 2upx solid $borderColor;
    .login_title {
        color: #56546c;
        font-size: 48upx;
        font-weight: bold;
        width: 100%;
    }
    .login_title2 {
        width: 100%;
        font-size: 30upx;
        font-weight: normal;
        margin-top: 15upx;
        color: #839096;
        margin-top: 50upx;
        .icon-gouxuan {
            margin-right: 15upx;
        }
    }
}
.order_info_box {
    padding: 20upx 0;
    div {
        margin: 40upx 0;
    }
    .total_box {
        height: 60upx;
        line-height: 60upx;
    }
}
</style>
