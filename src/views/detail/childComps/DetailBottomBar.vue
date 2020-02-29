<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <i class="icon service"></i>
                <span class="text">客服</span>
            </div>
            <div>
                <i class="icon shop"></i>
                <span class="text">客服</span>
            </div>
            <div>
                <i class="icon select"></i>
                <span class="text">收藏</span>
            </div>
            <div class="bar-item bar-right">
                <span class="cart" @click="addToCart">加入购物车</span>
                <span class="buy">购买</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'DetailBottomBar',
    methods: {
        addToCart(){
            this.$emit("addtocart")
        }
    }
}
</script>
<style scoped>
.bottom-bar{
    height: 49px;
    position: fixed;
    background-color: #fff;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;

    /*第一种
     position: fixed;
    bottom: 0px;
    right: 0px;
    left: 0px;      
    position: relative;
    bottom: 49px;
    background-color: brown; */
}
.bar-item{
     flex: 1;
     display: flex;
}
.bar-item>div{
    flex: 1;
}
.bar-left .text{
    font-size: 13px;
}
.bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url("~assets/images/detail/detail_bottom.png") 0 0/100%;
}
.bar-left .service{
    background-position: 0 -53px;
}
.bar-left .shop{
    background-position: 0 -98px;
}
.bar-item>.bar-right{
    font-size: 15px;
    color: #fff;
    line-height: 49px;
    flex: 3;
}
.bar-right .cart{
    background-color: #ffe817;
    color: #333;
    flex: 1.5;
}
.bar-right .buy{
    background-color: #f69;
    flex: 1.5;
}

</style>
