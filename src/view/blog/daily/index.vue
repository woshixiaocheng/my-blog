<template>
    <div>
        <BannerShow :banner="banner"></BannerShow>
        <div class="main">
            <!-- 制作时间轴 -->
            <div class="wrap" style="animation: article-effect 1s">
                <div class="box" v-for="(item,index) in dailyList" :key="item.daily_id">
                    <div class="left" >
                        <div v-if="index%2!==0" class="center">
                        <div></div>
                    </div>
                        <div v-if="index%2!==0">
                            <div class="content" v-html="item.daily_content"></div>
                        <div class="time">{{ formatDate(item.daily_date) }}</div>
                        </div>

                    </div>
                   
                    <div class="right" >
                        <div v-if="index%2==0" class="center">
                        <div></div>
                        </div>
                        <div v-if="index%2===0">
                            <div class="content" v-html="item.daily_content"></div>
                        <div class="time">{{ formatDate(item.daily_date) }}</div>
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
import BannerShow from '@/components/banner/index.vue'
import { reactive, ref ,onMounted} from 'vue'
import { getDaily } from '@/api/daily'
import formatDate from '@/utils/formatDate'
import { Banner, Daily } from '@/utils/type'
const banner = reactive<Banner>({
    title: '学习日记',
    content: '记录学习动态'
})
const dailyList = ref<Daily[]>([])
//获取日记信息展示
const showDaily = async () => {
    dailyList.value = await getDaily() 
}
showDaily()
onMounted(()=>{
   console.log(document.body.clientWidth)
   //临界点是660px
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
    top: -100px;
}
.wrap {
    width: 80%;
    position: relative;
    top: 100px;
    z-index: 10;
    margin-bottom:100px;
    &::after {
    content: ''; //必须设置这个属性才生效
    position: absolute;
    top: -100px;
    height: 120%;
    width: 5px;
    background-color: rgba(164, 164, 164, 0.557);
    z-index: -1;
}
.box {
    width: 100%;
    display: flex;
    .center {
        position: absolute;
        top: 10px;
        div {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 5px solid rgb(91, 70, 209);
            background-color: #fff;
        }
    }
    .left .center{
      
        right: -50px;
        transform: translateX(50%);
    }
    .right .center{
        position: absolute;
        left: -50px;
        transform: translateX(-50%);
    }

    .left,
    .right {
        position: relative;
        width: 50%;
        margin: 0 50px;
        max-width: 400px;
        min-width: 250px;
        border-radius: 10px;
        transition: 0.1s all;

        .content {
            padding: 15px;
        }

        .time {
            margin: 10px 10px 0 10px;
            padding: 10px;
            color: var(--fontGray);
            font-size: 14px;
            border-top: 1px dashed var(--fontGray);
        }
    }

    &:nth-child(4n+1) .right {
        background-color: var(--colorful1);
    }

    &:nth-child(4n+2) .left {
        background-color: var(--colorful2);
    }

    &:nth-child(4n+3) .right {
        background-color: var(--colorful3);
    }

    &:nth-child(4n+4) .left {
        background-color: var(--colorful4);
    }

    //画对话框箭头
    &:nth-child(even) .left::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        left: 100%;
        top: 10px;
        border: 10px solid transparent;
    }

    &:nth-child(odd) .right::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        right: 100%;
        top: 10px;
        border: 10px solid transparent;
    }

    &:nth-child(4n+1) .right::after {
        border-right-color: var(--colorful1);
    }

    &:nth-child(4n+2) .left::after {
        border-left-color: var(--colorful2);
    }

    &:nth-child(4n+3) .right::after {
        border-right-color: var(--colorful3);
    }

    &:nth-child(4n+4) .left::after {
        border-left-color: var(--colorful4);
    }
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
