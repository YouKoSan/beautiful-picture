<template>
   <view>
        <view class="home_tab">
            <view class="home_tab_title">
                <view class="title_inner">
                    <uni-segmented-control 
                    :current="current" 
                    :values="items" 
                    @clickItem="onClickItem" 
                    style-type="text" 
                    active-color="#d4237a"
                ></uni-segmented-control>
                </view>
                <view class="iconfont iconsearch"></view>
            </view>
            <view class="home_tab_content">
                <view v-if="current === 0">
                    <home-recommend></home-recommend>
                </view>
                <view v-if="current === 1">
                    <home-category></home-category>
                </view>
                <view v-if="current === 2">
                    <home-new></home-new>
                </view>
                <view v-if="current === 3">
                    <home-album></home-album>
                </view>
            </view>
        </view>
   </view>
</template>

<script>
import homeRecommend from "./home-recommend/index"
import homeCategory from "./home-category/index"
import homeNew from "./home-new/index"
import homeAlbum from "./home-album/index"
import {uniSegmentedControl} from "@dcloudio/uni-ui"
export default {
    components: {
        homeRecommend,
        homeCategory,
        homeNew,
        homeAlbum,
        uniSegmentedControl
    },
    data() {
        return {
            items: ['推荐','分类','最新','专辑'],
            current: 1
        }
    },
    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }
    },
    //https://www.showdoc.cc/414855720281749?page_id=3680857125411215
}
</script>

<style lang="scss">
.home_tab{
    .home_tab_title{
        position: relative;
        .title_inner{
            width: 60%;
            margin: 0 auto;
        }
        .iconsearch{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 5%;
        }
    }
    .home_tab_content{

    }
}
</style>