<template>
  <div id="app">
      <keep-alive exclude="Detail">
        <!-- 方法二
         解决经路由到另一个页面不刷新的解决办法
         exclude="Detail"
         Detail是你要刷新的组件s
         -->
        <router-view />
        <!-- 方法一 -->
        <!--  :key="this.$route.path" 解决经路由到另一个页面不刷新的解决办法 -->
      </keep-alive>
      
     <main-tab-bar/>
   
  </div>
</template>
<script>
import MainTabBar from 'components/contents/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>
<style scoped>
@import "assets/css/base.css";
</style>
