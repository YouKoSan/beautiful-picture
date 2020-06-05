<template>
    <view 
    @touchstart="handleTouchstart" 
    @touchend="handleTouchend" >
        <slot></slot>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                startX: 0,
                startTime: 0,
                startY: 0
            }
        },
        methods: {
            handleTouchstart(event) {
            this.startX = event.changedTouches[0].clientX
            this.startY = event.changedTouches[0].clientY
            this.startTime = Date.now()
            },
            handleTouchend(event) {
                const endX = event.changedTouches[0].clientX
                const endY = event.changedTouches[0].clientY
                const endTime = Date.now()

                if(endTime - this.startTime > 2000){
                    return;
                }
                let direction = ''
                if(Math.abs(endX - this.startX) > 10 && (endY - this.startY) < 10){
                    direction = (endX - this.startX) > 0 ? 'right' : 'left'
                   this.$emit("handleTouch",{direction})
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>