<template>
    <div class="container">
         <el-card>
      <el-row type="flex" justify="space-between" align="middle">
        <el-button type="primary" size="default" class="button" @click="addDialog">
          <!-- <el-icon><Plus/></el-icon>  -->
          新增分类</el-button>
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
      prop="sort_name"
      label="分类名称"
      align="center"
      sortable
      > 
    </el-table-column>
      <el-table-column
      prop="sort_description"
      label="分类描述"
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
        <el-button type="danger" size="default" @click="deleteSort(row.sort_id)">删除</el-button>
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
    <AddSort 
    @reload="showSortsByPage"
    v-model:showDialog="showDialog" :sort="sort"  v-if="showDialog"></AddSort>
    </div>
</template>
<script lang="ts">
    export default {
      name: 'sort',
    };
</script>
<script setup lang="ts">
import {getSorts,getSortsByPage,delSort} from '@/api/article'
import {ref} from 'vue'
import AddSort from './components/add-sort.vue'
import {ElMessageBox,ElMessage} from 'element-plus'
import {sorts} from '@/utils/type'
    const showDialog=ref(false)
    const list=ref([])//分类数据
    const page=ref({
      page:1,//当前页码
      size:8,//每一页的条数
      total:0,//总条数
    })
    //页面分页改变
const changePage=(newPage:number)=>{
  page.value.page=newPage
     showSortsByPage()
}
    //根据分页获取分类信息
    const showSortsByPage=async()=>{
      const {rows,total} =await getSortsByPage(page.value)
      list.value=rows
      page.value.total=total
    }
    showSortsByPage()

    //删除指定分类
    const deleteSort=(id:number)=>{
      ElMessageBox.confirm('确认删除？',{ confirmButtonText: '确定',
          cancelButtonText: '取消',}).then(async()=>{
         await delSort({id:id})
            showSortsByPage()
            ElMessage({
              message:'删除成功',
              type:'success'
            })
        }).catch(()=>{
          ElMessage({
              message:'该数据不能删除！',
              type:'info'
            })
        })
    } 
    const sort=ref()//存储传入编辑的信息
    //新增窗口弹出
    const addDialog=()=>{
      sort.value=null
      showDialog.value=true
    }
    //编辑窗口弹出
    const editDialog=(row:any)=>{
      sort.value=row
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