<template>
  <el-menu-item v-if="menu.type == 'item' " :index="menu.index" :route="menu.route">
      <i :class="menu.icon"></i>
      <span slot="title">{{ menu.lable }}</span>
  </el-menu-item>
</template>
<script>
  export default {
    name: 'elmenuitem',
    props: {
      menu: {
        type: Object
      }
    },
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>

</style>