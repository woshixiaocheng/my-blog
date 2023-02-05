<template>
    <div>
        <BannerShow :banner="banner"></BannerShow>
        <div class="main">
            <!-- 制作时间轴 -->
            <div class="wrap">
                <div class="box" v-for="item in dailyList" :key="item.daily_id">
                    <div class="left">
                        <div v-if="item.daily_id%2===0">
                            <div class="content">{{ item.daily_content }}</div>
                        <div class="time">{{ formatDate(item.daily_date) }}</div>
                        </div>
                       
                    </div>
                    <div class="center">
                        <div></div>
                    </div>
                    <div class="right" >
                        <div v-if="item.daily_id%2!==0">
                            <div class="content">{{ item.daily_content }}</div>
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
import { reactive, ref } from 'vue'
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

</script>

<style scoped lang="less">
.main {
    display: flex;
    justify-content: center;
    height: 1000px;
    background-color: #fff;
}

.wrap {
    width: 80%;
    position: relative;
    top: 100px;
    z-index: 999;
    // margin: 0 auto;
}

//写中间的线
//想要伪元素能随心所欲移动，先给父元素个相对定位
.wrap::after {
    content: ''; //必须设置这个属性才生效
    position: absolute;
    top: -100px;
    left: 50%; //会放到页面中心
    height: 100%;
    width: 5px;
    background-color: rgba(164, 164, 164, 0.557);
    z-index: -1;
}

//盒子
.box {
    width: 100%;
    margin-bottom: 80px;
    display: flex;
    justify-content: center;

    .center {
        div {
            margin-top: 30px;
            margin-left: 5px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 5px solid rgb(91, 70, 209);
            background-color: #fff;
        }
    }

    .left,
    .right {
        position: relative;
        width: 50%;
        margin: 0 50px;
        max-width: 400px;
        min-width: 250px;
        border-radius: 10px;

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
        top: 20%;
        border: 10px solid transparent;
    }

    &:nth-child(odd) .right::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        right: 100%;
        top: 20%;
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

//可见性
.show {
    visibility: hidden;
}
</style>
