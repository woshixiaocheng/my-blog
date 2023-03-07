<template>
        <div class="banner" style="animation: header-effect 1.5s">
                <h1>{{banner?.title||1}}</h1>
    <h2>{{banner?.content||2}}</h2>    
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
.banner{
        color: #fff;
   padding-top:100px ;
    height: 38vh;
    text-align: center;
    h2{
       padding-top: 50px;
    }
    background-image: url('@/assets/img/banner1.jpg');
    background-size: cover;
}
</style>