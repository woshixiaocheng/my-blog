<template>
    <div class="banner" v-for="item in article">
    <div class="description">
      <h2 class="title">{{ (item as any).article_title }}</h2>
      <div class="other">
        <img v-lazy src="@/assets/icon/time.svg" alt="">
        <span>发布于{{ formatDate((item as any).article_date) }} · </span>
        <img v-lazy src="@/assets/icon/hot.svg" alt="">
        <span>{{ (item as any).article_views  }} · </span>
        <img v-lazy src="@/assets/icon/message.svg" alt="">
        <span>{{ (item as any).article_comment_count  }} · </span>
        <img class="good" v-lazy src="@/assets/icon/good.svg" alt="">
        <span>{{ (item as any).article_like_count  }}</span>
  
      </div>

    </div>

  </div>
</template>
<script lang="ts">
export default {
  name: 'detailbanner',
};
</script>
<script lang="ts" setup>
import formatDate from '@/utils/formatDate'
 defineProps<{
    article:object
}>()
</script>
<style scoped lang="less">
.banner {
  position: relative;
  color: #fff;
  padding-top: 50px;
  height: 200px;
  width: 100%;
  margin: 0 auto;
  background-image: url('@/assets/img/banner.jpg');
  background-size: cover;

  .description {
    position: absolute;
    bottom: 5px;
    padding: 0 5px;

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

      .good {
        position: relative;
        top: -3px;
      }

      img {
        vertical-align: middle;
        margin-left: 8px;

        &:first-child {
          margin-left: 0;
        }
      }

      span {
        margin-left: 8px;
      }
    }
  }
}
</style>