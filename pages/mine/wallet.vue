<template>
    <view>
        <div class="padding_box">
            <div class='login_title text_left'>我的钱包</div>
        </div>
        <div class="padding_s_box">
            <scroll-view class="pay_box"
                         scroll-x='true'
                         :scroll-left='paysleft'
                         scroll-with-animation='true'>
                <view class="pay_item"
                      :class="{select: selectedindex == index }"
                      @click.stop="payItemClick(item, index)"
                      v-for="(item, index) in payList"
                      :key="index">
                    <div style="margin-bottom: 15upx">
                        <i :style="{color: item.color}"
                           :class="'iconfont' + ' ' + item.iconContent"></i>
                        <span style="margin-left: 10upx">{{ item.name }}</span>
                    </div>
                    <div>
                        <span v-if="index === 0"
                              class="good_price">推荐</span>
                        <span v-else
                              class="seize_a_seat"></span>
                        <i class="iconfont float_right"
                           style="color: #448BFB;"
                           :class="{'icon-gouxuan':  selectedindex == index }"></i>
                    </div>
                </view>
            </scroll-view>
        </div>
        <div style="padding: 0 60upx">
            <form class="form-container login-form">
                <div class='input_box'>
                    <!-- 姓名 -->
                    <div style="height:130upx;">
                        <div class='form_input account_input'
                             :class="[{activeInput:focusIndex==0}]">
                            <input class="input"
                                   type='text'
                                   @focus='focusFun(0)'
                                   @blur='blurFun()'
                                   v-model="walletNum"
                                   placeholder="请输入您的收款账户"
                                   placeholder-style="color:#c6c6c6;;font-weight:normal">
                            <div class='right_label'
                                 :class="{'showyanjing':walletNum.length>0}"
                                 @click='clearWalletNum()'>
                                <span class='iconfont icon-guanbi'></span>
                            </div>
                        </div>
                    </div>
                    <!-- 密码 -->
                    <div class='password_box'>
                        <div class='form_input'
                             :class="[{activeInput:focusIndex==1}]">
                            <input type="idcard"
                                   v-model='walletName'
                                   @blur='blurFun()'
                                   @focus='focusFun(1)'
                                   class="input"
                                   placeholder="请输入您的收款昵称"
                                   placeholder-style="color:#c6c6c6;;font-weight:normal">
                            <div class='right_label'
                                 :class="{'showyanjing':walletName.length>0}"
                                 @click='clearWalletName()'>
                                <span class='iconfont icon-guanbi'></span>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="primary"
                        :disabled='walletNum.length<1 || walletName.length<1'
                        hover-class="primary-hover"
                        class="login_btn noborder"
                        @click="startDetect()">确认绑定</button>
            </form>
        </div>
    </view>
</template>

<script>
export default {
    data() {
        return {
            walletNum: '',
            walletName: '',
            paysleft: 0,
            selectedindex: 0,
            focusIndex: -1,
            payList: [
                { name: '支付宝', iconContent: 'icon-zhifubao', color: '#06B4FD' },
                { name: '微信', iconContent: 'icon-weixin', color: '#28C445' },
                { name: '银联', iconContent: 'icon-yinlianhuodong', color: '#EFA341' }
            ],
        }
    },
    methods: {
        focusFun(n) {
            this.focusIndex = n
        },
        blurFun() {
            this.focusIndex = -1
        },
        clearWalletNum() {
            this.walletNum = ''
        },
        clearWalletName() {
            this.walletName = ''
        },
        payItemClick(item, index) {
            this.selectedindex = index
            // this.payId = item.id
            if (index > 1) {
                this.paysleft = (index - 1) * this.$systemInfo.windowWidth * 0.35
            } else {
                this.paysleft = '0'
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/common.scss";
.padding_box {
    padding: 0 30upx;
    .login_title {
        color: #56546c;
        font-size: 48upx;
        font-weight: bold;
        width: 100%;
        margin-top: 70upx;
    }
}
.padding_s_box {
    margin-bottom: 100upx;
    padding: 30upx;
    // border-top: 1upx solid #e6e7ec;
    border-bottom: 1upx solid #e6e7ec;
}
.pay_box {
    padding: 20upx 0;
    font-size: 28upx;
    width: 100%;
    white-space: nowrap;
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
    }
    .pay_item {
        display: inline-block;
        border-radius: 10upx;
        width: 30%;
        margin: 5upx 6% 5upx 0;
        padding: 24upx;
        border: 1upx solid $borderColor;
        box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
        &.select {
            border: 2upx solid $primarycolor;
        }
        .good_price {
            color: #0c61d3;
            padding: 4upx 12upx;
            border-radius: 10upx;
            font-size: 24upx;
            background: rgb(239, 246, 254);
            border: 2upx solid rgb(189, 211, 240);
        }
        .seize_a_seat {
            padding: 4upx 12upx;
            border: 0;
        }
    }
}

.login-form {
    margin-top: 80upx;
    width: 100%;
    .input_box {
        .fail_text {
            font-size: 24upx;
            color: red;
        }

        .account_input .right_label {
            display: flex !important;
        }
        .password_box {
            height: 0upx;
            margin-top: 0upx;
            height: 130upx;
        }
        div.form_input {
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
            }
            .right_label {
                display: inline-block;
                height: 60upx;
                padding-left: 20upx;
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
                &.showyanjing {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        }
        .form_input {
            border: 0;
            border-bottom: 2upx solid #e9eaf0;
            display: block;
            padding: 0upx 2upx;
            margin-bottom: 10upx;
            transition: border 0.2s;
            &.activeInput {
                border-color: lighten($primarycolor, 10%);
            }
        }
    }
    .login_btn {
        width: 100%;
        height: 90upx;
        line-height: 90upx;
        border-radius: 45upx;
        text-align: center;
        font-size: 30upx;
        margin-top: 60upx;
    }
}
</style>
