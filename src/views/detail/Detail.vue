<template>
    <div class="detail">
        <detail-nav-bar :detailtitle="detailtitle" class="detail-nav"
         @DetailNavBarClick="DetailNavBarClick" ref="nav"/>
        <!--推荐  属性： DetailNavBar     传值 ：detail-nav-bar       不这么写可能会出错    -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="scroll" >
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-list :detail-info="detailInfo"  @imagesLoad="imagesLoad"/>
        <detail-params-info :param-info="paramInfo" ref="params"/>
        <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
        <goods-list :goods="recommend" ref="recommend"/> 
    </scroll>
       <back-top @click.native="backClick" v-show="isShowBackTop"/>  
    <detail-bottom-bar @addtocart="addToCart"/>
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsList from './childComps/DetailGoddsList'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/contents/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'notwork/detail'
import {debounce} from 'common/unitl'
import {itemLIstenerMixin,backTopMixin} from 'common/mixin'
import { mapActions} from 'vuex'

// import {store} from 'store/index'    

export default {
    name:'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsList,
      DetailParamsInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
    data () {
        return {
            iid:null,
            detailtitle:['商品','参数','评论','推荐'],
            topImages:[], //轮播图的数据
            goods:{}, //保存商品对象数据
            shop:{},  //保存商品对象数据
            detailInfo:{} ,//保存图片展示
            paramInfo:{} ,// 参数数据
            commentInfo:{},//评论信息
            recommend:[] ,//推送信息
            themeTopYs:[],//点击title滚动相应的位置
            getThemeTopY:null,//防抖事件
            currentIndex:0,// 监听滚动到相应的位置所对应的序号
        }
    },
    mixins: [itemLIstenerMixin,backTopMixin], //在vue中生命周期的方法减少复用，就可以把这个方法封装
    created () {
        //1、获取详细商品的id
        this.iid = this.$route.params.iid;
        // console.log(this.iid)
        //2、获取详细商品的数据
    getDetail(this.iid).then( res => {
                // console.log(res);
                // 保存详细页面的数据
                const data = res.result;
                //获取轮播图的数据
                this.topImages = data.itemInfo.topImages;
                // console.log(this.topImages)
                //获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
                // console.log(this.goods.services.length)
                //获取商铺的信息
                this.shop = new Shop(data.shopInfo);
                // console.log(this.shop.score[2].isBetter);
                //获取图片
                this.detailInfo = data.detailInfo;
                //获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
                //去除评论信息  
                //先判断是否有数据
                if (data.rate.cRate !== 0) {
                     this.commentInfo = data.rate.list[0];
                }
              });
                    //请求推荐数据 
            getRecommend().then(
                  res => {
                            // console.log(res)
                            this.recommend = res.data.list;
                  });
                  //点击title滚到相应的地方的防抖事件
                  this.getThemeTopY = debounce(() => {
                      this.themeTopYs = [];
                      this.themeTopYs.push(0);
                      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                      this.themeTopYs.push(Number.MAX_VALUE);
                    //   console.log(this.themeTopYs);
                  },100)
    },
destroyed () {
    //取消事件监听
    this.$bus.$off('itemImgLoad',this.itemImgListener);
},
    methods: {
        ...mapActions(['addCart']),
        imagesLoad(){
            this.$refs.scroll.refresh();
            // console.log("------------");
            //等所有的数据下，并挂载在dom上时在调用这个函数
            //这样 getThemeTopY的数据才够准确
            this.getThemeTopY();
        },
        DetailNavBarClick(index){
            //点击title滚动到相应的位置上  +44 是因为我设置yitle的时候是padding-top 44px
            // console.log("-----");
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index]+44,100);
            // console.log(-this.themeTopYs[index]);
        },
        //时时监听滚动事件
        scroll(position){
            // console.log(position.y);
                // 1、判断那个回顶部的图标是否显示
            this.listenShoBackTop(position);
            //获取滚到的位置
            
            const positionY = -position.y + 50;
            let   length = this.themeTopYs.length;
            for (let i=0;i < length;i++) {
               
                if ((this.currentIndex !== i) && ((i < length-1) && (this.themeTopYs[i] <= positionY) && (positionY < this.themeTopYs[i+1]))) {
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex;
                    // console.log(this.currentIndex);
                }
            }
           
          },
            //加入购物车
          addToCart(){
                const product ={};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;
                /*
              第一种方法
              this.$store.dispatch('addCart', product).then( res => {
                    console.log(res);
                });
                */
            //    第二种
            this.addCart(product).then(res => {
            // console.log(this.$toast.taostShow());
            this.$toast.taostShow('添加成功');
            console.log(res);
            })
            }
 }
}
</script>
<style scoped>  
/* scoped  css的作用域 */
/* pageFullScreen在index.css */
.detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.content{
    height: calc(100% - 44px);
}
</style>