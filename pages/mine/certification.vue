<template>
    <view>
        <div class="container_flex column center login_box">
            <div class='login_title text_left'>{{ title }}</div>
            <form class="form-container login-form">
                <div class='input_box'>
                    <!-- 姓名 -->
                    <div style="height:130upx;">
                        <div class='form_input account_input'
                             :class="[{activeInput:focusIndex==0},{'fail':nameFail}]">
                            <input class="input"
                                   @focus='focusFun(0)'
                                   @blur='blurFun()'
                                   @input="onNameChange($event)"
                                   type='text'
                                   :disabled="!canEditName"
                                   v-model="name"
                                   placeholder="真实姓名"
                                   placeholder-style="color:#c6c6c6;;font-weight:normal">
                            <div v-if="canEditName"
                                 class='right_label'
                                 :class="{'showyanjing':name.length>0}"
                                 @click='clearName()'>
                                <span class='iconfont icon-guanbi'></span>
                            </div>
                        </div>
                        <div class='fail_text'
                             v-if='nameFail'>请正确姓名</div>
                    </div>
                    <!-- 密码 -->
                    <div class='password_box'>
                        <div class='form_input'
                             :class="[{activeInput:focusIndex==1},{'fail':idCardFail}]">
                            <input type="idcard"
                                   @blur='blurFun()'
                                   @input="onIdCardChange($event)"
                                   @focus='focusFun(1)'
                                   v-model='idCard'
                                   :disabled="!canEditIdCard"
                                   class="input"
                                   placeholder="身份证号码"
                                   placeholder-style="color:#c6c6c6;;font-weight:normal">
                            <div v-if="canEditIdCard"
                                 class='right_label'
                                 :class="{'showyanjing':idCard.length>0}"
                                 @click='clearIdCard()'>
                                <span class='iconfont icon-guanbi'></span>
                            </div>
                        </div>
                        <div class='fail_text'
                             v-if='idCardFail'>请输入正确的身份证号码</div>
                    </div>
                    <div class="tip_box">请确认本人信息无误</div>
                </div>
                <button type="primary"
                        :disabled='name.length<1 || idCard.length<1 || nameFail || idCardFail || isCertification'
                        hover-class="primary-hover"
                        class="login_btn noborder"
                        @click="startDetect()">{{ btnText }}</button>
            </form>
        </div>
    </view>
</template>

