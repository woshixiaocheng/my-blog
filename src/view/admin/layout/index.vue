<template>
    <div class="box">
        <my-header></my-header>
        <sidebar></sidebar>
        <div class="content-box">
            <keep-alive >
    <router-view  v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive" ></router-view>

        </div>
    </div>
</template>
<script lang="ts">
    export default {
      name: '管理',
    };
</script>
<script setup lang="ts">
import myHeader from './components/myHeader.vue'
import sidebar from './components/sidebar.vue'
</script>
<style scoped lang="less">
.box{
    overflow-y: hidden;
}
.content-box{
    padding: 20px ;
    position: absolute;
    top: 70px;
    left: 170px;
    right: 0;
    bottom: 0;//用绝对定位也能占满屏幕
    background-color: rgb(229, 229, 229);
 
}
</style>


