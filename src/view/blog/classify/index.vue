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
                    <div>
                        <el-tag v-for="item in sortList" :key="item.sort_id" class="tag"
                            type="success" @click="goSortArticle(item.sort_id)">{{ item.sort_name }}</el-tag>
                    </div>
                </el-card>
                <!-- 文章标签 -->
                <el-card class="classify">
                    <img src="@/assets/icon/folder.png" alt="">
                    <span>文章标签</span>
                    <div>
                        <el-tag v-for="item in labelList" :key="item.label_id" class="tag"
                            type="warning" @click="goLabelArticle(item.label_id)">{{ item.label_name }}</el-tag>
                    </div>
                </el-card>
            </div>
        </div>
        <!-- footer -->
        <div class="footer"></div>

    </div>
</template>

<script setup lang="ts">
import Banner from '@/components/banner/index.vue'
import { reactive, ref } from 'vue'
import { getSorts, getLabels } from '@/api/article'
import {sorts,labels} from '@/utils/type'
import { useRouter } from 'vue-router'

const banner = reactive({
    title: '文章归档',
    content: '在这里可以更快地找到你想要的内容！'
})
const sortList = ref<sorts[]>([])//存储分类数据
const labelList = ref<labels[]>([])//存储标签数据
const showSorts = async () => {
    const data = await getSorts()
    sortList.value = data
}
showSorts()
const showLabels = async () => {
    const data = await getLabels()
    labelList.value = data
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

</script>

<style scoped lang="less">
.main {
    background-color: #fff;
    min-height: 500px;

    .content {
        width: 70%;
        min-height: 490px;
        margin: 0 auto;
        padding: 10px 0;
        max-width: 780px;
    }
}

.classify {
    margin: 40px auto 40px;

    img {
        width: 30px;
        margin-right: 5px;
        vertical-align: middle;
    }

    span {
        font-weight: bold;
        font-size: 18px;
        vertical-align: middle;
    }

    .tag {
        margin-top: 20px;
        margin-left: 20px;
        cursor: pointer;
    }

}</style>