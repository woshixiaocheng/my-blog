<template>
        <div class="banner">
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
    margin-top:50px ;
    height: 200px;
    /* widows: 100%; */
    text-align: center;
    h2{
        margin-top: 50px;
    }
}
</style>