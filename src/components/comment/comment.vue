<template>
    <div class="comment">
      <!-- 留言输入框封装 -->
    <CommentBox @add-comment="addCommentContent($event,0,null)"></CommentBox>
       <!-- 有内容和无内容 -->
    <div v-if="commentList.length>0" class="comment-content">

      <!-- 评论数量 -->
      <div class="comment-title">
        <span><span style="padding: 0 5px;">{{ total  }}</span>条评论</span>
      </div>
      <!-- //一个大评论 -->
      <CommentDetail v-for="item in commentList" :comment-item="item" @addCommentContentBox="addCommentContent"></CommentDetail>
    </div>
    <div v-else class="comment-notice" >
      <span>来发第一条评论啦！</span>
    </div>
    </div>
 
</template>

<script setup lang="ts">
import {nextTick} from 'vue'
import CommentBox from './comment-box.vue'
import formatDate from '@/utils/formatDate';
import { addComment } from '@/api/article';
import {userStore} from '@/store/index'
import {ElMessage} from 'element-plus'
import { useRouter } from 'vue-router';
import CommentDetail from './comment-detail.vue'
import { getToken } from '@/utils/auth';
const user=userStore()
const $router = useRouter()
const props = defineProps<{
    commentList:any[],
    articleId:number,
    total:number
}>()
const emit=defineEmits(['getComment'])
//新增评论
const addCommentContent=async(content:any,pid:any,name:any)=>{
  //要先登录了才能获取userInfo信息
  console.log(user.token,getToken())
  if(user.token){
  const userInfo= await user.getUserInfo()//data是数组
  console.log(userInfo)
    if(userInfo[0]&&userInfo[0].user_id){
    //登录了才能发表评论
    try{
const data=await addComment({date:formatDate( Date.now()),content:content.value,pid:pid,userId:userInfo[0].user_id,articleId:props.articleId,parentName:name})
console.log(data)
if(data){
ElMessage({
        message: `发布评论成功~`,
        type: 'success',
      })
      emit('getComment')
    }
    }catch(err:any){
      ElMessage({
        message: '评论失败',
        type: 'info',
      })
    }
  }
  }else{
    ElMessage({
        message: '登录后才能更好地和博主聊天哦，去登录吧~',
        type: 'info',
      })
      $router.push({
          path: '/login'
        })
  }
if(content.value===''){
  ElMessage({
        message: '评论不能为空！',
        type: 'info',
      })
      return
}

}

</script>
<style scoped lang="less">
.comment{
  color: #000;
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
     padding-bottom: 20px;
    }

  }

}
</style>