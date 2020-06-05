<template>
    <view>
        <!-- 用户信息 开始 -->
        <view class="user_info">
            <view class="user_icon"><image v-if="imgDetail.user.avatar" :src="imgDetail.user.avatar" mode="widthFix"></image>
            <view class="user_desc">
                <view v-if="imgDetail.user.name" class="user_name">{{imgDetail.user.name}}</view>
                <view v-else class="user_name">无用户</view>
                <view class="user_time">{{imgDetail.btime}}</view>
            </view>
        </view>
    </view>
    <!-- 用户信息 结束 -->

    <!-- 高清大图 开始 -->
    <swiper-action @handleTouch="doTandleTouch">
    <image class="user_image" :src="imgDetail.newThumb" mode="widthFix"></image>
    </swiper-action>
    <!-- 高清大图 结束 -->
    <!-- 点赞 开始 -->
    <view class="user_rank">
        <view class="rank">
            <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
        </view>
        <view class="user_collect">
            <text class="iconfont iconshoucang">收藏</text>
        </view>
    </view>
    <!-- 点赞 结束 -->
    <!-- 专辑 开始 -->
    <view class="album_wrap" v-if="album.length">
        <!-- title -->
        <view class="album_title">相关</view>
        <!-- content -->
        <view class="album_list"
        v-for="item in album" :key="item.id"
        >
        <view class="album_cover">
            <image :src="item.cover" mode="aspectFill"></image>
        </view>
        <!-- right -->
        <view class="album_info">
            <view class="album_info_text">专辑</view>
            <view class="album_name">{{item.name}}</view>
            <view class="iconfont iconiconfontjiantou4"></view>
        </view>
        </view>
    </view>
    <!-- 专辑 结束 -->
    <!-- 最热评论 开始 -->
    <view class="comment hot" v-if="hot.length">
        <view class="comment_title">
            <view class="iconfont iconhot1"></view>
            <view class="comment_text">最热评论</view>
        </view>
        <view class="comment_list">
            <view class="comment_item"
            v-for="item in hot" :key="item.id"
            >
            <!-- 用户信息 -->
            <view class="comment_user">
                <!-- 用户头像 -->
                <view class="user_icon">
                    <image :src="item.user.avatar" mode="widthFix"></image>
                    <view class="user_name">
                        <view class="user_nickname">{{item.user.name}}</view>
                        <view class="user_time">{{item.ntime}}</view>
                    </view>
                    <!-- 用户徽章 -->
                    <view class="user_badge">
                        <image v-for="item2 in item.user.title"
                        :key="item2.id"
                        :src="item2.icon"
                        >
                        </image>
                    </view>
                </view>
            <view class="comment_desc">
                <view class="comment_content">{{item.content}}</view>
                <view class="comment_like">
                    <text class="iconfont icondianzan">{{item.size}}</text>
                </view>
            </view>
            </view>
            </view>
        </view>
    </view>
    <!-- 最热评论 结束 -->
    <!-- 普通评论 开始 -->
    <view class="comment hot" v-if="comments.length">
        <view class="comment_title">
            <view class="iconfont iconpinglun"></view>
            <view class="comment_text">最新评论</view>
        </view>
        <view class="comment_list">
            <view class="comment_item"
            v-for="item in comments" :key="item.id"
            >
            <!-- 用户信息 -->
            <view class="comment_user">
                <!-- 用户头像 -->
                <view class="user_icon">
                    <image :src="item.user.avatar" mode="widthFix"></image>
                    <view class="user_name">
                        <view class="user_nickname">{{item.user.name}}</view>
                        <view class="user_time">{{item.ntime}}</view>
                    </view>
                    <!-- 用户徽章 -->
                    <view class="user_badge">
                        <image v-for="item2 in item.user.title"
                        :key="item2.id"
                        :src="item2.icon"
                        >
                        </image>
                    </view>
                </view>
            <view class="comment_desc">
                <view class="comment_content">{{item.content}}</view>
                <view class="comment_like">
                    <text class="iconfont icondianzan">{{item.size}}</text>
                </view>
            </view>
            </view>
            </view>
        </view>
    </view>
    <!-- 普通评论 结束 -->
    <!-- 下载 开始 -->
    <view class="download">
        <view class="download_btn" @click="handleDownload">下载图片</view>
    </view>
    <!-- 下载 结束 -->
    </view>
</template>

