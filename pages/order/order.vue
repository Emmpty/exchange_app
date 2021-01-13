<template>
    <view>
        <div class='login_title text_left padding_box'>订单记录</div>
        <div class="order_box">
            <div class="order_item_box"
                 v-for="(item, index) in orderList"
                 :key="index">
                <div class="order_item_info padding_box">
                    <div>
                        <span class="font_bold">购买 {{ 'USDT' }}</span>
                        <span class="float_right order_status_text"
                              @click="orderStatusClick(item)">
                            <i class="iconfont icon-tubiaozhizuo-"></i>
                            <span>{{ item.orderStatus | orderStatusTextFilters }}</span>
                            <i class="iconfont icon-arrow-right"></i>
                        </span>
                    </div>
                    <div class="container_flex row order_info">
                        <div class="order_info_item text_left">
                            <p>时间</p>
                            <p class="p2 font_bold">{{ item.createTime.substring(5, 16) }}</p>
                        </div>
                        <div class="order_info_item text_center">
                            <!-- <p>数量{{ '(' + item.moneyType + ')' }}</p> -->
                            <p>数量(USDT)</p>
                            <p class="p2 font_bold">{{ item.ercAmount }}</p>
                        </div>
                        <div class="order_info_item text_right">
                            <p>交易总额(CNY)</p>
                            <p class="p2 font_bold">{{ item.payAmount + item.fee }}</p>
                        </div>
                    </div>
                    <div class="order_no">
                        <span>
                            订单号
                        </span>
                        <span class="float_right"> {{ item.orderNo }}</span>
                    </div>
                    <div class="business_name_box container_flex">
                        <div class="container_flex hcenter">{{  item.veaOrderDetail && item.veaOrderDetail.truename }}
                            <image class="icon_img"
                                   src="@/static/images/huangguan.png"
                                   mode=""></image>
                        </div>
                        <div><i class="iconfont icon-arrow-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </view>
</template>

<script>
export default {
    data() {
        return {
            orderList: [],
        }
    },
    filters: {
        orderStatusTextFilters(refundStatus) {
            switch (refundStatus) {
                case 0:
                    return '待支付';
                case 1:
                    return '已支付';
                case 2:
                    return '已确认';
                case 3:
                    return '已完成';
                case 4:
                    return '已失效';
            }
        }
    },
    onShow() {
        this.getOrderList('')

    },
    onLoad() {
    },
    onReachBottom() {
        console.log(">>>>>>lower")
    },
    methods: {
        orderStatusClick(item) {
            if (item.orderStatus === 0) {
                let config = {
                    payId: item.merchantAccountId,
                    priceTotal: item.payAmount + item.fee,
                    number: item.ercAmount,
                    orderNo: item.orderNo,
                    back: true
                }
                uni.navigateTo({
                    url: '/pages/order/confirmOrder?config=' + JSON.stringify(config)
                })
            } else {
                uni.navigateTo({
                    url: '/pages/order/orderDetails?orderItemData=' + JSON.stringify(item)
                })

            }
        },
        getOrderList(type) {
            this.$api.GetOrderList({ orderType: type }, res => {
                this.orderList = res.list
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/common.scss";
.padding_box {
    padding: 0 40upx;
}
.login_title {
    color: #56546c;
    font-size: 48upx;
    font-weight: bold;
    margin-top: 60upx;
}
.order_box {
    margin-top: 80upx;
    height: calc(100% - 200upx);
    .order_item_box {
        border-bottom: 2upx solid $borderColor;
        .order_item_info {
            padding: 30upx 40upx;
            .order_info {
                margin: 30upx 0;
                font-size: 28upx;
                .order_info_item {
                    color: #c8cccf;
                    width: 33%;
                    .p2 {
                        color: #909ca8;

                        margin-top: 20upx;
                    }
                }
            }
            .order_status_text {
                color: #8998a7;
                .icon-tubiaozhizuo- {
                    color: #c15463;
                }
            }
            .order_no {
                margin: 40upx 0;
            }
            .business_name_box {
                justify-content: space-between;
                image {
                    margin: 0 10upx;
                }
            }
        }
    }
}
</style>
