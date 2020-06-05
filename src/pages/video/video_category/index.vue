<template>
 <view>
       <scroll-view scroll-y enable-flex @scrolltolower="toLower" class="video_wrap">
        <view class="video_cateItem"
        v-for="item in videowp"
        :key="item.id"
        >
        <image mode="widthFix" :src="item.img"></image>
        </view>
    </scroll-view>
</view>
</template>

<script>
import {uniSegmentedControl} from "@dcloudio/uni-ui"
    export default {
        props: {
            videoInfo: Object
        },
        data() {
            return {
                videowp: ''
                    }
            }
    }
</script>

<style lang="scss" scoped>

</style>