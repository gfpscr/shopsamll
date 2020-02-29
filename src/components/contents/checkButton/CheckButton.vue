<template>
    <div class="checkbutton" :class="{active:ischeck}">
        <img src="~assets/images/cart/tick.svg" alt="">
    </div>
</template>
<script>
export default {
    name:'CheckButton',
    props: {
        ischeck:{
            type:Boolean,
            default:false,
        }
    }
}
</script>
<style scoped>
/* pageFullScreen在index.css */
.checkbutton{
    border-radius: 50%;
    border: 2px solid #aaa;
}
.active{
    background-color: red;
    border: 2px solid red;
}

</style>
