<template>
    <view>
        <div class="padding_box">
            <div class="ordre_info border_bottom padding_h_box">
                <p style="font-size: 28upx">向卖家付款</p>
                <p class="priice_box">
                    <i class='iconfont icon-cny'></i>
                    <span class="font_bold">{{ priceTotal }}</span>
                </p>
                <p class="border_bg_box">您正在向云海链认证卖家购买：{{ number }} USDT </p>
            </div>
            <div class="business_box border_bottom padding_h_box">
                <div class="container_flex hcenter font_bold">
                    <span class="first_name">{{ name[0] }}</span>
                    <span class="name_box">{{ name }}</span>
                    <image class="name_img"
                           src="@/static/images/huangguan.png"
                           mode=""></image>
                    <!-- <i class="iconfont "></i> -->
                </div>
                <div class="protect_box container_flex row hcenter">
                    <div><i class="iconfont icon-gouxuan"></i>已缴纳保证金</div>
                    <div><i class="iconfont icon-gouxuan"></i>云海链认证商家</div>
                    <div><i class="iconfont icon-gouxuan"></i>担保交易</div>
                    <!-- <div><i class="iconfont icon-arrow-right"></i></div> -->
                </div>
            </div>
            <div class="business_info font_bold border_bottom padding_h_box">
                <div><span>卖家姓名</span>
                    <span class="float_right">{{ name}}</span>
                </div>
                <div style="margin-top: 50upx;"><span>支付宝账号</span>
                    <span class="float_right">2222222222</span>
                </div>
            </div>
            <button type="primary"
                    hover-class="primary-hover"
                    class="primary_btn noborder"
                    @click="paySuccessClick()">我已付款成功</button>
        </div>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // showMask: false,
            priceTotal: 0,
            number: 0,
            name: '隆重盖世',
        }
    },
    onLoad(option) {
        if (option.priceTotal) this.priceTotal = option.priceTotal
        if (option.number) this.number = option.number
    },
    onBackPress(options) {
        if (options.from === 'navigateBack') {
            return false;
        } else {
            uni.showModal({
                title: '确认付款离开',
                content: '如您已付款，请务必先点击"我已付款成功"',
                confirmText: '确认离开',
                confirmColor: '#157dfb',
                success: function (res) {
                    if (res.confirm) {
                        uni.navigateBack({});
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
            return true
        }
    },
    methods: {
        paySuccessClick() {

        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/common.scss";
.border_bottom {
    border-bottom: 2upx solid $borderColor;
}
.padding_box {
    padding: 50upx;
}
.padding_h_box {
    padding: 30upx 0;
}
.ordre_info {
    text-align: center;
    p {
        margin-bottom: 25upx;
    }
    .priice_box {
        font-size: 70upx;
        .icon-cny {
            font-size: 65upx;
        }
    }
    .border_bg_box {
        padding: 10upx 0;
        border-radius: 40upx;
        background: #f8f8f9;
        font-size: 28upx;
    }
}
.business_box {
    font-size: 34upx;
    .name_box {
        margin: 0 10upx;
    }
    .name_img {
        width: 40upx;
        height: 40upx;
    }
    .first_name {
        color: #fff;
        padding: 8upx 14upx;
        border-radius: 100%;
        background: $primarycolor;
    }
    .protect_box {
        font-size: 28upx;
        color: #737b85;
        margin-top: 30upx;
        justify-content: space-between;
        .icon-arrow-right {
            font-size: 28upx;
        }
        .icon-gouxuan {
            color: #448bfb;
            margin-right: 10upx;
        }
    }
}
.business_info {
    font-size: 34upx;
}
.primary_btn {
    width: 100%;
    height: 90upx;
    line-height: 90upx;
    border-radius: 45upx;
    text-align: center;
    font-size: 30upx;
    margin-top: 60upx;
    // i {
    //     font-size: 36upx;
    //     margin-right: 10upx;
    // }
}
</style>
