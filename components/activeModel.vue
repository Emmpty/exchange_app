<template>
    <div class="model_box container_flex column center pingmucenter"
         :class="{'active': showActive}"
         :style="{ height: aheight +'upx', width: awidth +'upx' }">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ['showActive', 'aheight', 'awidth'],
    data() {
        return {
        }
    },
    methods: {
    },
    onload() {

    }
}
</script>
<style scoped lang="scss">
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
