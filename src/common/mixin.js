import {debounce} from './unitl'
import BackTop from 'components/contents/backtop/BackTop'


export const itemLIstenerMixin = {
  data () {
    return {
      itemImgListener:null, //监听在goodslistitem的传出事件
    }
  },
  mounted () {
    // //这个地方img标签确实被挂载，但是其中的图片没有占据高度
      let newRefresh = debounce(this.$refs.scroll.refresh,100);
      //对监听事件进行保存
      this.itemImgListener = () => {
          newRefresh() 
      }
      this.$bus.$on('itemImgLoad',this.itemImgListener)
  
  }
}
 
export const backTopMixin = {
  components: {
    BackTop,
  },
  data () {
    return {
      isShowBackTop:false,   //返回顶部的小图标是否显示
    }
  },
  methods: {
    //返回顶部事件
    backClick(){
  //  console.log("asss");
      this.$refs.scroll.scrollTo(0,0,300)
    },
    // 1、判断那个回顶部的图标是否显示
    listenShoBackTop(position){
    this.isShowBackTop = (-position.y) > 500;
  }
  }
}