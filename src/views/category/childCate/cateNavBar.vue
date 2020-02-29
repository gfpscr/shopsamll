<template>
  <div class="cateNavBar">
     <nav-bar>
        <div slot="left" class="left">
            <img src="~assets/images/profile/message.svg" alt="">
        </div>
        <div slot="center">
            <input type="text" class="cateinput" placeholder="请输入您要搜索的物品名称">
        </div>
        <div slot="right" class="right">
          <img src="https://s10.mogucdn.com/mlcdn/c45406/181205_2llkjh1g0fe27h51ahh5k5f27gkk9_116x96.png" alt="">
        </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'cateNavBar',
  data() { 
    return {

    }
  },
   components: {
      NavBar
  }
 }
</script>

<style scoped>
.left > img{
  width: 40px;
  height: 40px;
  text-align: center;
  margin-top: 5px;
}
 .cateinput{
    border: 0px;
    background-color: #f6f6f6;
    width: 230px;
    height: 35px;
    color: black;
    margin-top: 5px;
    border-radius: 22.5px;
    outline: medium;
    /* 去除input的点击出现边框 */
    font-size: 16px;
    line-height: 35px;
    text-indent: 1em;
}
.right > img{
   width: 34px;
  height: 34px; 
  margin-top: 5px;
  border-radius: 5px;
}
</style>