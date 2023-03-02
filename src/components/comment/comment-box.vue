<template>
      <div class="comment-box">
      <div class="text"><img src="@/assets/icon/liuyan.svg" alt="">评论</div>
      <textarea class="comment-textarea" placeholder="写下点什么..." maxlength="2500"></textarea>
      <!-- //按钮 -->
      <div class="tool">
        <HoverButton :is-round="false" text="提交" width="70px" @click="closeDialog"></HoverButton>
      </div>
    </div>
</template>
<script setup lang="ts">
import HoverButton from '@/components/hoverbutton/index.vue'
const props = defineProps<{
    isDialog?:boolean
}>()
const emit=defineEmits(['onCloseDialog'])
const closeDialog=()=>{
    if(props.isDialog){
        emit('onCloseDialog',false)
    }
}
</script>
<style scoped lang="less">
 .comment-box{
    .text{
    color: #7ec5c8;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    img{
      vertical-align: middle;
      padding-bottom: 3px;
      margin-right: 5px;
    }
  }
  .tool{
    display: flex;
    justify-content: flex-end;
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
  }
</style>