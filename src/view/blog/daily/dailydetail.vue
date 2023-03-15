<template>
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
</template>
<script setup lang='ts'>
import formatDate from '@/utils/formatDate'
import {  ref } from 'vue'
import {  Daily } from '@/utils/type'
import { getDaily } from '@/api/daily'
const dailyList = ref<Daily[]>([])
//获取日记信息展示
    dailyList.value = await getDaily() 
</script>
<style scoped lang="less">
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
@media screen and (min-width: 660px) {
//盒子
.box {
    justify-content: center;
}
}
@media screen and(max-width:660px) {

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
