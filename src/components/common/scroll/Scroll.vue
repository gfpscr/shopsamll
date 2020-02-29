<template>
    <div ref="wrapper">
            <div class="content">
                <slot></slot>
            </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    data () {
        return {
             scroll:null
        }
    },
    props: {
        probeType:{
            type:Number,
            default:0, 
        },
        pullUpLoad:{
            type:Boolean,
            defuault:false,
        }
    },
    mounted () {
        // document.querySelectorAll(".wrapper")   这个方法不好，因为如果在不同组件中有其他的标签class名也是wrapper，就会出错的额
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,  //div等标签可以监听原生事件
            probeType:this.probeType,   //时时监听滚动事件

            pullUpLoad:this.pullUpLoad
        })
        //监听滚动位置  不够严谨
        
        if(this.probeType === 2 || this.probeType === 3) {
            this.scroll.on('scroll',(position) => {
                this.$emit('scroll',position)
        })
        }

        //监听scroll滚动底部
        if (this.pullUpLoad) {
            this.scroll.on('pullingUp',() =>{
            this.$emit("pullingUp")
        })
        }
        
        },
        


    methods: {
        scrollTo(x,y,time=500){
         this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
           this.scroll &&  this.scroll.finishPullUp();
        },
       refresh(){
          this.scroll &&  this.scroll.refresh();
       },
       getScrollY(){
            return this.scroll ? this.scroll.y : 0;
       }
    },
}
</script>
<style scoped>


</style>
