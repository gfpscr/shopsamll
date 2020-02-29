<template>
    <div>
      <!-- 导航 -->
      <nav-bar class="car-bar">
        <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list></cart-list>
        <!-- 底部汇总 -->
      <cart-bttom-bar></cart-bttom-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import cartList from './childComps/cartList'
import cartBttomBar from './childComps/cartBttomBar'


 import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: {
    NavBar,
    cartList,
    cartBttomBar
  },
  computed: {
   ...mapGetters({
     length:'cartLength',
     list:'cartList',
   })
  },
  
  }
</script>
<style scoped>
/* pageFullScreen在index.css */
.car-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
