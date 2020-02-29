<template>
    <div class="cate">
      <cate-nav-bar></cate-nav-bar>
      <scroll class="connent-left" ref="scrollleft"  :probeType="3" :pull-up-load="true">
  <child-left :feileilist="feileilist" ref="cateleft" @cateclick="cateclick"></child-left>
   </scroll>
   <scroll ref="scroll"  @pullingUp="loadMore" class="cateconnent" :probeType="3" :pull-up-load="true">
           <cate-swiper :topImages="catebanners" class="cate-swiper" ></cate-swiper>    
          <recommend :recommends="caterecommends" class="cate-recommends"></recommend>
         <goods-list :goods="showgood"/>
          </scroll>
     
    </div>
</template>
<script>
import cateNavBar from './childCate/cateNavBar'
import childLeft from './childCate/childLeft'
import CateSwiper from './childCate/CateSwiper'

import GoodsList from 'components/contents/goods/GoodsList'

import Recommend from 'views/home/childComps/RecommendView'
import Scroll from 'components/common/scroll/Scroll'
import {getHomeMultidata,getGoodsData} from 'notwork/home'
import {itemLIstenerMixin,backTopMixin} from 'common/mixin'

export default {
  name: 'Category',
  components: {
    cateNavBar,
    Scroll,
    childLeft,
    CateSwiper,
    Recommend,
    GoodsList
  },
  mixins: [itemLIstenerMixin,backTopMixin],
  data () {
    return {
      feileilist:["推荐分类","流行","新款","精品"],
      catebanners:[],
      caterecommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      showgoods:[],
      currentType:'pop',
      saveY:0,
     }
  },
  created () {
    this.getHomeMulti();

    this.getGoodsData('pop');
    this.getGoodsData('new');
    this.getGoodsData('sell');
  },
  activated () {
    this.$refs.scroll.refresh();
    // this.$refs.scroll.scrollTo()
    this.$refs.scroll.scrollTo(0,this.saveY,0);
  },
  deactivated () {
    this.$bus.$off('itemImgLoad',this.itemImgListener);
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY)
  },
 methods:{
     getHomeMulti(){
    getHomeMultidata().then(res => { 
      // console.log(res);
         this.catebanners = res.data.banner.list;
        //  console.log(this.catebanners);
         this.caterecommends = res.data.recommend.list;
      })
      }, 
      //请求商品数据

      getGoodsData(type){
        const page = this.goods[type].page + 1;
        getGoodsData(type,page).then(res => {
          //  console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          // console.log( this.goods[type].page)
          this.$refs.scroll.finishPullUp();              
        })
      },


      // 事件

      cateclick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
      case 1:
          this.currentType = 'pop'
          break;
      case 2:
          this.currentType = 'new'
          break;
      case 3:
          this.currentType = 'sell'
          break;
      }
      // console.log(this.currentType)
      //在切换feileilist是要回最初始位置
      this.$refs.scroll.scrollTo(0,0,0);
      },
      loadMore(){
  this.getGoodsData(this.currentType);
  // console.log()
},
 },
 computed: {
   showgood(){
     return this.goods[this.currentType].list;
    //  console.log(this.currentType)
   }
 }
  
}
</script>
<style scoped>
.cate{
   height: 100vh;
}
.connent{
  width: 100%;
   height: calc(100% - 40px);
   /* display: flex; */
}
.connent-left{
  float: left;
}
.cateconnent{
  float: left;
  /* flex: 1; */
 width: 290px;
 height: calc(100% - 44px);
 overflow: hidden;
}
.cate-swiper{ 
  width: 270px;
  margin: 0 10px; 
}
.cate-recommends{
  font-size: 12px;
}
</style>
