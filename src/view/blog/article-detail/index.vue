<template>
  <div>
    <!-- <div class="banner" v-for="item in article">
      <div class="description">
        <h2 class="title">{{ (item as any).article_title }}</h2>
        <div class="other">
          <img v-lazy src="@/assets/icon/time.svg" alt="">
          <span>发布于{{ formatDate((item as any).article_date) }} · </span>
          <img v-lazy src="@/assets/icon/hot.svg" alt="">
          <span>{{ (item as any).article_views }} · </span>
          <img v-lazy src="@/assets/icon/message.svg" alt="">
          <span>{{ (item as any).article_comment_count }} · </span>
          <img class="good" v-lazy src="@/assets/icon/good.svg" alt="">
          <span>{{ (item as any).article_like_count }}</span>

        </div>

      </div>

    </div> -->
    <Suspense>
      <template #default>
      <DetailBanner :article="article"></DetailBanner>
      </template>
      <template #fallback>
        <el-skeleton :rows="5" animated  class="banner"/>
      </template>
    </Suspense>
    <div class="main">
      <div class="content">
        <Suspense>
      <template #default>
        <Content :article="article"
         ></Content>
      </template>
      <template #fallback>
        <el-skeleton :rows="10" animated  />
      </template>
    </Suspense>
        <div class="goodnormal" @click="addArticleLike">
          <i class="iconfont icon-dianzan" :style="{ color: goodFoucus }"></i>
          <!-- <img  src="@/assets/icon/goodnormal.svg" alt=""> -->
        </div>
        <Comment :total="total" :articleId="article[0] ? (article[0] as any).article_id : 0" :commentList="commentList"
          @getComment="getComment"></Comment>
      </div>

    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'articledetail',
};
</script>
<script setup lang='ts'>
import { ref, defineAsyncComponent } from 'vue'
import { getAssignArticle, getCommentAssign, editArticleLike, editArticleView, editArticleComment } from '@/api/article'
import { useRoute } from 'vue-router'

import tranListToTreeData from '@/utils/tranListToTreeData'
import Comment from '@/components/comment/comment.vue'
const DetailBanner = defineAsyncComponent(() => import('./component/detail-banner.vue'))
const Content = defineAsyncComponent(() => import('./component/content.vue'))

//获取路由传入的值
let route = useRoute()//当前路由对象
let id=ref(route.query.article_id )
let article = ref<any[]>([])
const getArticleDeatail = async () => {
  article.value = await getAssignArticle({ id: route.query.article_id })
  await editArticleView({ viewCount: article.value[0].article_views + 1, id: article.value[0].article_id })
}
getArticleDeatail()

//获取文章评论
let commentList = ref<any[]>([])
let total = ref<number>(0)
const getComment = async () => {
  let list = await getCommentAssign({ id: route.query.article_id })
  if (list) {
    total.value = list ? list.length : 0
    commentList.value = tranListToTreeData(list, 0)
  }
  if (article.value[0]) {
    await editArticleComment({ commentCount: total.value, id: article.value[0].article_id })
  }
}
getComment()

//新增文章点赞
let goodFoucus = ref('var(--settingColor)')
const addArticleLike = async () => {
  if (article.value[0] && goodFoucus.value !== 'var(--buttonHover)') {
    await editArticleLike({ likeCount: article.value[0].article_like_count + 1, id: article.value[0].article_id })
    goodFoucus.value = 'var(--buttonHover)'
  } else {
    await editArticleLike({ likeCount: article.value[0].article_like_count - 1, id: article.value[0].article_id })
    goodFoucus.value = 'var(--settingColor)'
  }
}


</script>
<style lang="less" scoped>

.banner {
  position: relative;
  color: #fff;
  padding-top: 50px;
  height: 200px;
  width: 100%;
  margin: 0 auto;
}
.main {
  background-color: var(--content-bgc);

  .content {
    min-height: 490px;
    margin: 0 auto;
    padding: 50px 0px;
    max-width: 780px;
    width: 90%; //能够保证内容完全居中
    line-height: 30px;

    .item {
      width: fit-content;
      margin: 0 auto;
    }

    .lastTime {
      margin-top: 20px;
      font-size: 10px;
      color: rgb(132, 132, 132);
    }

    .goodnormal {
      margin: 30px auto;
      width: 100%;
      display: flex;
      justify-content: center;
      cursor: pointer;
    }

  }
}</style>
