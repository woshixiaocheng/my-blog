<template>
    <div class="content" ref="content">
        <ul class="list" ref="list">
            <li class="item" v-for="(item) in visibleData" ref="item"
                :key="(item as any).sort_id ? (item as any).sort_id : (item as any).label_id">
                <el-card class="article-item"
                    :style="{ 'flex-direction': item.article_id % 2 === 0 ? 'row-reverse' : 'row' }" ref="articleItem"
                    @click="goDetail(item.article_id)">
                    <!-- 图片 -->

                    <div class="image">
                        <img src="@/assets/img/banner.jpg" alt="">
                    </div>
                    <!-- 文章详情 -->
                    <div class="neirong">
                        <div class="description">
                            <img src="@/assets/icon/time.svg" alt="">
                            <span>发布于{{ formatDate(item.article_date) }}</span>
                            <h4 class="title">{{ item.article_title }}</h4>
                        </div>

                        <div class="description">
                            <i class="iconfont icon-hot" />
                            <span>{{ item.article_views }}热度</span>
                            <img src="@/assets/icon/message.svg" alt="">
                            <span>{{ item.article_comment_count }}评论</span>
                            <img src="@/assets/icon/good.svg" alt="" style="position:relative;top:-2px">
                            <span>{{ item.article_like_count }}点赞</span>
                        </div>
                        <div class="detail" v-html="item.article_content"></div>
                        <Signal :articleId="item.article_id"></Signal>
                    </div>
                </el-card>

            </li>
        </ul>
    </div>
</template>
<script setup lang='ts'>
import { ref, computed, onMounted, watchEffect, nextTick, onUnmounted } from 'vue'
import Signal from '@/components/article-item/signal.vue'
import formatDate from '@/utils/formatDate'
import { useRouter } from 'vue-router'
const props = defineProps<{
    articleList: any[]
}>()
const list = ref()
const content = ref()
const containerHeight = document.documentElement.clientHeight//可视区域高度
const start = ref(0)//起始索引
// const end=ref<number>()//结束索引
const firstHeight = ref(0)//列表距离顶部的位置
const itemSize = ref(0)//项高
const visibleCount = ref(2)//可显示的列表项数

//获得真实显示列表数据
const visibleData = computed(() => {
    let end = start.value + visibleCount.value
    //数据源是数组不是对象
    return props.articleList.slice(start.value, Math.min(end, props.articleList.length))
})

//滚动事件修改变量
const scrollEvent = () => {
    //当前滚动位置
    let curscrollTop = document.documentElement.scrollTop
    //实际上滚动位置
    //当前开始索引
    if (curscrollTop > firstHeight.value) {
        const addCount = Math.floor((curscrollTop - firstHeight.value) / itemSize.value)
        start.value = addCount
        list.value.style.setProperty('padding-top', `${addCount * itemSize.value}px`)
    }
    else {
        start.value = 0
        list.value.style.setProperty('padding-top', '0px')
    }

}
onMounted(() => {
    //实时计算itemSize高度
    window.addEventListener('resize', () => {
        // console.log(document.body.clientWidth)
        if (document.body.clientWidth <= 770) {
            itemSize.value = 480
        } else {
            itemSize.value = 300
        }
        // console.log(itemSize.value)
    })

})
//要计算列表距离顶部的高度
watchEffect(() => {
    if (props.articleList.length > 0 && content.value && list.value) {
        nextTick(() => {
            //dom对页面的操作获取了后再操作下面的
            //上面内容+滚动的才是它实际的距离
            firstHeight.value = content.value.getBoundingClientRect().top + document.documentElement.scrollTop
            itemSize.value = list.value.children[0].offsetHeight + 40//为了content自己的padding        
            visibleCount.value = Math.ceil(containerHeight / itemSize.value) + 1//这样先在缓存区渲染出一个

            /*watchEffect计算当itemSize有变化的时候重新计算listHeight*/
            const listHeight = itemSize.value * props.articleList.length
            content.value.style.setProperty('height', `${listHeight}px`)

            window.removeEventListener('scroll', scrollEvent)
            window.addEventListener('scroll', scrollEvent)

        })
    }
})

//按照分类跳转具体文章展示页面
let router1 = useRouter()
//点击跳转到对应页面
const goDetail = (id: any) => {
    router1.push({
        path: '/articledetail',
        query: {
            article_id: id
        }
    })
}
onUnmounted(() => {
    window.removeEventListener('scroll', scrollEvent)
})
</script>
<style scoped lang="less">
.content {
    min-height: 490px;
    margin: 0 auto;
    padding: 10px 0;
    max-width: 780px;
    transition: all 0.2s;
    // overflow: hidden;

}


h1 {
    font-size: 14px;
    font-weight: normal;
}

/* 文章组件默认盒子排列样式为文字在左 */

.article-item {
    max-width: 780px;
    margin-top: 40px;
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
        background-color: var(--articleItem-bgc);

        .description {
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

        .detail {
            padding: 10px 0;
            line-height: 25px;
            overflow: hidden;
            font-size: 14px !important;

            ::v-deep h1,
            ::v-deep h2,
            ::v-deep h3,
            ::v-deep h4,
            ::v-deep h5,
            ::v-deep h6 {
                display: inline;
                font-size: 14px !important;
                font-weight: normal;
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
            flex-direction: inherit; //实现交叉展示
        }

        .neirong {
            width: 50%;

            .detail {
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

            .detail {
                height: 70px;
            }
        }

        .image {
            width: 100%;
            height: 180px;
        }
    }
}
</style>
