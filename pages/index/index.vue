<template>
    <view style="height:100%">
        <div class="transaction_title">
            <span @click="currentIndex=0"
                  style="margin-right: 30upx;"
                  :class="{ active:currentIndex==0} ">我要买</span>
            <!-- @click="$utils.notOpen()" -->
            <span @click="currentIndex=1"
                  :class="{ active:currentIndex==1} ">我要卖</span>
            <div class="order_icon float_right">
                <image src="/static/images/icon_order.png"></image>
                <!-- <p class='iconfont icon-order'></p> -->
                <p @click="goOrderPage">订单</p>
            </div>
        </div>
        <swiper class="swiper transaction_box"
                disable-touch="false"
                :current="currentIndex">
            <swiper-item v-for="(titem, tindex) in buyAndSellList"
                         :key="tindex"
                         class="buy_box">
                <!-- <div class="buy_box"> -->
                <scroll-view class="bi_box"
                             :scroll-left='scleft'
                             scroll-with-animation
                             show-scrollbar="false"
                             scroll-x>
                    <view class="bi_item"
                          :class="{active: currentItemIndex == index}"
                          @click="itemClick(item, index)"
                          v-for="(item, index) in biData"
                          :key="index">
                        <p>{{ item.name }}</p>
                        <p class="margin_p">{{ item.abbreviation }}</p>
                    </view>
                </scroll-view>
                <div class="transaction_info">
                    <div class="info_title">
                        <span> {{ titem.title + (isNumber?'数量':'金额') }}</span>
                        <span class="cny_box">CNY</span>
                        <span class="iconfont icon-xiala"></span>
                    </div>
                    <form class="form-container login-form">
                        <div class='input_box'>
                            <div style="height:130upx;margin-bottom:20upx">
                                <div class='form_input account_input'
                                     :class="{activeInput:focusIndex==0}">
                                    <div class='left_label'
                                         :class="{'show_icon': !isNumber}">
                                        <i class='iconfont icon-cny'></i>
                                    </div>
                                    <input class="input"
                                           type='number'
                                           @focus='focusIndex = 0'
                                           @blur='focusIndex = -1'
                                           v-model="priceOrTotal"
                                           :placeholder="priceOrTotalText"
                                           placeholder-style="color:#c6c6c6;font-weight:normal;font-size:36upx;">
                                    <div class='right_label'
                                         :class="{'showyanjing':isNumber}">
                                        <span>{{ currentItemData.abbreviation }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="transaction_text">
                                <span class="left_text">价格约 6.43 CNY/{{ currentItemData.abbreviation }}</span>
                                <span class="right_text float_right"
                                      @click="switchNumOrMoney">
                                    <i class="iconfont icon-zhuanhuan"></i>
                                    <span>按{{ !isNumber?'数量':'金额' }}{{ currentIndex==0?'购买':'出售' }}</span>
                                </span>
                            </div>
                        </div>
                        <button type="primary"
                                :disabled='isNumber?priceOrTotal<1:priceOrTotal<100'
                                hover-class="primary-hover"
                                class="login_btn noborder"
                                @click="buyOrSellClick()"><i class="iconfont icon-shandianpaixu"></i>{{  biPrice.buyProportion + '% 手续费' + titem.title }}</button>
                    </form>

                </div>
                <!-- </div> -->
            </swiper-item>
        </swiper>
        <myMask ref="rechargeMask"
                top="0">
            <div class='switch-child-box'
                 @click.stop="clickStop"
                 :class="{ 'show': showRechargeContent }">
                <div style="height: 100%">
                    <div class='switch-header font_32 trivial-color'>
                        <span class="left_text">确认{{ currentIndex==0?'购买':'出售' }}</span>
                        <span @click="hideModal"
                              class="right_text float_right">关闭</span>
                    </div>
                    <div class='switch-child-content'>
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
                        <div class="pay_info">
                            <p>
                                <span>价格</span>
                                <span class="float_right">{{ biPrice.buyPrice + ' CNY/' + currentItemData.abbreviation }}</span>
                            </p>
                            <p>
                                <span>数量</span>
                                <!-- isNumber ? priceOrTotal : (priceOrTotal/biPrice.buyPrice).toFixed(6) -->
                                <span class="float_right">{{ number + ' ' + currentItemData.abbreviation }}</span>
                            </p>
                        </div>
                        <div class="money_box">
                            <i class='iconfont icon-cny'></i>
                            <!-- isNumber ? priceOrTotal*biPrice.buyPrice : priceOrTotal -->
                            <span class="font_bold">{{ priceTotal }}</span>
                            <span class="sohuxufei_box float_right">含手续费：{{ fee }}</span>
                        </div>
                        <button type="primary"
                                :disabled='!payId'
                                hover-class="primary-hover"
                                class="login_btn noborder"
                                @click="confirmBuyOrSellClick()">确认{{ currentIndex==0?'购买':'出售' }}</button>
                    </div>
                </div>
            </div>
        </myMask>
        <activeModel ref="updataModel"></activeModel>
    </view>
</template>

<script>
import myMask from '@/components/mask.vue'
import activeModel from '@/components/activeModel.vue'
export default {
    data() {
        return {
            scleft: 0,
            paysleft: 0,
            currentIndex: 0,
            currentItemIndex: 0,
            currentItemData: {},
            buyAndSellList: [
                { title: '购买' },
                { title: '出售' }
            ],
            biData: [
                { name: '泰达币', abbreviation: 'USDT', },
                { name: '比特币', abbreviation: 'BTC', },
                { name: '以太坊', abbreviation: 'ETH', },
                { name: '火币积分', abbreviation: 'HT', },
                { name: '柚子', abbreviation: 'EOS', },
            ],
            payList: [
                { name: '支付宝', iconContent: 'icon-zhifubao', color: '#06B4FD' },
                { name: '微信', iconContent: 'icon-weixin', color: '#28C445' },
                { name: '银联', iconContent: 'icon-yinlianhuodong', color: '#EFA341' }
            ],
            priceOrTotal: '',
            priceOrTotalText: '100起',
            focusIndex: -1,
            isNumber: false,
            selectedindex: 0,
            showRechargeContent: false,
            biPrice: {
                buyPrice: 7,
                buyProportion: 50
            },
            payId: '',
            number: 0,  //购买数量
            priceTotal: 0,  //总金额
            fee: 0,     // 手续费
        }
    },
    watch: {
        priceOrTotal(newV, oldV) {
            newV = parseInt(newV)
            if (this.isNumber && newV > 0) {
                this.number = newV
                let total = newV * this.biPrice.buyPrice
                this.fee = total * this.biPrice.buyProportion / 100
                this.priceTotal = total + this.fee
            } else if (newV > 99) {
                this.number = (newV / this.biPrice.buyPrice).toFixed(6)
                this.fee = newV * this.biPrice.buyProportion / 100
                this.priceTotal = newV + this.fee
            }
        },
    },
    components: {
        myMask, activeModel
    },
    onLoad() {
        this.number = 0
        this.fee = 0
        this.priceTotal = 0
        this.currentItemData = this.biData[0]
        this.getUser()
        this.getPirce()
    },
    mounted() {
        //#ifdef APP-PLUS  
        this.$refs.updataModel.updateVersion()
        //#endif
    },
    methods: {
        switchNumOrMoney() {
            this.isNumber = !this.isNumber
            if (this.isNumber) this.priceOrTotalText = '请输入数量'
            else this.priceOrTotalText = '100起'
            this.priceOrTotal = ''
        },
        goOrderPage() {
            uni.navigateTo({
                url: '/pages/order/order'
            })
        },
        showModal() {
            this.$refs.rechargeMask.showMask()
            this.showRechargeContent = true
        },
        hideModal() {
            this.showRechargeContent = false
            this.$refs.rechargeMask.hideMask()
        },
        confirmBuyOrSellClick() {
            // let number = this.isNumber ? this.priceOrTotal : (this.priceOrTotal / this.biPrice.buyPrice).toFixed(6)
            // let priceTotal = this.isNumber ? this.priceOrTotal * this.biPrice.buyPrice : this.priceOrTotal
            this.$api.SubOrder({ merchantAccountId: this.payId, ercAmount: this.number }, res => {
                let config = {
                    payId: this.payId,
                    priceTotal: this.priceTotal,
                    number: this.number,
                    orderNo: res.orderNo,
                }
                this.hideModal()
                this.priceOrTotal = ''
                this.number = 0
                this.fee = 0
                this.priceTotal = 0
                uni.navigateTo({
                    url: '/pages/order/confirmOrder?config=' + JSON.stringify(config)
                })
            })
        },
        buyOrSellClick() {
            this.$api.GetMerchantAccountList({}, res => {
                if (res.code === 0 && res.list.length > 0) {
                    this.showModal()
                    res.list.forEach(ele => {
                        if (ele.type == 0) {
                            ele.name = '支付宝'
                            ele.iconContent = 'icon-zhifubao'
                            ele.color = '#06B4FD'
                        } else if (ele.type == 1) {
                            ele.name = '微信'
                            ele.iconContent = 'icon-weixin'
                            ele.color = '#28C445'
                        } else if (ele.type == 2) {
                            ele.name = '银联'
                            ele.iconContent = 'icon-yinlianhuodong'
                            ele.color = '#EFA341'
                        }
                    });
                    this.payId = res.list[0].id
                    this.payList = res.list
                }
            })
        },
        getPirce() {
            this.$api.GetPrice({}, res => {
                if (res.code == 0) {
                    this.biPrice = res.price
                }
            })
        },
        getUser() {
            this.$api.GetUserInfo({}, res => {
                if (res.code == 0) {

                }
            })
        },
        clickStop() { },
        payItemClick(item, index) {
            this.selectedindex = index
            this.payId = item.id
            if (index > 1) {
                this.paysleft = (index - 1) * this.$systemInfo.windowWidth * 0.35
            } else {
                this.paysleft = '0'
            }
        },
        itemClick(item, index) {
            if (index > 0) {
                return this.$utils.notOpen('暂未开放')
            }
            if (index > 2) {
                this.scleft = (index - 2) * this.$systemInfo.windowWidth * 0.18
            } else {
                this.scleft = '0'
            }
            this.currentItemData = item
            this.currentItemIndex = index
        },
    }
}
</script>

<style>
page {
    height: 100%;
    background: #157dfb;
    background-color: #157dfb;
}
</style>
<style lang="scss" scoped>
@import "@/common/scss/common.scss";
.uni-page-body {
    height: 100%;
    background-color: #fff;
}
.transaction_title {
    // width: 100%;
    font-weight: bold;
    font-size: 36upx;
    letter-spacing: 4upx;
    transition: 0.3s font-size;
    color: rgba(255, 255, 255, 0.8);
    position: relative;
    top: 50upx;
    padding: 0 40upx;
    .order_icon {
        text-align: center;
        color: #fff;
        font-size: 24upx;
        font-weight: normal;
        image {
            width: 50upx;
            height: 50upx;
        }
    }
    .active {
        color: #fff;
        font-size: 60upx;
    }
}
.transaction_box {
    width: 100%;
    height: calc(100% - 180upx);
    margin-top: 100upx;
    border-radius: 20upx 20upx 0 0;
    transition: 0.3s transform;
    .buy_box {
        width: 100%;
        background-color: #fff;
        border-radius: 20upx 20upx 0 0;
        height: 100%;
        padding: 30upx 0;
        &.left100 {
            position: absolute;
            left: 100%;
        }
        .bi_box {
            white-space: nowrap;
            height: 120upx;
            color: rgb(140, 159, 173);
            border-bottom: 4upx solid #f3f5f6;
            ::-webkit-scrollbar {
                width: 0;
                height: 0;
                background-color: transparent;
            }
            .bi_item {
                display: inline-block;
                width: 18%;
                height: calc(100% - 6upx);
                font-size: 28upx;
                text-align: center;
                margin: 0 2%;
                .margin_p {
                    font-size: 36upx;
                    margin-top: 15upx;
                    font-weight: bold;
                }
            }
            .active {
                color: $primarycolor;
            }
            .active::after {
                content: "";
                width: 60%;
                height: 14upx;
                display: block;
                margin: 0 auto;
                border-bottom: 6upx solid $primarycolor;
            }
        }
    }
    .transaction_info {
        position: relative;
        padding: 40upx;
        .info_title {
            font-size: 36upx;
            font-weight: bold;
            height: 50upx;
            line-height: 50upx;
            .cny_box {
                margin-left: 30upx;
                color: $primarycolor;
            }
            .icon-xiala {
                position: relative;
                left: 5upx;
                top: -8upx;
                font-size: 24upx;
            }
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
            .transaction_text {
                width: 100%;
                font-size: 24upx;
                color: #8697a4;
                .left_text {
                }
                .right_text {
                    color: $primarycolor;
                    .icon-zhuanhuan {
                        font-size: 24upx;
                        margin-right: 10upx;
                    }
                }
            }
        }
        .login-form {
            margin-top: 80upx;
            width: 100%;
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
    i {
        font-size: 36upx;
        margin-right: 10upx;
    }
}
.switch-child-box {
    width: 100%;
    // max-height: 860upx;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    transform: translateY(860upx);
    transition: transform 0.25s;
    box-sizing: border-box;
    border-top-left-radius: 16upx;
    border-top-right-radius: 16upx;
    overflow: hidden;
    z-index: 1111;
    &.show {
        transform: translateY(0upx);
    }
    .switch-header {
        height: 110upx;
        width: 100%;
        box-sizing: border-box;
        position: relative;
        line-height: 110upx;
        padding: 0 30upx;
        border-bottom: 1upx solid #e6e7ec;
        .left_text {
            font-weight: bold;
            font-size: 34upx;
            color: #050a11;
        }
        .right_text {
            font-size: 28upx;
            color: #899aa6;
        }
    }
    .switch-child-content {
        padding: 30upx;
        height: calc(100% - 110upx);
        .scroll-view_H {
            white-space: nowrap;
            width: 100%;
            .scroll-view-item_H {
                display: inline-block;
                width: 100%;
                height: 300rpx;
                line-height: 300rpx;
                text-align: center;
                font-size: 36rpx;
            }
            .uni-bg-red {
                background: red;
            }
            .uni-bg-green {
                background: green;
            }
        }
        .pay_box {
            padding: 40upx 0;
            font-size: 28upx;
            width: 100%;
            white-space: nowrap;
            ::-webkit-scrollbar {
                width: 0;
                height: 0;
                background-color: transparent;
            }
            .pay_item {
                // height: 90upx;
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

        .pay_info {
            border-bottom: 2upx solid $borderColor;
            p {
                margin-bottom: 40upx;
            }
        }
        .icon-cny {
            font-size: 56upx;
        }
        .money_box {
            position: relative;
            color: $primarycolor;
            padding-top: 50upx;
            text-align: center;
            font-size: 60upx;
            .sohuxufei_box {
                position: absolute;
                font-size: 28upx;
                bottom: -24upx;
                right: 0;
                color: $colorlight;
            }
        }
    }
}
</style>
