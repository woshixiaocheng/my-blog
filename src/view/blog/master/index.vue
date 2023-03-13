<template>   
    <div>
        <!-- banner -->           
        <div class="banner" style="animation: header-effect 2s">
            <h1>小成日记</h1>
            <h2>我会继续加油的！</h2>
            <!-- 波浪 -->
        <div class="wave">
            <img v-lazy src="@/assets/icon/arrow.png" alt="" class="arrow" @click="arrow">
            <img v-lazy src="@/assets/svg/wave-1.svg" alt="">
            <img v-lazy src="@/assets/svg/wave-2.svg" alt="">
            <img v-lazy src="@/assets/svg/wave-3.svg" alt="">
            <img v-lazy src="@/assets/svg/wave-4.svg" alt="">
            <img v-lazy src="@/assets/svg/wave-5.svg" alt="">
        </div>
        </div>

        
        <!-- content -->
        <div class="main">
            <div class="content">
                <!-- 左侧栏 -->
                <div class="left" ref="left">
                    <!-- 个人信息 -->
                    <el-card class="userInfo" shadow="hover">
                        <img v-lazy src="@/assets/img/photo.jpeg" alt="">
                        <h3>小成</h3>
                        <div class="detail">
                            <div class="firstD">
                                <div>文章</div>
                                <div>{{articleList.length}}</div>
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
                            <img v-lazy src="@/assets/icon/folder.svg" alt="">
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
                            <img v-lazy src="@/assets/icon/sign.svg" alt="">
                            <span>文章标签</span>
                        </div>
                        <div class="sign">
                            <el-tag effect="dark" :style="{backgroundColor:labelColor}" round v-for="item in labels" :key="item.label_id"
                                @click="goLabelArticle(item.label_id)">{{ item.label_name }}</el-tag>
                      
                        </div>
                    </el-card>
                </div>
                <div class="right">
                    <!-- 公告 -->
                    <div class="notice">
                        <img v-lazy src="@/assets/icon/laba.png" alt="">
                        <div>欢迎来到我的博客！一起学习前端呀</div>
                    </div>
                    <!-- 文章展示 -->
                    <div class="article">
                        <div class="find">
                            <i class="iconfont icon-find" /> 发现
                        </div>
                        <VirtualList :add-num="100" :article-list="articleList"></VirtualList>
                    </div>
                </div>
            </div>
        </div>
            <!-- <div class="footer"></div> -->
    </div>
</template>
<script lang="ts">
    export default {
      name: 'master',
    };
</script>
<script lang="ts" setup>
import { ref, computed, onMounted,onUnmounted } from 'vue'
import { showArticle, getSorts, getLabels } from '@/api/article'
import { useRouter } from 'vue-router'
import type { articles, sorts, labels } from '@/utils/type'
import HoverButton from '@/components/hoverbutton/index.vue'
import VirtualList from '@/components/virtual-list/index.vue'
import isFadeIn from '@/utils/isFadeIn'
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
//实现以下随机生成颜色
let randomColorList=['#FA7C92','#6EC4DB','#66Ab8C','#FA7C92','#6ec4db']
const labelColor=computed(()=>{
    let num=Math.ceil(Math.random()*5)

   return randomColorList[num-1]
})


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
const left=ref()//left面板实例
let pastScroll1 = ref(0)//用它存之前的滚动距离
const handleScroll1=()=>{
    let scroll1 = window.scrollY//页面的滚动距离
    let scrollChange =  scroll1 - pastScroll1.value//前后距离的差
         for(let i=0;i<left.value.children.length;i++){
         isFadeIn(left.value.children[i],scrollChange,0)
         }

    pastScroll1.value = window.scrollY
}
onMounted(() => {
    window.addEventListener('scroll', handleScroll1)
})
onUnmounted(()=>{
    window.removeEventListener('scroll', handleScroll1)
})

</script>

<style scoped lang="less">
@import '@/assets/css/main.less'; //千万别忘记；

</style>
