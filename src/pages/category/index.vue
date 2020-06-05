<template>
    <view>
        <view class="cate_tab">
            <view class="cate_tab_title">
                <view class="title_inner">
                    <uni-segmented-control 
                    :current="current" 
                    :values="items.map(res => res.title)" 
                    @clickItem="onClickItem" 
                    style-type="text" 
                    active-color="#d4237a"
                ></uni-segmented-control>
                </view>
            </view>
            <view class="cate_tab_content">
               <view v-if="current === 0">
                </view>
                <view v-if="current === 1">
                </view>
            </view>
        </view>
        <scroll-view class="cate_list_wrap" scroll-y @scrolltolower="toLower">
            <view class="cate_list">
                <view class="cate_item"
                v-for="(item,index) in category"
                :key="item.id"
                >
                <img-detail :list="category" :index="index">
                    <image :src="item.thumb" mode="widthFix"></image>
                </img-detail>
                
                </view>
            </view>
            </scroll-view>
        </view>
</template>

<script>
import {uniSegmentedControl} from "@dcloudio/uni-ui"
import imgDetail from "../../components/imgDetail"
    export default {
        onLoad(option) {
            this.id = option.id;
            this.getList();
        },
        components: {
        uniSegmentedControl,
        imgDetail
    },
    data() {
        return {
            items: [{title: '最新',order: "new"},{title: '热门',order: "hot"}],
            current: 0,
            params: {
                limit: 30,
                skip: 0,
                order: "new"
            },
            id: 0,
            category: [],
            nofinish: false
        }
    },
    methods: {
        getList() {
            this.request({
                url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
                data: this.params
            }).then(res => {
                if(res.res.vertical.length === 0){
                    this.nofinish = true
                    return;
                }
                
                this.category = [...this.category,...res.res.vertical]
            })
        },
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }else{
                return;
            }
            this.params.order = this.items[e.currentIndex].order;
            this.category = [];
            this.params.skip = 0;
            this.getList();
        },
        toLower() {
            if(this.nofinish){
                uni.showToast({
                    title: '没有数据了',
                    icon: "none"
                })
            }else{
                this.params.skip += this.params.limit
                this.getList()
            }
            
        }
    }
    }
</script>

<style lang="scss" scoped>

.cate_tab{
    .cate_tab_title{
        .title_inner{
            width: 60%;
            margin: 0 auto;
        }
    }
    .cate_tab_content{}
}
//图片列表
.cate_list_wrap {
    height: calc(100vh - 36px);
}
.cate_list {
    display: flex;
    flex-wrap: wrap;
    border: 4rpx white solid;
  .cate_item {
      width: 33.33%;
      border: 4rpx white solid;
    image {

    }
  }
}
</style>