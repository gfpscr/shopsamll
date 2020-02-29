import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import Toast from './components/contents/toast/index'
// import Fastclick from 'fastclick'
import  VueLazyLoad from 'vue-lazyload'
// import axios from 'axios'

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue();  //因为$bus是空的，所以要new一个Vue  
// 安装Toast插件
Vue.use(Toast); 
//懒加载插件 （安装）//使用懒加载
Vue.use(VueLazyLoad,{
  loading:require('./assets/images/common/placeholder.png'),
  // require  一般是来加载数据的
});


//解决移动端300ms延迟
// Fastclick.attach(document.body);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// axios({
//   url:'http://123.207.32.32:8000/api/hy/detail?iid=1jw0sr2'
// }).then(res => 
//   window.console.log(res)
// )

