<template>
  <div class="my-header">
<el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0" class="logo">后台管理</el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="2">
      <template #title>头像</template>
      <el-menu-item index="2-1">退出</el-menu-item>
      <el-menu-item index="2-2">返回前台</el-menu-item>
    </el-sub-menu>
  </el-menu>
  </div>
</template>

<script>
import { ref } from 'vue'
export default{
  setup(){
    const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
return {activeIndex,handleSelect}
  }
}

</script>

<style lang="less">
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