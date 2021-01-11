const interactive = {
    needLoadingRequestCount: 0,
    showLoading(title) {
        if (this.needLoadingRequestCount === 0) {
            uni.showLoading({
                title: title || '',
                mask: true,
            });
        }
        this.needLoadingRequestCount++;
    },
    hideLoading() {
        if (this.needLoadingRequestCount <= 0) return;
        this.needLoadingRequestCount--;
        console.log('>>>>>hide')
        if (this.needLoadingRequestCount === 0) {
            uni.hideLoading()
        }
    },
    // // 声明一个对象用于存储请求个数
    // showFullScreenLoading() {

    // },
    // tryHideFullScreenLoading() {

    // },
    toast(test, duration) {
        uni.showToast({
            title: test,
            icon: 'none',
            duration: duration || 2000
        });
    },
    showCancelModal(test, callBack) {
        uni.showModal({
            title: '提示',
            content: test,
            success: function (res) {
                if (res.confirm) {
                    // console.log('用户点击确定');
                    callBack();
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    },
    unShowCancelModal(test, callBack) {
        uni.showModal({
            title: '提示',
            content: test,
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    // console.log('用户点击确定');
                    callBack();
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    },
    // 預覽單張圖片
    previewImage(tempSrc) {
        let tempArr = [];
        tempArr.push(tempSrc);
        uni.previewImage({
            urls: tempArr
        });
    }
}

export default {
    interactive
}