<template>
    <div class="goods-list">
        <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item">{{item}}</goods-list-item>
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default {
    name:'GoodsList',
    props: {
        goods:{
           type:Array,
           defalut(){
               return []
           } }
    },
    components: {
        GoodsListItem
    }
}
</script>
<style scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-bacjground);
    padding:2px;
}
</style>
