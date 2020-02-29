<template>
        <div class="toast" v-show="show">{{message}}</div>
</template>
<script>
export default {
    name:'Toast',
    data () {
        return {
            message:'',
            show:false,
        }
    },
    methods: {
            taostShow(message,time =2000){
                this.message = message;
                this.show = true;
            //在1.5秒消失
            setTimeout(() => {
                this.message = '';
                this.show = false;
            }, time);
            }            
    }

}
</script>
<style scoped>
.toast{
    position:fixed;
    /*  */
    left: 50%;
    top: 50%;  
    transform: translate(-50%,-50%);
    /* 居中 */
    padding: 8px 10px;
    background-color: rgba(100, 80, 0, .1);
    z-index: 999;
}

</style>
