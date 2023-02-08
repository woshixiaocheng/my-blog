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
    <!-- 富文本编辑器 -->
    <div class="editor">
      <div class="neirong">内容</div>
     <Editor :content="content" @update="updateContent"></Editor>
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
import Editor from '@/components/Editor/index.vue'
import { ElMessage, FormInstance } from 'element-plus'

const props = defineProps<{
  articleId?: number
}>()
const $router = useRouter()
const articleForm = ref<FormInstance>()
const content=ref()//富文本编辑器的内容

//同步content内容
const updateContent=(html:any)=>{
  content.value=html
}
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
console.log(form)
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
      if (props.articleId) {
        //编辑文章
        await editArticle({ ...form, id: props.articleId, content: content.value,newDate: formatDate(Date.now())})
        $router.push({
          path:'/admin/article'
        })
        ElMessage({
          message: '修改成功',
          type: 'success'
        })     
        //新增
      } else {
        const  data  = await addArticle({ ...form, content: content.value, userId: 1, date: formatDate(Date.now()) })
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
  }
 
 
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
