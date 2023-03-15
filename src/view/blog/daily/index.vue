<template>
    <div>
        <BannerShow :banner="banner"></BannerShow>
        <div class="main">
            <!-- 制作时间轴 -->
            <div class="wrap" style="animation: article-effect 1s">
                <Suspense>
      <template #default>
       <DailyDetail></DailyDetail>
      </template>
      <template #fallback>
        <el-skeleton :rows="10" animated  />
      </template>
    </Suspense>
            </div>
        </div>
        <!-- footer -->
        <div class="footer"></div>
    </div>
</template>
<script lang="ts">
    export default {
      name: 'daily',
    };
</script>
<script lang="ts" setup>
import BannerShow from '@/components/banner/index.vue'
import { reactive,defineAsyncComponent} from 'vue'
import { Banner } from '@/utils/type'
const DailyDetail = defineAsyncComponent(() => import('./dailydetail.vue'))


const banner = reactive<Banner>({
    title: '学习日记',
    content: '记录学习动态'
})


</script>

<style scoped lang="less">

.main {
    display: flex;
    justify-content: center;
    padding-bottom:100px;
    background-color: var(--content-bgc);
    overflow: hidden;
    position: relative;
   
}
.wrap {
    width: 80%;
    position: relative;
    top: 100px;
    z-index: 10;
    padding-bottom:100px;
    &::after {
    content: ''; //必须设置这个属性才生效
    position: absolute;
    top: -100px;
    height: 120%;
    width: 5px;
    background-color: rgba(164, 164, 164, 0.557);
    z-index: -1;
}

}
@media screen and (min-width: 660px) {
//写中间的线
.wrap::after {
    left: 50%; //会放到页面中心
    transform: translateX(-50%);
}
//盒子
.box {
    justify-content: center;
}
}
@media screen and(max-width:660px) {
    //写中间的线
.wrap::after {
    left: 0; //会放到页面中心
    transform: translateX(-50%);
}
.box{
    margin-bottom: 20px;
    &:nth-child(odd) .left {
  display: none;
    }
    &:nth-child(even) .right {
  display: none;
    }
    &:nth-child(even){
        justify-content: flex-end;
    }
}
}

</style>
