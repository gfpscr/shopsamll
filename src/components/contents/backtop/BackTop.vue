<template>
    <div class="back-top" >
        <img src="~assets/images/common/top.png" alt="">
    </div>
</template>
<script>
export default {
    name:'BackTop',
    methods: {}
}
</script>
<style scoped>
/* pageFullScreen在index.css */
.back-top{
    position: fixed;
    right: 10px;
    bottom: 50px;
}
.back-top img{
    width: 43px;
    height: 43px;
}

</style>
