<template>
    <div>
        <!-- banner -->
        <div class="banner">
            <h1>小成日记</h1>
            <h2>我会继续加油的！</h2>
        </div>
        <!-- 波浪 -->
        <div class="wave">
            <img src="@/assets/icon/arrow.png" alt="" class="arrow" @click="arrow">
            <img src="@/assets/svg/wave-1.svg" alt="">
            <img src="@/assets/svg/wave-2.svg" alt="">
            <img src="@/assets/svg/wave-3.svg" alt="">
            <img src="@/assets/svg/wave-4.svg" alt="">
            <img src="@/assets/svg/wave-5.svg" alt="">
        </div>
        <!-- content -->
        <div class=" main">
            <div class="content">
                <!-- 左侧栏 -->
                <div class="left">
                    <!-- 个人信息 -->
                    <el-card class="userInfo" shadow="hover">
                        <img src="@/assets/img/photo.jpeg" alt="">
                        <h3>小成</h3>
                        <div class="detail">
                            <div>
                                <div>文章</div>
                                <div>10</div>
                            </div>
                            <div>
                                <div>获赞</div>
                                <div>3</div>
                            </div>
                        </div>
                        <div class="button" to="/me">
                            <el-button round size="large" class="button">
                                <el-button round size="large" class="buttonChange1" />
                                我是谁</el-button>
                            <el-button round size="large" style="margin:0;margin-top:15px" class="button"><el-button
                                    round size="large" class="buttonChange2" />前端日记</el-button>
                        </div>

                    </el-card>
                    <!-- 文章分类 -->
                    <el-card class="articleMenu">
                        <div>
                            <img src="@/assets/icon/folder.svg" alt="">
                            <span>文章分类</span>
                        </div>
                        <ul>
                            <li v-for="item in sorts" :key="item.sort_id" @click="goSortArticle(item.sort_id)">
                                {{ item.sort_name }}</li>
                        </ul>
                    </el-card>
                    <!-- 文章标签 -->
                    <el-card class="articleMenu">
                        <div>
                            <img src="@/assets/icon/sign.svg" alt="">
                            <span>文章标签</span>
                        </div>
                        <div class="sign">
                            <el-tag effect="dark" round v-for="item in labels" :key="item.label_id"
                                @click="goLabelArticle(item.label_id)">{{ item.label_name }}</el-tag>
                            <el-tag effect="dark" color="#FA7C92" round>html</el-tag>
                            <el-tag effect="dark" color="#6EC4DB" round>Vue项目</el-tag>
                            <el-tag effect="dark" color="#66Ab8C" round>React</el-tag>
                            <el-tag effect="dark" color="#FA7C92" round>React</el-tag>
                            <el-tag effect="dark" color="#6ec4db" round>React</el-tag>
                        </div>
                    </el-card>
                </div>
                <div class="right">
                    <!-- 公告 -->
                    <div class="notice">
                        <img src="@/assets/icon/laba.png" alt="">
                        <div>欢迎来到我的博客！一起学习前端呀</div>
                    </div>
                    <!-- 文章展示 -->
                    <div class="article">
                        <div class="find">
                            <img src="@/assets/icon/find.svg" /> 发现
                        </div>
                        <div v-for="(item, index) in articleList" :key="index">
                            <Suspense>
                                <template #default>
                                    <ArticleItem :index="index" :articleId="item.article_id"></ArticleItem>
                                </template>
                                <template #fallback>
                                    <div>loading...</div>
                                </template>
                            </Suspense>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- footer -->
        <div class="footer"></div>
    </div>


</template>
<script lang="ts" setup>
import { ref,defineAsyncComponent } from 'vue'
import { showArticle, getSorts, getLabels } from '@/api/article'
import { useRouter } from 'vue-router'
import type { articles,sorts,labels } from '@/utils/type'
import {login} from '@/api/user'
const ArticleItem=defineAsyncComponent(()=>import('@/components/article-item/index.vue'))
//点击箭头跳转到760px（再思考如何更丝滑)
const arrow = () => {
    window.scrollTo(0, 760)
}
const login1=async()=>{
   let result= await login({phone:'13537311172',password:"123456"})
   console.log(result)
}
login1()
//展示文章
const articleList= ref<articles[]>([])
const showArticle1 = async () => {
    const result = await showArticle()
    articleList.value = result
}
showArticle1()
//展示文章分类
const sorts = ref<sorts[]>([])
const showSorts = async () => {
    const result = await getSorts()
    sorts.value = result
}
showSorts()
//展示文章标签
const labels = ref<labels[]>([])
const showLabels = async () => {
    labels.value   = await getLabels()
}
showLabels()
//按照分类跳转具体文章展示页面
let router1 = useRouter()
const goSortArticle = (sortId:number) => {
    router1.push({
        path: '/article',
        query: {
            sort_id: sortId
        }
    })
}
//按照标签跳转具体页面
let router2 = useRouter()
const goLabelArticle = (labelId:number) => {
    router2.push({
        path: '/article',
        query: {
            label_id: labelId
        }
    })
}
</script>

<style scoped lang="less">
@import '@/assets/css/main.less'; //千万别忘记；
</style>
