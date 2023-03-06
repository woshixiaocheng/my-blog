<template>
  <!-- 主要文章 -->
  <div class="content">
    <el-form ref="articleForm" :model="form" :rules="rules" label-width="60px">
      <el-form-item prop="title" label="标题">
        <el-input placeholder="文章标题" v-model="form.title" style="height:40p"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="摘要">
        <el-input placeholder="文章摘要" v-model="form.description" style="height:40px"></el-input>
      </el-form-item>
    </el-form>
        <!-- md编辑器 -->
    <div class="editor">
      <div class="neirong">内容</div>
      <Editor v-model:content="content"></Editor>
    </div>
    <div class="button">
      <el-button type="primary" @click="submit(articleForm)">提交</el-button>
      <el-button @click="reset(articleForm)">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps,watchEffect} from 'vue'
import { addArticle,getAssignArticle, editArticle } from '@/api/article'
import formatDate from '@/utils/formatDate'
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance } from 'element-plus'
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
import Editor from '@/components/editor/index.vue'

const props = defineProps<{
  articleId?: number
}>()
const $router = useRouter()
const articleForm = ref<FormInstance>()
const content=ref('')//富文本编辑器的内容
const htmlContent=ref()//html的内容

//编辑文章的内容展示
const showArticle = async () => {
  const  data  = await getAssignArticle({ id: props.articleId })
  form.title = data[0].article_title
  form.description = data[0].article_description
  content.value = data[0].article_content
}
watchEffect(()=>{
//如果有id传入就显示内容
if(props.articleId){
  showArticle()
}
})

//存数据的
const form = reactive({
  title: '',
  description: '',
})
const rules = reactive({
  title: [
    { required: true, message: '文章标题输入不能为空', trigger: 'blur' },
    { min: 1, max: 20, message: '不能超过20个字！', trigger: 'blur' },
  ],
})
//创建文章 //
const submit = (formEl:FormInstance|undefined) => {
  if(!formEl) return 
  formEl.validate(async (valid) => {
    if (valid) {
      htmlContent.value = xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(content.value));//把content变成html格式的
      if (props.articleId) {
        //编辑文章
        await editArticle({ ...form, id: props.articleId, content: htmlContent.value,newDate: formatDate(Date.now())})
        $router.push({
          path:'/admin/article'
        })
        ElMessage({
          message: '修改成功',
          type: 'success'
        })     
        //新增
      } else {
        await addArticle({ ...form, content: htmlContent.value, userId: 1, date: formatDate(Date.now()) })
        $router.push({
          path:'/admin/article'
        })
        ElMessage({
          message: '新增成功',
          type: 'success'
        }) 
      }
    } else {
      ElMessage({
          message: '失败',
          type: 'info'
        })
    }
  })
}

//重置
const reset = (formEl:FormInstance|undefined) => {
  //编辑情况下是回到之前的内容
  if(props.articleId){
    showArticle()
  }else{
    formEl?.resetFields()
  content.value = ''
  htmlContent.value=''
  }
 
 
}


</script>

<style scoped lang="less">
.content {
  margin: 0 40px 0 20px;
  width: calc(90%, -80px);

  .editor {
    .neirong {
      width: 50px;
      margin-left: 18px;
      color: #606266;
      font-size: 14px;
      margin-bottom: 8px;
    }
  }

  .button {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
