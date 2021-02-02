<template>
    <view class="page">
        <div class="container_flex column mine_box wcenter padding_box">
            <div class="container_flex hcenter"
                 style="margin: 30upx 0">
                <image class="avatar"
                       src="/static/logo.png"
                       mode=""></image>
                <span>犁田耙</span>
            </div>
            <div class="shiming_box"
                 @click="gotoCheckFace()">
                <span>偷偷告诉你，实名认证后，更容易卖出哦</span>
                <span class="float_right">
                    <i class="iconfont icon-arrow-right"></i>
                </span>
            </div>
        </div>
        <div class="padding_box">
            <div class="mine_menu">
                <p class="menu_title">我的交易</p>
                <div class="menu_box">
                    <div class="item_box">
                        <p>5</p>
                        <p>我买入的</p>
                    </div>
                    <div class="item_box">
                        <p>5</p>
                        <p>我卖出的</p>
                    </div>
                    <div class="item_box">
                        <p>5</p>
                        <p>我的订单</p>
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
            orderItemData: {},
            orderStatusText: '',
        }
    },
    filters: {
        orderStatusFilters(orderStatus) {
            switch (orderStatus) {
                case 0:
                    return '待支付';
                case 1:
                    return '买家已支付';
                case 2:
                    return '商家已确认';
                case 3:
                    return '已完成';
                case 4:
                    return '已失效';
            }
        },


    },
    onLoad(option) {

    },
    methods: {
        gotoCheckFace() {
            uni.navigateTo({
                url: '/pages/mine/certification'
            })
        },

    }
}
</script>
<style >
.page {
    height: 100%;
    background-color: #fff;
}
</style>
<style lang="scss" scoped>
@import "@/common/scss/common.scss";
.padding_box {
    position: relative;
    padding: 0 40upx;
    background-color: #fff;
}
.mine_box {
    height: 450upx;
    color: #fff;
    background-color: #5290ff;
    .avatar {
        width: 100upx;
        height: 100upx;
        border-radius: 50%;
        margin-right: 20upx;
    }
    .shiming_box {
        border-radius: 10upx;
        font-size: 28upx;
        padding: 10upx 20upx;
        background-color: #4281f0;
    }
}
.mine_menu {
    position: relative;
    top: -40upx;
    border-radius: 20upx;
    padding: 40upx 30upx;
    background-color: #fff;
    box-shadow: 0 2upx 20upx rgba(0, 0, 0, 0.2);
    .menu_title {
        font-size: 36upx;
        color: #101010;
        font-weight: bold;
        margin-bottom: 20upx;
    }
    .menu_box {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        justify-content: space-between;
        margin-bottom: 30upx;
        .item_box {
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex: 1;
            p:nth-of-type(1) {
                color: #101010;
                font-weight: bold;
                font-size: 56upx;
            }
            p:nth-of-type(2) {
                color: #101010;
                font-size: 28upx;
                color: #969697;
            }
        }
    }
}
</style>
