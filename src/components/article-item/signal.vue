<template>
<ul class="signal">
   
                            <!-- 文件分类 -->
                            <li v-for="key in sortList" :key="key.sort_id" @click.stop="goSortArticle(key.sort_id)"><img
                                    src="@/assets/icon/folder.svg" alt="">{{ key.sort_name }}</li>
                            <!-- 标签 -->
                            <li v-for="key in labelList" :key="key.label_id" @click.stop="goLabelArticle(key.label_id)">
                                <img src="@/assets/icon/sign.svg" alt="">
                                {{ key.label_name }}
                            </li>
                        </ul>
</template>
<script setup lang='ts'>
import {nextTick,ref,watchEffect} from 'vue'
import {useRouter} from 'vue-router'
import { getArticleSort, getArticleLabel } from '@/api/article'
const props = defineProps<{
    articleId: number
}>()
nextTick()
let sortList=ref()
let labelList=ref()
watchEffect(()=>{
const getSort=async()=>{
   sortList.value= await getArticleSort({ id: props.articleId })
}
getSort()

const getLabel=async()=>{
   labelList.value= await getArticleLabel({ id: props.articleId })
}
getLabel()
})

// //展示文章的所有分类
// let sortList=await getArticleSort({ id: props.articleId })
// //获取文章的所有标签
// let labelList =await getArticleLabel({ id: props.articleId })

//按照分类跳转具体文章展示页面
let router1 = useRouter()
const goSortArticle = (sortId: number) => {
    router1.push({
        path: '/article',
        query: {
            sort_id: sortId
        }
    })
}
let router2=useRouter()
//按照标签跳转具体页面
const goLabelArticle = (labelId: number) => {
    router2.push({
        path: '/article',
        query: {
            label_id: labelId
        }
    })
}
</script>
<style scoped lang="less">
         .signal {
            margin-top: 15px;
            padding: 0; //去掉ul和li元素之间的间隔
            display: flex;

            li {
                height: 24px;
                line-height: 24px;
                margin-right: 15px;
                padding: 0px 10px;
                padding-bottom: 2px;
                background-color: rgb(232, 232, 232);
                border-radius: 5px;
                font-size: 14px;
                color: var(--fontGray);
                transition: all 0.2s ease-out;

                &:hover {
                    color: #fff;
                    background-color: var(--buttonHover);
                }

                img {
                    position: relative;
                    top: 4px;
                    padding-right: 5px;
                }
            }
        }
</style>
