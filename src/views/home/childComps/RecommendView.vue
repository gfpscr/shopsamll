<template>
    <div class="recommend">
        <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div class="recommend-text">{{item.title}}</div>
            </a>
        </div>

    </div>
</template>
<script>
export default {
    name:'RecommendView',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style scoped>
/* pageFullScreen在index.css */
.recommend{
    display: flex;
    width: 100%;
    text-align: center;
}
.recommend-item{
    margin: 10px 8px;
    flex: auto;
}
.recommend-item img{
    border-radius: 100%; 
    width: 100%;
    margin-bottom: 8px;
}

</style>
