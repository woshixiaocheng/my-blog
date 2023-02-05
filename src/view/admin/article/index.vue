<template>
  <div class="app-container">
    <!-- 按钮卡片 -->
    <el-card>
      <el-row type="flex" justify="space-between" align="middle">
        <div style="display:flex">
      <el-select 
      v-model="sortValue"
      @change="(val)=>{showArticleSort(val,1)}" class="m-2" placeholder="按照分类查找" size="default" style="margin-right:10px">
    <el-option label="所有"
      :value="0"></el-option>
    <el-option
      v-for="item in sorts"
      :key="item.sort_id"
      :label="item.sort_name"
      :value="item.sort_id"
    />
  </el-select>
     <el-select class="m-2"
     v-model="labelValue"
     @change="(val)=>{showArticleLabel(val,1)}" placeholder="按照标签查找" size="default" style="margin-right:10px">
    <el-option label="所有"
    :value="0"></el-option>
    <el-option
      v-for="item in labels"
      :key="item.label_id"
      :label="item.label_name"
      :value="item.label_id"
    />
  </el-select>
 
        </div>
        <el-button type="primary" size="mini" class="button"  @click="$router.push({path:`/admin/doArticle`,query:{way:'add'},})">
          <el-icon><Plus/></el-icon> 新增文章</el-button>
      </el-row>
    </el-card>
    <!-- 主要表单展示 -->
    <el-card class="main">
       <el-table 
    :data="list"
    border
    style="width: 100%">
    <el-table-column
      type="index" :index="1"
      label="序号"
      align="center"
      width="60">
    </el-table-column>
     <el-table-column
      prop="article_title"
      label="文章标题"
      sortable
      width="270"> 
    </el-table-column>
      <el-table-column
      prop="user_name"
      label="发布人"
      sortable
      width="120">
    </el-table-column>
         <el-table-column
      prop="sort_name"
      label="文章分类"
      sortable
      width="120"> 
    </el-table-column>
    <el-table-column
      prop="label_name"
      label="文章标签"
      sortable
      width="120"> 
    </el-table-column>
  
    <el-table-column
      prop="article_date"
      label="更新时间"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="article_like_count"
      label="点赞数"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
    prop="article_comment_count"
      label="评论数"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="article_view"
      label="浏览量"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="300px;display:flex">
      <template v-slot="{row}" >
        <el-button link  type="primary" size="default" @click="editDialog(row)">修改分类和标签</el-button>
        <el-button link  type="primary" size="default" @click="$router.push({path:`/admin/doArticle`,query:{id:row.article_id},})">编辑</el-button>
        <el-button link type="danger" size="default" @click="deleteArticle(row.article_id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pag">
  <span class="total">共 {{total}} 条</span>
  <el-pagination 
  layout="prev, pager, next" 
  :total="total"
  :current-page="page.page"
  :page-size="page.size"
  @current-change="changePage"
   />
  </div>
    </el-card>
    <EditSortLabel v-model:showDialog="showDialog" v-if="showDialog" :articleItem="articleItem" @reload="getAll(1)"></EditSortLabel>
  </div>
</template>

