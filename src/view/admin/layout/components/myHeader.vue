<template>
  <div class="my-header">
<el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    router
  >
    <el-menu-item index="0" class="logo">后台管理</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/" >
    <el-sub-menu router index="/">
      <template #title>头像</template>
      <el-menu-item index="/">返回前台</el-menu-item>
    </el-sub-menu>
  </el-menu-item>
  </el-menu>
  </div>
</template>
<script lang="ts">
    export default {
      name: 'myHeader',
    };
</script>
<script setup lang="ts">
import { ref } from 'vue'
 const activeIndex = ref('1')
</script>

<style scoped lang="less">
.my-header{
.el-menu{
  background-color: #fff;
  border-right: solid 1px transparent !important;
  ::deep .el-menu-item{
    border: 0;
  }
}
}
 .el-menu--horizontal>.el-menu-item.is-active{
border: 0;
}
 .my-header {
  height: 70px;
  .logo{
    line-height: 70px;
    margin-left: 20PX;
    font-size: 22px;
  }
  }
.flex-grow {
  flex-grow: 1;
}
</style>