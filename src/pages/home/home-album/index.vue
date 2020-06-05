<template>
    <scroll-view  @scrolltolower="handleToLower" scroll-y class="scroll_view_wrap">
        <!-- swiper 开始 -->
        <view class="album_swiper">
            <swiper indicator-dots indicator-color="pink" indicator-active-color="red"
            autoplay >
                <swiper-item v-for="item in banner" :key="item.id">
                    <image :src="item.thumb"></image>
                </swiper-item>
            </swiper>
        </view>
        <!-- swiper 结束 -->

        <!-- 列表开始 -->
        <view class="album_list">
            <navigator class="album_item"
            v-for="item in album" 
            :key="item.id"
            :url="`/pages/album/index?id=${item.id}`"
            >
            <image mode="aspectFill" :src="item.cover"></image>
            <view class="album_info">
                <view class="album_name">{{item.name}}</view>
                <view class="album_desc">{{item.desc}}</view>
                <view class="album_btn">
                    <text class="album_atention">+ 关注</text>
                </view>
            </view>
            </navigator>
        </view>
        <!-- 列表结束 -->
    </scroll-view>
</template>
<script>
export default {
    data() {
        return {
            params: {
                limit: 30,
                order: "hot",
                skip: 0
            },
            //轮播图数字
            banner: [],
            //列表数组
            album: [],
            nofinish: true
        }
    },
    mounted () {
        uni.setNavigationBarTitle({title: "专辑"}),
        this.getList()
    },
    methods: {
        getList () {
            this.request({
            url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
            data: this.params
        }).then(res => {
            if(res.res.album.length === 0){
                this.nofinish = false;
                return;
            }
            this.banner = res.res.banner;
            this.album =[...this.album,...res.res.album];
        })
        },
        handleToLower () {
            if(this.nofinish){
            this.params.skip += this.params.limit;
            this.getList ()
            }else{
                uni.showToast({
                    title: "没有数据啦"
                })
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
.scroll_view_wrap{
    height: calc(100vh - 36px);
}
    .album_swiper{
        swiper{
            height: calc(750rpx/2.3);
            image{
                height: 100%;
            }
        }
    }
    //列表
    .album_list {
        padding: 10rpx;
  .album_item {
      padding: 20rpx 0;
      display: flex;
      border-bottom: 2rpx gainsboro solid;
    image {
        flex: 1;
        width: 200rpx;
        height: 200rpx;
    }

    .album_info {
        flex: 2;
        overflow: hidden;
        padding-left: 30rpx;
      .album_name {
          padding-left: 10rpx;
          font-weight: 500;
          font-size: 34rpx;
          color: black;
      }

      .album_desc {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
      }

      .album_btn {
          padding-top: 60rpx;
        display: flex;
        justify-content: flex-end;
        text.album_atention {
            padding: 4rpx 6rpx;
            border:  4rpx $color solid;
            color: $color;
        }
      }
    }
  }
}
</style>