<template>
    <div>
        <my-header></my-header>
        <sidebar></sidebar>
        <div class="content-box">
               <router-view></router-view>

        </div>
    </div>
</template>

<script>
import myHeader from './components/myHeader.vue'
import sidebar from './components/sidebar.vue'
export default{
    components:{
        myHeader,
        sidebar,
    }

}
</script>
<style scoped lang="less">
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


