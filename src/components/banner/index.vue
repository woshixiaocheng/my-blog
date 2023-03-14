<template>
    <div class="banner-box">
        <div class="banner" style="animation: header-effect 1.5s">
                <h1>{{banner?.title||1}}</h1>
    <h2>{{banner?.content||2}}</h2>    
    </div>
</div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
import {Banner} from '@/utils/type'
 defineProps<{
    banner?:Banner
}>()
</script>

<style scoped lang="less">
.banner-box{
height: 38vh;
}
.banner{
    color: #fff;
    padding-top:100px ;
    height: 34vh;
    text-align: center;
    h2{
       padding-top: 50px;
    }
    background-image: url('@/assets/img/banner1.jpg');
    background-size: cover;
    background-position: 20% 20%;
}
</style>