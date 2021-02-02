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
                    <span class="first_name">{{ username[0] }}</span>
                    <span class="name_box">{{ username }}</span>
                    <image class="icon_img"
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
                    <span class="float_right">{{ username }}</span>
                </div>
                <div style="margin-top: 50upx;"><span>支付宝账号</span>
                    <span class="float_right">{{ account }}</span>
                </div>
            </div>
            <div class='input_box'>
                <div style="height:130upx;margin-bottom:20upx">
                    <div class='form_input account_input'
                         :class="{activeInput:focusIndex==0}">
                        <input class="input"
                               type='number'
                               @focus='focusIndex = 0'
                               @blur='focusIndex = -1'
                               v-model="payNo"
                               placeholder="请输入交易订单号"
                               placeholder-style="color:#c6c6c6;;font-weight:normal;font-size:36upx;">
                    </div>
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
            config: {},
            priceTotal: 0,
            number: 0,
            name: '隆重盖世',
            focusIndex: -1,
            account: '',
            username: '',
            payNo: '',
        }
    },
    onLoad(option) {
        if (option.config) {
            this.config = JSON.parse(option.config)
            this.priceTotal = this.config.priceTotal
            this.number = this.config.number
        }
        this.getMerchantInfo()
    },
    methods: {
        getMerchantInfo() {
            this.$api.GetMerchantAccountInfo({ merchantAccountId: this.config.payId }, res => {
                if (res.code === 0) {
                    this.account = res.info.account
                    this.username = res.info.veaMerchant.username
                }
            })
        },
        paySuccessClick() {
            let _this = this
            this.$api.ConfirmPayOrder({ orderNo: this.config.orderNo, confirmType: '0', payNo: this.payNo }, res => {
                if (res.code == 0) {
                    this.$interactive.toast('购买成功')
                    setTimeout(() => {
                        if (_this.config.back) {
                            return uni.navigateBack({})
                        }
                        uni.redirectTo({
                            url: '/pages/order/order'
                        })
                    }, 1000);

                }
            })
        },
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
    .first_name {
        display: inline-block;
        text-align: center;
        width: 40upx;
        height: 40upx;
        color: #fff;
        padding: 8upx;
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
.input_box {
    margin-top: 50upx;
    .fail_text {
        font-size: 24upx;
        color: red;
    }
    div.form_input {
        height: 80%;
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;

        &.fail {
            border-color: red;
        }
        .input {
            flex: 1;
            padding-right: 2upx;
            box-sizing: border-box;
            height: 90upx;
            line-height: 90upx;
            color: #56546c;
            font-weight: bold;
            font-size: 60upx;
            padding: 0 20upx;
        }
        .left_label,
        .right_label {
            display: inline-block;
            height: 60upx;
            border-radius: 28upx;
            line-height: 60upx;
            text-align: center;
            transform: scale(0);
            transition: all 0.3s;
            opacity: 0;
            span {
                font-size: 40upx;
                color: rgb(95, 95, 95);
            }
            i {
                font-size: 40upx;
                color: #000;
            }
            .icon-yanjing-zheng {
                color: $primarycolor;
            }
            .icon-yanjing_bi {
                color: #c1c1c1;
            }
            &.showyanjing {
                opacity: 1;
                transform: scale(1);
            }
            &.show_icon {
                opacity: 1;
                width: 40upx;
                transform: scale(1);
            }
        }
        .left_label {
            width: 0;
        }
    }
    .form_input {
        border: 0;
        border-bottom: 2upx solid #e9eaf0;
        display: block;
        padding: 0upx 2upx;
        transition: border 0.2s;
        &.activeInput {
            // border-color: rgb(133, 133, 133);
            border-color: lighten($primarycolor, 10%);
        }
    }
}
</style>
