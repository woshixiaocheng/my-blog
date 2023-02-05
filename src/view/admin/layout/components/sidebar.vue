<template>
    <!-- 侧边栏 -->
  <div class="sidebar">
      <el-menu class="sidebar-el-menu"
        default-active="2"
        @open="handleOpen"
        @close="handleClose"
        router
      >
      <el-menu-item index="/admin/main" >
          <el-icon><House /></el-icon>
          <span>主页</span>
        </el-menu-item>
       <el-menu-item index="/admin/user">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
         <el-menu-item index="/admin/article">
          <el-icon><Document /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
         <el-menu-item index="/admin/sort">
          <el-icon><Files /></el-icon>
          <span>分类管理</span>
        </el-menu-item>
         <el-menu-item index="/admin/label">
          <el-icon><Paperclip /></el-icon>
          <span>标签管理</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>
<script >
export default{
  setup(){

    const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
return{handleClose,handleOpen}
  }
}

</script>
<style scoped>
  .sidebar {
    position: absolute;
    height: calc(100%,-58px);
    left: 0;
    top: 58px;
    bottom: 0;
    background-color: #fff;
    border: 0;
  }
  .sidebar-el-menu{
    width: 170px;
  }
</style>