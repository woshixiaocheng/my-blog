<template>
<div>
<el-affix >    
<el-menu 
    :default-active="activeIndex"
    :class="{whiteMenu:whiteMenu}" v-show="show"  
    mode="horizontal"
    :ellipsis="false"
    router
  >
    <el-menu-item>IceCream</el-menu-item>
    <div class="flex-grow" />
     <el-menu-item index="/" >首页</el-menu-item>
     <el-menu-item index="/classify">归档</el-menu-item>
    <el-menu-item index="1" :route="{ path: '/article', query: { sort_id:1 } }">技术文章</el-menu-item>
     <el-menu-item index="2" :route="{ path: '/article', query: { sort_id:2 } }">生活随笔</el-menu-item>
    <el-menu-item index="/daily">学习日记</el-menu-item>
    <el-menu-item index="/me">关于我</el-menu-item>
    <el-menu-item index="/message">留言板</el-menu-item>
    
    <!-- 音乐 -->
    <!-- <el-menu-item class="music">
     <img src="@/assets/icon/music.png" alt="" >
        <audio>
          <source src="@/static/audios/music1.mp3">
         </audio>
    </el-menu-item> -->
    <!-- 夜间模式 -->
    <!-- <el-menu-item class="night">
      <img src="@/assets/icon/moon.png" alt="" >
    </el-menu-item> -->
    <el-sub-menu index="7">
      <template #title>
        <img src="@/assets/img/photo.jpeg" alt="" style="width:40px;border-radius:50%;">
      </template>
      <div>
        <el-menu-item index="/login" v-if="!user.token">登录</el-menu-item>
        <el-menu-item index="/login" v-else  @click="user.logout()">登出</el-menu-item>
      </div>
      <el-menu-item index="/admin" v-if="user.userInfo">去后台</el-menu-item>
    </el-sub-menu>
  </el-menu>
  </el-affix> 
        <router-view />
  </div>
</template>
<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import {useRouter} from 'vue-router'
import {userStore} from '@/store/index'
const user=userStore()
const activeIndex = ref('/')//设置目前高亮的

//导航栏随着窗口的滚动方向判断是否要显示+根据窗口的位置判断显示的样式
let show=ref(true)
let whiteMenu=ref(false)
let pastScroll=ref(0)//用它存之前的滚动距离
    const handleScroll=()=>{
        window.addEventListener('scroll',()=>{
           let scroll1=window.scrollY//页面的滚动距离
           let scrollChange=scroll1-pastScroll.value//前后距离的差
           if(scrollChange>0){
            //说明在往下滑，就不显示
           show.value=false
           }else{
            show.value=true
           }
           if(scroll1>200){
            //如果大于临界点，就改变样式
            whiteMenu.value=true
           }else{
            whiteMenu.value=false
           }    
           pastScroll.value=window.scrollY
        })
    }
    //渲染后
    onMounted(()=>{
        handleScroll()
    })


 //按照分类跳转具体文章展示页面
    let router=useRouter()
    const goSortArticle=(sortId:string)=>{
        router.push({
            path:'/sort',
            query:{
                id:sortId
            }
        })
    }
    
</script>

<style scoped lang="less">
@bgc:background-color;
.el-menu{
    font-weight: 600;
    background-color:transparent;
    border: 0;
    color: #fff;
    // hover时变背景颜色的判断(基于本身背景再看要不要设置这个)
  &:hover when(@bgc="transparent"){
    background-color:rgba(0, 0, 0, 0.2);
  }
//调整每一项的样式
  /deep/ .el-menu-item{
position: relative;
padding: 0 0;
margin:0 20px;
overflow: hidden;
font-size: 16px;
color: inherit;//字体颜色继承父类，所以可以通过whiteMenu的切换实现切换
//根据背景颜色切换字体颜色

//加hover时下边框进入动画
//在每一项的后面加一条线藏起来
&::after{
  content: '';
  position: absolute;
  left: -100%;//藏在左下角
  bottom: 0;
  width: 100%;
  height: 6px;
  transition: all 0.4s;
  background-color: var(--buttonHover);
}
&:hover::after{
  transform: translateX(100%);
}
}

//头像因为有下面的框比较例外
/deep/.el-sub-menu__title:hover{
    background-color: transparent !important;
}

}
//滚动到下边的时候menu的样式
.whiteMenu{
  background-color: #fff;
  color: #000;
}
//hover的item背景效果
 .el-menu--horizontal .el-menu-item:not(.is-disabled):hover,.el-menu--horizontal .el-menu-item:not(.is-disabled):focus{
  background-color: transparent;
  color: var(--buttonHover);
}
// 选中时的文字效果
.el-menu--horizontal>.el-menu-item.is-active{
  color: var(--buttonHover)!important;
  border-bottom: 0px solid transparent;
}

//分边
.flex-grow {
  flex-grow: 1;
} 
// .music{
//   img{
//     display: inline-block;
//      height: 30px;
//      margin-top: 15px;
//   }
// }
// .night{
//   img{
//     display: inline-block;//img是行内元素，不能设置上边margin
//     width: 35px;
//     margin-top: 12px;
//   }
// }
</style>