<template>
    <view>
        <!-- 专辑背景开始 -->
        <view class="album_bg">
            <image mode="widthFix" :src="album.cover"></image>
            <view class="album_info">
                <view class="album_name">{{album.name}}</view>
                <view class="album_btn">关注专辑</view>
            </view>
        </view>
        <!-- 专辑背景结束 -->
        <!-- 专辑作者 开始 -->
        <view class="album_author">
            <view class="album_author_info">
                <image mode="widthFix" :src="album.user.avatar"></image>
                <view class="album_author_name">{{album.user.name}}</view>
            </view>
            <view class="album_author_desc">
                <text>{{album.desc}}</text>
            </view>
        </view>
        <!-- 专辑作者 结束 -->
        <!-- 列表 开始 -->
        <view class="album_list">
            <view class="album_item" v-for="(item,index) in wallpaper"
            :key="item.id"
            >
            <img-detail :list="wallpaper" :index="index">
                <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)">
            </img-detail>
            </view>
        </view>
        <!-- 列表 结束 -->
    </view>
</template>
<script>
import imgDetail from "../../components/imgDetail"
export default{
//https://www.showdoc.cc/414855720281749?page_id=3831395833230905
    components: {
        imgDetail
    },
    data() {
        return {
            params: {
                limit: 30,
                order: "new",
                skip: 0,
                //first=1,表示第一次获取数据，将会获取到album和wallpaper
                //如果first=0表示不是第一次获取数据，此时，只获取wallpaper
                first: 1
            },
            id: -1,
            album: {},
            wallpaper: [],
            hasMore: true
        }
    },
    onLoad(options) {
        this.id = options.id;
        // this.id = "5e5cf679e7bce739db1281e4"
        this.getList ()
    },
    //页面触底，上拉加载下一页
    onReachBottom () {
        if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList ();
        this.params.first = 0;
        } else{
            uni.showToast({
                title: '没数据了'
            })
        }
        
    },
    methods: {
        getList () {
            this.request({
            url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
            data: this.params
        }).then(res => {
            if (Object.keys(this.album).length === 0){
                this.album = res.res.album;
            }
            if(res.res.wallpaper.length === 0){
                this.hasMore = false;
                return;
            }
            this.wallpaper = [...this.wallpaper,...res.res.wallpaper];
            
        })
        }
    }
}
</script>
<style lang="scss" scoped>
//bg
.album_bg {
    position: relative;
  image {

  }

  .album_info {
      width: 100%;
      padding: 0 20rpx;
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80rpx;
    .album_name {
        font-size: 40rpx;
    }

    .album_btn {
        width: 152rpx;
        height: 50rpx;
        color: white;
        font-size: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $color;
        border-radius: 5rpx;
    }
  }
}
//info
.album_author {
    padding: 10rpx;
  .album_author_info {
      display: flex;
    image {
        width: 50rpx;
        border-radius: 50%;
    }

    .album_author_name {
        color: black;
        margin-left: 15rpx;
        font-size: 32rpx;
        font-weight: 500;
    }
  }

  .album_author_desc {

  }
}
//list
.album_list {
    display: flex;
    flex-wrap: wrap;
  .album_item {
      width: 33.33%;
    image {
        border: 3rpx white solid;
        height: 160rpx;
    }
  }
}
</style>
