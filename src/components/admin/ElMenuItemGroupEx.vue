<template>
    <el-menu-item-group v-if="menu.type == 'group'">
        <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title">{{ menu.lable }}</span>
        </template>
        <template  v-if="menu.childs != null" v-for="menuItem in menu.childs">
          <el-menu-item-ex :menu="menuItem"></el-menu-item-ex>
          <el-submenu-ex :menu="menuItem"></el-submenu-ex>
        </template>
    </el-menu-item-group>
</template>

<script>
  import ElMenuItemEx from './ElMenuItemEx.vue'

  export default {
    name: 'elmunuitemgroup',
    props: {
      menu: {
        type: Object
      }
    },
    components: {
      ElMenuItemEx
    },
    beforeCreate: function () {
      this.$options.components.ElSubmenuEx = require('./ElSubmenuEx.vue').default
    },
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>

</style>