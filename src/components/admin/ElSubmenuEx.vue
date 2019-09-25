<template>
    <el-submenu :index="menu.index" v-if="menu.type == 'submenu'" :route="menu.route">
        <template slot="title" v-if="menu.lable != null">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.lable }}</span>
        </template>

        <template v-if="menu.childs != null" v-for="menuItem in menu.childs">
          <el-menu-item-group-ex :menu="menuItem"></el-menu-item-group-ex>
          <el-menu-item-ex :menu="menuItem"></el-menu-item-ex>
           <el-submenu-ex :menu="menuItem"></el-submenu-ex>
        </template>

    </el-submenu>
</template>

<script>
  import ElMenuItemGroupEx from './ElMenuItemGroupEx.vue'
  import ElMenuItemEx from './ElMenuItemEx.vue'

  export default {
    name: 'elsubmenu',
    props: {
      menu: {
        type: Object
      }
    },
    beforeCreate: function () {
      this.$options.components.ElSubmenuEx = require('./ElSubmenuEx.vue').default
    },
    components: {ElMenuItemGroupEx, ElMenuItemEx},
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>

</style>