<script>
import {  ref } from '@vue/reactivity'
import {showArticle,getArticleByPage,getSortArticleByPage,getLabelArticleByPage,getArticleSort,getArticleLabel,getArticleUser,getSortArticle,getLabelArticle,getSorts,getLabels,delArticle} from '@/api/article'
import formatDate from '@/assets/js/formatDate.js'
import {useRouter} from 'vue-router'
import EditSortLabel from './components/edit-sort-label.vue'
export default{ 
  components:{
    EditSortLabel
  },
  setup(){
    const $router=useRouter()
    const list=ref([])//存储文章数据
    const sortValue=ref()//绑定分类的select
    const labelValue=ref()//绑定标签的select
    const page=ref({
      size:8,//一页显示的条数
      page:1,//当前页码
    })
    const total=ref(0)//总数
//页面分页改变
const changePage=(newPage)=>{
  page.value.page=newPage
  if(sortValue.value){
    showArticleSort(sortValue.value,newPage)//在切换页点击时也能取到数据，因为取数据要传入id
  }else if(labelValue.value){
    showArticleLabel(labelValue.value,newPage)
  }else{
     getAll(1)
  }
 
}
//获取文章赋值的时候给没分类和标签的赋值
const resolveNullSort=(data)=>{
if(typeof(data)==="undefined"){
  return {0:{sort_name:'暂无'}}
}
  return data
}
const resolveNullLabel=(data)=>{
if(typeof(data)==="undefined"){
  return {0:{label_name:'暂无'}}
}
  return data
}

//获取文章函数
    //文章进行整合获取
 const getArticle=async (list1)=>{
  list.value=[]
 list1.forEach(async(item)=>{
  //获取文章的分类
const data1=await getArticleSort({id:item.article_id})
const sort=ref([])
sort.value=resolveNullSort(data1.data.result)//重新给没有分类的赋值
//获取文章的标签
const data2=await getArticleLabel({id:item.article_id})
const label=ref([])
label.value=resolveNullLabel(data2.data.result)
//获取文章的用户名
const data3=await getArticleUser({id:item.article_id})
const user=ref([])
user.value=data3.data.result
console.log(user.value)
list.value.push(
  {article_id:item.article_id,
    article_title:item.article_title,
      user_name:user.value[0].user_name,
      sort_id:sort.value[0].sort_id,
      sort_name:sort.value[0].sort_name,
      label_id:label.value[0].label_id,
      label_name:label.value[0].label_name,
      article_date:formatDate(item.article_date),
      article_like_count:item.article_like_count,
      article_comment_count:item.article_comment_count,
      article_view:item.article_views
      })
 })
}

//调用获取文章函数的主要代码
//获取文章全部数据
const getAll=async(page1)=>{
  page.value.page=page1
const data=await getArticleByPage({page:page1,size:page.value.size})
 //获取文章总条数
    const data1=await showArticle()
   total.value=data1.data.length
 getArticle(data.data)
}
getAll(1)
//根据分类获取指定文章
const showArticleSort=async(val,page1)=>{
  if(val===0){
    getAll(1)
  }else{
    page.value.page=page1
    const data=await getSortArticleByPage({id:val,page:page1,size:page.value.size})
    //获取文章总条数
    const data1=await getSortArticle({id:val})
   total.value=data1.data.result.length
 getArticle(data.data.result)
  }
  
}
//根据标签获取指定文章
const showArticleLabel=async(val,page1)=>{
  if(val===0){
    getAll(1)
  }else{
    page.value.page=page1
   const data=await getLabelArticleByPage({id:val,page:page1,size:page.value.size})
 //获取文章总条数
    const data1=await getLabelArticle({id:val})
   total.value=data1.data.result.length
  getArticle(data.data.result) 
  }
  
}
//获取全部分类
const sorts=ref([])
const showSorts=async()=>{
  const data=await getSorts()
 sorts.value=data.data
}
showSorts()
//获取全部标签
const labels=ref([])
const showLabels=async()=>{
  const data=await getLabels()
  labels.value=data.data
}
showLabels()
//删除文章
const deleteArticle=async(id)=>{
const data=await delArticle({id:id})
console.log(data)
getAll(1)
}

//修改分类和标签
const showDialog=ref(false)
const articleItem=ref()
//修改标签的窗口
const editDialog=(row)=>{
  console.log(row)
  articleItem.value=row
  showDialog.value=true
}

    return{$router,list,page,total,sortValue,labelValue,sorts,labels,showArticleSort,showArticleLabel,changePage,deleteArticle,editDialog,showDialog,articleItem,getAll}
  }
}
</script>

<style scoped lang="less">
.main{
  margin-top: 20px;
.pag{
margin: 10px 0;
display: flex;
align-items: center;
float: right;  
}
}

</style>