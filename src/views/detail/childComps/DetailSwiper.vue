<template>
            <swiper class="detail-swiper">
            <swiper-item v-for="(item,index) in topImages" :key="index">
            <img :src="item" alt="">
            </swiper-item>
            </swiper>
</template>
<script>
import { Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
    name:'DetailSwiper',
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
.detail-swiper{
    height: 300px;
}

</style>
