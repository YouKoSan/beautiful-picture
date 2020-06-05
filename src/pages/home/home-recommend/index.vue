<template>
    <scroll-view @scrolltolower="handleToLower" scroll-y class="recommend_view" v-if="recommend.length">
        <!-- 推荐开始 -->
        <view class="recommend_wrap">
            <view class="recommend_item"
            v-for="item in recommend" :key="item.id"
            >
                <image mode="widthFix" :src="item.thumb"></image>            
            </view>
        </view>
         <!-- 推荐结束 -->
         <!-- 月份 开始 -->
         <view class="months_wrap">
             <view class="months_title"  v-if="months.MM">
                 <view class="months_title_info">
                     <view class="months_info">
                     <text>{{months.MM}}</text>
                     / {{months.DD}} 月
                    </view>
                    <view class="months_text">你负责美丽就好</view>
                 </view>
                 <view class="months_more">更多>></view>
             </view>
             <view class="months_content">
                 <view class="months_item" v-for="(item,index) in months.items" :key="item.id">
                     <img-detail :list="months.items" :index="index">
                        <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
                     </img-detail>
                 </view>
             </view>
         </view>
         <!-- 月份 结束 -->
         <!-- 热门 开始 -->
         <view class="hots_wrap">
             <view class="hots_title">
                 <text>热门</text>
             </view>
             <view class="hots_content">
                 <view class="hots_item"
                 v-for="(item,index) in hots"
                 :key="item.id"
                 >
                 <img-detail :list="hots" :index="index">
                    <image mode="widthFix" :src="item.thumb"></image>
                 </img-detail>
                 </view>
             </view>
         </view>
         <!-- 热门 结束 -->
    </scroll-view>
</template>
<script>
import moment from "moment"
import imgDetail from "../../../components/imgDetail"
export default {
    components: {
        imgDetail
    },
    data() {
        return {
            //推荐
            recommend: [],
            //月份
            months: {},
            hots: [],
            params:{
                limit: 30,
                order: "hot",
                skip: 0
            },
            noFinish: true
        }
    },
    methods: {
        handleToLower() {
            if(this.noFinish){
            this.params.skip += this.params.limit
            this.getList()
            }else{
                uni.showToast({
                title: '没有数据了',
                duration: 2000
            });
            }
            
            
        },
        getList(){
            this.request({
            url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
            data: this.params
        }).then(res => {
            if(res.res.vertical.length === 0){
                this.noFinish = false
                return;
            }
            if(this.recommend) {
            this.recommend = res.res.homepage[1].items;
            this.months = res.res.homepage[2];
            this.months.MM = moment(this.months.stime).format("MM");
            this.months.DD = moment(this.months.stime).format("DD");
            }
            this.hots = [...this.hots,...res.res.vertical];
        })
        }
    },
    mounted(){
        uni.setNavigationBarTitle({title: "推荐"}),
        this.getList()
    }
}
</script>
<style lang="scss" scoped>
.recommend_view{
    height: calc(100vh - 36px);
}
    .recommend_wrap{
        display: flex;
        flex-wrap: wrap;
        .recommend_item{
            width: 50%;
            border: 3rpx solid white;
        }
    }
    // yue fen
    .months_wrap {
        .months_title {
            display: flex;
            justify-content: space-between;
            padding: 20rpx;
            .months_title_info {
                color: $color;
                font-size: 30rpx;
                font-weight: 600;
                display: flex;
            .months_info {
                
                text {
                    font-size: 36rpx;
                }
            }
            .months_text {
                font-size: 34rpx;
                color: #666;
                margin-left: 30rpx;
            }
            }
            .months_more {
                color: $color;
                font-size: 24rpx;
            }
    }

    .months_content {
        display: flex;
        flex-wrap: wrap;
        .months_item{
            width: 33.33%;
            border: 5rpx solid white;
        }
  }
}
 //hots
.hots_wrap {
  .hots_title {
      padding: 20rpx;
      text{
        font-size: 34rpx;
        font-weight: 600;
        padding-left: 20rpx;
        border-left: 20rpx $color solid;
    }
  }

  .hots_content {
      display: flex;
      flex-wrap: wrap;
    .hots_item {
        width: 33.33%;
        border: 5rpx solid white;
      image {

      }
    }
  }
}
</style>