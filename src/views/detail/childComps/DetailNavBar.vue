<template>
    <div>
        <nav-bar>
            <div slot="left" class="left"  @click="leftClick">
                <img src="~assets/images/common/back.svg" alt="">
            </div>
           <div slot="center" class="title"> 
               <div v-for="(item,index) in detailtitle" 
               :key="item" class="datailtitle" :class="{activ: currentIndex === index}"
               @click="titleClick(index)">{{item}}</div>
           </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'DetailNavBar',
    components: {
        NavBar,
    },
    props: {
            detailtitle:{
                type:Array,
                default(){
                    return []
                }
            }
    },
    data () {
        return {
            currentIndex:0, //监听点击事件
        }
    },
   created () {
    //    console.log(this.Detailtitle);
   },
   methods: {
       titleClick(index){
            this.currentIndex = index;
            //传出title的点击事件
            this.$emit('DetailNavBarClick',index)
       },
    leftClick(){  //监听返回事件
        // console.log("----------------");
        this.$router.back();
    }
   }

}
</script>
<style scoped>
/* pageFullScreen在index.css */
.title{
    display: flex;
  
}
.datailtitle{ 
     flex: 1;
     font-size: 13px;
}
.activ{
    color: var(--color-high-text);
}
.left{
    margin-top: 10px;
}
</style>
