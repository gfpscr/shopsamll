<template>
    <div>
    <swiper>
     <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link"> 
      <img :src="item.image" @load="swiperImgLoad">
      <!-- {{index}} -->
      </a>
      </swiper-item>
      </swiper>
    </div>
</template>
<script>
import { Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
    name:'HomeSwiper',
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data () {
        return {
            isload:false
        }
    },
     components: {
    SwiperItem,
     Swiper,
  },
  methods: {
      swiperImgLoad(){   //这个名称与上面个的@load的名称一致
        //   console.log("ssss")
        if (!this.isload) {   //当加载完成了才会执行   只会执行一次 
            this.$emit('swiperImgLoad');
            this.isload = true;
        }
        
      }
  }
}
</script>
<style scoped>

</style>

