<template>
  <div>
    <transition name="el-fade-in-linear">
    <el-affix v-show="show">
      
      <el-menu v-if="fullScreen" :default-active="activeIndex" :class="{ whiteMenu: whiteMenu,menu:true,webMenu:true }" 
        mode="horizontal" :ellipsis="false" router>
        <el-menu-item>IceCream</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/classify">归档</el-menu-item>
        <el-menu-item index="1" :route="{ path: '/article', query: { sort_id: 1 } }">技术文章</el-menu-item>
        <el-menu-item index="2" :route="{ path: '/article', query: { sort_id: 2 } }">生活随笔</el-menu-item>
        <el-menu-item index="/daily">学习日记</el-menu-item>
        <el-menu-item index="/me">关于我</el-menu-item>
        <el-menu-item index="/message">留言板</el-menu-item>
        <el-sub-menu index="7">
          <template #title>
            <img src="@/assets/img/photo.jpeg" alt="" style="width:40px;border-radius:50%;">
          </template>
          <div>
            <el-menu-item index="/login" v-if="!user.token">登录</el-menu-item>
            <el-menu-item index="/login" v-else @click="user.logout()">登出</el-menu-item>
          </div>
          <el-menu-item index="/admin">去后台</el-menu-item>
        </el-sub-menu>

      </el-menu>
      <el-menu v-else :default-active="activeIndex" :class="{ whiteMenu: whiteMenu,menu:true  }" v-show="show" mode="horizontal"
        :ellipsis="false" router>
        <el-menu-item>IceCream</el-menu-item>
        <div class="flex-grow" />
        <i class="iconfont icon-menu ham " @click="drawer=true"></i>
      </el-menu>
 
    </el-affix>   </transition>
    <router-view />
  </div>
  <!-- 移动端左侧菜单 -->
  <el-drawer
   v-model="drawer"
   :show-close="false"
   size="60%"
   direction="ltr"
   class="drawer">
   <template #header>
     欢迎光临
    </template>
   <el-menu :default-active="activeIndex" 
        mode="vertical" :ellipsis="false" router class="mobileMenu menu">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/classify">归档</el-menu-item>
        <el-menu-item index="1" :route="{ path: '/article', query: { sort_id: 1 } }">技术文章</el-menu-item>
        <el-menu-item index="2" :route="{ path: '/article', query: { sort_id: 2 } }">生活随笔</el-menu-item>
        <el-menu-item index="/daily">学习日记</el-menu-item>
        <el-menu-item index="/me">关于我</el-menu-item>
        <el-menu-item index="/message">留言板</el-menu-item>
        <el-menu-item index="/login" v-if="!user.token">登录</el-menu-item>
            <el-menu-item index="/login" v-else @click="user.logout()">登出</el-menu-item>
          <el-menu-item index="/admin">去后台</el-menu-item>
      </el-menu>
  </el-drawer>
  <!-- 回到顶部 -->
  <div class="toTop" ref="toTop" @click="goToTop"><i class="iconfont icon-fanhuidingceng"></i></div>
  <!-- 设置 -->
  <el-popover  :width="90" placement="right">
    <template #reference>
      <div class="tool">
        <i class="iconfont icon-shezhi setting" aria-hidden="true"></i>

  </div>
    </template>
    <template #default >
      <div class="popover">
        <i class="iconfont icon-texiao" style="margin:0 20px;"></i>
     <i class="iconfont icon-heiye" style="margin:0 20px;" @click="changeStyle"></i>
      </div>
  
    </template>
</el-popover>
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
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted,computed } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/store/index'

const toTop=ref()//回到顶部实例
const user = userStore()
const activeIndex = ref('/')//设置目前高亮的
let management = ref(localStorage.getItem('userInfo') === "[]")
let drawer=ref<boolean>(false)//控制手机导航抽屉的
let aa=ref(true)
//导航栏随着窗口的滚动方向判断是否要显示+根据窗口的位置判断显示的样式+显示隐藏滚动到顶部
let show = ref(true)
let topCursor=ref('default')
let topClick=ref('none')
let whiteMenu = ref(false)
let pastScroll = ref(0)//用它存之前的滚动距离
const handleScroll = () => {
  window.addEventListener('scroll', () => {
    let scroll1 = window.scrollY//页面的滚动距离
    let scrollChange = scroll1 - pastScroll.value//前后距离的差
    if (scrollChange > 0) {
      //说明在往下滑，就不显示
      show.value = false
      toTop.value.style.setProperty('opacity','100%')

      topCursor.value='pointer'
      topClick.value='auto'

      
    } else {
      show.value = true
      toTop.value.style.setProperty('opacity','0')
      topCursor.value='default'
      topClick.value='none'

    }
    if (scroll1 > 200) {
      //如果大于临界点，就改变样式
      whiteMenu.value = true
    } else {
      whiteMenu.value = false
    }
    pastScroll.value = window.scrollY
  })
}

