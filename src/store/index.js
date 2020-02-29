import Vue from 'vue'
import Vuex from 'vuex'

//安装插件
Vue.use(Vuex)
  
//创建Strore对象   及导出
export default new Vuex.Store({
  state: {
    cartList:[],
  },
  // mutations 唯一的目的是改变state的状态
  mutations: {  //同步事件
    //状态变化跟踪
    addCount(state,payload){
      payload.count++;
    },
    addToCart(state,payload){
      payload.checked = true;
      state.cartList.push(payload); 
    }

  },
  // actions   异步操作，判断逻辑
  actions: {
    addCart(context,payload){
     return new Promise((resolve,reject) =>{
       //查找之前是否该商品
       let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
       //判断oldProduct
       if (oldProduct) { //数量+1
        context.commit('addCount',oldProduct);
        resolve("数量+1");         
       }else{  //添加新的商品
        payload.count = 1;
        context.commit('addToCart',payload);
        resolve("添加新的商品");
       }
       console.log(reject)
     })
    }
     //  {
// 在actions的方法，用来把商品加入购物车的代码
  //  //payload 新添加的商品
    //   let oldProduct = null;
    //   //判断购物车是否有同样的商品
    //   /*  第一种方法
    //  for (let item of state.cartList) {
    //       if (item.iid === payload.iid) {
    //         oldProduct = item;
    //       }
    //   }
    //   */
    //  //第二种方法  数组的函数  find()   查找
    //  //判断有没有重复的商品
    //  oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
    //      if (oldProduct) {  //添加数量
    //     context.commit('addCount',oldProduct)
    //   }else{ //添加新的商品
    //     payload.count = 1;
    //     context.commit('addToCart',payload)
    //   }
    //   console.log(payload)
    // }}
    
  },
  modules: {
  },
  getters: {
    cartLength(state){
      return state.cartList.length;
    },
    cartList(state){
      return state.cartList;
    }
  },
})

