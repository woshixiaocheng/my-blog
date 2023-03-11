<template>
  <!-- 主要文章 -->
  <el-dialog  :title="title" v-model="props.showDialog" @close="btnCancel" width="80%">
    <div class="content">
      <div style="margin-bottom: 20px;">
        <span style="margin-right: 20px;">日期时间</span>
      <el-date-picker
        v-model="date"
        type="datetime"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="请选择日期和时间"
      />
    </div>
              <!-- md编辑器 -->
    <div class="editor">
    <Editor v-model:content="content"></Editor>
    </div>

    <div class="button">
      <el-button type="primary" @click="submit()">提交</el-button>
      <el-button @click="reset()">重置</el-button>
    </div>
  </div>
</el-dialog> 
  
</template>
<script lang="ts">
    export default {
      name: 'adddaily',
    };
</script>
<script setup lang="ts">
import { ref, defineProps,watchEffect,defineEmits, nextTick} from 'vue'
import { addDaily,getAssignDaily, editDaily } from '@/api/daily'
import formatDate from '@/utils/formatDate'
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance } from 'element-plus'
import Editor from '@/components/editor/index.vue'
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
const content=ref('')//富文本编辑器的内容
const date=ref('')
const title=ref('新增日记')
const htmlContent=ref('')//html的内容
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
  htmlContent.value = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(content.value));//把content变成html格式的
      if (props.dailyId) {
        //编辑日记
        if(date.value){
          await editDaily({  id: props.dailyId, content: htmlContent.value,date: formatDate(date.value)})
        }else{
          await editDaily({  id: props.dailyId, content: htmlContent.value,date: formatDate(Date.now())})
        }
        
        $router.push({
          path:'/admin/admindaily'
        })
        ElMessage({
          message: '修改成功',
          type: 'success'
        })     
        //新增
      } else {
        if(date.value){
            await addDaily({ content: htmlContent.value,date:formatDate(date.value)})
        }else{
         await addDaily({ content: htmlContent.value, date: formatDate(Date.now()) })
        }
         $router.push({
          path:'/admin/admindaily'
        })
        ElMessage({
          message: '新增成功',
          type: 'success'
        })
      }
      emit('update:showDialog',false)
      emit('reload')
    }

//重置
const reset = () => {
  //编辑情况下是回到之前的内容
  if(props.dailyId){
    showDaily()
  }else{
  content.value = ''
  htmlContent.value=''
  }
}
//关闭
//取消
const btnCancel = () => {
  emit('update:showDialog', false)
  content.value = ''
  htmlContent.value=''
}


</script>

<style scoped lang="less">
.content {
  margin: 0 10px 0 10px;
  width: calc(90%, -80px);

  .editor {
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
