<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="index" class="tab-control-item" @click="butclick(index)" :class="{activ: currentIndex === index }">
            <span>{{item}} </span>
        </div>
    </div>
</template>
<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data () {
        return {
           currentIndex:0 
        }
    },
    methods:{
        butclick(index){
        this.currentIndex = index;
        this.$emit('tabClick', index)
        }
    }

}
</script>
<style scoped>
.tab-control{
    display: flex;
    /* margin-bottom: 0px */
    background-image: #fff;
}
.tab-control-item{
    flex: 1;  
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;    
}
.tab-control-item span{
    padding: 3px;
}
.activ{
    color: var(--color-high-text);
}
.activ span{
    border-bottom: 3px solid var(--color-tint)
}
</style>
