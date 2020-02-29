import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from 'views/home/home.vue'
// import Cart from 'views/cart/Cart.vue'
// import Category from 'views/category/Category.vue'
// import Me from 'views/me/Me.vue'
// 懒加载
const Home = () => import('../views/home/home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Me = () => import('../views/me/Me')
const Detail = () => import('../views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/me',
    component: Me
  },
  {
    path: '/detail/:iid',
    component:Detail,
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
