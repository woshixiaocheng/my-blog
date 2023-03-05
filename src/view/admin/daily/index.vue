<template>
    <div class="container">
         <el-card>
      <el-row type="flex" justify="space-between" align="middle">
        <el-button type="primary" size="default" class="button"  @click="addDialog">
          <!-- <el-icon><Plus/></el-icon> -->
           新增日记</el-button>
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
      label="日记内容"
      align="center"
      sortable
      > 
      <template #default="{row}" >
        <div v-html="row.daily_content"></div>
      </template>
    </el-table-column>
    <el-table-column
      label="发布时间" align="center"
      width="120">
      <template #default="{row}" >
        {{ formatDate(row.daily_date) }}
      </template>
      </el-table-column>
    <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="300"
     >
      <template v-slot="{ row }">
        <el-button  type="primary" size="default" @click="editDialog(row.daily_id)">编辑</el-button>
        <el-button type="danger" size="default" @click="deleteLabel(row.daily_id)">删除</el-button>
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
    <AddDaily v-model:showDialog="showDialog" :dailyId="dailyId" @reload="showDailysByPage"></AddDaily>
    </div>
</template>

<script setup lang="ts">
import { getDailyByPage,delDaily } from '@/api/daily';
import formatDate from '@/utils/formatDate';
import {ref} from 'vue'
import AddDaily from './add-daily.vue'
import {ElMessageBox,ElMessage} from 'element-plus'
const showDialog=ref(false)
    const list=ref([])//日记数据
    const page=ref({
      page:1,//当前页码
      size:8,//每一页的条数
      total:0
    })
    //页面分页改变
const changePage=(newPage:number)=>{
  page.value.page=newPage
     showDailysByPage()
}
    //根据分页获取日记信息
    const showDailysByPage=async()=>{
      const {rows,total} =await getDailyByPage({page:page.value.page,size:page.value.size})
      list.value=rows
      page.value.total=total
      console.log('11')

    }
    showDailysByPage()

    //删除指定分类
    const deleteLabel=(id:number)=>{
      ElMessageBox.confirm('确认删除？',{ confirmButtonText: '确定',
          cancelButtonText: '取消',}).then(async()=>{
           const {data}= await delDaily({id:id})
          if(data&&data.code===0){
            ElMessage({
              message:'不能删除该数据',
              type:'error'
            })
          }else{
            showDailysByPage()
            ElMessage({
              message:'删除成功',
              type:'success'
            })
          }   
        }).catch(()=>{
        })
    } 
    const dailyId=ref()//存储
    //新增窗口弹出
    const addDialog=()=>{
      dailyId.value=0
      showDialog.value=true
    }
    //编辑窗口弹出
    const editDialog=(id:any)=>{
      dailyId.value=id
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