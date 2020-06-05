<template>
    <view @click="toDetail">
        <slot></slot>
    </view>
    
</template>

<script>
    export default {
        props: {
            list: Array,
            index: Number
        },
        methods: {
            toDetail () {
                getApp().globalData.list = this.list;
                getApp().globalData.index = this.index;
                uni.navigateTo({
                    url: "/pages/imgDetail/index"
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>