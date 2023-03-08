<template>
    <div class="container">
         <el-card>
      <el-row type="flex" justify="space-between" align="middle">
        <el-button type="primary" size="default" class="button" @click="addDialog">
          <!-- <el-icon><Plus/></el-icon> -->
           新增标签</el-button>
      </el-row>
    </el-card>
    <el-card class="main">
       <el-table 
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      type="index" :index="1"
      label="序号" align="center"
      width="60">
    </el-table-column>
     <el-table-column
      prop="label_name"
      label="标签名称"
      align="center"
      sortable
      > 
    </el-table-column>
      <el-table-column
      prop="label_description"
      label="标签描述"
      sortable
      align="center"
     >
    </el-table-column>
 
    <el-table-column
      fixed="right"
      align="center"
      label="操作"
     >
      <template v-slot="{ row }">
        <el-button  type="primary" size="default" @click="editDialog(row)">编辑</el-button>
        <el-button type="danger" size="default" @click="deleteLabel(row.label_id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pag">
  <span class="total">共 {{page.total}} 条</span>
  <el-pagination
   layout="prev, pager, next" :total="page.total"
  :current-page="page.page"
  :page-size="page.size"
  @current-change="changePage"
   />
  </div>
    </el-card>
    <!-- 新增/编辑分类 -->
    <AddLabel 
    @reload="showLabelsByPage"
    v-model:showDialog="showDialog" :editContent="editContent"  v-if="showDialog"></AddLabel>
    </div>
</template>
<script lang="ts">
    export default {
      name: 'label',
    };
</script>
<script setup lang="ts">
import {getLabels,getLabelsByPage,delLabel} from '@/api/article'
import {ref} from 'vue'
import AddLabel from './components/add-label.vue'
import {ElMessageBox,ElMessage} from 'element-plus'

    const showDialog=ref(false)//添加和修改窗口的显示隐藏
    const list=ref([])//标签数据
    const page=ref({
      page:1,//当前页码
      size:8,//每一页的条数
      total:0
    })
    //页面分页改变
const changePage=(newPage:number)=>{
  page.value.page=newPage
     showLabelsByPage()
}
    //根据分页获取标签信息
    const showLabelsByPage=async()=>{
      const {rows,total} =await getLabelsByPage({page:page.value.page,size:page.value.size})
      list.value=rows
      page.value.total=total

    }
    showLabelsByPage()

    //删除指定分类
    const deleteLabel=(id:number)=>{
      ElMessageBox.confirm('确认删除？',{ confirmButtonText: '确定',
          cancelButtonText: '取消',}).then(async()=>{
           const {data}= await delLabel({id:id})
          if(data&&data.code===0){
            ElMessage({
              message:'不能删除该数据',
              type:'error'
            })
          }else{
            showLabelsByPage()
            ElMessage({
              message:'删除成功',
              type:'success'
            })
          }   
        }).catch(()=>{
        })
    } 
    const editContent=ref()//存储传入编辑的信息
    //新增窗口弹出
    const addDialog=()=>{
      editContent.value=null
      showDialog.value=true
    }
    //编辑窗口弹出
    const editDialog=(row:any)=>{
      editContent.value=row
    showDialog.value=true

    }
</script>

<style scoped lang="less">
.container{
  width: 100%;
  height: 100%;
}
.main{
    margin-top: 20px;
    .pag{
margin: 10px 0;
display: flex;
align-items: center;
float: right;  
}
}
.show{
  display: none;
}
</style>