<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
          <cart-list-item v-for="(item,index) in list" :itemInfo="item" :key="index"></cart-list-item>
        </scroll>
    </div>
</template>
<script>
 import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'

import cartListItem from './cartListItem'
export default {
    name:'cartList',
    computed: {
        ...mapGetters({
     list:'cartList', 
   })
    },
    components: {
        Scroll,
        cartListItem
    },
    activated () {
        this.$refs.scroll.refresh();
        // console.log(this.list)
    }

}
</script>
<style scoped>
/* pageFullScreen在index.css */
.cart-list{
    height:calc(100% - 44px - 49px - 40px);
}
.content{
    height: 100%;
    overflow: hidden;
}

</style>
