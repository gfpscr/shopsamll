<template>
    <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
            <div class="info-desc clear-fix">
                <div class="start"></div>
                    <div class="desc">{{detailInfo.desc}}</div>
                    <div class="end"></div>
            </div>
            <div v-for="(item,index) in detailInfo.detailImage" :key="index">
            <div class="info-key">{{item.key}}</div>
            <div class="info-list">
                <img v-for="(item1,index) in item.list" :src="item1" :key="index" @load="imgLoad">
            </div>
            </div>
    </div>
</template>
<script>
export default {
    name:'DetailGoodsList',
    props: {
        detailInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data () {
        return {
            counter:0,        
            imagesLength:0,  //监听图片的个数
        }
    },
    methods: {
        imgLoad(){

            //判断所有的图片都加载完了，那么进行一次回调就可以了
            if (++this.counter === this.imagesLength) {
                this.$emit("imagesLoad")
            }
        }
    },
    watch: {  //可以监听某个属性的变化
        detailInfo(){//监听图片加载完了吗
            this.imagesLength = this.detailInfo.detailImage[0].list.length;
        }
    }
}
</script>
<style scoped>
/* pageFullScreen在index.css */
.goods-info{
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
}
    .info-desc{
        padding: 0 15px;
    }
    .info-desc .start, .info-desc .end{
        width: 90px;
        height: 1px;
        background-color: #a3a3a5;
        position: relative;
    }
    .info-desc .start{
        float: left;
    }
    .info-desc .end{
        float: right;
    }
    .info-desc .start::before, .info-desc .end::after{
        content: '';
        position: absolute;
        width:5px;
        height: 5px;
        background-color: #333;
        bottom: 0;
    }
    .info-desc .end::after{
        right: 0;
    }
    .info-desc .desc{
        padding: 15px 0;
        font-size: 14px;
    }
    .info-key{
        margin: 10px 0 10px 15px;
        color: #333;
        font-size: 15px;
    }
    .info-list img{
        box-sizing: border-box;
        padding: 1% 0;
        width: 100%;
    }
</style>