<script>
import moment from "moment"
import swiperAction from "../../components/swiperAction"
//设置语言为中文
moment.locale("zh-cn")
    export default {
        components: {
            swiperAction
        },
        data() {
            return {
                imgDetail: {},
                album: [],
                hot: [],
                comments: [],
                index: 0
            }
        },
        onLoad () {
            const {index} = getApp().globalData;
            this.index = index;
            this.getData();
        },
        methods: {
            getData() {
                const {list} = getApp().globalData;
                this.imgDetail = list[this.index];
                this.imgDetail.btime = moment(this.imgDetail.atime*1000).fromNow();
                this.imgDetail.newThumb = this.imgDetail.thumb;
                this.getComments(this.imgDetail.id);
            },
            getComments (id) {
                this.request({
                    url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
                }).then(res => {
                    this.album = res.res.album;
                    this.hot = res.res.hot;
                    this.hot.forEach(item => {
                    item.ntime = moment(item.atime*1000).fromNow()
                    })
                    this.comments = res.res.comment;
                    this.comments.forEach(item => {
                    item.ntime = moment(item.atime*1000).fromNow()
                    })
                })
            },
         doTandleTouch(e) {
             const {list} = getApp().globalData;
             if(e.direction === 'left' && this.index < list.length - 1){
                 this.index ++;
                 this.getData()
             }else if(e.direction === 'right' && this.index > 0){
                 this.index --;
                 this.getData()
             }else{
                 uni.showToast({
                     title: "没有数据了",
                     icon: "none"
                 })
             }
         },
         async handleDownload() {
             await uni.showLoading({
                 title: '下载中'
             })
             const result = await uni.downloadFile({url: this.imgDetail.thumb});
             const {tempFilePath} = result[1];
             const result2 = await uni.saveImageToPhotosAlbum({filePath: tempFilePath});
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
        },
    }
</script>

<style lang="scss" scoped>
//userinfo
.user_info {
    padding: 20rpx;
  .user_icon {
      display: flex;
      align-items: center;
    image {
        width: 88rpx;
        border-radius: 50%;
    }

    .user_desc {
        padding-left: 20rpx;
      .user_name {
          color: black;
          font-size: 32rpx;
          font-weight: 500;
      }

      .user_time {
          color: gray;
          font-size: 24rpx;
      }
    }
  }
}
//gaoqingdatu
.user_image {
    width: 100%;
}
//dianzan
.user_rank {
    display: flex;
    height: 80rpx;
    border-bottom: 5rpx #eee solid;
  .rank {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    .iconfont{

    }
  }

  .user_collect {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    .iconfont{

    }
  }
}
//zhuanji
.album_wrap {
 padding: 10rpx;
 border-bottom: 5rpx #eee solid;
  .album_title {
      padding: 10rpx 0;
  }

  .album_list {
      display: flex;
    .album_cover {
        flex: 1;
      image {
          width: 180rpx;
          height: 180rpx;
      }
    }
    .album_info {
        flex: 3;
        padding-left: 20rpx;
        position: relative;
      .album_info_text {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
      }

      .album_name {
          padding: 10rpx 0;
          color: rgb(83, 82, 82);
          font-size: 500;
      }
      .iconfont {
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10%;
          color: rgb(83, 82, 82);;
      }
    }
  }
}
//最热评论
.comment {
  .comment_title {
      padding: 12rpx;
      display: flex;
      align-items: center; 
    .iconfont{
        color: red;
        font-size: 46rpx;
    }

    .comment_text {
        font-weight: 500;
        font-size: 36rpx;
        color: #666;
        margin-left: 10rpx;
    }
  }

  .comment_list {
    padding: 10rpx;
    .comment_item {
        padding: 20rpx 10rpx;
        border-bottom: 5rpx #eee solid;
        .comment_user {
        .user_icon {
            display: flex;
            image {
                width: 10%;
            }

            .user_name {
                padding-left: 20rpx;
                flex: 1;
            .user_nickname {
                color: #777;
                font-size: 32rpx;
            }

            .user_time {
                color: #ccc;
                font-size: 24rpx;
                padding: 5rpx;
            }
            }
            .user_badge {
                display: flex;
                text-align: right;
            image {
                width: 40rpx;
                height: 40rpx;
                border-radius: 50%;
            }
            }
        }

        .comment_desc {
            display: flex;
            justify-content: space-between;
            padding: 20rpx 0;
            .comment_content {
                padding-left: calc(10vw + 20rpx);
                font-size: 28rpx;
                font-weight: 600;
            }

            .comment_like {
                
            .iconfont{

            }
            }
        }
        }
    }
}
}
//最新
.iconpinglun{
    color: aqua !important;
}
//download_btn
.download{
    width: 100%;
    height: 120rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .download_btn{
        width: 90%;
        height: 80%;
        background-color: $color;
        color: white;
        font-size: 50rpx;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>