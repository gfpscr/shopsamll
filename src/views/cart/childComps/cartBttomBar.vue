<template>
    <div class="bottom-bar" >
        <div class="check-content">
            <check-button class="checkButton" :ischeck="isSelectAll" @click.native="checkclick"></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate" @click="bottomclick">
            去计算 : {{checkLength}}
        </div>
    </div>
</template>
<script>
import CheckButton from 'components/contents/checkButton/CheckButton'

export default {
    name:'cartBttomBar',
    components: {
        CheckButton
    },
    computed: {
        totalPrice(){
            return '￥' + this.$store.state.cartList.filter(
                item => {
                return  item.checked
                }).reduce((preValue,item) => {
                    return preValue + item.price * item.count
                },0);
        },
        checkLength(){
            return this.$store.state.cartList.filter(item => {
              return  item.checked
            }).length
        },
        isSelectAll(){
            if(this.$store.state.cartList.length === 0){
            return false
            }
            // console.log(this.$store.state.cartList.length )
            return !this.$store.state.cartList.find(item => !item.checked)
        }
    },
    methods: {
        checkclick(){
            if (this.isSelectAll) { //全部选中
                this.$store.state.cartList.forEach(
                    item => {
                        return item.checked = false;
                    })
                }else{
                 this.$store.state.cartList.forEach(item => item.checked = true) 
            }
        },
        bottomclick(){
            if (!this.isSelectAll) {
                 this.$toast.taostShow('您购物车为空');
                // console.log("------")
                // console.log(this.$toast.taostShow('您购物车为空不能结算',20000))
            }
        }
    }
}
</script>
<style scoped>
/* pageFullScreen在index.css */
.bottom-bar{
    height: 40px;
    background-color: #eee;      
    position: relative;   
    line-height: 40px;  
    display: flex;
    text-align: center
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
} 
.checkButton{
    width: 20px;
    height: 20px;
    line-height: 20px;
   margin-right: 8px;
   
}
.price{
    /* margin-left: 10px; */
    flex: 1;
}
.calculate{
    /* margin-right: 0;*/
     width: 100px;
     background-color: red;
     text-align: center;
     /* text-align: center; */
}
</style>