//监听视口变化，小于910px的时候切换导航栏样式 
let clientWidth=ref<number>(document.body.clientWidth)
let fullScreen = computed(()=>{
  if (clientWidth.value <= 1100) {
        return false
      } else {
        return true
      }
})
let timeoutWidth: any//节流
const handleWidth=()=>{
  window.addEventListener('resize', () => {
    //使用闭包返回数值
    clearTimeout(timeoutWidth)
    //节流，一段时间才判断一次
    timeoutWidth = setTimeout(() => {
    clientWidth.value=document.body.clientWidth
    // console.log(clientWidth.value)
    }, 40)
  })
}
//关闭抽屉
const closeDrawer=()=>{
  drawer.value=false
}
//渲染后
onMounted(() => {
  handleScroll()
  handleWidth()
  let drawerBox=document.querySelector('.drawer')
  drawerBox?.addEventListener('click',(e)=>{
    if(e.target && (e.target as any).tagName=='LI'){
      closeDrawer()
    }
  })


})
//离开页面后清除定时器
onUnmounted(()=>{
  clearTimeout(timeoutWidth)
})
//按照分类跳转具体文章展示页面
let router = useRouter()
const goSortArticle = (sortId: string) => {
  router.push({
    path: '/sort',
    query: {
      id: sortId
    }
  })
}
//回到顶部
const goToTop=()=>{
  scrollTo(0,0)
  toTop.value.style.setProperty('transform','translateY(-20px)')
}

//改变黑夜模式,枚举用ref限制类型
let isDark=ref(false)
//进入页面时读取用户的设置偏好就可以在刷新时仍然可以拿到用户的设置偏好
let darkMode=localStorage.getItem('theme')
const enableDarkMode=()=>{
   //黑夜的
   document.body.classList.add('dark-mode')
   localStorage.setItem('theme','dark')
}
const enableLightMode=()=>{
  //白天的
  document.body.classList.remove('dark-mode')
  localStorage.setItem('theme','light')
}
if(darkMode==='dark'){ enableDarkMode()} 
const changeStyle=()=>{
  isDark.value=!isDark.value
  if(isDark.value===true){
    enableDarkMode()
  }else{
    enableLightMode()
  }
}



</script>

<style scoped lang="less">
@bgc: background-color;
//解决固钉在滚动后不变问题
::v-deep .el-affix{
  width: v-bind(clientWidth) !important;
}
.webMenu{
  width:100%;
  // hover时变背景颜色的判断(基于本身背景再看要不要设置这个)
  &:hover when(@bgc="transparent") {
    background-color: rgba(0, 0, 0, 0.2);
  }
  /deep/ .el-menu-item{
    //加hover时下边框进入动画
    //在每一项的后面加一条线藏起来
    &::after {
      content: '';
      position: absolute;
      left: -100%; //藏在左下角
      bottom: 0;
      width: 100%;
      height: 6px;
      transition: all 0.4s;
      background-color: var(--buttonHover);
    }

    &:hover::after {
      transform: translateX(100%);
    }
  }
    //头像因为有下面的框比较例外
    /deep/.el-sub-menu__title:hover {
    background-color: transparent !important;
  }

}
.menu {
  width: 100%;
  font-weight: 600;
  background-color: transparent;
  border: 0;
  color: #fff;
  opacity: v-bind(show);
  //调整每一项的样式
  /deep/ .el-menu-item {
    position: relative;
    padding: 0 0;
    margin: 0 20px;
    overflow: hidden;
    font-size: 16px;
    color: inherit; //字体颜色继承父类，所以可以通过whiteMenu的切换实现切换
    //根据背景颜色切换字体颜色
  }
}
//滚动到下边的时候menu的样式
.whiteMenu {
  width: 100%;
  background-color: #fff;
  color: #000;
  .ham{
    color: #000;
  }
}
//hover的item背景效果
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
  background-color: transparent;
  color: var(--buttonHover);
}
// 选中时的文字效果
.el-menu--horizontal>.el-menu-item.is-active {
  color: var(--buttonHover) !important;
  border-bottom: 0px solid transparent;
}
//分边
.flex-grow {
  flex-grow: 1;
}
.ham{
  margin-top: 10px;
  margin-right: 20px;
  cursor: pointer;
  color: #fff;
  font-size:28px;
}

//抽屉菜单样式设置
.mobileMenu{
  /deep/ .el-menu-item{
    &:hover{
      background-color: transparent;
      color: var(--buttonHover);
    }
  }
   
  }
  .toTop{
    position: fixed;
    right: 22px;
    bottom: 65px;
    transition: all 0.5s;
    opacity: 0;
    cursor: v-bind(topCursor);
    pointer-events:v-bind(topClick);

  }
  .tool{
    position: fixed;
    bottom: 25px;
    right:25px;
  cursor: pointer;
  -webkit-animation: rotate  3s linear infinite;
      animation:rotate 3s linear infinite;

  .popover{
    display: flex;
    justify-content: center;
    padding:40px 40px ;
  }
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