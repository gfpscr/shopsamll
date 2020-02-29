<template>
  <div class="childleft">
      <ul>
          <li v-for="(item,index) in feileilist" :key="index" :class="{acivt:currentIndex === index}" @click="indexclick(index)" >{{item}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'childLeft',
  props: {
      feileilist:{
         type:Array,
         default(){
             return []
         } 
      }
  },
  data() { 
    return {
        showactiv:false,
        currentIndex:0,
    }
  },
  methods: {
      indexclick(index){
            this.currentIndex = index;
            this.$emit('cateclick', index);
      },
  }
 }
</script>

<style scoped>
.childleft{
    background-color: #f6f6f6;
     width: 80px;
    font-size: 20px;
}

.childleft>ul li{
   text-align: center;
    height: 35px;
    line-height: 35px;
}

.acivt{
    background-color: #fff;
}
</style>
