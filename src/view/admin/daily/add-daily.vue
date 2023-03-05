<template>
  <!-- 主要文章 -->
  <el-dialog  :title="title" v-model="props.showDialog" @close="btnCancel" width="80%">
    <div class="content">
              <!-- md编辑器 -->
    <div class="editor">
      <div class="neirong">内容</div>
      <v-md-editor v-model="content" height="400px"></v-md-editor>
    </div>

    <div class="button">
      <el-button type="primary" @click="submit()">提交</el-button>
      <el-button @click="reset()">重置</el-button>
    </div>
  </div>
</el-dialog> 
  
</template>

<script setup lang="ts">
import { ref, reactive, defineProps,watchEffect,defineEmits} from 'vue'
import { addDaily,getAssignDaily, editDaily } from '@/api/daily'
import formatDate from '@/utils/formatDate'
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance } from 'element-plus'
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
type Props={
  dailyId:number
  showDialog:boolean
}
const props = withDefaults(defineProps<Props>(),{
  showDialog:false,
  dailyId:0
}) 
const emit=defineEmits(['update:showDialog','reload'])
const $router = useRouter()
const content=ref()//富文本编辑器的内容
const title=ref('新增日记')

//同步content内容
const updateContent=(html:any)=>{
  content.value=html
}
//编辑日记的内容展示
const showDaily = async () => {
  const  data  = await getAssignDaily({ id: props.dailyId })
  content.value = data[0].daily_content
  title.value="修改日记"
}
watchEffect(()=>{
//如果有id传入就显示内容
if(props.dailyId){
  showDaily()
}
})

//创建日记 //
const submit =async () => {
      if (props.dailyId) {
        //编辑日记
        await editDaily({  id: props.dailyId, content: content.value,date: formatDate(Date.now())})
        $router.push({
          path:'/admin/daily'
        })
        ElMessage({
          message: '修改成功',
          type: 'success'
        })     
        //新增
      } else {
         await addDaily({ content: content.value, date: formatDate(Date.now()) })
        ElMessage({
          message: '新增成功',
          type: 'success'
        })
      }
      emit('update:showDialog',false)
      emit('reload')
      // ElMessage({
      //     message: '失败',
      //     type: 'info'
      //   })
    }

//重置
const reset = () => {
  //编辑情况下是回到之前的内容
  if(props.dailyId){
    showDaily()
  }else{
  content.value = ''
  }
}
//关闭
//取消
const btnCancel = () => {
  emit('update:showDialog', false)
  content.value = ''
}


</script>

<style scoped lang="less">
.content {
  margin: 0 40px 0 20px;
  width: calc(90%, -80px);

  .editor {
    display: flex;
    justify-content: space-between;

    .neirong {
      width: 50px;
      margin-left: 18px;
      color: #606266;
      font-size: 14px;
    }
  }

  .button {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
}
</style>
