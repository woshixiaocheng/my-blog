<template>
   <el-card class="main">
  <!-- 页头 -->
   <!-- <div @click="$router.push('/admin/article')" class="header"><el-icon style="margin-right:4px;vertical-align:middle"><ArrowLeft/></el-icon>返回 </div> -->
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
    <el-tab-pane :label="label" name="do">
         <AddArticle :articleId="id"></AddArticle>
    </el-tab-pane>
    <el-tab-pane label="其他信息" name="second" v-if="id">
         <!-- <el-form ref="articleForm" :model="form" :rules="rules" label-width="60px" >
  <el-form-item prop="title" label="标题">
    <el-input  placeholder="文章标题" v-model="form.title" style="height:40p"></el-input >
  </el-form-item>
  <el-form> -->
    </el-tab-pane>
  </el-tabs>
   
</el-card> 
</template>

<script>
import AddArticle from './components/add-article.vue'
import {ref} from 'vue'
import { useRoute } from 'vue-router'
export default{
    components:{
        AddArticle
    },
    setup(){
       const activeName=ref('do')
       const route=useRoute()
       const id=ref()//切换新建和编辑方式
       const label=ref('新建文章')
       id.value=route.query.id
       if(id.value){
        label.value='编辑文章'
        //请求文章信息，传给add-article

       }else{
        label.value='新建文章'
       }
       return{activeName,label,id}
    }
}
</script>

<style scoped lang="less">
.main{
  .header{
  margin-bottom: 10px;
  cursor: pointer;
}
.tabs{
    margin: 0px 40px;
}
}
</style>

