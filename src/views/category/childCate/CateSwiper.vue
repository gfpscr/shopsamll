<template>
            <swiper class="cate-swiper">
            <swiper-item v-for="(item,index) in topImages" :key="index">
            <img :src="item.image" alt="">
            </swiper-item>
            </swiper>
</template>
<script>
import { Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
    name:'CateSwiper',
    props: {
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
}
</script>
<style scoped>
/* pageFullScreen在index.css */
.cate-swiper{
    width: 100%;
    
}

</style>
