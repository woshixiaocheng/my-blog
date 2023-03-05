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
        <div class="main">
            <div class="content">
                <!-- 左侧栏 -->
                <div class="left">
                    <!-- 个人信息 -->
                    <el-card class="userInfo" shadow="hover">
                        <img src="@/assets/img/photo.jpeg" alt="">
                        <h3>小成</h3>
                        <div class="detail">
                            <div class="firstD">
                                <div>文章</div>
                                <div>10</div>
                            </div>
                            <div>
                                <div>获赞</div>
                                <div>3</div>
                            </div>
                        </div>
                       
                        <div class="buttonContainer">
                            <HoverButton :isRound="true" width="150px" text="我是谁" @click="goPage('/me')"></HoverButton>
                            <HoverButton :isRound="true" width="150px" text="前端日记" @click="goPage('/daily')"></HoverButton>
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
                            <i class="iconfont icon-find" /> 发现
                        </div>
                        <VirtualList :article-list="articleList"></VirtualList>
                    </div>
                </div>
            </div>
        </div>
            <!-- <div class="footer"></div> -->
    </div>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent, computed, onMounted } from 'vue'
import { showArticle, getSorts, getLabels } from '@/api/article'
import { useRouter } from 'vue-router'
import type { articles, sorts, labels } from '@/utils/type'
import HoverButton from '@/components/hoverbutton/index.vue'
import VirtualList from '@/components/virtual-list/index.vue'
//点击箭头跳转到760px（再思考如何更丝滑)
const arrow = () => {
    window.scrollTo(0, 760)
}
//展示文章
const articleList = ref<articles[]>([])
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
    labels.value = await getLabels()
}
showLabels()
//按照分类跳转具体文章展示页面
let router = useRouter()
const goSortArticle = (sortId: number) => {
    router.push({
        path: '/article',
        query: {
            sort_id: sortId
        }
    })
}
//按照标签跳转具体页面
const goLabelArticle = (labelId: number) => {
    router.push({
        path: '/article',
        query: {
            label_id: labelId
        }
    })
}

//跳转到指定页面
const goPage=(path:string)=>{
    router.push({
        path:path
    })
}

//滚动到内容区出现动画
// let scrollHeight = ref<number>(0)
// let timer: any
// onMounted(() => {
//     window.addEventListener('scroll', () => {
//         clearInterval(timer)
//         timer = setTimeout(() => {
//             scrollHeight.value = window.scrollY
//         }, 100)

//     })
// })
// const startAn = computed(() => {
//     if (scrollHeight.value >= 560) {
//         return true
//     } else {
//         return false
//     }
// })
</script>

<style scoped lang="less">
@import '@/assets/css/main.less'; //千万别忘记；
</style>
