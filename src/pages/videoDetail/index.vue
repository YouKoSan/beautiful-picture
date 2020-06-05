<template>
    <view class="video_play">
        <!-- 工具栏 开始 -->
        <image :src="item.img"></image>
        <view class="video_tool">
            <view @click="changeMuted" :class="['iconfont', muted ? 'iconjingyin' : 'iconshengyin']"></view>
            <view class="iconfont iconzhuanfa">
                <button open-type="share"></button>
            </view>
        </view>
        <!-- 工具栏 结束 -->

        <!-- 视频 开始 -->
        <view class="video_wrap">
            <video :muted="muted" objectFit="fill" :src="item.video"></video>
        </view>
        <!-- 视频 结束 -->

        <!-- 下载 开始 -->
        <view class="download">
            <view class="download_btn" @click="handleDownload">下载高清视频</view>
        </view>
        <!-- 下载 结束 -->
    </view>
</template>

<script>
    export default {
        data() {
            return {
                item: '',
                muted: false
            }
        },
        onLoad() {
            this.item = getApp().globalData.item;
            console.log(this.item);
        },
        methods: {
            changeMuted() {
                this.muted = !this.muted;
            },
            async handleDownload() {
                await uni.showLoading({
                    title: '下载中'
                })
                const result = await uni.downloadFile({url: this.item.video});
                const {tempFilePath} = result[1];
                const result2 = await uni.saveVideoToPhotosAlbum({filePath: tempFilePath});
                console.log(result2);
                uni.hideLoading();
                if(result2[0] === 'null'){
                    uni.showToast({
                    title: "下载完成"
                })
                }else{
                    uni.showToast({
                    title: "下载失败"
                }) 
                }
                
         }
        }
    }
</script>

<style lang="scss" scoped>
.video_play {
position: relative;
    image{
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    //css3滤镜
    filter: blur(20px);
    }
  .video_tool {
    margin-top: 10rpx;
    height: 80rpx;
    display: flex;
    justify-content: flex-end;
    .iconfont {
        height: 80rpx;
        width: 80rpx;
        font-size: 50rpx;
        color: white;
        display: flex;
        border-radius: 40rpx;
        background-color: rgba(0, 0, 0,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20rpx;
        
        position: relative;
        button{
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
        
    }
  }

  .video_wrap {
      width: 100vw;
      display: flex;
      justify-content: center;
      margin-top: 20rpx;
    video {
        width: 420rpx;
        height: 700rpx;
    }
  }

  .download {
      display: flex;
      justify-content: center;
    .download_btn {
        width: 420rpx;
        height: 80rpx;
        border-radius: 40rpx;
        border: 2rpx white solid;
        font-size: 36rpx;
        font-weight: 500;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0,0.5);
        margin-top: 20rpx;
    }
  }
}
</style>