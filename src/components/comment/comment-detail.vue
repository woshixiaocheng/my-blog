<template>
    
     <div class="comment-detail" >
 
        <div style="display: flex;">
        <el-avatar shape="square"  :size="35" class="comment-avatar" src="@/assets/img/photo.jpeg"></el-avatar>
        <!-- 评论信息 -->
        <div style="width:100%;display: inline-block;">
        <div style="display: flex;justify-content: space-between;  ">
        <div >
          <span class="comment-name" >{{commentItem.user_name}}</span>
          <span class="comment-master"  v-if="commentItem.user_id==1">博主</span>
          <span class="comment-time">{{formatDate (commentItem.comment_date)}}</span>
          
        </div>
        <div class="comment-reply" @click="showDialog=true">
          <span>回复</span>
        </div>
        </div>
        <ElDialog v-model="showDialog"  :before-close=" closeDialog" width="30%"
  :destroy-on-close="true"
  :append-to-body="false">
    <CommentBox :is-dialog="true" @on-close-dialog="closeDialog" @add-comment="addCommentContent($event,commentItem.comment_id,commentItem.user_name)"></CommentBox>
  </ElDialog>
        <!-- 评论详细内容 -->
        <div class="comment-text">
          <span>{{commentItem.comment_content}}</span>
        </div>
 
          <!-- 回复板块 -->
      <div  style="margin-top: 20px;" v-if="commentItem.children">
        
        <div class="comment-detail" v-for="key in commentItem.children">

          <div style="display: flex;">
        <el-avatar shape="square"  :size="35" class="comment-avatar" src="@/assets/img/photo.jpeg"></el-avatar>
        <!-- 评论信息 -->
        <div style="width:100%">
        <div style="display: flex;justify-content: space-between; width: 100%;">
        <div>
          <span class="comment-name" >{{ key.user_name }}</span>
          <span class="comment-master"  v-if="key.user_id==1">博主</span>
          
        </div>
        <div class="comment-reply" @click="showReplyDialog=true">
          <span>回复</span>
        </div>
        </div>
        <!-- 评论详细内容 -->
        <div class="comment-text">
            <span class="username">{{ key.comment_parentName?`@${key.comment_parentName}`:'' }}</span>
          <span>{{key.comment_content}}</span>
        </div>
        <ElDialog v-model="showReplyDialog"  :before-close=" closeDialogReply" width="30%"
  :destroy-on-close="true"
  :append-to-body="false">
    <CommentBox :is-dialog="true" @on-close-dialog="closeDialogReply" @add-comment="addCommentContent($event,commentItem.comment_id,key.user_name)"></CommentBox>
  </ElDialog>
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>

    </div>
</template>
<script setup lang='ts'>
import {ref, nextTick} from 'vue'
import CommentBox from './comment-box.vue'
import formatDate from '@/utils/formatDate';
import { ElDialog } from 'element-plus';
const props = defineProps<{
    commentItem:any
}>()
const emit =defineEmits(['addCommentContentBox'])
const addCommentContent=(event:any,pid:number,name:string)=>{
    nextTick()
    emit('addCommentContentBox',event,pid,name)
}
//回复弹框的开关
const showDialog=ref(false)
const closeDialog=()=>{
  showDialog.value=false
}
const showReplyDialog=ref(false)
const closeDialogReply=()=>{
    showReplyDialog.value=false
}
</script>
<style lang="less" scoped>
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
        padding: 0px 6px;
        box-sizing: content-box;
       height: 26px;
       border-radius: 3px;
        background-color: #7ec5c8;
      }
      .comment-text{
        .username{
            color: #0374f6;
            font-size: 14px;
            padding-right: 5px;
        }
        margin-top: 10px;
        padding: 20px;
        background-color: #f7fcfe;
        border-radius: 5px;
      }
    }
</style>
