<template>
    <view>
        <myMask ref="updataMask"
                top="0"
                :isflexcenter="true"
                :hindex="true"
                noclickhide="true"
                @onHideHander="onHideUpdateMask()"
                @onShowHander="onShowUpdateMask()">
            <div class="model_box container_flex column center"
                 :class="{'active': showActive}"
                 :style="{ height: aheight +'upx', width: awidth +'upx' }">
                <!-- <slot></slot> -->
                <div class="active_box">
                    <div class="update_box_text1">版本更新提示</div>
                    <div class="update_box_text2 text_info">发现新版本，快去更新体验吧~</div>
                    <p class="update_box_text3">{{ updateText }}</p>
                    <div class="button-box container_flex row">
                        <button v-if="!hideUpdateCancel"
                                class="quit_btn"
                                plain="true"
                                hover-class="plain-hover"
                                type="primary"
                                @click.stop="cancelQuit()">取消</button>
                        <button class="noborder confirm_btn"
                                hover-class="primary-hover"
                                type="primary"
                                @click.stop="confirmUpdate()">更新</button>
                    </div>
                </div>
            </div>
        </myMask>
    </view>
</template>
<script>
import myMask from '@/components/mask.vue'

export default {
    props: ['aheight', 'awidth'],
    data() {
        return {
            showActive: false,
            hideUpdateCancel: 0,
            updateText: '',
            updateUrl: '',
            wgtUrl: '',
        }
    },
    components: {
        myMask
    },
    methods: {
        updateVersion() {
            this.$api.updateVersion({}, res => {
                console.log('>>>版本更新信息', this.$common.version, res.item.versionNo)
                if (this.$common.version !== res.item.versionNo) {
                    this.$refs.updataMask.showMask()
                    this.updateText = res.item.remark
                    this.hideUpdateCancel = res.item.status
                    this.updateUrl = res.item.versionUrl
                    this.wgtUrl = res.item.wgtUrl
                }
            })
        },
        onHideUpdateMask() {
            this.showActive = false
        },
        onShowUpdateMask() {
            let _this = this
            setTimeout(() => {
                _this.showActive = true
            }, 200)
        },
        confirmUpdate() {
            let _this = this
            if (this.wgtUrl) {
                this.hotUpdateFun()
            } else if (this.updateUrl) {
                plus.runtime.openURL(this.updateUrl);
                if (plus.os.name.toLowerCase() === 'android') {
                    plus.runtime.quit();
                }
                else {
                    const threadClass = plus.ios.importClass("NSThread");
                    const mainThread = plus.ios.invoke(threadClass, "mainThread");
                    plus.ios.invoke(mainThread, "exit");
                }
            } else {
                plus.nativeUI.toast('无安装包可用，请联系管理员')
            }
        },
        cancelQuit() {
            this.$refs.updataMask.hideMask()
        },
        hotUpdateFun() {
            let _this = this
            var watiting = plus.nativeUI.showWaiting("开始下载：0%");
            // 创建下载任务
            const downloadTask = uni.downloadFile({
                url: _this.wgtUrl,
                success: (res) => {
                    if (res.statusCode === 200) {
                        watiting.setTitle("安装中...");
                        // console.log('>>>>>tempFilePath', res.tempFilePath)
                        plus.runtime.install(res.tempFilePath, {
                            force: true
                        }, function (succ) {
                            // console.log('install success...');
                            plus.nativeUI.closeWaiting();
                            plus.nativeUI.alert('更新完成！', function () {
                                // 热更新自动安装
                                plus.runtime.restart();
                            });
                        }, function (e) {
                            plus.nativeUI.closeWaiting();
                            plus.nativeUI.alert('更新失败,点击确认手动更新', function () {
                                plus.runtime.openURL(_this.updateUrl);
                                plus.runtime.quit();
                            });
                            console.error('install fail...', e);
                        });
                    }
                }
            });
            downloadTask.onProgressUpdate((res) => {
                console.log('下载进度' + res.progress);
                // console.log('已经下载的数据长度' + res.totalBytesWritten);
                // console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
                watiting.setTitle("已下载：" + res.progress + "%");
            });
        },
    },
    onload() {

    }
}
</script>
<style scoped lang="scss">
@import "@/common/scss/common.scss";
.model_box {
    position: absolute;
    width: 75%;
    height: 368upx;
    // max-height: 500upx;
    opacity: 0.5;
    transform: scale(0.5);
    border-radius: 15upx;
    transition: all 0.3s;
    background-color: #fff;
}
.active {
    transform: scale(1);
    opacity: 1;
}
// activeModel
.active_box {
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 20upx;
    box-sizing: border-box;
    word-wrap: break-word;
    word-break: normal;
}
.update_box_text1 {
    font-size: 38upx;
    color: rgb(71, 79, 102);
    font-weight: 600;
    text-align: center;
}
.update_box_text2 {
    font-size: 32upx;
    color: rgb(122, 130, 153);
    margin-top: 20upx;
}
.update_box_text3 {
    color: rgb(122, 130, 153);
    margin-top: 20upx;
}
.button-box {
    position: absolute;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    bottom: 20upx;
    width: 100%;
    height: 100upx;
    align-items: center;
    -webkit-align-items: center;
    left: 0;
}
.quit_btn,
.confirm_btn {
    flex: 1;
    height: 84upx;
    border-radius: 40upx;
    font-size: 34upx;
    line-height: 84upx;
    margin: 0 30upx;
}
.quit_btn {
    border: 1px solid $primarycolor;
    color: $primarycolor !important;
}
.confirm_btn {
    color: #fff;
}
// activeModel end
</style>
