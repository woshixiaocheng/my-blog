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
      <div class="lastTime">文章最后更新于{{article[0] ?  formatDate((article[0]  as any).article_date) : ''}}</div>
      <div class="goodnormal">
        <img  src="@/assets/icon/goodnormal.svg" alt="">
      </div>
    </div>
    <div class="comment">
      <textarea class="comment-textarea" placeholder="写下点什么..." maxlength="2500"></textarea>
      <!-- //按钮 -->
      <div>
        <HoverButton text="111"></HoverButton>
      </div>
    </div>
    </div>
   
  </div>
</template>


<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { getAssignArticle } from '@/api/article'
import { useRoute } from 'vue-router'
import formatDate from '@/utils/formatDate'
import HoverButton from '@/components/hoverbutton/index.vue'
//获取路由传入的值
let route = useRoute()//当前路由对象
let article = ref([])
const getArticleDeatail = async () => {
  article.value = await getAssignArticle({ id: Number(route.query.article_id as any) })
}
getArticleDeatail()

// 没有内容的时候宽度固定


</script>
<style lang="less" scoped>
.banner {
  position: relative;
  color: #fff;
  padding-top: 50px;
  height: 200px;

  .description {
    position: absolute;
    bottom: 5px;
    left: 20%;

    .other {
      margin-top: 10px;
      display: flex;
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
  background-color: #fff;
  .content {
    min-height: 490px;
    margin: 0 auto;
    padding: 50px 20px;
    max-width: 780px;
    min-width: 400px;
    width: fit-content;//能够保证内容完全居中
   
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
.comment{
  width: 100%;
}
.comment-textarea{
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  font-size: 14px;
  min-height: 180px;
  border: 1px solid #c7c7c7;
  /* 不改变大小 */
  resize: none;
    /* 不改变边框 */
    outline: none;
    border-radius: 4px;
    margin-bottom: 10px;
   &:focus {
    border-color: var(--buttonHover);
  }
}
</style>
