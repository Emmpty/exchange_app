<template>
    <view class="page">
        <div class="container_flex column mine_box  padding_box">
            <div class="container_flex hcenter"
                 style="margin: 30upx 0">
                <image class="avatar"
                       :src="userInfo.avatar  || '/static/yhllogo.png'"
                       mode=""></image>
                <span>{{ userInfo.username }} <i v-if="userInfo.verifyStatus == 1"
                       class="iconfont icon-VIP"></i></span>
            </div>
            <div v-if="userInfo.verifyStatus != 1"
                 class="shiming_box"
                 @click="gotoCheckFace()">
                <span>偷偷告诉你，实名认证后，更容易卖出哦</span>
                <span class="float_right">
                    <i class="iconfont icon-arrow-right"></i>
                </span>
            </div>
            <div v-else>已实名认证</div>
        </div>
        <div class="padding_box">
            <div class="mine_menu">
                <p class="menu_title">我的交易</p>
                <div class="menu_box">
                    <div class="item_box click-hover"
                         @click="goOderList(1)">
                        <p><i class="iconfont icon-mairujilu"></i></p>
                        <p>我买入的</p>
                    </div>
                    <div class="item_box click-hover"
                         @click="goOderList(2)">
                        <p><i class="iconfont icon-maichujilu"></i></p>
                        <p>我卖出的</p>
                    </div>
                    <div class="item_box click-hover"
                         @click="goOderList('')">
                        <p><i class="iconfont icon-dingdanzhongxinicon"></i></p>
                        <p>我的订单</p>
                    </div>
                    <!-- goTransaction() -->
                    <div class="item_box click-hover"
                         @click="$interactive.toast('开发中')">
                        <p><i class="iconfont icon-zhuanzhang"></i></p>
                        <p>互转</p>
                    </div>
                </div>
            </div>
            <div class="mine_menu margin_top_box">
                <p class="menu_title">我的信息</p>
                <div class="menu_box">
                    <div class="item_box click-hover"
                         @click="collection()">
                        <p><i class="iconfont icon-zichan"></i></p>
                        <p>收款信息</p>
                    </div>
                    <div class="item_box click-hover"
                         @click="gotoCheckFace()">
                        <p><i class="iconfont icon-shenfenshibie"></i></p>
                        <p>实名信息</p>
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
            userInfo: {}
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
    onNavigationBarButtonTap(e) {
        const index = e.index;
        if (index === 0) {
            uni.navigateTo({
                url: '/pages/mine/setUp'
            })
        }
    },
    onShow() {
        this.getUser()
    },
    onLoad(option) {
        // this.getUser()
    },
    methods: {
        getUser() {
            this.$api.GetUserInfo({}, res => {
                if (res.code == 0) {
                    this.userInfo = res.user
                }
            })
        },
        gotoCheckFace() {
            let url = '/pages/mine/information'
            if (this.userInfo.verifyStatus != 1) {
                url = '/pages/mine/certification'
            }
            uni.navigateTo({
                url: url
            })
        },
        goOderList(type) {
            uni.navigateTo({
                url: '/pages/order/order?type=' + type
            })
        },
        goTransaction() {
            uni.navigateTo({
                url: '/pages/transaction/internalTransaction'
            })
        },
        collection() {
            uni.navigateTo({
                url: '/pages/mine/wallet'
            })
        }
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
.margin_top_box {
    margin-top: 30upx;
}
.padding_box {
    position: relative;
    padding: 0 40upx;
    background-color: #fff;
}
.mine_box {
    height: 360upx;
    color: #fff;
    background-color: $primarycolor;
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
        background-color: rgba(14, 111, 210, 0.5);
    }
}
.mine_menu {
    position: relative;
    top: -60upx;
    border-radius: 20upx;
    padding: 30upx;
    background-color: #fff;
    color: #56546c;
    box-shadow: 0 2upx 20upx rgba(0, 0, 0, 0.1);
    .menu_title {
        font-size: 36upx;
        font-weight: bold;
        margin-bottom: 30upx;
    }
    .menu_box {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        justify-content: space-between;
        margin-bottom: 30upx;
        .item_box {
            position: relative;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex: 1;
            i {
                font-size: 60upx;
            }
            .icon-mairujilu {
                color: #96e9ff;
            }
            .icon-maichujilu {
                color: #ffc0d8;
            }
            .icon-dingdanzhongxinicon {
                color: #ffbd27;
                font-size: 55upx;
            }
            .icon-zhuanzhang {
                color: #cfb263;
            }
            .icon-zichan {
                color: #b19c4a;
            }
            .icon-shenfenshibie {
                color: #8bc17d;
            }
            p:nth-of-type(1) {
                color: #101010;
                font-weight: bold;
                font-size: 56upx;
            }
            p:nth-of-type(2) {
                margin-top: 10upx;
                color: #101010;
                font-size: 28upx;
                color: #56546c;
            }
        }
    }
}
.icon-VIP {
    color: #f2cb51;
    font-size: 36upx;
    margin-left: 15upx;
}
</style>
