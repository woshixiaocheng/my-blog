<template>
  <!-- 主要文章 -->
  <div class="content">
     <el-form ref="articleForm" :model="form" :rules="rules" label-width="60px" >
  <el-form-item prop="title" label="标题">
    <el-input  placeholder="文章标题" v-model="form.title" style="height:40p"></el-input >
  </el-form-item>
  <el-form-item prop="description" label="摘要" >
    <el-input  placeholder="文章摘要"
    v-model="form.description" style="height:40px"></el-input>
  </el-form-item>

  
 
    </el-form>
<!-- 富文本编辑器 -->
<div class="editor">
  <div class="neirong">内容</div>
   <div  style="border: 1px solid #ccc">
      
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height:300px; overflow-y: hidden;font-size:16px;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
</div>
<div class="button">
  <el-button type="primary" @click="submit">提交</el-button> 
  <el-button @click="reset">重置</el-button>
  </div>
</div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref,reactive, shallowRef} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {addArticle} from '@/api/article'
import formatDate from '@/assets/js/formatDate'
import {useRouter} from 'vue-router'
import {getAssignArticle,editArticle} from '@/api/article'
import {ElMessage} from 'element-plus'
export default {
  components: { Editor, Toolbar },
  props:{
    articleId:{
      type:Number,
    required:true
    }
  },
  setup(props) {
    const $router=useRouter()
    const articleForm=ref(null)
        //存数据的
    const form =reactive({
     title: '',
     description: '',
    })
    const rules=reactive({
    title:[
    {required:true,message:'文章标题输入不能为空',trigger:'blur'},
    {min:1,max:20,message:'不能超过20个字！',trigger:'blur'},
    ],
    })
    //创建文章 //
    const submit=()=>{
     articleForm.value.validate( async(valid)=>{
        if(valid){
            console.log("通过")
           if(props.articleId){
            //编辑文章
            await editArticle({...form,id:props.articleId,content:valueHtml.value})
             ElMessage({
              message:'修改成功',
              type:'success'
            })

           }else{
            const {data}= await addArticle({...form,content:valueHtml.value,id:1,date:formatDate(Date.now())})
          console.log(data)
           }
          
        }else{
            console.log("未通过")
        }
    })  
    }

    //编辑文章
  
    const showArticle=async ()=>{
      const {data}=await getAssignArticle({id:props.articleId})
      form.title=data[0].article_title
      form.description=data[0].article_description
      valueHtml.value=data[0].article_content

    }
    showArticle()
  
  //重置
  const reset=()=>{
    articleForm.value?.resetFields()
    valueHtml.value=''
  }


    
    //编辑器的
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('')

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      $router,
      articleForm,
      form,
      rules,
      submit,
      editorRef,
      valueHtml,
      reset,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
    };
  }
}
</script>

<style scoped lang="less">
.content{
  margin: 0 40px 0 20px;
  width: calc(90%,-80px); 
  .editor{
  display: flex;
  justify-content: space-between;
  .neirong{
    width: 50px;
    margin-left: 18px;
    color: #606266;
        font-size: 14px;
  }
}
  .button{
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
}


</style>
