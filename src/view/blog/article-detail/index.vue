<template>
<div class="banner" v-for="item in article">
  <div class="description">
    <h2 class="title">{{ (item as any).article_title }}</h2>
    <div class="other">
      <img src="@/assets/icon/time.svg" alt="">
                <span>发布于{{ formatDate((item as any).article_date) }}</span>
  <div>{{ (item as any).article_views }}</div>
  <div>{{ (item as any).article_comment_count }}</div>
  <div>{{ (item as any).article_like_count }}</div>
    </div>
 
  </div>

</div>
<div class="main">
            <div class="content">
      <div class="item" v-html="article[0]? (article[0] as any).article_content :'' ">

      </div>
    </div>
        </div>
    </template>


<script setup lang='ts'>
import { ref ,reactive} from 'vue'
import { getAssignArticle } from '@/api/article'
import { useRoute } from 'vue-router'
import formatDate from '@/utils/formatDate'
//获取路由传入的值
let route = useRoute()//当前路由对象
let article = ref([])
const a = async () => {
    article.value = await getAssignArticle({ id: Number(route.query.article_id as any) })
    console.log(article.value)
  }
  a()
 

</script>
<style lang="less">
.banner{
  position: relative;
        color: #fff;
    padding-top:50px ;
    height: 200px;
    .description{
      position: absolute;
      bottom: 5px;
      left: 20%;
      .other{
        margin-top: 10px;
        display: flex;
      }
    }
}
.main {
    background-color: #fff;
    .content {
    min-height: 490px;
    margin: 0 auto;
    padding: 10px 0;
    max-width: 780px;
    .item{
      margin-top: 30px;
    }
    
}
}
</style>
