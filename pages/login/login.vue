<template>
    <view>
        <div class="container_flex column center login_box">
            <div class='login_title text_left'>云海链交易所</div>
            <div class="login_title2 text_left">登录云海链</div>
            <form class="form-container login-form">
                <div class='input_box'>
                    <div style="height:130upx;margin-bottom:20upx">
                        <div class='form_input account_input'
                             :class="[{activeInput:account.length>0||focusIndex==0},{'fail':accountFail}]">
                            <input class="input"
                                   type='number'
                                   @focus='focusFun(0)'
                                   @blur='blurFun()'
                                   @input="onAccountChange($event)"
                                   v-model="account"
                                   placeholder="手机号"
                                   placeholder-style="color:#c6c6c6;;font-weight:normal">
                            <div class='right_label'
                                 :class="{'showyanjing':account.length>0}"
                                 @click='clearAccount()'>
                                <span class='iconfont icon-guanbi'></span>
                            </div>
                            <!-- <div class='right_label container_flex center'
                                 :class="{'showyanjing':account.length>0}"
                                 @click='clearAccount()'>
                                <image style='width:36upx;height:36upx;'
                                     src="/static/images/quit@2x.png"
                                     alt="">
                            </div> -->
                        </div>
                        <div class='fail_text'
                             v-if='accountFail'>请输入11位有效手机号</div>
                    </div>
                    <div class='password_box'>
                        <div class='form_input'
                             :class="[{activeInput:password.length>0||focusIndex==1},{'fail':passwordFail}]">
                            <input :type="hidePassword?'password':'text'"
                                   :value='password'
                                   @blur='blurFun()'
                                   @input="onPasswordChange($event)"
                                   @focus='focusFun(1)'
                                   class="input"
                                   placeholder="密码"
                                   placeholder-style="color:#c6c6c6;;font-weight:normal">
                            <div class='right_label'
                                 :class="{'showyanjing':password.length>0}"
                                 @click='switchPassword()'>
                                <span class='iconfont'
                                      :class="[{'icon-yanjing-zheng':!hidePassword},{'icon-yanjing_bi':hidePassword}]"></span>
                            </div>
                        </div>
                        <div class='fail_text'
                             v-if='passwordFail'>密码不能少于6位</div>
                    </div>
                </div>
                <button type="primary"
                        :disabled='account.length==0||password.length==0||passwordFail||accountFail'
                        hover-class="primary-hover"
                        class="login_btn noborder"
                        @click="onLoginClick()">登录</button>
            </form>
            <div class="forget_register_box">
                <!-- <span class="left_box"
                      @click="navto('forget')">忘记密码</span>
                <span class="right_box"
                      @click="navto('register')">注册账号</span> -->
            </div>
            <div class="other_login_box">其他方式登录</div>
            <div class="other_login_img">
                <div class="div_circular">
                    <image src="/static/images/google.png"></image>
                </div>
                <div class="div_circular">
                    <image src="/static/images/facebook.png"></image>
                </div>

            </div>
        </div>
    </view>
</template>

<script>
export default {
    data() {
        return {
            account: '',
            password: '',
            hidePassword: true,
            accountFail: false,
            passwordFail: false,
            focusIndex: -1
        }
    },
    onLoad() {

    },
    methods: {
        navto(type) {
            uni.navigateTo({
                url: '/pages/login/registerOrForgetPwd?type=' + type
            })
        },
        onLoginClick() {
            uni.showLoading({
                title: '',
                mask: true,
            })
            let config = { username: this.account, password: this.password }
            this.$api.Login(this.$utils.md5Method(config), res => {
                if (res.code === 0) {
                    this.$interactive.toast('登陆成功')
                    uni.setStorageSync('token', res.data.token)
                    uni.redirectTo({
                        url: '/pages/index/index'
                    })
                }
            })
        },
        onAccountChange(e) {
            let _a = e.mp.detail.value.replace(/ /g, '').trim()
            this.hidePassword = true
            let phoneReg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/

            if (_a.length > 0 && (_a.length < 11)) {
                this.accountFail = true
            } else {
                if (!phoneReg.test(_a)) {
                    this.accountFail = true
                } else {
                    this.accountFail = false
                }
            }
            this.account = _a
        },
        onNameChange(e) {
            this.name = e.mp.detail.value.replace(/ /g, '')
        },
        focusFun(n) {
            this.focusIndex = n
        },
        blurFun() {
            this.focusIndex = -1
        },
        switchPassword() {
            this.hidePassword = !this.hidePassword
        },
        onPasswordChange(e) {
            this.password = e.mp.detail.value
            if (this.password.length < 6) {
                this.passwordFail = true
            } else {
                this.passwordFail = false
            }
        },
        clearAccount() {
            this.account = ''
            this.accountFail = false
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/common.scss";
.login_box {
    padding: 0 70upx;
    .login_title {
        color: #56546c;
        font-size: 48upx;
        font-weight: bold;
        width: 100%;
        margin-top: 86upx;
    }
    .login_title2 {
        width: 100%;
        font-size: 30upx;
        font-weight: normal;
        margin-top: 15upx;
        color: #c6c6c6;
    }
    .account_input .right_label {
        display: flex !important;
    }
    .password_box {
        height: 0upx;
        margin-top: 0upx;
        height: 130upx;
    }

    .input_box {
        .fail_text {
            font-size: 24upx;
            color: red;
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
                // border-color: rgb(133, 133, 133);
                border-color: lighten($primarycolor, 10%);
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
        font-size: 35upx;
        margin-top: 60upx;
    }
    .forget_register_box {
        width: 100%;
        margin-top: 40upx;
        font-size: 28upx;
        .left_box {
            float: left;
        }
        .right_box {
            float: right;
        }
        span {
            color: $primarycolor;
        }
    }
    .other_login_box {
        font-size: 28upx;
        text-align: center;
        height: 40upx;
        width: 280upx;
        position: relative;
        margin: auto;
        margin-top: 100upx;
    }
    .other_login_box::before {
        content: "";
        height: 2upx;
        background-color: #d1caca;
        position: absolute;
        width: 80upx;
        left: -60upx;
        top: 20upx;
    }
    .other_login_box::after {
        content: "";
        height: 2upx;
        background-color: #d1caca;
        position: absolute;
        width: 80upx;
        top: 20upx;
        right: -60upx;
    }
    .other_login_img {
        width: 80%;
        display: flex;
        justify-content: space-around;
        .div_circular {
            width: 100upx;
            height: 100upx;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            margin-top: 60upx;
            background-color: rgba(233, 233, 233, 0.4);
            image {
                width: 50upx;
                height: 50upx;
            }
        }
    }
}
</style>
