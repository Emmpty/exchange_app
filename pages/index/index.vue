<template>
    <view style="height:100%;overflow-x: hidden;">
        <div class="transaction_title">
            <span @click="currentIndex=0"
                  style="margin-right: 30upx;"
                  :class="{ active:currentIndex==0} ">我要买</span>
            <span @click="currentIndex=1"
                  :class="{ active:currentIndex==1} ">我要卖</span>
            <div class="order_icon">
                <image src="/static/images/icon_order.png"></image>
                <!-- <p class='iconfont icon-order'></p> -->
                <p>订单</p>
            </div>
        </div>
        <swiper class="swiper transaction_box"
                disable-touch="false"
                :current="currentIndex">
            <swiper-item v-for="(titem, tindex) in buyAndSellList"
                         :key="tindex"
                         class="buy_box">
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
                                         :class="{'show_icon': isNumber}">
                                        <i class='iconfont icon-cny'></i>
                                    </div>
                                    <input class="input"
                                           type='number'
                                           @focus='focusIndex = 0'
                                           @blur='focusIndex = -1'
                                           v-model="number"
                                           placeholder="100起"
                                           placeholder-style="color:#c6c6c6;;font-weight:normal;font-size:36upx;">
                                    <div class='right_label'
                                         :class="{'showyanjing':!isNumber}">
                                        <span>{{ currentItemData.abbreviation }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="transaction_text">
                                <span class="left_text">价格约 6.43 CNY/{{ currentItemData.abbreviation }}</span>
                                <span class="right_text"
                                      @click="isNumber = !isNumber">
                                    <i class="iconfont icon-zhuanhuan"></i>
                                    <span>按{{ !isNumber?'数量':'金额' }}购买</span>
                                </span>
                            </div>
                        </div>
                        <button type="primary"
                                :disabled='number<100'
                                hover-class="primary-hover"
                                class="login_btn noborder"
                                @click="buyOrSellClick()"><i class="iconfont icon-shandianpaixu"></i>0手续费{{ titem.title }}</button>
                    </form>

                </div>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
export default {
    data() {
        return {
            scleft: 0,
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
            number: '',
            focusIndex: -1,
            isNumber: true
        }
    },
    onLoad() {
        this.currentItemData = this.biData[0]
    },
    methods: {
        buyOrSellClick() {
            uni.navigateTo({
                url: '/pages/login/login'
            })
        },
        itemClick(item, index) {
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
    overflow-x: hidden;
    background: #157dfb;
    background-color: #157dfb;
}
</style>
<style lang="scss" scoped>
@import "@/common/scss/common.scss";
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
        float: right;
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
    border-radius: 30upx 30upx 0 0;
    transition: 0.3s transform;
    .buy_box {
        width: 100%;
        background-color: #fff;
        border-radius: 30upx 30upx 0 0;
        height: 100%;
        padding: 30upx 0;
        &.left100 {
            position: absolute;
            left: 100%;
        }
        .bi_box {
            ::-webkit-scrollbar {
                width: 0;
                height: 0;
                background-color: transparent;
            }
            white-space: nowrap;
            height: 120upx;
            color: rgb(140, 159, 173);
            border-bottom: 4upx solid #f3f5f6;
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
                    float: right;
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
    }
}
</style>
