<template>
    <div class="time-KP-box white-bgcolor">
        <scroll-view class=""
                     scroll-y="false">
            <div class="part-container">
                <div class="title">交易类型</div>
                <div class='container_flex row time_box'>
                    <div class="select-time-item"
                         :class="{selected:index === transactionTypeIndex}"
                         v-for="(titem, index) in transactionTypeList"
                         :key="index"
                         @click="changetTpye(index)">{{ titem.title }}</div>
                </div>
            </div>
            <div class="part-container"
                 v-if="orderStateList">
                <div class="title">订单状态</div>
                <div class="time_box">
                    <div class="select-time-item"
                         v-for="(q, qindex) in orderStateList"
                         :key="qindex"
                         :class="{'selected': qindex === orderStateIndex}"
                         @click="changeOrderTpye(qindex)">
                        {{ q.type | orderStatusTextFilters(transactionTypeIndex) }}
                    </div>
                </div>
            </div>
        </scroll-view>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ['transactionTypeList', 'orderStateList', 'transactionTypeIndex', 'orderStateIndex'],
    data() {
        return {
        }
    },
    filters: {
        orderStatusTextFilters(refundStatus, type) {
            switch (refundStatus) {
                case 0:
                    return type == 0 || type == -1 ? '待支付' : '待打款';
                case 1:
                    return type == 0 || type == -1 ? '已支付' : '已打款';
                case 2:
                    return type == 0 || type == -1 ? '待确认' : '已确认';
                case 3:
                    return '已完成';
                case 4:
                    return '已失效';
            }
        },
    },
    computed: {
    },
    methods: {
        changetTpye(index) {
            this.$emit('changetTpye', index)
        },
        changeOrderTpye(index) {
            this.$emit('changeOrderTpye', index)
        }
    },
    onLoad() {
    }
}
</script>
<style scoped lang="scss">
@import "@/common/scss/common.scss";
.title {
    font-size: 32upx;
    color: #909ca2;
    text-align: justify;
    padding-right: 30upx;
    position: relative;
    height: 60upx;
    line-height: 60upx;
    font-weight: bold;
}
.time-KP-box {
    border-top: 2upx solid $borderColor;
    padding-bottom: 30upx;
}
.part-container {
    padding: 22upx 0upx 0upx 28upx;
}
.time_box {
    flex-wrap: wrap;
    padding-left: 15upx;
    box-sizing: border-box;
    display: flex;
}
.select-time-item {
    background: rgba(247, 247, 247, 1);
    min-width: 115upx;
    height: 60upx;
    display: inline-block;
    padding: 0 20upx;
    text-align: center;
    font-size: 28upx;
    line-height: 60upx;
    margin: 12upx 35upx 10upx 0upx;
    color: $colorlight;
    border-radius: 20upx;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    transition: all 0.2s;
    flex: 1 1 auto;
}
.select-time-item.selected {
    color: white;
    background: rgba(69, 183, 255, 1);
    // line-height: null !important;
}

.knowledgePoints-box {
    padding: 20upx 30upx 22upx 28upx;
    .knowledgePoints-text {
        font-size: 30upx;
        color: #000;
        text-align: center;
        margin: 0 20upx 0 0;
    }
    .knowledgePoints-selectItem-box {
        position: relative;
        left: 90upx;
        top: -35upx;
        padding: 0 30upx;
    }
    .knowledgePoints-selectItem {
        height: 60upx;
        line-height: 60upx;
        border-radius: 15upx;
        text-align: center;
        font-size: 28upx;
        margin-bottom: 30upx;
        margin-right: 30upx;
        color: #828282;
        border: 1upx solid;
        min-width: 100upx;
        display: inline-block;
        padding: 0 15upx;
    }
    .knowledgePoints-selectItem.selected {
        background-color: $primarycolor;
        color: #fff;
    }
    .knowledgePoints-selectItem.allKp {
        margin-right: 100%;
    }
}
</style>