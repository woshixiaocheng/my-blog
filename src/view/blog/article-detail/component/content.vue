<template>
    <div>
        <div class="item">
          <div v-html="article[0] ? (article[0] as any).article_content : ''"></div>
        </div>
        <div class="lastTime">文章最后更新于{{ article[0] ? formatDate((article[0] as any).article_date) : '' }}</div>
    </div>
 

</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { getAssignArticle,  editArticleView } from '@/api/article'
import formatDate from '@/utils/formatDate'
 const props=defineProps<{
  article:any
}>()


</script>
<style scoped lang="less">
    .item {
      width: fit-content;
      margin: 0 auto;
    }
    .lastTime {
      margin-top: 20px;
      font-size: 10px;
      color: rgb(132, 132, 132);
    }
</style>
