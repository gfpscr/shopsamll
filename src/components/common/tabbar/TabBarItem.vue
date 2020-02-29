<template>
    <div  class="tab-bar-item" @click="butclick">
      <slot name="item-icon" v-if="isActive"></slot>
      <slot name="item-icon-active" v-else></slot>
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
    </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  data () {
    return {}
  },
  props: {
    path: String,
    activecolor: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    // 获取当前地址与item保存的地址是否一致
    isActive () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    // 字体颜色
    activeStyle () {
      return this.isActive ? { color: this.activecolor } : {}
    }
  },
  methods: {
    butclick () {
      // 把当前地址push进去
      this.$router.push(this.path)
    }
  }
}
</script>
<style scoped>
/* pageFullScreen在index.css */
.tab-bar-item{
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 14px;
}
.tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
}

</style>
