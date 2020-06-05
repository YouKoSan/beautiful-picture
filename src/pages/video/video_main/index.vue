<template>
    <scroll-view scroll-y enable-flex @scrolltolower="toLower" class="video_wrap">
        <view class="video_imgItem"
        v-for="item in videowp"
        :key="item.id"
        @click="navigateTo(item)"
        >
        <image mode="widthFix" :src="item.img"></image>
        </view>
    </scroll-view>
</template>

<script>
    export default {
        props: {
            videoInfo: Object
        },
        data() {
            return {
                videowp: '',
                nofinish: true
            }
        },
        watch: {
            videoInfo() {
                this.nofinish = true;
                this.videowp = '';
                this.videoInfo.skip = 0;
                this.getList();
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                this.request({
                    url: this.videoInfo.url,
                    data: this.videoInfo.params
                }).then(res => {
                    if(res.res.videowp.length === 0){
                        this.nofinish = false
                        return
                    }
                    this.videowp = [...this.videowp,...res.res.videowp]
                })
            },
            toLower() {
                if(this.nofinish) {
                    this.videoInfo.params.skip += this.videoInfo.params.limit;
                    this.getList();
                }else{
                    uni.showToast({
                        title: "数据加载完成",
                        icon: "none"
                    })
                }
                
            },
            navigateTo(item) {
                getApp().globalData.item = item;
                uni.navigateTo({
                    url: '/pages/videoDetail/index'
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.video_wrap {
display: flex;
flex-wrap: wrap;
height: calc(100vh - 36px);
  .video_imgItem {
      width: 33.33%;
      border: 4rpx white solid;
    image {

    }
  }
}
</style>