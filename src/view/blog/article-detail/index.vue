<template>
  <div class="banner" v-for="item in article">
    <div class="description">
      <h2 class="title">{{ (item as any).article_title }}</h2>
      <div class="other">
        <img src="@/assets/icon/time.svg" alt="">
        <span>发布于{{ formatDate((item as any).article_date) }} · </span>
        <img src="@/assets/icon/hot.svg" alt="">
        <span>{{ (item as any).article_views  }} · </span>
        <img src="@/assets/icon/message.svg" alt="">
        <span>{{ (item as any).article_comment_count  }} · </span>
        <img class="good" src="@/assets/icon/good.svg" alt="">
        <span>{{ (item as any).article_like_count  }}</span>
  
      </div>

    </div>

  </div>
  <div class="main">
    <div class="content"  >
      <div class="item">
      <div  v-html="article[0] ? (article[0] as any).article_content : ''"></div>
    </div>
     <div class="lastTime">文章最后更新于{{article[0] ?  formatDate((article[0]  as any).article_date) : ''}}</div>
      <div class="goodnormal">
        <img  src="@/assets/icon/goodnormal.svg" alt="">
      </div>
    <Comment></Comment>
    </div>
   
  </div>
  <div class="footer"></div>

</template>


<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { getAssignArticle } from '@/api/article'
import { useRoute } from 'vue-router'
import formatDate from '@/utils/formatDate'

import Comment from '@/components/comment/comment.vue'
//获取路由传入的值
let route = useRoute()//当前路由对象
let article = ref([])
const getArticleDeatail = async () => {
  article.value = await getAssignArticle({ id: Number(route.query.article_id as any) })
}
getArticleDeatail()




</script>
<style lang="less" scoped>
.banner {
  position: relative;
  color: #fff;
  padding-top: 50px;
  height: 200px;
  width: 90%;
  margin: 0 auto;

  .description {
    position: absolute;
    bottom: 5px;
    @media screen and (min-width:570px) {
      left: 20%;
    }
    @media screen and(max-width:570px) {
      left: 5%;
    }

    .other {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      position: relative;
      .good{
        position: relative;
          top:-3px;
      }
     
      img{
        vertical-align: middle;
        margin-left: 8px;
        &:first-child{
          margin-left: 0;
        }
      }
      span { 
        margin-left: 8px;
      }
    }
  }
}

.main {
  background-color: var(--content-bgc);
  .content {
    min-height: 490px;
    margin: 0 auto;
    padding: 50px 0px;
    max-width: 780px;
    width: 90%;//能够保证内容完全居中
    line-height:30px ;
    .item{
      width: fit-content;
      margin: 0 auto;
    }
   
    .lastTime{
      margin-top: 20px;
      font-size: 10px;
      color: rgb(132, 132, 132);
    }
    .goodnormal{
      margin: 30px auto;
      width: 100%;
    display: flex;
    justify-content: center;  
    }

  }
}


</style>
