<template>
 
    <div>
        <Transition name="el-zoom-in-top">
        <Banner1 :banner="banner"></Banner1>
    </Transition>
   
        <div class="main">
            <Suspense>
                        <template #default>
                            <VirtualList :articleList="articleList">
                </VirtualList>
                        </template>
                        <template #fallback>
                <div>loading...</div>
            </template>
            </Suspense>
                
            </div>
 
        <!-- footer -->
        <!-- <div class="footer"></div> -->
     </div>
</template>

<script lang="ts" setup>
import Banner1 from '@/components/banner/index.vue'
import { reactive, ref, watchEffect, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { getSortArticle, getLabelArticle } from '@/api/article'
import { articleSort,articleLabel, Banner } from '@/utils/type'
// import VirtualList from '@/components/virtual-list/index.vue'
const VirtualList = defineAsyncComponent(() => import('@/components/virtual-list/index.vue'))
const banner= reactive<Banner>({
    title: '',
    content: ''
})
//获取路由传入的值
let route = useRoute()//当前路由对象
let sortId = ref<number>(0)//获取分类id//设置为0其实是undefined
let labelId = ref<number>(0)//获取标签id
let articleList = ref([])
//当路由参数变化时页面数据无法更新时
watchEffect(async() => {
    sortId.value =route.query.sort_id as any
    labelId.value = route.query.label_id as any
    //分类的
    if (sortId.value !== undefined) {
         await getSortArticle({ id: sortId.value }).then((res:any)=>articleList.value=res)
       if(articleList.value.length<=0){
           banner.title = '此分类暂无文章'
        //    banner.content = '快催博主写文章！'
       }else{
           banner.title = (articleList.value[0] as any).sort_name
        //    banner.content =(articleList.value[0] as articleSort).sort_description
       }
    }   
    //获取标签
    if (labelId.value !== undefined) {
          await getLabelArticle({ id: labelId.value }).then((res:any) => {
            articleList.value = res
        })
        if(articleList.value.length<=0){
           banner.title = '此分类暂无文章'
        //    banner.content = '快催博主写文章！'
       }else{
           banner.title = (articleList.value[0] as any).label_name
        //    banner.content =(articleList.value[0] as articleSort).sort_description
       }
    }
})

</script>
<style scoped lang="less">
.main {
    background-color: var(--content-bgc);
    margin-bottom: 50px;
    padding: 0 30px;

}

</style>