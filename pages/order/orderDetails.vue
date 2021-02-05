<template>
    <view class="padding_box">
        <div class="container_flex row login_box hcenter">
            <div>
                <div class='login_title text_left'>{{ orderItemData.orderStatus | orderStatusFilters(orderItemData.type) }}</div>
                <div class="login_title2 text_left">{{ orderItemData.orderStatus | orderStatusTextFilters(orderItemData.ercAmount, orderItemData.type) }}</div>
            </div>
            <div class="bg_border_box container_flex center"
                 :style="orderItemData.orderStatus | orderStatusStyleFilters">
                <i class="iconfont"
                   style="font-size: 60upx"
                   :class="orderItemData.orderStatus | orderStatusClassFilters"></i>
            </div>
        </div>
        <div class="order_info_box padding_box">
            <div>
                <span class="first_name">{{ 'U' }}</span>
                <span class="font_bold">{{ orderItemData.type==1 ? '购买':'出售'}} {{ 'USDT' }}</span>
            </div>
            <div class="total_box">
                <span>总价</span>
                <span style="font-size: 48upx"
                      class="float_right primary_color"><i class='iconfont icon-cny'></i>{{ orderItemData.payAmount }}</span>
            </div>
            <div>
                <span>价格</span>
                <span class="float_right"><i class='iconfont icon-cny'></i>{{ orderItemData.price }}</span>
            </div>
            <div>
                <span>数量</span>
                <span class="float_right">{{ orderItemData.ercAmount }} USDT</span>
            </div>
            <div>
                <span>订单号</span>
                <span class="float_right">{{ orderItemData.orderNo }}</span>
            </div>
            <div>
                <span>订单时间</span>
                <span class="float_right">{{ orderItemData.createTime }}</span>
            </div>
            <div v-if="orderItemData.type ==1 || (orderItemData.type != 2 && orderItemData.orderStatus > 1)"
                 class="business_box">
                <span>商家昵称</span>
                <span class="float_right">{{ orderItemData.veaOrderDetail.username }}
                    <i class="iconfont icon-arrow-right"></i>
                </span>
            </div>
        </div>
        <button type="primary"
                v-if="orderItemData.orderStatus == 2"
                hover-class="primary-hover"
                class="primary_btn noborder"
                @click="changeOrder()">{{ orderItemData.orderStatus | changeOrderText }}</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            orderItemData: {},
            orderStatusText: '',
        }
    },
    filters: {
        orderStatusFilters(orderStatus, type) {
            switch (orderStatus) {
                case 0:
                    return type == 1 ? '待支付' : '待商家审核';
                case 1:
                    return type == 1 ? '已支付' : '商家已通过';
                case 2:
                    return '待确认';
                case 3:
                    return '已完成';
                case 4:
                    return '已失效';
            }
        },
        orderStatusTextFilters(orderStatus, ercAmount, type) {
            switch (orderStatus) {
                // case 0:
                //     return '订单待确认支付';
                case 1:
                    return type == 1 ? '已支付，待确认' : '待商家审核';
                case 2:
                    return '已确认，请您确认是否到账';
                case 3:
                    return ercAmount + ' USDT已存入您的账户';
                case 4:
                    return '订单已失效';
            }
        },
        changeOrderText(orderStatus) {
            switch (orderStatus) {
                case 2:
                    return '确认到账';
            }
        },
        orderStatusStyleFilters(orderStatus) {
            switch (orderStatus) {
                // case 0:
                //     return 'background-color: rgba(255,73,73,.4);color: rgb(255,73,73)';
                case 1:
                    return 'background-color: rgba(255,186,0,.3);color: rgb(255,186,0)';
                case 2:
                    return 'background-color: rgba(24,144,255,.3);color: rgb(24,144,255)';
                case 3:
                    return 'background-color: rgba(19,206,102,.3);color: rgb(19,206,102)';
                case 4:
                    return 'background-color: rgba(144,147,153,.3);color: rgb(144,147,153)';

            }
        },
        orderStatusClassFilters(orderStatus) {
            switch (orderStatus) {
                // case 0:
                //     return '';
                case 1:
                    return 'icon-dagou';
                case 2:
                    return 'icon-dagou';
                case 3:
                    return 'icon-dagou';
                case 4:
                    return 'icon-point';
            }
        }
    },
    onLoad(option) {
        if (option.orderItemData) {
            this.orderItemData = JSON.parse(option.orderItemData)
            console.log('>>>>>>>>>>>', this.orderItemData)
        }
    },
    methods: {
        changeOrder() {
            let _this = this
            this.$api.ChangeOrder({ orderNo: this.orderItemData.orderNo, confirmType: '2', payNo: this.orderItemData.payNo }, res => {
                if (res.code == 0) {
                    this.$interactive.toast('确认成功')
                    setTimeout(() => {
                        if (_this.orderItemData.back) {
                            return uni.navigateBack({})
                        }
                        uni.redirectTo({
                            url: '/pages/order/order'
                        })
                    }, 1000);

                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/common.scss";
.primary_btn {
    width: 100%;
    height: 90upx;
    line-height: 90upx;
    border-radius: 45upx;
    text-align: center;
    font-size: 30upx;
    margin-top: 60upx;
}
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
    }
}
.bg_border_box {
    width: 110upx;
    height: 110upx;
    border-radius: 40upx;
}
.order_info_box {
    padding: 40upx 0;
    div {
        margin: 40upx 0;
    }
    .total_box {
        height: 60upx;
        line-height: 60upx;
    }
    .first_name {
        display: inline-block;
        text-align: center;
        width: 40upx;
        height: 40upx;
        color: #fff;
        padding: 8upx;
        border-radius: 100%;
        margin-right: 10upx;
        background: $primarycolor;
    }
    .order_info {
        span:nth-of-type(2) {
            float: right;
        }
    }
    .business_box {
        padding: 40upx 0;
        border-top: 2upx solid $borderColor;
        border-bottom: 2upx solid $borderColor;
        .icon-arrow-right {
            margin-left: 10upx;
        }
    }
}
</style>
