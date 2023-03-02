<template>
    <div class="comment">
      <!-- 留言输入框封装 -->
    <CommentBox></CommentBox>
       <!-- 有内容和无内容 -->
    <div v-if="comments.length>0" class="comment-content">
      <!-- 评论数量 -->
      <div class="comment-title">
        <span><span style="padding: 0 5px;">{{  total  }}</span>条评论</span>
      </div>
      <div class="comment-detail">
        <div style="display: flex;">
        <el-avatar shape="square"  :size="35" class="comment-avatar" src="@/assets/img/photo.jpeg"></el-avatar>
        <!-- 评论信息 -->
        <div style="width:100%;display: inline-block;">
        <div style="display: flex;justify-content: space-between;  ">
        <div >
          <span class="comment-name" >名字</span>
          <span class="comment-master" >博主</span>
          <span class="comment-time">2018-01-01</span>
          
        </div>
        <div class="comment-reply" @click="showDialog=true">
          <span>回复</span>
        </div>
        </div>
        <!-- 评论详细内容 -->
        <div class="comment-text">
          <span>11111</span>
        </div>
          <!-- 回复板块 -->
      <div style="margin-top: 20px;">
        <div class="comment-detail">
          <div style="display: flex;">
        <el-avatar shape="square"  :size="35" class="comment-avatar" src="@/assets/img/photo.jpeg"></el-avatar>
        <!-- 评论信息 -->
        <div style="width:100%">
        <div style="display: flex;justify-content: space-between; width: 100%;">
        <div>
          <span class="comment-name" >名字</span>
          <span class="comment-master" >博主</span>
          <span class="comment-time">2018-01-01</span>
          
        </div>
        <div class="comment-reply" @click="showDialog=true">
          <span>回复</span>
        </div>
        </div>
        <!-- 评论详细内容 -->
        <div class="comment-text">
          <span>11111</span>
        </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
    
      </div>
    </div>
    <div class="comment-notice" v-else>
      <span>来发第一条评论啦！</span>
    </div>
    </div>
    <ElDialog v-model="showDialog"  :before-close=" closeDialog" width="30%"
  :destroy-on-close="true"
  :append-to-body="true">
    <CommentBox :is-dialog="true" @on-close-dialog="closeDialog" ></CommentBox>
  </ElDialog>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import CommentBox from './comment-box.vue'
import { ElDialog } from 'element-plus';
//回复弹框
const showDialog=ref(false)
const closeDialog=()=>{
  showDialog.value=false
}
//评论列表
const comments=ref([1])
const total=ref(4)
</script>
<style lang="less">
.comment{
  width: 100%;
 
  .comment-notice{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    color: var(--fontGray);
  }
  .comment-content{
    .comment-title{
      font-size: 20px;
      color: var(--fontGray);
      margin-bottom: 20px;
    }
    .comment-detail{
      width: 100%;
      .comment-avatar{
        margin-right: 5px;
        display: inline-block;
      }
      .comment-name{
        color: var(--buttonHover);
        font-weight: bold;
        margin-right: 5px;
      }
      .comment-time{
        color: var(--fontGray);
        font-weight: 500;
        font-size: 12px;
      }
      .comment-master{
        color: var(--colorful1);
        border:  1px solid var(--colorful1);
        font-size: 12px;
        border-radius: 3px;
        padding: 2px 4px;
        margin-right: 5px;
      }
      .comment-reply{
        cursor: pointer;
        color: #fff;
        font-size: 12px;
        padding: 3px 6px;
        box-sizing: content-box;
       height: 16px;
       border-radius: 3px;
        background-color: #7ec5c8;
      }
      .comment-text{
        margin-top: 10px;
        padding: 20px;
        background-color: #f7fcfe;
        border-radius: 5px;
      }
    }
  }

}
</style>