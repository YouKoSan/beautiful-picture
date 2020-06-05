<template>
<scroll-view class="home_category_wrap" scroll-y>
    <view scroll-y class="home_category">
        
        <navigator class="cate_item"
        v-for="item in category"
        :key="item.id"
        :url="`/pages/category/index?id=${item.id}`"
        >
        <image mode="aspectFill" :src="item.cover"></image>
        <view class="cate_name">{{item.name}}</view>
        </navigator>

    </view>
</scroll-view>
</template>
<script>
export default {
    data() {
        return {
            category: []
        }
    },
    mounted () {
        uni.setNavigationBarTitle({title: "分类"});
        this.getList();
    },
    methods: {
        getList() {
            this.request({
                url: 'http://157.122.54.189:9088/image/v1/vertical/category'
            }).then(res => {
                this.category = res.res.category
                
            })
        }
    }
}
</script>
<style lang="scss">
.home_category_wrap{
    height: calc(100vh - 36px);
}
.home_category {
    display: flex;
    flex-wrap: wrap;
    border: 4rpx white solid;
  .cate_item {
      width: 33.33%;
      position: relative;
      border: 4rpx white solid;
    image {
       height: 240rpx; 
    }

    .cate_name {
        position: absolute;
        left: 0;
        bottom: 0;
        color: white;
        font-size: 42rpx;
        width: 100%;
        height: 50rpx;
        display: flex;
        align-items: center;
        background-image: linear-gradient(to right,rgba(0, 0, 0,0.2) ,rgba(255, 255, 255,0));
        padding-left: 20rpx;
    }
  }
}
</style>