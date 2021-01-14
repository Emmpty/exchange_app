<template>
    <view>
        <myMask ref="updataMask"
                top="0"
                noclickhide="true"
                @onHideHander="onHideUpdateMask()"
                @onShowHander="onShowUpdateMask()">
            <div class="model_box container_flex column center pingmucenter"
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
                                type="book_primary"
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
        }
    },
    components: {
        myMask
    },
    methods: {
        updateVersion() {
            this.$api.updateVersion({}, res => {
                console.log('>>>版本更新信息', this.$version, res.item.versionNo)
                if (this.$version !== res.item.versionNo) {
                    this.$refs.updataMask.showMask()
                    this.updateText = res.item.remark
                    this.hideUpdateCancel = res.item.note
                    this.updateUrl = res.item.versionUrl
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
            plus.runtime.openURL(this.updateUrl);
            if (plus.os.name.toLowerCase() === 'android') {
                plus.runtime.quit();
            }
            else {
                const threadClass = plus.ios.importClass("NSThread");
                const mainThread = plus.ios.invoke(threadClass, "mainThread");
                plus.ios.invoke(mainThread, "exit");
            }
        },
        cancelQuit() {
            this.$refs.updataMask.hideMask()
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
</style>
