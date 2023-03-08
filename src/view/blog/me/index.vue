<template>
   <Banner1 :banner="banner"></Banner1>
</template>
<script lang="ts">
    export default {
      name: 'me',
    };
</script>
<script setup lang="ts">
import Banner1 from '@/components/banner/index.vue'
import {  Banner } from '@/utils/type'
import {reactive} from 'vue'
const banner= reactive<Banner>({
    title: '关于我',
    content: '正在努力更新中！！'
})
</script>
