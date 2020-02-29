<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行','新款','精选']" 
      class="tab-control" @tabClick='tabClick' ref="tabControl2" v-show="isTabFixed"></tab-control>
<!-- 
怎么解决tab-control 不消失？？？？
复杂一份组件在nav-tab组件下面，然后用一个v-show来显示隐藏，
isTabFixed是判断滚动到哪里了，当滚到
下面这个tab-control是isTabFixed就为turn，这显示
 -->

      <scroll class="content" ref="scroll" :probeType="3" 
      @scroll="scrollClick" :pull-up-load="true" 
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="SwiperImgLoad"></home-swiper>
      <recommend :recommends="recommends"></recommend>
      <feature/>
      <tab-control :titles="['流行','新款','精选']"  @tabClick='tabClick'  ref="tabControl1"></tab-control>
      <goods-list :goods="showgoods"/>
      </scroll>  
       <back-top @click.native="backClick" v-show="isShowBackTop"/>   
       <!--  native监听组件的原生组件时，才可以实现-->
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/contents/tabControl/TabControl'
import GoodsList from 'components/contents/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import Recommend from './childComps/RecommendView'
import Feature from './childComps/FeatureView'

import {getHomeMultidata,getGoodsData} from 'notwork/home'
import {itemLIstenerMixin,backTopMixin} from 'common/mixin'

export default {
  name: 'home',
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemLIstenerMixin,backTopMixin],
  data () {
    return {
      // result:null
      banners:[],
      recommends:[],
      goods:{   //展示商品的数据
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]},
      },
      currentType:'pop',  //分类
      tabOffsetTop:0,     //tab-control距离顶部的初始值
      isTabFixed:false,   //tab-control2在动态绑定class的默认值
      saveY:0,       //保存home页面滚动的初始值
    }
  },
  computed: {
    showgoods(){  //获取 tab-control控件不同的数据地址
      return this.goods[this.currentType].list
    }
  },
  //等首页创建完了在创建这个网络请求
  created() { 
    //获取多条数据
   this.getHomeMultidata();

   //获取展示列表的数据
   this.getGoodsData('pop');
   this.getGoodsData('new');
   this.getGoodsData('sell');
},
activated () {  //进入页面的时候触发
 //刷新
  this.$refs.scroll.refresh();
  this.$refs.scroll.scrollTo(0,this.saveY,0);
  // console.log(this.saveY)
},  
deactivated () { //离开页面的时候触发
  this.saveY = this.$refs.scroll.getScrollY(); 
  // console.log( this.saveY);
  //取消全局事件的监听
  this.$bus.$off('itemImgLoad',this.itemImgListener)
},
// mounted () {
   
//   //  const refresh = this.debounce( this.$refs.scroll.refresh,50);
//   //  //接收vuex监听事件的itemImgLoad中的图片加载完成
//   //     this.$bus.$on('itemImgLoad', () => {   //$bus是空的，但是必须要用  所以在mian.js中new一个Vue实例
//   //       refresh();  //当在商品列表往下拉是会有卡顿，的解决方法
//   //  });
// },
  methods: {
  
    //事件监听

  tabClick(index){
    switch (index) {
      case 0:
        this.currentType = 'pop'
        break;
        case 1:
        this.currentType = 'new'
        break;
        case 2:
        this.currentType = 'sell'
        break;
      default:
        break;
    }
    //为了解决2个相同的组件不能同步的问题？？？

    this.$refs.tabControl1.currentIndex = index;
    this.$refs.tabControl2.currentIndex = index;
    //在切换feileilist是要回最初始位置
      this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,0);
      // console.log(this.tabOffsetTop);
   },

//监听滚动位置
scrollClick(position){
//  position.y < 1000
// console.log(position.y)
// 1、判断那个回顶部的图标是否显示
this.listenShoBackTop(position);
//2、决定tabControl是否吸顶(position:fixed,)
  this.isTabFixed = (-position.y) > this.tabOffsetTop;
  // console.log(this.isTabFixed)
},
loadMore(){
  this.getGoodsData(this.currentType);
  // console.log()
},
SwiperImgLoad(){
  // console.log(this.$refs.tabControl.$el.offsetTop)
  //就是tab-control 离顶部有多远
  this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
},







// 网络请求
      //1、可以请求多个数据 
    getHomeMultidata(){
    getHomeMultidata().then(res => { 
        // this.result = res;  //这样写数据太多了
        // console.log(res)
         this.banners = res.data.banner.list;
         this.recommends = res.data.recommend.list;
      })
      },
      
      //请求商品数据
      getGoodsData(type){
        const page = this.goods[type].page + 1 ; //  获取页码，在复用的是时候请求下一页的数据 
        //page是为参数page的值
       getGoodsData(type,page).then(res => {
          //  console.log(res);
            this.goods[type].list.push(...res.data.list); //  把res.list中的数据放到this.goods[type].list中
            this.goods[type].page += 1;  //这个是goods里面的值
            // console.log(this.goods[type].page)
            // 在下列的时候为了获取数据要执行这个scroll中的finishPullUp方法
            this.$refs.scroll.finishPullUp();
            console.log(this.goods[type].list)
  })
  },

  }
}
</script>
<style scoped>
/* pageFullScreen在index.css */
#home{
  /* padding-top: 44px; */
  height: 100vh; 
  /* 显示的页面的100%    100的视口*/
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;

  /*
  在使用浏览器原生滚动，为了不让导航不跟着一起滚动
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  z-index: 9; */
}
.tab-control{
  background-color: #fff;
  position: relative;
  z-index: 9;
  /* top:44px; */
}
/*动态绑定的tabFixed没用的 
 .tabFixed{
  position: fixed;
  top: 44px;
  left: 0px;
  right: 0px
} */
.content{
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    overflow: hidden;
}
</style>
