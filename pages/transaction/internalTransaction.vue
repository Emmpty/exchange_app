<template>
    <view>
        <div class="usdt_box">
            <p>{{ USDTNum }}</p>
            <p class="p2">可用USDT数量</p>
        </div>
        <div class="padding_box">
            <div class="input_box">
                <div class="input_item">
                    <p>对方账户：</p>
                    <input class="input"
                           type="number"
                           placeholder="请输入对方手机号"
                           placeholder-style="color:#c6c6c6;font-weight:normal;"
                           v-model="mobile" />
                </div>
                <div class="input_item">
                    <p>对方id：</p>
                    <input class="input"
                           type="number"
                           placeholder="请输入对方id"
                           placeholder-style="color:#c6c6c6;font-weight:normal;"
                           v-model="recUserId" />
                </div>
                <div class="input_item">
                    <p>转账数量：</p>
                    <input class="input"
                           type="number"
                           placeholder="请输入转账数量"
                           placeholder-style="color:#c6c6c6;font-weight:normal;"
                           v-model="num" />
                </div>
                <div class="input_item">
                    <p>交易密码：</p>
                    <input class="input"
                           type="password"
                           placeholder="请输入交易密码"
                           placeholder-style="color:#c6c6c6;font-weight:normal;"
                           v-model="payPassword" />
                </div>
                <p class="tip_box">温馨提示：请仔细确认对方的手机号，USDT一经转出将无法找回</p>
            </div>
            <button type="primary"
                    hover-class="primary-hover"
                    class="primary-btn"
                    :disabled='num>USDTNum'
                    @click="exchangeCurrencyFun">确认转账</button>
        </div>
    </view>
</template>

<script>
export default {
    data() {
        return {
            USDTNum: 0.0000,
            recUserId: '',
            mobile: '',
            num: '',
            payPassword: ''
        }
    },
    onLoad() {
        // this.getUserAssets()
    },
    computed: {
    },
    methods: {
        getUserAssets() {
            this.$api.GetMemberConter(res => {
                if (res.code === 0) {
                    this.USDTNum = res.account.usdtNum
                }
            })
        },
        exchangeCurrencyFun() {
            let config = {
                recUserId: this.recUserId,
                recMobile: this.mobile,
                amount: this.num,
                currType: 228,
                payPassword: this.payPassword,
            }
            uni.showLoading({
                title: '',
                mask: true
            });
            this.$memberApi.internalTransfer(this.$utils.md5Method(config), res => {
                uni.hideLoading()
                this.payPassword = ''
                if (res.code === 0) {
                    this.$interactive.toast('转账成功')
                    setTimeout(() => {
                        uni.switchTab({
                            url: '/pages/Deal/index'
                        })
                    }, 1000);
                    // this.getUserAssets()
                }
            })
        }
    }
}
</script>
<style >
</style>
<style lang="scss" scoped>
@import "@/common/scss/common.scss";
.padding_box {
    padding: 40upx 30upx;
    position: fixed;
    top: 200upx;
}

.usdt_box {
    text-align: center;
    color: #56546c;
    font-size: 68upx;
    background-color: #157dfb;
    color: #fff;
    height: 200px;
    border-radius: 0 0 120upx 120upx;
    padding-top: 30upx;
    .p2 {
        font-size: 36upx;
        margin-top: 20upx;
    }
}
.input_box {
    background: #fff;
    margin-top: 80upx;
    border-radius: 15upx;
    padding: 30upx;
    font-size: 32upx;
    box-shadow: 2upx 6upx 24upx 0upx rgba(4, 0, 0, 0.1);
    .input_item {
        p {
            color: #56546c;
            font-size: 30upx;
            font-weight: bold;
        }
        .input {
            height: 80upx;
            color: #56546c;
            font-weight: bold;
            margin: 20upx 0;
            padding: 0 15upx;
            border: 1px solid #ded8d8;
            border-radius: 5px;
        }
    }
    .tip_box {
        font-size: 28upx;
        color: #fadb2e;
    }
}
.exchange_btn {
    position: absolute;
    bottom: 30upx;
    left: 5%;
    width: 90%;
    margin-top: 80upx;
    background: #f3744e;
    color: #fff;
}
</style>
