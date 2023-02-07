<template>
  <div class="app-container">
    <!-- 按钮卡片 -->
    <el-card>
      <el-row type="flex" justify="space-between" align="middle">
        <div style="display:flex">
          <el-select v-model="sortValue"  class="m-2" placeholder="按照分类查找"
            size="default" style="margin-right:10px">
            <el-option label="所有" :value="0"></el-option>
            <el-option v-for="item in sorts" :key="item.sort_id" :label="item.sort_name" :value="item.sort_id" />
          </el-select>
          <el-select class="m-2" v-model="labelValue"  placeholder="按照标签查找"
            size="default" style="margin-right:10px">
            <el-option label="所有" :value="0"></el-option>
            <el-option v-for="item in labels" :key="item.label_id" :label="item.label_name" :value="item.label_id" />
          </el-select>

        </div>
        <el-button type="primary" size="mini" class="button"
          @click="$router.push({ path: `/admin/doArticle`, query: { way: 'add' }, })">
          <el-icon>
            <Plus />
          </el-icon> 新增文章</el-button>
      </el-row>
    </el-card>
    <!-- 主要表单展示 -->
    <el-card class="main">
      <el-table :data="list" border style="width: 100%">
        <el-table-column type="index" :index="1" label="序号" align="center" width="60">
        </el-table-column>
        <el-table-column prop="article_title" label="文章标题" sortable width="270">
        </el-table-column>
        <el-table-column prop="user_name" label="发布人" sortable width="120">
        </el-table-column>
        <el-table-column label="文章分类" sortable width="120">
          <template #default="scope">
            {{scope.row.sort_name||"暂无"}}
          </template>
        </el-table-column>
        <el-table-column  label="文章标签" sortable width="120">
          <template #default="scope">
            {{scope.row.label_name||"暂无"}}
          </template>
        </el-table-column>

        <el-table-column  label="更新时间" sortable width="120">
          <template #default="scope">
            {{formatDate( scope.row.article_date)}}
          </template>
        </el-table-column>
        <el-table-column prop="article_like_count" label="点赞数" sortable width="100">
        </el-table-column>
        <el-table-column prop="article_comment_count" label="评论数" sortable width="100">
        </el-table-column>
        <el-table-column prop="article_views" label="浏览量" sortable width="100">
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="300px;display:flex">
          <template v-slot="{ row }">
            <el-button link type="primary" size="default" @click="editDialog(row)">修改分类和标签</el-button>
            <el-button link type="primary" size="default"
              @click="$router.push({ path: `/admin/doArticle`, query: { id: row.article_id }, })">编辑</el-button>
            <el-button link type="danger" size="default" @click="deleteArticle(row.article_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pag">
        <span class="total">共 {{ page.total }} 条</span>
        <el-pagination layout="prev, pager, next" :total="page.total" :current-page="page.page" :page-size="page.size"
          @current-change="changePage" />
      </div>
    </el-card>
    <EditSortLabel v-model:showDialog="showDialog" v-if="showDialog" :articleItem="articleItem" @reload="showArticle">
    </EditSortLabel>
  </div>
</template>

<script setup lang="ts">
import { ref,watchEffect } from 'vue'
import {getArticleByPage, getSortArticleByPage, getLabelArticleByPage, getSLArticleByPage, getSorts, getLabels, delArticle } from '@/api/article'
import formatDate from '@/utils/formatDate'
import { useRouter } from 'vue-router'
import EditSortLabel from './components/edit-sort-label.vue'
import { ArticleList, Page,sorts,labels} from '@/utils/type'
import { ElMessage, ElMessageBox } from 'element-plus'
const $router = useRouter()
const list = ref<ArticleList[]>([])//存储文章数据
const sortValue = ref<number>(0)//绑定分类的select
const labelValue = ref<number>(0)//绑定标签的select
const page = ref<Page>({
  size: 1,//一页显示的条数
  page: 1,//当前页码
  total: 0//总数
})

//调用获取文章函数的主要代码
//获取文章全部数据
const showAllArticle = async () => {
  const {rows,total} = await getArticleByPage(page.value)
  list.value=rows
  //获取文章总条数
  page.value.total =total
}

//按照分类展示文章
const showSortArticle=async()=>{
  const {rows,total} = await getSortArticleByPage({ id: sortValue.value,...page.value })
    list.value=rows
    page.value.total = total
}
//按照标签展示文章
const showLabelArticle=async()=>{
  const {rows,total} = await getLabelArticleByPage({ id: labelValue.value,...page.value })
    //获取文章总条数
    page.value.total =total
    list.value=rows
}

//按照标签和分类展示文章
const showSLArticle=async()=>{
  const {rows,total}=await getSLArticleByPage({sortId:sortValue.value,labelId:labelValue.value})
  page.value.total =total
    list.value=rows
}
  //页面分页改变获取新数据
const changePage = (newPage: number) => {
  page.value.page = newPage
}
//供监听和删除修改等刷新页面调用
const showArticle=()=>{
 //都没选中取全部
 if(sortValue.value===0&&labelValue.value===0){
  showAllArticle()
}else if(sortValue.value!==0&&labelValue.value===0){
  //选中分类
  showSortArticle()
}else if(labelValue.value!==0&&sortValue.value===0){
  //选中标签
  showLabelArticle()
}else{
  //两者都有
  showSLArticle()
}
}

//四种情况，都没选，选中分类，选中标签，两者都满足来渲染列表
//page在里面使用了所以也被监听了，当page变化也会触发
watchEffect(async()=>{
showArticle()
})

//获取全部分类
const sorts = ref<sorts[]>([])
const showSorts = async () => {
  sorts.value = await getSorts()
}
showSorts()
//获取全部标签
const labels = ref<labels[]>([])
const showLabels = async () => {
  labels.value = await getLabels()
}
showLabels()
//删除文章
const deleteArticle = async (id:any) => {
  const data = await delArticle({ id: id })
  console.log(data)
  ElMessageBox.confirm(
    '您确定要删除吗？',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功！',
      })
      showArticle()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败！',
      })
    })
  
}
//修改分类和标签
const showDialog = ref(false)
const articleItem = ref()
//修改标签的窗口
const editDialog = (row:any) => {
  articleItem.value = row
  showDialog.value = true
}
</script>

<style scoped lang="less">
.main {
  margin-top: 20px;

  .pag {
    margin: 10px 0;
    display: flex;
    align-items: center;
    float: right;
  }
}
</style>