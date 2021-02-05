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
                            <i class="iconfont icon-tubiaozhizuo-"
                               :style="item.orderStatus | orderStatusStyleFilters"></i>
                            <span>{{ item.orderStatus | orderStatusTextFilters(item.type) }}</span>
                            <i class="iconfont icon-arrow-right"></i>
                        </span>
                    </div>
                    <div class="container_flex row order_info">
                        <div class="order_info_item text_left">
                            <p>时间</p>
                            <p class="p2 font_bold">{{ item.createTime.substring(5, 16) }}</p>
                        </div>
                        <div class="order_info_item text_center">
                            <p>数量(USDT)</p>
                            <p class="p2 font_bold">{{ item.ercAmount }}</p>
                        </div>
                        <div class="order_info_item text_right">
                            <p>交易总额(CNY)</p>
                            <p class="p2 font_bold">{{ (item.payAmount + item.fee).toFixed(2) }}</p>
                        </div>
                    </div>
                    <div class="order_no">
                        <span>
                            订单号
                        </span>
                        <span class="float_right"> {{ item.orderNo }}</span>
                    </div>
                    <div v-if="item.veaOrderDetail"
                         class="business_name_box container_flex">
                        <div class="container_flex hcenter">{{ item.veaOrderDetail.username }}
                            <image class="icon_img"
                                   src="@/static/images/huangguan.png"
                                   mode=""></image>
                        </div>
                        <!-- <div><i class="iconfont icon-arrow-right"></i></div> -->
                    </div>
                </div>
            </div>
        </div>
        <myMask ref="orderMask"
                top="200">
            <orderScreen :transactionTypeList="transactionTypeList"
                         :orderStateList='orderStateList'
                         :transactionTypeIndex="transactionTypeIndex"
                         :orderStateIndex="orderStateIndex"
                         @changetTpye="changetTpye"
                         @changeOrderTpye="changeOrderTpye">
                <button class="login_btn noborder"
                        @click="getOrderList()"
                        hover-class="primary-hover"
                        type="primary">确定</button>
            </orderScreen>
        </myMask>
    </view>
</template>

<script>
import myMask from '@/components/mask.vue'
import orderScreen from '@/components/orderScreen.vue'

export default {
    data() {
        return {
            orderList: [],
            orderType: '',
            type: '',
            transactionTypeIndex: -1,
            orderStateIndex: -1,
            transactionTypeList: [
                { type: 1, title: '买入' },
                { type: 2, title: '卖出' },
            ],
            orderStateList: [
                { type: 0, title: '待支付' },
                { type: 1, title: '已支付' },
                { type: 2, title: '已确认' },
                { type: 3, title: '已完成' },
                { type: 4, title: '已失效' },
            ],
        }
    },
    components: {
        myMask, orderScreen
    },
    filters: {
        orderStatusTextFilters(refundStatus, type) {
            console.log('?>>>>>>', refundStatus, type)
            switch (refundStatus) {
                case 0:
                    return type == 1 ? '待支付' : '待商家审核';
                case 1:
                    return type == 1 ? '已支付' : '商家已审核';
                case 2:
                    return type == 1 ? '已确认' : '待确认';
                case 3:
                    return '已完成';
                case 4:
                    return '已失效';
            }
        },
        orderStatusStyleFilters(orderStatus) {
            switch (orderStatus) {
                case 0:
                    return 'color: #c15463';
                case 1:
                    return 'color: rgb(255,186,0)';
                case 2:
                    return 'color: rgb(24,144,255)';
                case 3:
                    return 'color: rgb(19,206,102)';
                case 4:
                    return 'color: rgb(144,147,153)';

            }
        },
    },
    onNavigationBarButtonTap(e) {
        const index = e.index;
        if (index === 0) {
            if (this.$refs.orderMask.isShow) {
                this.$refs.orderMask.hideMask()
            } else {
                this.$refs.orderMask.showMask()
            }
        }
    },
    onShow() {

    },
    onLoad(option) {
        if (option.type) {
            this.type = option.type
            if (this.type == 1) {
                this.transactionTypeIndex = 0
            } else if (this.type == 2) {
                transactionTypeIndex = 1
            } else {
                transactionTypeIndex = -1
            }
        }
        this.getOrderList()
    },
    onReachBottom() {
        console.log(">>>>>>lower")
    },
    methods: {
        changetTpye(index) {
            if (this.transactionTypeIndex == index) {
                this.transactionTypeIndex = -1
                this.type = ''
            } else {
                this.transactionTypeIndex = index
                this.type = this.transactionTypeList[index].type
            }
        },
        changeOrderTpye(index) {
            if (this.orderStateIndex == index) {
                this.orderStateIndex = -1
                this.orderType = ''
            } else {
                this.orderStateIndex = index
                this.orderType = this.orderStateList[index].type
            }
        },
        orderStatusClick(item) {
            if (item.orderStatus === 0 && item.type === 1) {
                let config = {
                    payId: item.merchantAccountId,
                    payNo: item.payNo,
                    priceTotal: item.payAmount + item.fee,
                    number: item.ercAmount,
                    orderNo: item.orderNo,
                    type: item.type,
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
        getOrderList() {
            this.$api.GetOrderList({ orderType: parseInt(this.orderType), type: parseInt(this.type) }, res => {
                this.orderList = res.list
                this.$refs.orderMask.hideMask()
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
    margin-top: 60upx;
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
.login_btn {
    width: 90%;
    height: 80upx;
    line-height: 80upx;
    border-radius: 40upx;
    text-align: center;
    font-size: 30upx;
    margin-top: 60upx;
    i {
        font-size: 36upx;
        margin-right: 10upx;
    }
}
</style>
