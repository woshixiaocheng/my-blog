
<template>
    <!-- 文章条 -->
    <!-- <div class="box"> -->
        <el-card class="article-item" ref="articleItem" @click="goDetail">
            <!-- 图片 -->
            <div class="image">
                <img src="@/assets/img/banner.jpg" alt="">
            </div>
            <!-- 文章详情 -->
            <div class="neirong">
                <div class="description">
                    <img src="@/assets/icon/time.svg" alt="">
                <span>发布于{{ formatDate(article[0]?article[0].article_date:'') }}</span>
                <h4 class="title">{{ article[0]?article[0].article_title :''}}</h4>
                </div>
             
                <div class="description">
                    <i class="iconfont icon-hot" />
                    <span>{{ article[0]?article[0].article_views:'' }}热度</span>
                    <img src="@/assets/icon/message.svg" alt="">
                    <span>{{article[0]? article[0].article_comment_count:''}}评论</span>
                    <img src="@/assets/icon/good.svg" alt="" style="position:relative;top:-2px">
                    <span>{{ article[0]?article[0].article_like_count:'' }}点赞</span>
                </div>
                <div class="content" v-html="article[0]?article[0].article_content:''"></div>
                <ul class="signal">
                    <!-- 文件分类 -->
                    <li v-for="item in sortList" :key="item.sort_id" @click.stop="goSortArticle(item.sort_id)"><img
                            src="@/assets/icon/folder.svg" alt="">{{ item.sort_name }}</li>
                    <!-- 标签 -->
                    <li v-for="item in labelList" :key="item.label_id" @click.stop="goLabelArticle(item.label_id)"><img
                            src="@/assets/icon/sign.svg" alt="">
                        {{ item.label_name }}</li>
                </ul>
            </div>

        </el-card>
<!-- 
    </div> -->
</template>
<script lang="ts" setup>
import { defineProps, computed ,ref,watchEffect} from 'vue'
import formatDate from '@/utils/formatDate'
import { getArticleSort, getArticleLabel, getAssignArticle } from '@/api/article'
import { useRouter } from 'vue-router'
import type { articles, sorts, labels } from '@/utils/type'
const props = defineProps<{
    articleId: number
    index: number
}>()

let artId: number = props.articleId//文章id,只是使用而已，不需要变成响应式对象
//根据id获取文章内容
// let article=ref<articles>({} as any)
let article=ref< articles[]>([])
//展示文章的所有分类
let sortList=ref<sorts[] >() 
//获取文章的所有标签
let labelList =ref<labels[]>() 
const getArticle=async ()=>{
   article.value= await getAssignArticle({ id: artId })
}
getArticle()
const getSort=async()=>{
    await getArticleSort({ id: artId })
}
getSort()
const getLabel=async()=>{
    await getArticleLabel({ id: artId })
}
getLabel()
//实现内容交叉显示
const direction = computed(() => {
    if (props.index&&props.index % 2 === 0) {
        return "row-reverse"
    } else {
        return "row"
    }
})

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
//按照标签跳转具体页面
const goLabelArticle = (labelId: number) => {
    router1.push({
        path: '/article',
        query: {
            label_id: labelId
        }
    })
}
//点击跳转到对应页面
const goDetail = () => {
    router1.push({
        path: '/articledetail',
        query: {
            article_id: artId
        }
    })
}
</script>

<style scoped  lang="less">
h1{
                font-size: 14px ; 
                font-weight: normal;
            }
/* 文章组件默认盒子排列样式为文字在左 */

.article-item {
    max-width: 780px;
    // margin-top: 40px;
    cursor: pointer;
    border: 0;
    user-select: none; //不允许复制
    transition: all 0.5s ease-out;

    ::v-deep .el-card__body {
        padding: 0;
        height: 100%;
        width: 100%;
        display: flex;
    }

        &:hover {
        box-shadow: var(--boxHoverShadow) !important;
    
    }
 

    .neirong {
        box-sizing: border-box;
        padding: 20px 40px;
        background-color: var(  --articleItem-bgc);
        .description{
            span {
            padding-left: 3px;
            padding-right: 16px;
            font-size: 12px;
            color: var(--fontGray);
        }

        .title {
            margin: 10px 0;
            font-weight: bold;
        }

        img {
            vertical-align: middle;
        }
        }
     

        .content {
            padding: 10px 0;
            line-height: 25px;
            overflow: hidden;
            font-size: 14px !important;
            ::v-deep h1,::v-deep h2,::v-deep h3,::v-deep h4,::v-deep h5,::v-deep h6{
                display: inline;
                font-size: 14px !important;
                font-weight: normal;
            }
            
        }

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
    }

    .image {
        overflow: hidden;


        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.5s ease-out;

            &:hover {
                transform: scale(1.2, 1.2);
            }
        }

    }
}

@media screen and(min-width: 770px) {
    .article-item {
        height: 300px;

        /deep/.el-card__body {
            flex-direction: v-bind(direction); //实现交叉展示


        }

        .neirong {
            width: 50%;
            .content {
            height: 110px;
        }
        }

        .image {
            width: 50%;
        }
    }
}

@media screen and(max-width: 770px) {
    .article-item {
        height: 440px;
        /deep/.el-card__body {
            flex-direction: column; 
        }

        .neirong {
            width: 100%;
            .content {
            height: 70px;
        }
        }

        .image {
            width: 100%;
            height: 180px;
        }
    }
}</style>