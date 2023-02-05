<template>
    <div>
         <!-- 文章分类 -->
         <Banner :banner="banner"></Banner>
            <!-- 标题 -->
            <div class="main">
                <div class="content">
                <el-card class="classify">
                 <img src="@/assets/icon/folder.png" alt="">  
                <span>文章分类</span> 
                <div  >
                    <el-tag v-for="item in sortList" :key="item.sort_id" class="tag" type="success">{{item.sort_name}}</el-tag></div>
                </el-card>
        <!-- 文章标签 -->
              <el-card class="classify">
                 <img src="@/assets/icon/folder.png" alt="">  
                <span>文章标签</span> 
                <div  >
                    <el-tag v-for="item in labelList" :key="item.label_id" class="tag" type="warning">{{item.label_name}}</el-tag></div>
                </el-card>
                <div style="height: 1000px; width: 1200px;background-color: aqua;">11</div>
                </div>
            </div>
                       <!-- footer -->
    <div class="footer" ></div>

    </div>
</template>

<script>
import Banner from '@/components/banner/index.vue'
import { reactive,ref } from 'vue'
import {getSorts,getLabels} from '@/api/article'
export default{
    components:{
        Banner,
    },
    setup(){
        const banner=reactive({
            title:'文章归档',
            content:'在这里可以更快地找到你想要的内容！'
        })
        const sortList=ref([])//存储分类数据
        const labelList=ref([])//存储标签数据
        const showSorts=async()=>{
            const data=await getSorts()
            sortList.value=data.data
        }
        showSorts()
         const showLabels=async()=>{
            const data=await getLabels()
            labelList.value=data.data
        }
        showLabels()
        return{banner,sortList,labelList}
    }
}
</script>

<style scoped lang="less">
.main{
    background-color: #fff;
    min-height: 500px;
    .content{
        width: 70%;
    min-height: 490px;
    margin: 0 auto;
    padding: 10px 0;
    max-width: 780px;  
    }
}
 .classify{
        margin: 40px auto 40px;
            img{
        width: 30px;
        margin-right: 5px;
        vertical-align: middle;
    }
    span{
        font-weight: bold;
        font-size: 18px;
        vertical-align: middle;
    }
    .tag{
        margin-top: 20px;
        margin-left: 20px;
    }
        
    }
</style>