<script>
const modal = uni.requireNativePlugin('modal');
const shumailiveness = uni.requireNativePlugin('shumailiveness');
export default {
    data() {
        return {
            name: '',
            idCard: '',
            idcard: '',
            nameFail: false,
            idCardFail: false,
            focusIndex: -1,
            title: '人脸识别认证',
            btnText: '确保本人操作并认证',
            isCertification: false,
            canEditName: true,
            canEditIdCard: true,
            isPay: -1,
            nocheckFace: false,
        }
    },
    onLoad(option) {
        if (option.isPay) this.isPay = option.isPay
        this.title = '人脸识别认证'
        this.getVerifyInfo()
    },
    methods: {
        getVerifyInfo() {
            this.$api.GetVerifyInfo({}, res => {
                if (res.code === 0 && res.info) {
                    if (res.info.realName && res.info.idcard) {
                        this.canEditName = false
                        this.canEditIdCard = false
                    }
                    if (res.info.status == 5) {
                        this.nocheckFace = true
                    }
                    this.name = res.info.realName
                    this.idCard = res.info.idcard
                    // this.idcard = this.idcard.replace(this.idcard.substring(4, 14), "*********")
                }
            })
        },
        onNameChange(e) {
            let _a = e.mp.detail.value.replace(/ /g, '').trim()
            if (!this.$utils.checkName(_a)) {
                this.nameFail = true
            } else {
                this.nameFail = false
            }
            this.name = _a
        },
        focusFun(n) {
            this.focusIndex = n
        },
        blurFun() {
            this.focusIndex = -1
        },
        onIdCardChange(e) {
            this.idCard = e.mp.detail.value.replace(/ /g, '').trim()
            if (!this.$utils.checkIdcard(this.idCard)) {
                this.idCardFail = true
            } else {
                this.idCardFail = false
            }
        },
        clearName() {
            this.name = ''
            this.nameFail = false
        },
        clearIdCard() {
            this.idCard = ''
            this.idCardFail = false
        },
        checkFaceFrequencyFun() {
            this.$api.checkFaceFrequency({}, res => {
                if (res.code === 0) {
                    console.log('>>>记录刷脸次数成功')
                }
            })
        },
        startDetect() {
            let _this = this
            if (!this.nocheckFace) {
                this.isCertification = true
                // actions: 1摇头2点头7张嘴9眨眼
                // actionsNum: 随机动作数量
                console.log("start .....");
                shumailiveness.detect({
                    actions: "1279",
                    actionsNum: "2"
                }, result => {
                    // result 为json， 字段如下
                    // code 错误码
                    // msg 错误信息
                    // passFace 剪裁后的头像Base64
                    // passImgPath 通过图片地址,未剪裁完整图像
                    // code == 0 时检测成功，会返回图片地址
                    // console.log('活体验证', result.passFace);
                    // _this.checkFaceFrequencyFun()
                    if (result.code == 0) {
                        _this.startCheckIdCard(result)
                    } else {
                        this.isCertification = false
                        modal.toast({
                            message: result.msg,
                            duration: 1.5
                        });
                    }
                });
            } else {
                this.$interactive.toast('人工审核')
                setTimeout(() => {
                    uni.navigateBack({ delta: 1 })
                }, 1000);
            }
        },
        startCheckIdCard(result) {
            let currentTime = new Date().getTime()
            let str = 'KYGgeZhN7OosHooa&' + currentTime + '&KYGgeZhN7OosHooanzyCPlthdcd0SH8Y'
            let sign = this.$utils.md5faceCheck(str)
            uni.request({
                url: 'https://api.shumaidata.com/v4/face_id_card/compare', //仅为示例，并非真实接口地址。
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
                },
                data: {
                    appid: 'KYGgeZhN7OosHooa',
                    timestamp: currentTime,
                    idcard: this.idCard,
                    sign: sign,
                    name: this.name,
                    image: result.passFace
                },
                success: (res) => {
                    if (res.data.code === 200) {
                        if (res.data.data.incorrect === 100 && res.data.data.score > 0.45) {
                            console.log('>>>>>>>>实名认证成功')
                            this.isCertification = false
                            this.SubShiMingRenZheng(result.passFace)
                        } else {
                            this.isCertification = false
                            modal.toast({
                                message: res.data.data.msg,
                                duration: 1.5
                            })
                        }
                    } else {
                        this.isCertification = false
                        // 针对用户
                        if (res.data.msg.indexOf('timestamp') > -1) {
                            let config = { realName: this.name, idcard: this.idCard, facePhotos: '--' }
                            this.shimingFun(config)
                        }
                        modal.toast({
                            message: res.data.msg + '\n请联系客服',
                            duration: 1.5
                        })

                    }
                },
                fail: (err) => {
                    this.isCertification = false
                    console.log('error', err);
                }
            });
        },
        // Base64转文件
        // getBlobBydataURI(dataURI, type) {
        //     var binary = window.atob(dataURI.split(',')[1]);
        //     console.log('>>>>>>window', window, binary)
        //     var array = [];
        //     for (var i = 0; i < binary.length; i++) {
        //         array.push(binary.charCodeAt(i));
        //     }
        //     return new Blob([new Uint8Array(array)], {
        //         type: type
        //     });
        // },
        compare(img) {
            return new Promise(resolve => {
                let that = this
                // console.log('>>>>>3333', img)
                // let blob = this.getBlobBydataURI(img, 'image/png')
                // let formData = new FormData()
                // formData.append("file", blob, "file_" + Date.parse(new Date()) + ".png")
                this.$api.uploadBase64({ base64: img }, res => {
                    if (res.code == 0) {
                        resolve(res.data)
                    } else {
                        this.$interactive.toast(res.msg)
                    }
                });
            });
        },
        // 发起实名认证
        SubShiMingRenZheng(faceBase64Img) {
            if (!this.canEditName) {
                if (this.isPay == 'true') uni.setStorageSync('checkFace', 'true')
                this.$interactive.toast('刷脸成功')
                setTimeout(() => {
                    uni.navigateBack({ delta: 1 })
                }, 1000);
            } else {
                this.compare(faceBase64Img).then(res1 => {
                    let config = { realName: this.name, idcard: this.idCard, facePhotos: res1.serverPath }
                    this.shimingFun(config)
                })
            }
        },
        shimingFun(config) {
            this.$api.SubShiMingRenZheng(config, res => {
                if (res.code == 0) {
                    if (this.isPay == 'true') uni.setStorageSync('checkFace', 'true')
                    this.$interactive.toast('实名成功')
                    setTimeout(() => {
                        uni.navigateBack({ delta: 1 })
                    }, 1000);
                } else {
                    this.$interactive.toast(res.msg)
                }
            });
        }
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
        .tip_box {
            color: #56546c;
            font-size: 28upx;
            margin-top: 40upx;
        }
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
        height: 80upx;
        line-height: 80upx;
        border-radius: 45upx;
        text-align: center;
        font-size: 30upx;
        margin-top: 60upx;
    }
}
</style>
