<template>
   <el-card class="main">
    <el-tabs v-model="activeName" class="tabs" >
    <el-tab-pane :label="label" name="do">
      <KeepAlive>
         <AddArticle :articleId="id"></AddArticle>
        </KeepAlive>
    </el-tab-pane>
    <el-tab-pane label="其他信息" name="second" v-if="id">
    </el-tab-pane>
  </el-tabs>
</el-card> 
</template>
<script lang="ts">
import AddArticle from './components/add-article.vue'
import {ref} from 'vue'
import { useRoute } from 'vue-router'
export default{
  name:'adminDoArticle',
    components:{
        AddArticle
    },
    setup(){
       const activeName=ref('do')
       const route=useRoute()
       const id=ref(0)//切换新建和编辑方式
       const label=ref('新建文章')
       id.value=Number(route.query.id)
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

